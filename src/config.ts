import type { Link, ProjectConfig, Site, SkillsShowcaseConfig, SocialLink } from '~/types'

//--- Site Config ---
export const SITE: Site = {
  title: 'Skylar Houghton',
  description: 'Platform engineer. I build reliable systems, and automate the boring stuff.',
  website: 'https://skylarhoughtongithub.com/',
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
  },
  {
    name: 'email',
    url: 'mailto:skylarhoughtongithub@gmail.com',
    icon: 'icon-[ri--mail-fill]',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/skylarhoughton',
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
          name: 'Git',
          icon: 'icon-[skill-icons--git]',
          url: 'https://git-scm.com/',
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
          name: 'FluxCD',
          icon: 'icon-[logos--flux]',
          url: 'https://fluxcd.io/',
        },
        {
          name: 'Kubernetes',
          icon: 'icon-[skill-icons--kubernetes]',
          url: 'https://kubernetes.io/',
        },
        {
          name: 'Crossplane',
          icon: 'icon-[logos--crossplane]',
          url: 'https://crossplane.io/',
        },
        {
          name: 'PostgreSQL',
          icon: 'icon-[skill-icons--postgresql-dark]',
          url: 'https://www.postgresql.org/',
        },
        {
          name: 'GitLab',
          icon: 'icon-[logos--gitlab]',
          url: 'https://about.gitlab.com/',
        },
        {
          name: 'Backstage',
          icon: 'icon-[simple-icons--backstage]',
          url: 'https://backstage.io/',
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
          name: 'GCP',
          icon: 'icon-[skill-icons--gcp-dark]',
          url: 'https://cloud.google.com/',
        },
        {
          name: 'ArgoCD',
          icon: 'icon-[logos--argo]',
          url: 'https://argo-cd.readthedocs.io/en/stable/',
        },
        {
          name: 'Helm',
          icon: 'icon-[logos--helm]',
          url: 'https://helm.sh/',
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
          name: 'Ansible',
          icon: 'icon-[skill-icons--ansible]',
          url: 'https://www.ansible.com/',
        },
      ],
    },
  ],
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: 'Things I have built.',
  introduce: 'A selection of projects. Click any card to read more.',
}
