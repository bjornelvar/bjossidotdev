export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  // twitter = 'twitter',
  // youtube = 'youtube',
  email = 'email',
  // buymeacoffee = 'buymeacoffee',
}

export interface Contact {
  // twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}

export const contact: Contact = {
  // twitter: '@karan_6864',
  site: 'karanpratapsingh.com',
  links: {
    github: 'https://github.com/bjornelvar',
    linkedin: 'https://linkedin.com/in/bjornelvar',
    // twitter: 'https://twitter.com/karan_6864',
    // youtube: 'https://www.youtube.com/c/KaranPratapSingh',
    email: 'mailto:b@bjossi.dev',
    // buymeacoffee: 'https://www.buymeacoffee.com/karanps',
  },
};
