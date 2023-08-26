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
    title: 'NFL Tippkeppnin',
    slug: 'nfl-tippkeppnin',
    website: 'https://tippkeppni.net',
    banner: '/static/projects/NFL Tippkeppnin/banner.png',
    description:
      "A Pick 'Em style game for the NFL season. Users pick the winners of each game. " +
      'The app is built with Next.js, Prisma and Supabase. The app is deployed on Vercel. ' +
      '\n\n' +
      'Users can sign in with Auth0 and their picks are saved to the database. ' +
      "When Preseason power rankings have been submitted, the user's picks are automatically generated for the entire season. ",
    repository: null,
    stack: [
      Stack.nextjs,
      Stack.postgres,
      Stack.node,
      Stack.prisma,
      Stack.typescript,
      Stack.javascript,
      Stack.supabase,
      Stack.vercel,
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
      // android:
      //   'https://play.google.com/store/apps/details?id=com.celebrify.app',
      // ios: 'https://apps.apple.com/us/app/celebrify-app/id1469588198',
    },
    subProjects: [],
  },
  {
    title: 'Scott Hanson Bot',
    slug: 'scott-hanson-bot',
    website: '',
    banner: '/static/projects/Scott Hanson Bot/banner.png',
    description:
      "One evening, my girlfriend asked me what games were on tonight and I instinctively went to type nba in Alfred. I of course didn't have any workflow for it, so I decided to build one myself. I used the NBA API to get the data and then built a workflow around it using Python. And a lot of JSON parsing.",
    repository: null,
    stack: [Stack.python],
    dimensions: [450, 270],
    screenshots: [
      // 'https://res.cloudinary.com/dmdwodmqv/image/upload/v1693020270/bjossi.dev/alfred_nba_scores_small_y7cxsj.png',
    ],
    deployment: {
      // web: 'https://celebrify.in',
      // android:
      //   'https://play.google.com/store/apps/details?id=com.celebrify.app',
      // ios: 'https://apps.apple.com/us/app/celebrify-app/id1469588198',
    },
    subProjects: [],
  },
];
