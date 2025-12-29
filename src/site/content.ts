import { parse as parseYaml } from 'yaml'

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

const rawMdFiles = import.meta.glob('../content/posts/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

function parseMarkdownFile(raw: string): { frontmatter: Frontmatter; body: string } {
  // Supports the Hugo-style frontmatter you currently use:
  // ---
  // title: "..."
  // date: 2023-...
  // draft: false
  // tag: ['a', 'b']
  // ---
  const trimmed = raw.replace(/^\uFEFF/, '') // remove BOM if present

  if (!trimmed.startsWith('---')) {
    return { frontmatter: {}, body: trimmed.trim() }
  }

  const lines = trimmed.split(/\r?\n/)
  if (lines[0].trim() !== '---') {
    return { frontmatter: {}, body: trimmed.trim() }
  }

  let endIdx = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIdx = i
      break
    }
  }

  if (endIdx === -1) {
    return { frontmatter: {}, body: trimmed.trim() }
  }

  const fmRaw = lines.slice(1, endIdx).join('\n')
  const body = lines.slice(endIdx + 1).join('\n').trim()

  let frontmatter: Frontmatter = {}
  try {
    const parsed = (parseYaml(fmRaw) ?? {}) as Record<string, unknown>
    frontmatter = parsed as Frontmatter
  } catch {
    frontmatter = {}
  }

  return { frontmatter, body }
}

export function getAllPosts(): Post[] {
  const postEntries = Object.entries(rawMdFiles)

  const posts = postEntries.map(([path, raw]) => {
    const parsed = parseMarkdownFile(raw as string)
    const fm = parsed.frontmatter
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
      body: parsed.body
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


