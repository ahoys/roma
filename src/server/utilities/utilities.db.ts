import config from '../server.config';
import { Roadmap } from '../models/model.Roadmap';
import { Product } from '../models/model.Product';
import { Tag } from '../models/model.Tag';
import { User } from '../models/model.User';
import { Version } from '../models/model.Version';
import { Feature } from '../models/model.Feature';
import { Requirement } from '../models/model.Requirement';
import { RequirementComment } from '../models/model.RequirementComment';
import { Assignment } from '../models/model.Assignment';
import { AssignmentComment } from '../models/model.AssignmentComment';

/**
 * Returns a random integer between 0 and max.
 * @param max The maximum value of the random integer.
 * @returns A random integer between 0 and max.
 */
const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

/**
 * Generates mockup data. Only runs in development mode.
 */
export const createMockupTables = async () => {
  if (!config.isDevelopment) return;
  const exists = await Roadmap.count();
  if (!exists) {
    // Roadmaps
    const rm0 = await Roadmap.save({
      name: 'Example Roadmap',
    });
    const fakeRoadmapNames: string[] = [
      'Excalibur',
      'Zulfiqar',
      'Muramasa',
      'Harpe',
      'Joyeuse',
      'Thuan Thien Long Roadmap name How long can this be?',
      'Mjölnir',
      'Gae Bolg',
      'Gungnir',
      'Gleipnir',
      'Gae Dearg',
      'Ald ruhn',
      'Balmora',
      'Sardith Mora',
      'Vivec',
      'Ebonheart',
      'Chorrol',
      'Bruma',
      'Cheydinhal',
      'Anvil',
      'Bravil',
    ];
    for (const name of fakeRoadmapNames) {
      await Roadmap.save({
        name,
      });
    }
    // Users
    const u0 = await User.save({
      oauthId: '1234567890',
      name: 'John Doe',
      admin: true,
      hourPrice: 16,
    });
    const u1 = await User.save({
      oauthId: '0987654321',
      name: 'Jane Doe',
      admin: false,
      hourPrice: 24,
    });
    const fakeUsers: [string, string, boolean][] = [
      ['0984654329', 'Barack Obama', false],
      ['1434567899', 'Donald Trump', true],
      ['0987634320', 'Hillary Clinton', false],
      ['1234567800', 'George W. Bush', true],
      ['0982654301', 'Bill Clinton', false],
      ['1234562802', 'Ronald Reagan', true],
      ['0983654303', 'Jimmy Carter', false],
      ['1234567804', 'Gerald Ford', true],
      ['0987654305', 'Richard Nixon', false],
      ['1234567806', 'Lyndon Johnson', true],
      ['0987554307', 'John F. Kennedy', false],
      ['1234567808', 'Dwight Eisenhower', true],
      ['0987654309', 'Harry Truman', false],
      ['1234567810', 'Franklin Roosevelt', true],
      ['0985454311', 'Herbert Hoover', false],
      ['1234567812', 'Calvin Coolidge', true],
      ['0987554313', 'Warren Harding', false],
      ['1234567814', 'Woodrow Wilson', true],
      ['0987654315', 'William Howard Taft', false],
      ['1234567816', 'Theodore Roosevelt', true],
      ['0987654317', 'William McKinley', false],
      ['1234567818', 'Grover Cleveland', true],
      ['0987654319', 'Benjamin Harrison', false],
      ['1244567820', 'Grover Cleveland', true],
      ['0907654321', 'Chester A. Arthur', false],
      ['1294567822', 'Rutherford B. Hayes', true],
      ['0987654323', 'James A. Garfield', false],
      ['1274567824', 'Ulysses S. Grant', true],
      ['0967654325', 'Andrew Johnson', false],
      ['1254567826', 'Abraham Lincoln', true],
      ['0947654327', 'James Buchanan', false],
      ['1224567828', 'Franklin Pierce', true],
      ['0917654329', 'Millard Fillmore', false],
      ['1204567830', 'Zachary Taylor', true],
      ['0997654331', 'James K. Polk', false],
      ['1284567832', 'John Tyler', true],
      ['0977654333', 'William Henry Harrison', false],
      ['1264567834', 'John Quincy Adams', true],
      ['0957654335', 'Andrew Jackson', false],
      ['1244567836', 'Martin Van Buren', true],
      ['0937654337', 'William H. Crawford', false],
      ['1224567838', 'John C. Calhoun', true],
      ['0917654339', 'John Adams', false],
      ['1294567840', 'Thomas Jefferson', true],
      ['0937654341', 'George Washington', false],
    ];
    for (const user of fakeUsers) {
      await User.save({
        oauthId: user[0],
        name: user[1],
        admin: user[2],
        hourPrice: getRandomInt(100),
      });
    }
    // Versions
    const v0 = await Version.save({
      major: 4,
      minor: 32,
      codename: 'Snowflake',
      roadmap: rm0,
    });
    const v1 = await Version.save({
      major: 5,
      minor: 1218,
      codename: 'Summerset',
      roadmap: rm0,
    });
    const fakeVersions: [number, number, string][] = [
      [1, 0, 'Snowdrop'],
      [53, 122, 'Vampire'],
      [3, 324, 'Witches Festival'],
      [8, 1218, 'Murkmire'],
      [4, 6, 'Mutiny'],
      [77, 29, 'Kingsfall'],
      [5, 544, 'Clockwork City'],
      [3, 3, 'Orsinium'],
      [10, 0, 'Guild'],
      [123, 1, 'Brotherhood'],
      [7, 2334, 'Horns of the Reach'],
      [103, 3643, 'Crecent Bay'],
      [1280, 88, 'Crystal Cave'],
      [125, 2, 'Dragonslayer'],
    ];
    for (const version of fakeVersions) {
      await Version.save({
        major: version[0],
        minor: version[1],
        codename: version[2],
        roadmap: rm0,
      });
    }
    // Products
    const p0 = await Product.save({
      name: 'Product A',
      roadmap: rm0,
    });
    const p1 = await Product.save({
      name: 'Product B',
      roadmap: rm0,
    });
    const fakeProducts: string[] = [
      'Skyrim',
      'Oblivion',
      'Morrowind',
      'Daggerfall',
      'Arena',
      'Redguard',
      'Elder Scrolls Online',
    ];
    for (const product of fakeProducts) {
      await Product.save({
        name: product,
        roadmap: rm0,
      });
    }
    // Tags
    const t0 = await Tag.save({
      name: 'Customer request',
      weight: 4,
      roadmap: rm0,
    });
    const t1 = await Tag.save({
      name: 'Artificial Intelligence',
      weight: 10,
      roadmap: rm0,
    });
    const t2 = await Tag.save({
      name: 'Communications',
      weight: 2,
      roadmap: rm0,
    });
    const fakeTags: [string, number][] = [
      ['Gameplay', 0],
      ['Graphics', 1],
      ['Sound', 0],
      ['UI', 1],
      ['Bug', 0],
      ['Performance', 1],
      ['Crash', 0],
      ['Localization', 1],
      ['Network', 0],
      ['Multiplayer', 1],
      ['Singleplayer', 0],
      ['Story', 1],
      ['Quest', 0],
    ];
    for (const tag of fakeTags) {
      await Tag.save({
        name: tag[0],
        weight: tag[1],
        roadmap: rm0,
      });
    }
    // Features
    const f0 = await Feature.save({
      name: 'Feature A',
      balance: 0,
      version: v0,
      tags: [t0],
      products: [p0, p1],
    });
    const f1 = await Feature.save({
      name: 'Feature B',
      balance: 0,
      version: v0,
    });
    const f2 = await Feature.save({
      name: 'Feature C',
      balance: 0,
      version: v1,
      tags: [t0, t1],
      products: [p0],
    });
    const f3 = await Feature.save({
      name: 'Feature D',
      balance: 0,
      version: v1,
      tags: [t0, t1, t2],
      products: [p1],
    });
    const fakeFeatures: [string, number, Version, Tag[]][] = [
      ['Dashboard', 0, v0, [t0]],
      ['Widgets', 0, v0, []],
      ['Links', 0, v1, [t0, t1]],
      ['Use cases', 0, v1, [t0, t1, t2]],
      ['Toolbar', 0, v0, []],
      ['Settings', 0, v0, []],
      ['User management', 0, v1, [t0, t1]],
      ['NPS', 0, v1, [t0, t1, t2]],
      ['Feedback', 0, v0, []],
      ['Analytics', 0, v0, []],
      ['Reports', 0, v1, [t0, t1]],
      ['Data Collector', 0, v1, [t0, t1, t2]],
    ];
    for (const feature of fakeFeatures) {
      await Feature.save({
        name: feature[0],
        balance: feature[1],
        version: feature[2],
        tags: feature[3],
      });
    }
    // Requirements
    const r0 = await Requirement.save({
      value: 'User must be able to conduct actions',
      fulfilled: false,
      feature: f0,
    });
    const r1 = await Requirement.save({
      value: 'List needs to display prices',
      fulfilled: false,
      feature: f0,
    });
    const r2 = await Requirement.save({
      value: 'If user is not admin, the buttons should be disabled',
      fulfilled: true,
      feature: f0,
    });
    const fakeRequirements: [string, boolean, Feature][] = [
      ['Requests take less than 120 milliseconds', false, f0],
      ['Background must be white', false, f0],
      ['WCAG 2.1 must be met', false, f0],
      ['Buttons must be rounded', false, f1],
      ['Buttons must be blue', false, f1],
      ['Must use CSS-shadows', false, f1],
      ['Must use CSS-transitions', false, f1],
      ['Must use CSS-transforms', false, f1],
      ['Must use CSS-animations', false, f1],
      ['Must use CSS-filters', false, f1],
      ['Elements must fill the screen', true, f1],
      ['Elements must be responsive', true, f2],
      ['Elements must be mobile friendly', true, f2],
      ['Elements must be accessible', true, f3],
      ['Elements must be usable', true, f3],
      ['Elements must be easy to use', true, f3],
    ];
    for (const requirement of fakeRequirements) {
      await Requirement.save({
        value: requirement[0],
        fulfilled: requirement[1],
        feature: requirement[2],
      });
    }
    // Requirement comments
    const fakeRequirementComments: [string, Requirement, User][] = [
      [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        r0,
        u0,
      ],
      [
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
        r0,
        u1,
      ],
      ['Copy that', r1, u0],
      [
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        r1,
        u1,
      ],
      [
        'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
        r2,
        u0,
      ],
      [
        'Voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut.',
        r2,
        u1,
      ],
      [
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
        r0,
        u1,
      ],
      [
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        r1,
        u0,
      ],
      [
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        r2,
        u0,
      ],
      [
        'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
        r0,
        u1,
      ],
      [
        'Voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut.',
        r1,
        u0,
      ],
      [
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
        r2,
        u1,
      ],
      [
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        r0,
        u0,
      ],
      [
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        r1,
        u1,
      ],
      [
        'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
        r2,
        u0,
      ],
      [
        'Voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut.',
        r0,
        u1,
      ],
      [
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
        r1,
        u0,
      ],
      [
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        r2,
        u1,
      ],
    ];
    for (const requirementComment of fakeRequirementComments) {
      await RequirementComment.save({
        value: requirementComment[0],
        requirement: requirementComment[1],
        user: requirementComment[2],
      });
    }
    // Assignments
    const a0 = await Assignment.save({
      workHoursEstimate: 8,
      hourPrice: 16,
      done: false,
      feature: f0,
      user: u0,
    });
    const a1 = await Assignment.save({
      workHoursEstimate: 18,
      hourPrice: 22,
      done: true,
      feature: f0,
      user: u1,
    });
    const fakeAssignments: [number, number, boolean, Feature, User][] = [
      [8, 16, false, f0, u0],
      [18, 22, true, f0, u1],
      [4, 12, false, f1, u0],
      [6, 18, true, f1, u1],
      [2, 10, false, f2, u0],
      [3, 15, true, f2, u1],
    ];
    for (const assignment of fakeAssignments) {
      await Assignment.save({
        workHoursEstimate: assignment[0],
        hourPrice: assignment[1],
        done: assignment[2],
        feature: assignment[3],
        user: assignment[4],
      });
    }
    // AssignmentComments
    const fakeAssignmentComments: [string, Assignment, User][] = [
      ['More work than expected because ...', a0, u0],
      ['Copy that', a0, u1],
      [
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        a1,
        u0,
      ],
      [
        'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
        a1,
        u1,
      ],
    ];
    for (const assignmentComment of fakeAssignmentComments) {
      await AssignmentComment.save({
        value: assignmentComment[0],
        assignment: assignmentComment[1],
        user: assignmentComment[2],
      });
    }
  }
};
