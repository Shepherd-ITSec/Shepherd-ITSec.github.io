import matter from 'gray-matter'

export type NavItem =
  | { kind: 'route'; label: string; to: string }
  | { kind: 'external'; label: string; href: string }

export const navItems: NavItem[] = [
  { kind: 'route', label: 'Home', to: '/' },
  { kind: 'route', label: 'About', to: '/about' },
  { kind: 'route', label: 'CV', to: '/cv' },
  { kind: 'route', label: 'Appointments', to: '/appointments' },
  { kind: 'route', label: 'Posts', to: '/posts' }
]

export type SocialLink = {
  label: string
  icon: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: 'E-Mail', icon: 'fa-solid fa-envelope', href: 'mailto:felix@oje-oje.de' },
  { label: 'GitHub', icon: 'fa-brands fa-github', href: 'https://github.com/Shepherd-ITSec' },
  { label: 'LinkedIn', icon: 'fa-brands fa-linkedin', href: 'https://linkedin.com/in/felix-schäfer' }
]

type Frontmatter = {
  title?: string
  date?: string
  draft?: boolean
  tag?: string[] | string
  tags?: string[] | string
  image?: string
}

export type Post = {
  slug: string
  title: string
  date?: string
  draft: boolean
  tags: string[]
  body: string
}

export type PageContent = {
  title: string
  body: string
  image?: string
}

function normalizeTags(value: Frontmatter['tag'] | Frontmatter['tags']): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)
  return [value].filter(Boolean)
}

function compareDateDesc(a?: string, b?: string): number {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1
  return new Date(b).getTime() - new Date(a).getTime()
}

const rawMdFiles = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

export function getPageByPath(contentPath: string): PageContent {
  const key = Object.keys(rawMdFiles).find((k) => k.endsWith(contentPath))
  if (!key) {
    return { title: 'Missing content', body: `Content file not found: ${contentPath}` }
  }

  const raw = rawMdFiles[key] as string
  const parsed = matter(raw)
  const fm = parsed.data as Frontmatter
  return {
    title: fm.title ?? 'Untitled',
    body: parsed.content.trim(),
    image: fm.image
  }
}

export function getAllPosts(): Post[] {
  const postEntries = Object.entries(rawMdFiles).filter(([path]) =>
    path.includes('/content/posts/')
  )

  const posts = postEntries.map(([path, raw]) => {
    const parsed = matter(raw as string)
    const fm = parsed.data as Frontmatter
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? 'post'
    const title = fm.title ?? slug
    const draft = Boolean(fm.draft)
    const tags = normalizeTags(fm.tag ?? fm.tags)
    return {
      slug,
      title,
      date: fm.date,
      draft,
      tags,
      body: parsed.content.trim()
    }
  })

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => compareDateDesc(a.date, b.date))
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) ?? null
}


