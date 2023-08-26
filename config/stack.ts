import { Colors } from './colors';

export enum Stack {
  // Languages
  go,
  typescript,
  javascript,
  python,

  // Frontend
  react,
  reactnative,

  // Backend
  graphql,
  node,
  django,

  // Cloud
  aws,
  gcp,

  // Messaging
  nats,
  kafka,

  // Databases
  arangodb,
  redis,
  postgres,
  mongo,

  // Tools
  docker,
  kubernetes,
  terraform,

  // Bjössi
  csharp,
  java,
  dotnet,
  restapi,
  nextjs,
  latex,
  clickhouse,
  supabase,
  prisma,
  vercel,
  pandas,
  numpy,
}

export const WorkStack = [
  Stack.typescript,
  Stack.python,
  Stack.react,
  Stack.postgres,
  Stack.reactnative,
  Stack.django,
  Stack.node,
  Stack.javascript,
  Stack.mongo,
  Stack.csharp,
  Stack.java,
  Stack.dotnet,
  Stack.restapi,
  Stack.nextjs,
  Stack.latex,
  Stack.clickhouse,
  Stack.supabase,
  Stack.prisma,
  Stack.vercel,
  Stack.pandas,
  Stack.numpy,
];

type StackInfoMap = {
  value: string;
  color: string;
};

export const StackInfo: Record<Stack, StackInfoMap> = {
  [Stack.typescript]: {
    value: 'TypeScript',
    color: Colors.typescript,
  },
  [Stack.javascript]: {
    value: 'JavaScript',
    color: Colors.javascript,
  },
  [Stack.go]: {
    value: 'Go',
    color: Colors.go,
  },
  [Stack.react]: {
    value: 'React',
    color: Colors.react,
  },
  [Stack.reactnative]: {
    value: 'React Native',
    color: Colors.reactnative,
  },
  [Stack.graphql]: {
    value: 'GraphQL',
    color: Colors.graphql,
  },
  [Stack.aws]: {
    value: 'AWS',
    color: Colors.aws,
  },
  [Stack.gcp]: {
    value: 'Google Cloud',
    color: Colors.gcp,
  },
  [Stack.python]: {
    value: 'Python',
    color: Colors.python,
  },
  [Stack.node]: {
    value: 'Node',
    color: Colors.node,
  },
  [Stack.django]: {
    value: 'Django',
    color: Colors.django,
  },
  [Stack.nats]: {
    value: 'NATS',
    color: Colors.nats,
  },
  [Stack.kafka]: {
    value: 'Kafka',
    color: Colors.kafka,
  },
  [Stack.arangodb]: {
    value: 'ArangoDB',
    color: Colors.arangodb,
  },
  [Stack.postgres]: {
    value: 'Postgres',
    color: Colors.postgres,
  },
  [Stack.redis]: {
    value: 'Redis',
    color: Colors.redis,
  },
  [Stack.mongo]: {
    value: 'MongoDB',
    color: Colors.mongo,
  },
  [Stack.docker]: {
    value: 'Docker',
    color: Colors.docker,
  },
  [Stack.kubernetes]: {
    value: 'Kubernetes',
    color: Colors.kubernetes,
  },
  [Stack.terraform]: {
    value: 'Terraform',
    color: Colors.terraform,
  },
  [Stack.csharp]: {
    value: 'C#',
    color: Colors.csharp,
  },
  [Stack.java]: {
    value: 'Java',
    color: Colors.java,
  },
  [Stack.dotnet]: {
    value: '.NET',
    color: Colors.dotnet,
  },
  [Stack.restapi]: {
    value: 'REST API',
    color: Colors.restapi,
  },
  [Stack.clickhouse]: {
    value: 'Clickhouse',
    color: Colors.clickhouse,
  },
  [Stack.supabase]: {
    value: 'Supabase',
    color: Colors.supabase,
  },
  [Stack.latex]: {
    value: 'LaTeX',
    color: Colors.latex,
  },
  [Stack.nextjs]: {
    value: 'Next.js',
    color: Colors.nextjs,
  },
  [Stack.prisma]: {
    value: 'Prisma',
    color: Colors.prisma,
  },
  [Stack.vercel]: {
    value: 'Vercel',
    color: Colors.vercel,
  },
  [Stack.pandas]: {
    value: 'Pandas',
    color: Colors.pandas,
  },
  [Stack.numpy]: {
    value: 'NumPy',
    color: Colors.numpy,
  },
};
