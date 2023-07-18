import { useParams } from 'react-router-dom';

/**
 * Returns meta resources for a route.
 * @param resource the basename for the resource, i.e. "products", or "roadmaps".
 * @returns Object containing the endpoint and resource.
 */
export const useMeta = (
  resource: string
): {
  resource: string;
  endpoint: string;
} => {
  const { id, roadmap } = useParams();
  let endpoint = resource;
  if (roadmap !== undefined) {
    endpoint = `r/${roadmap}/${resource}`;
  }
  if (id !== undefined) {
    endpoint += `/${id}`;
  }
  return {
    resource,
    endpoint,
  };
};
