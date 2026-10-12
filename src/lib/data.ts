import { getCollection, type CollectionEntry } from 'astro:content'

// Get all projects — featured first, then by date desc
export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const allProjects = await getCollection('projects')
  return allProjects
    .filter((project) => !project.data.draft)
    .slice()
    .sort((a, b) => {
      if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0
      return dateB - dateA
    })
}
