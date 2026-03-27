export function parseSectionMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const section = {
    id: "",
    title: "",
    description: "",
    items: [],
  }

  let currentItem = null
  let currentChild = null
  let buffer = []

  function flushBuffer() {
    const content = buffer.join("\n").replace(/^\n+|\n+$/g, "")
    buffer = []

    if (currentChild) {
      currentChild.content = content
      return
    }

    if (currentItem) {
      currentItem.content = content
      return
    }

    section.description = content
  }

  function parseHeading(line) {
    const match = line.match(/^(#{1,6})\s+(.+?)\s+\{#([A-Za-z0-9-_]+)\}\s*$/)
    if (!match) return null

    return {
      level: match[1].length,
      title: match[2].trim(),
      id: match[3].trim(),
    }
  }

  for (const line of lines) {
    const heading = parseHeading(line)

    if (!heading) {
      buffer.push(line)
      continue
    }

    flushBuffer()

    if (heading.level === 1) {
      section.id = heading.id
      section.title = heading.title
      currentItem = null
      currentChild = null
      continue
    }

    if (heading.level === 3) {
      currentItem = {
        id: heading.id,
        title: heading.title,
        content: "",
      }
      section.items.push(currentItem)
      currentChild = null
      continue
    }

    if (heading.level === 4) {
      if (!currentItem) {
        throw new Error(`Child heading "${heading.title}" appears before any parent item`)
      }

      if (!currentItem.children) {
        currentItem.children = []
      }

      currentChild = {
        id: heading.id,
        title: heading.title,
        content: "",
      }
      currentItem.children.push(currentChild)
    }
  }

  flushBuffer()

  if (!section.id || !section.title) {
    throw new Error("Section markdown is missing a level-1 heading with an id")
  }

  return section
}
