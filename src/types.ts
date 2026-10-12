export type Site = {
  title: string
  base: string
  description: string
  lang: string
  author: string
  website: string
  ogImage: string
  transition: boolean
  themeAnimation: boolean
}

export type Link = {
  name: string
  url: string
}

export type SocialLink = {
  name: string
  url: string
  icon: string
}

export interface Skill {
  name: string
  icon: string
  url?: string
}

export interface SkillData {
  direction: 'left' | 'right'
  skills: Skill[]
}

export interface SkillsShowcaseConfig {
  SKILLS_ENABLED: boolean
  SKILLS_DATA: SkillData[]
}

export interface ProjectConfig {
  title: string
  description: string
  introduce: string
}
