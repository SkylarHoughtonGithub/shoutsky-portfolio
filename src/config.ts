import type {
  AnalyticsConfig,
  CommentConfig,
  GithubConfig,
  Link,
  PhotosConfig,
  PostConfig,
  ProjectConfig,
  Site,
  SkillsShowcaseConfig,
  SocialLink,
  TagsConfig,
} from '~/types'

//--- Site Config ---
export const SITE: Site = {
  title: 'Skylar Houghton',
  description:
    'Backend & infrastructure engineer. I build reliable systems, automate the boring stuff, and write about what I learn along the way.',
  website: 'https://shoutsky.dev/',
  lang: 'en',
  base: '/',
  author: 'Skylar Houghton',
  ogImage: '/og-image.webp',
  transition: false,
  themeAnimation: true,
}

export const HEADER_LINKS: Link[] = [
  {
    name: 'Projects',
    url: '/projects',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
]

// get icon https://icon-sets.iconify.design/
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/SkylarHoughtonGithub',
    icon: 'icon-[ri--github-fill]',
    count: 20,
  },
  {
    name: 'email',
    url: 'mailto:skylarhoughton1996@gmail.com',
    icon: 'icon-[ri--mail-fill]',
  },
  {
    name: 'linkedin',
    url: 'https://linkedin.com/in/', // TODO: add your LinkedIn slug
    icon: 'icon-[ri--linkedin-fill]',
  },
]

/**
 * SkillsShowcase configuration
 * @property {boolean} SKILLS_ENABLED - whether to show the skills marquee
 * @property {Object} SKILLS_DATA - skills list, grouped by scroll direction
 * get icon https://icon-sets.iconify.design/
 */
export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'Python',
          icon: 'icon-[skill-icons--python-dark]',
          url: 'https://python.org/',
        },
        {
          name: 'Go',
          icon: 'icon-[skill-icons--golang]',
          url: 'https://go.dev/',
        },
        {
          name: 'Bash',
          icon: 'icon-[skill-icons--bash-dark]',
          url: 'https://www.gnu.org/software/bash/',
        },
        {
          name: 'TypeScript',
          icon: 'icon-[skill-icons--typescript]',
          url: 'https://www.typescriptlang.org/',
        },
        {
          name: 'Task',
          icon: 'icon-[simple-icons--task]',
          url: 'https://taskfile.dev/',
        },
        {
          name: 'Ansible',
          icon: 'icon-[skill-icons--ansible]',
          url: 'https://www.ansible.com/',
        },
        {
          name: 'Terraform',
          icon: 'icon-[skill-icons--terraform-dark]',
          url: 'https://terraform.io/',
        },
      ],
    },
    {
      direction: 'right',
      skills: [
        {
          name: 'Linux',
          icon: 'icon-[skill-icons--linux-dark]',
          url: 'https://kernel.org/',
        },
        {
          name: 'Docker',
          icon: 'icon-[skill-icons--docker]',
          url: 'https://docker.com/',
        },
        {
          name: 'Kubernetes',
          icon: 'icon-[skill-icons--kubernetes]',
          url: 'https://kubernetes.io/',
        },
        {
          name: 'Crossplane',
          icon: 'icon-[simple-icons--crossplane]',
          url: 'https://crossplane.io/',
        },
        {
          name: 'PostgreSQL',
          icon: 'icon-[skill-icons--postgresql-dark]',
          url: 'https://www.postgresql.org/',
        },
        {
          name: 'Git',
          icon: 'icon-[skill-icons--git]',
          url: 'https://git-scm.com/',
        },
        {
          name: 'AWS',
          icon: 'icon-[skill-icons--aws-dark]',
          url: 'https://aws.amazon.com/',
        },
      ],
    },
    {
      direction: 'left',
      skills: [
        {
          name: 'GitHub Actions',
          icon: 'icon-[skill-icons--githubactions-dark]',
          url: 'https://github.com/features/actions',
        },
        {
          name: 'Redis',
          icon: 'icon-[skill-icons--redis-dark]',
          url: 'https://redis.io/',
        },
        {
          name: 'Nginx',
          icon: 'icon-[skill-icons--nginx]',
          url: 'https://nginx.org/',
        },
        {
          name: 'VS Code',
          icon: 'icon-[skill-icons--vscode-dark]',
          url: 'https://code.visualstudio.com/',
        },
        {
          name: 'Astro',
          icon: 'icon-[skill-icons--astro]',
          url: 'https://astro.build/',
        },
        {
          name: 'Vercel',
          icon: 'icon-[skill-icons--vercel-dark]',
          url: 'https://vercel.com/',
        },
      ],
    },
  ],
}

/**
 * GitHub contributions widget configuration
 * @property {boolean} ENABLED - show the GitHub contributions graph
 * @property {string} GITHUB_USERNAME - your GitHub username
 * @property {boolean} TOOLTIP_ENABLED - show per-day tooltips on hover
 */
export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'SkylarHoughtonGithub',
  TOOLTIP_ENABLED: true,
}

//--- Posts Page Config ---
export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: 'Writing by Skylar Houghton',
  introduce: 'Notes on systems, automation, and the things I figure out the hard way.',
  author: 'Skylar Houghton',
  homePageConfig: {
    size: 2,
    type: 'compact',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
    coverLayout: 'right',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  ogImageUseCover: false,
  postType: 'metaOnly',
  imageDarkenInDark: true,
  readMoreText: 'Read more',
  prevPageText: 'Previous',
  nextPageText: 'Next',
  tocText: 'On this page',
  backToPostsText: 'Back to Posts',
  nextPostText: 'Next Post',
  prevPostText: 'Previous Post',
  recommendText: 'REC',
  wordCountView: true,
}

export const COMMENT_CONFIG: CommentConfig = {
  enabled: false,
  system: 'gitalk',
  gitalk: {
    clientID: import.meta.env.PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.PUBLIC_GITHUB_CLIENT_SECRET,
    repo: 'portfolio-comments',
    owner: 'SkylarHoughtonGithub',
    admin: ['SkylarHoughtonGithub'],
    language: 'en-US',
    perPage: 5,
    pagerDirection: 'last',
    createIssueManually: false,
    distractionFreeMode: false,
    enableHotKey: true,
  },
}

export const TAGS_CONFIG: TagsConfig = {
  title: 'Tags',
  description: 'All post tags',
  introduce: 'Browse posts by topic.',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: 'Things I have built.',
  introduce: 'A selection of projects — click any card to read more.',
}

export const PHOTOS_CONFIG: PhotosConfig = {
  title: 'Photos',
  description: 'Photos from daily life.',
  introduce: 'Photos from daily life.',
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  vercount: {
    enabled: false,
  },
  umami: {
    enabled: false,
    websiteId: 'Your websiteId in umami',
    serverUrl: 'https://cloud.umami.is/script.js',
  },
}
