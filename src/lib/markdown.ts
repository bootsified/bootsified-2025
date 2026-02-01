import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

/**
 * Converts markdown string to HTML for RSS feed content
 * Uses the same plugins as client-side rendering for consistency
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // Parse markdown to AST
    .use(remarkGfm) // Support GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
    .use(rehypeRaw) // Allow raw HTML passthrough
    .use(rehypeStringify) // Convert to HTML string
    .process(markdown)
  
  return String(result)
}
