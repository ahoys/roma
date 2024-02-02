import config from '../server.config';
import axios from 'axios';
import { validator, getIntFromObject } from '../utilities/utilities.resolvers';
import { User } from '../models/model.User';
import { RequirementComment } from '../models/model.RequirementComment';
import { Application, Request } from 'express';
import { Feature } from '../models/model.Feature';
import { GitLabFeatureDTO } from 'dtos/dto.GitLabDTO';

interface IGitLabIssue {
  iid: number;
  title: string;
  description: string;
  state: string;
  has_tasks: boolean;
}

export const gitLabResolvers = (server: Application) => {
  const gitlabBaseUrl = config.gitlab.url + '/api/v4/';
  const romaBaseUrl = config.gitlab.romaUrl + '/';

  /**
   * Will check if the user has access to the endpoint.
   * @param req The request object.
   * @returns True if the user has access, false otherwise.
   */
  const hasAccess = async (req: Request): Promise<boolean> => {
    try {
      const user = await User.findOneBy({ _id: (req.user as User)?._id });
      return !!user?.admin;
    } catch (error) {
      return false;
    }
  };

  /**
   * Will generate a description for the issue.
   * @param feature The feature to generate the description for.
   * @returns The description.
   */
  const getDescriptionForIssue = async (feature: Feature): Promise<string> => {
    const linkToRoma =
      romaBaseUrl +
      'r/' +
      feature.version?.roadmap._id +
      '/features/' +
      feature._id;
    let description = `[${feature.name}](${linkToRoma})\n\n`;
    description += `**Target version:** ${feature.version?.major}.${feature.version?.minor}\n\n`;
    description += '\n\n## Requirements\n';
    for (const requirement of feature.requirements || []) {
      description += '- [ ] ' + requirement.value + '\n';
      const comments = await RequirementComment.find({
        where: {
          requirement: {
            feature: {
              _id: feature._id,
            },
          },
        },
        relations: {
          requirement: true,
        },
        select: {
          value: true,
        },
      });
      if (comments.length) {
        comments.forEach((comment) => {
          description += '  - ' + comment.value + '\n';
        });
      }
    }
    return description;
  };

  /**
   * Will create a new issue in GitLab.
   * @param feature The feature to create an issue for.
   * @param projectGitLabId The GitLab project id.
   * @param accessToken The GitLab access token.
   * @returns The response from the GitLab API.
   */
  const createIssue = async (
    feature: Feature,
    projectGitLabId: number,
    accessToken: string
  ) => {
    try {
      return await axios.post(
        gitlabBaseUrl +
          'projects/' +
          projectGitLabId +
          '/issues?access_token=' +
          accessToken,
        {
          title: feature.name,
          description: await getDescriptionForIssue(feature),
        }
      );
    } catch (error) {
      return;
    }
  };

  /**
   * Will update an existing issue in GitLab.
   * @param feature The feature to update the issue for.
   * @param issueId The GitLab issue id.
   * @param projectGitLabId The GitLab project id.
   * @param accessToken The GitLab access token.
   * @returns The response from the GitLab API.
   */
  const updateIssue = async (
    feature: Feature,
    issueId: number,
    projectGitLabId: number,
    accessToken: string
  ) => {
    try {
      return await axios.put(
        gitlabBaseUrl +
          'projects/' +
          projectGitLabId +
          '/issues/' +
          issueId +
          '?access_token=' +
          accessToken,
        {
          title: feature.name,
          description: await getDescriptionForIssue(feature),
        }
      );
    } catch (error) {
      return;
    }
  };

  /**
   * Will post a new feature as an issue to GitLab.
   */
  server.post(config.api + 'gitlab/issues', async (req, res, next) => {
    try {
      // Only admin has access.
      if (!(await hasAccess(req))) {
        return res.status(401).end();
      }
      // Validate the request body.
      const validationErrors = await validator(GitLabFeatureDTO, req.body);
      if (validationErrors.length === 0) {
        // Look for the feature.
        // Continue only if the feature exists and gitlab accessToken
        // is set for the roadmap.
        const feature = await Feature.findOne({
          where: {
            _id: getIntFromObject('featureId', req.body),
          },
          relations: {
            version: {
              roadmap: true,
            },
            products: true,
            requirements: {
              comments: true,
            },
          },
          select: {
            _id: true,
            name: true,
            version: {
              major: true,
              minor: true,
              roadmap: {
                _id: true,
                gitlabAccessToken: true,
              },
            },
            products: {
              gitlabId: true,
            },
            requirements: {
              value: true,
            },
          },
        });
        const accessToken = feature?.version?.roadmap?.gitlabAccessToken;
        if (!accessToken) {
          return res.status(400).end();
        }
        // Generate issues for each product the feature is part of.
        for (const product of feature.products || []) {
          const projectGitLabId = product.gitlabId;
          await axios
            .get<IGitLabIssue[]>(
              gitlabBaseUrl +
                'projects/' +
                projectGitLabId +
                '/issues?access_token=' +
                accessToken
            )
            .then(async (response) => {
              const issues = response.data ?? [];
              const duplicate = issues.find(
                (issue) =>
                  issue.title.toLowerCase() === feature.name.toLowerCase()
              );
              if (duplicate) {
                await updateIssue(
                  feature,
                  duplicate.iid,
                  projectGitLabId,
                  accessToken
                );
              } else {
                await createIssue(feature, projectGitLabId, accessToken);
              }
            });
        }
        res.status(204).end();
      } else {
        next(validationErrors);
      }
    } catch (error) {
      next(error);
    }
  });
};
