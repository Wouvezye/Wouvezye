"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MarkdownRendererProps {
  content: string
  className?: string
}

// Parse inline markdown (bold, italic, links, code)
function parseInline(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = []
  let remaining = text
  let keyIndex = 0

  while (remaining.length > 0) {
    // Check for CTA buttons: > 🔴 **[text](/link)**
    const ctaMatch = remaining.match(/^>\s*🔴\s*\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/)
    if (ctaMatch) {
      elements.push(
        <div key={keyIndex++} className="my-2">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href={ctaMatch[2]}>{ctaMatch[1]}</Link>
          </Button>
        </div>
      )
      remaining = remaining.slice(ctaMatch[0].length)
      continue
    }

    // Check for links with bold: **[text](url)**
    const boldLinkMatch = remaining.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/)
    if (boldLinkMatch) {
      elements.push(
        <Link
          key={keyIndex++}
          href={boldLinkMatch[2]}
          className="font-bold text-primary hover:underline"
        >
          {boldLinkMatch[1]}
        </Link>
      )
      remaining = remaining.slice(boldLinkMatch[0].length)
      continue
    }

    // Check for regular links: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      elements.push(
        <Link key={keyIndex++} href={linkMatch[2]} className="text-primary hover:underline">
          {linkMatch[1]}
        </Link>
      )
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Check for bold + italic: ***text*** or ___text___
    const boldItalicMatch = remaining.match(/^\*\*\*([^*]+)\*\*\*|^___([^_]+)___/)
    if (boldItalicMatch) {
      elements.push(
        <strong key={keyIndex++} className="italic text-foreground">
          {boldItalicMatch[1] || boldItalicMatch[2]}
        </strong>
      )
      remaining = remaining.slice(boldItalicMatch[0].length)
      continue
    }

    // Check for bold: **text** or __text__
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*|^__([^_]+)__/)
    if (boldMatch) {
      elements.push(
        <strong key={keyIndex++} className="text-foreground font-semibold">
          {boldMatch[1] || boldMatch[2]}
        </strong>
      )
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Check for italic with underscore: _text_ (book titles often use this)
    const italicBookMatch = remaining.match(/^_([^_]+)_/)
    if (italicBookMatch) {
      elements.push(
        <em key={keyIndex++} className="italic">
          {italicBookMatch[1]}
        </em>
      )
      remaining = remaining.slice(italicBookMatch[0].length)
      continue
    }

    // Check for italic: *text*
    const italicMatch = remaining.match(/^\*([^*]+)\*/)
    if (italicMatch) {
      elements.push(
        <em key={keyIndex++} className="italic">
          {italicMatch[1]}
        </em>
      )
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Check for inline code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/)
    if (codeMatch) {
      elements.push(
        <code
          key={keyIndex++}
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
        >
          {codeMatch[1]}
        </code>
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // No match, take one character
    const nextSpecial = remaining.search(/[\[*_`]/)
    if (nextSpecial === -1) {
      elements.push(remaining)
      break
    } else if (nextSpecial === 0) {
      elements.push(remaining[0])
      remaining = remaining.slice(1)
    } else {
      elements.push(remaining.slice(0, nextSpecial))
      remaining = remaining.slice(nextSpecial)
    }
  }

  return elements
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let keyIndex = 0
  let inBlockquote = false
  let blockquoteLines: string[] = []
  let inList = false
  let listItems: React.ReactNode[] = []
  let listType: "ul" | "ol" = "ul"

  const flushBlockquote = () => {
    if (blockquoteLines.length > 0) {
      elements.push(
        <blockquote
          key={keyIndex++}
          className="border-l-4 border-primary bg-primary/5 pl-4 py-3 my-6 italic text-foreground/90"
        >
          {blockquoteLines.map((line, i) => (
            <p key={i} className="my-1">
              {parseInline(line)}
            </p>
          ))}
        </blockquote>
      )
      blockquoteLines = []
    }
    inBlockquote = false
  }

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === "ul") {
        elements.push(
          <ul key={keyIndex++} className="my-4 ml-6 space-y-2 list-disc marker:text-primary">
            {listItems}
          </ul>
        )
      } else {
        elements.push(
          <ol key={keyIndex++} className="my-4 ml-6 space-y-2 list-decimal marker:text-primary marker:font-semibold">
            {listItems}
          </ol>
        )
      }
      listItems = []
    }
    inList = false
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Horizontal rule: --- or ***
    if (line.match(/^(-{3,}|\*{3,})$/)) {
      flushBlockquote()
      flushList()
      elements.push(
        <hr key={keyIndex++} className="my-8 border-t-2 border-primary/20" />
      )
      continue
    }

    // H1: # Title
    if (line.startsWith("# ")) {
      flushBlockquote()
      flushList()
      elements.push(
        <h1 key={keyIndex++} className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-foreground">
          {parseInline(line.slice(2))}
        </h1>
      )
      continue
    }

    // H2: ## Title
    if (line.startsWith("## ")) {
      flushBlockquote()
      flushList()
      elements.push(
        <h2 key={keyIndex++} className="text-2xl font-bold mt-10 mb-4 text-foreground border-b border-primary/20 pb-2">
          {parseInline(line.slice(3))}
        </h2>
      )
      continue
    }

    // H3: ### Title
    if (line.startsWith("### ")) {
      flushBlockquote()
      flushList()
      elements.push(
        <h3 key={keyIndex++} className="text-xl font-semibold mt-8 mb-3 text-foreground">
          {parseInline(line.slice(4))}
        </h3>
      )
      continue
    }

    // H4: #### Title
    if (line.startsWith("#### ")) {
      flushBlockquote()
      flushList()
      elements.push(
        <h4 key={keyIndex++} className="text-lg font-semibold mt-6 mb-2 text-foreground">
          {parseInline(line.slice(5))}
        </h4>
      )
      continue
    }

    // Blockquote: > text
    if (line.startsWith("> ")) {
      flushList()
      inBlockquote = true
      const quoteContent = line.slice(2).trim()
      // Skip empty lines in quotes
      if (quoteContent || blockquoteLines.length > 0) {
        blockquoteLines.push(quoteContent)
      }
      continue
    }

    // Continue blockquote with just >
    if (line === ">" && inBlockquote) {
      blockquoteLines.push("")
      continue
    }

    // End blockquote
    if (inBlockquote && !line.startsWith(">")) {
      flushBlockquote()
    }

    // Unordered list: - item or * item
    if (line.match(/^[-*]\s+/)) {
      flushBlockquote()
      if (!inList || listType !== "ul") {
        flushList()
        inList = true
        listType = "ul"
      }
      const itemContent = line.replace(/^[-*]\s+/, "")
      listItems.push(
        <li key={`li-${keyIndex++}`} className="text-muted-foreground leading-relaxed">
          {parseInline(itemContent)}
        </li>
      )
      continue
    }

    // Ordered list: 1. item
    if (line.match(/^\d+\.\s+/)) {
      flushBlockquote()
      if (!inList || listType !== "ol") {
        flushList()
        inList = true
        listType = "ol"
      }
      const itemContent = line.replace(/^\d+\.\s+/, "")
      listItems.push(
        <li key={`li-${keyIndex++}`} className="text-muted-foreground leading-relaxed">
          {parseInline(itemContent)}
        </li>
      )
      continue
    }

    // List continuation (indented text)
    if (inList && line.match(/^\s{2,}/)) {
      // Append to last list item
      const itemContent = line.trim()
      if (listItems.length > 0) {
        const lastItem = listItems[listItems.length - 1]
        listItems[listItems.length - 1] = (
          <li key={(lastItem as React.ReactElement).key} className="text-muted-foreground leading-relaxed">
            {(lastItem as React.ReactElement).props.children}
            <br />
            {parseInline(itemContent)}
          </li>
        )
      }
      continue
    }

    // End list
    if (inList && !line.match(/^[-*]\s+/) && !line.match(/^\d+\.\s+/) && !line.match(/^\s{2,}/)) {
      flushList()
    }

    // Empty line
    if (line.trim() === "") {
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={keyIndex++} className="text-muted-foreground leading-relaxed my-4">
        {parseInline(line)}
      </p>
    )
  }

  // Flush remaining content
  flushBlockquote()
  flushList()

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {elements}
    </div>
  )
}
