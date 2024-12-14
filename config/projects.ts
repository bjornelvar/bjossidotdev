import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
  deployment: Deployment;
}

export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'Sleeper Live Table',
    slug: 'sleeper-live-table',
    website: 'https://sleeper-live-league-table.vercel.app/',
    banner: '/static/projects/Sleeper Live Table/banner.png',
    description:
      'A live league table for your Sleeper Fantasy Football league using the Sleeper API.',
    repository: null,
    stack: [Stack.nextjs, Stack.javascript, Stack.vercel],
    dimensions: [450, 270],
    screenshots: [],
    deployment: {
      web: 'https://sleeper-live-league-table.vercel.app/',
    },
    subProjects: [],
  },
  {
    title: 'NFL Tippkeppnin',
    slug: 'nfl-tippkeppnin',
    website: 'https://tippkeppni.net',
    banner: '/static/projects/NFL Tippkeppnin/banner.png',
    description:
      "A Pick 'Em style game for the NFL season. Users pick the winners of each game. The app is built with Next.js, Prisma and Supabase. The app is deployed on Vercel. Users can sign in with Auth0 and their picks are saved to the database. When Preseason power rankings have been submitted, the user's picks are automatically generated for the entire season. ",
    repository: null,
    stack: [
      Stack.nextjs,
      Stack.postgres,
      Stack.typescript,
      Stack.javascript,
      Stack.vercel,
      Stack.dotnet,
    ],
    dimensions: [450, 270],
    screenshots: [],
    deployment: {
      web: 'https://tippkeppni.net',
    },
    subProjects: [],
  },
  {
    title: 'Alfred NBA Scores',
    slug: 'alfred-nba-scores',
    website: 'https://alfred.app/workflows/bjornelvar/nba-scores/',
    banner: '/static/projects/Alfred NBA Scores/banner.png',
    description:
      "One evening, my girlfriend asked me what games were on tonight and I instinctively went to type nba in Alfred. I of course didn't have any workflow for it, so I decided to build one myself. I used the NBA API to get the data and then built a workflow around it using Python. And a lot of JSON parsing.",
    repository: null,
    stack: [Stack.python],
    dimensions: [450, 270],
    screenshots: [
      'https://res.cloudinary.com/dmdwodmqv/image/upload/v1693020270/bjossi.dev/alfred_nba_scores_small_y7cxsj.png',
      'https://res.cloudinary.com/dmdwodmqv/image/upload/v1693020270/bjossi.dev/alfred_nba_scores_nr6euf.png',
      'https://res.cloudinary.com/dmdwodmqv/image/upload/v1693020271/bjossi.dev/alfred_nba_scores_20221022_swb7l4.gif',
    ],
    deployment: {
      web: 'https://alfred.app/workflows/bjornelvar/nba-scores/',
    },
    subProjects: [],
  },
  {
    title: 'Anti Clockwise Rocket Science',
    slug: 'rocket-science',
    website:
      'https://bjornelvar.itch.io/anti-clockwise-rocket-science-2?secret=1ncTbgCp2wtRKMwuPlaZhDNjb4',
    banner: '/static/projects/Rocket Science/banner.png',
    description:
      'I wanted to make this game as zen as possible and I believe I achieved that. I wanted the game to never increase in difficulty, but rather to be a relaxing experience completed by the background music and sound effects.' +
      '\n\n' +
      'The game is built with Unity and C#.' +
      '\n\n' +
      'Play it by clicking the web button in the Deployments section',
    repository: null,
    stack: [Stack.csharp],
    dimensions: [450, 270],
    screenshots: [
      'https://res.cloudinary.com/dmdwodmqv/image/upload/v1693020271/bjossi.dev/rocketscience_desc_vi2zd3.png',
    ],
    deployment: {
      web: 'https://bjornelvar.itch.io/anti-clockwise-rocket-science-2?secret=1ncTbgCp2wtRKMwuPlaZhDNjb4',
    },
    subProjects: [],
  },
  {
    title: 'Canvas Crisis',
    slug: 'canvas-crisis',
    website:
      'https://bjornelvar.itch.io/canvas-crisis?secret=nalHXxorpAvtMxefb4dOVO4unG4',
    banner: '/static/projects/Canvas Crisis/banner.png',
    description:
      'Canvas Crisis is an innovative 2D platformer developed in Unity, offering a unique twist on gameplay through creative painting mechanics. Players have the ability to alter the game environment by painting platforms and tiles, enabling higher jumps, wall climbing, or increased speed. This interactive feature adds a strategic layer to level completion. The game was meticulously designed and programmed within a two-week timeframe. It was a key project for the 3-week course on Computer Game Design and Development at Reykjavik University, under the tutelage of Steingerður Lóa. Our team had the honor of showcasing Canvas Crisis at the UT Messan event in Reykjavik, representing Reykjavik University.',
    repository: null,
    stack: [Stack.csharp],
    dimensions: [450, 270],
    screenshots: [
      '/static/projects/Canvas Crisis/canvascrisis.gif',
      '/static/projects/Canvas Crisis/blueredjump.gif',
    ],
    deployment: {
      web: 'https://bjornelvar.itch.io/canvas-crisis?secret=nalHXxorpAvtMxefb4dOVO4unG4',
    },
    subProjects: [],
  },
  {
    title: 'Scott Hanson Bot',
    slug: 'scott-hanson-bot',
    website: '',
    banner: '/static/projects/Scott Hanson Bot/banner.png',
    description:
      'I created this Discord bot for my Fantasy Football League. I wanted my Discord server to be more interactive and fun, as well as to archive some things, like what was the score in this particular matchup at this particular point in time. I also wanted to be able to see the current standings, current schedule and the top performers for every position and every week.' +
      '\n\n' +
      'The bot is built with Python and is hosted on my Raspberry Pi Zero W.',
    repository: null,
    stack: [Stack.python],
    dimensions: [450, 270],
    screenshots: [
      'https://res.cloudinary.com/dmdwodmqv/image/upload/v1693020272/bjossi.dev/scott_standings_bmcuyr.png',
      'https://res.cloudinary.com/dmdwodmqv/image/upload/v1693020272/bjossi.dev/scott_top_rb_bdqrv7.png',
      'https://res.cloudinary.com/dmdwodmqv/image/upload/v1693020271/bjossi.dev/scott_scores_zx9p1o.png',
      'https://res.cloudinary.com/dmdwodmqv/image/upload/v1693020271/bjossi.dev/scott_help_i1cy3q.png',
    ],
    deployment: {
      // web: 'https://bjornelvar.itch.io/anti-clockwise-rocket-science-2?secret=1ncTbgCp2wtRKMwuPlaZhDNjb4',
    },
    subProjects: [],
  },
];
