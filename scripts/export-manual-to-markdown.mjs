import fs from "node:fs"
import path from "node:path"
import vm from "node:vm"

const repoRoot = process.cwd()
const outputDir = path.join(repoRoot, "exports")

const languageConfigs = {
  zh: {
    sourceFile: path.join(repoRoot, "lib", "docs-data.zh.ts"),
    outputBasename: "manual.zh",
    documentTitle: "SleepAssistPro 用户手册",
    quickLinksTitle: "快速索引",
    exportedAtLabel: "导出时间",
  },
  en: {
    sourceFile: path.join(repoRoot, "lib", "docs-data.en.ts"),
    outputBasename: "manual.en",
    documentTitle: "SleepAssistPro User Manual",
    quickLinksTitle: "Quick Links",
    exportedAtLabel: "Exported At",
  },
}

const storeLogos = {
  ios: "/manual/chapter-01/app-store.png",
  android: "/manual/chapter-01/google-play.png",
}

function sanitizeModuleSource(source) {
  return source
    .replace(/^import type .*$/gm, "")
    .replace(/^import .*$/gm, "")
    .replace(/export const docsData:\s*DocSection\[\]\s*=/, "const docsData =")
    .replace(/export const quickLinks\s*=/, "const quickLinks =")
}

function loadManualModule(sourceFile) {
  const source = fs.readFileSync(sourceFile, "utf8")
  const executableSource = `${sanitizeModuleSource(source)}

module.exports = { docsData, quickLinks }
`

  const context = {
    module: { exports: {} },
    exports: {},
  }

  vm.runInNewContext(executableSource, context, {
    filename: sourceFile,
  })

  return context.module.exports
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/")
}

function resolveLocalAssetFilePath(src) {
  const decodedSrc = decodeURI(src)

  if (decodedSrc.startsWith("/manual/")) {
    return path.join(repoRoot, "public", decodedSrc.slice(1))
  }

  if (decodedSrc.startsWith("/")) {
    return path.join(repoRoot, "public", decodedSrc.slice(1))
  }

  return path.join(repoRoot, decodedSrc)
}

function getMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase()

  switch (extension) {
    case ".png":
      return "image/png"
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".svg":
      return "image/svg+xml"
    case ".webp":
      return "image/webp"
    case ".gif":
      return "image/gif"
    default:
      return "application/octet-stream"
  }
}

function toEmbeddedAssetDataUri(src) {
  const localAssetPath = resolveLocalAssetFilePath(src)
  const mimeType = getMimeType(localAssetPath)
  const base64 = fs.readFileSync(localAssetPath).toString("base64")
  return `data:${mimeType};base64,${base64}`
}

function toMarkdownAssetPath(src, outputFile, options) {
  if (!src) {
    return src
  }

  if (/^https?:\/\//.test(src)) {
    return src
  }

  if (options.embedAssets) {
    return toEmbeddedAssetDataUri(src)
  }

  const normalized = resolveLocalAssetFilePath(src)

  const relativePath = path.relative(path.dirname(outputFile), normalized)
  const posixRelativePath = toPosixPath(relativePath)

  try {
    return encodeURI(decodeURI(posixRelativePath))
  } catch {
    return encodeURI(posixRelativePath)
  }
}

function replaceInlineTokens(line) {
  return line.replace(
    /\{\{jump-link\|([^|]+)\|[^|]+\|([^}]+)\}\}/g,
    (_, label, itemId) => `[${label}](#${itemId})`
  )
}

function convertContent(content, outputFile, options) {
  const convertedLines = []
  const lines = content.split("\n")

  for (const rawLine of lines) {
    const trimmedLine = rawLine.trim()

    if (!trimmedLine) {
      convertedLines.push("")
      continue
    }

    const downloadButtonMatch = trimmedLine.match(
      /^\{\{download-button\|([^|]+)\|([^|]+)\|(.+)\}\}$/
    )
    if (downloadButtonMatch) {
      const [, platform, label, description] = downloadButtonMatch
      const logoPath = storeLogos[platform.toLowerCase()]

      convertedLines.push(`**${platform}**: ${label}`)
      if (logoPath) {
        convertedLines.push("")
        convertedLines.push(`![${platform}](${toMarkdownAssetPath(logoPath, outputFile, options)})`)
      }
      convertedLines.push("")
      convertedLines.push(description)
      continue
    }

    const imageRowMatch = trimmedLine.match(
      /^\{\{image-row\|([^|]*)\|([^|]+)\|([^|]*)\|(.+)\}\}$/
    )
    if (imageRowMatch) {
      const [, captionA, srcA, captionB, srcB] = imageRowMatch
      const pairs = [
        [captionA || "Image 1", srcA],
        [captionB || "Image 2", srcB],
      ]

      pairs.forEach(([caption, src], index) => {
        if (index > 0) {
          convertedLines.push("")
        }
        convertedLines.push(`![${caption}](${toMarkdownAssetPath(src, outputFile, options)})`)
        if (caption) {
          convertedLines.push("")
          convertedLines.push(`*${caption}*`)
        }
      })
      continue
    }

    const imageMatch = trimmedLine.match(/^!\[(.*?)\]\((.+?)\)$/)
    if (imageMatch) {
      const [, alt, src] = imageMatch
      convertedLines.push(`![${alt}](${toMarkdownAssetPath(src, outputFile, options)})`)
      continue
    }

    convertedLines.push(replaceInlineTokens(rawLine))
  }

  return convertedLines.join("\n").replace(/\n{3,}/g, "\n\n").trim()
}

function renderItem(item, outputFile, options, level = 3) {
  const headingLevel = "#".repeat(Math.min(level, 6))
  const lines = [
    `<a id="${item.id}"></a>`,
    "",
    `${headingLevel} ${item.title}`,
    "",
    convertContent(item.content, outputFile, options),
  ]

  if (item.children?.length) {
    for (const child of item.children) {
      lines.push("", renderItem(child, outputFile, options, level + 1))
    }
  }

  return lines.join("\n")
}

function buildMarkdownDocument({ docsData, quickLinks, outputFile, config, options }) {
  const lines = [
    `# ${config.documentTitle}`,
    "",
    `> ${config.exportedAtLabel}: ${new Date().toISOString()}`,
  ]

  if (quickLinks?.length) {
    lines.push("", `## ${config.quickLinksTitle}`, "")
    for (const quickLink of quickLinks) {
      lines.push(`- ${quickLink}`)
    }
  }

  for (const section of docsData) {
    lines.push("", `<a id="${section.id}"></a>`, "", `## ${section.title}`, "")

    if (section.description) {
      lines.push(section.description, "")
    }

    for (const item of section.items) {
      lines.push(renderItem(item, outputFile, options, 3), "")
    }
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`
}

function getOutputFile(config, options) {
  const suffix = options.embedAssets ? ".embedded.md" : ".md"
  return path.join(outputDir, `${config.outputBasename}${suffix}`)
}

function exportLanguage(language, options) {
  const config = languageConfigs[language]
  if (!config) {
    throw new Error(`Unsupported language: ${language}`)
  }

  const outputFile = getOutputFile(config, options)
  const { docsData, quickLinks } = loadManualModule(config.sourceFile)
  const markdown = buildMarkdownDocument({
    docsData,
    quickLinks,
    outputFile,
    config,
    options,
  })

  fs.mkdirSync(path.dirname(outputFile), { recursive: true })
  fs.writeFileSync(outputFile, markdown, "utf8")

  return outputFile
}

function main() {
  const args = process.argv.slice(2)
  const options = {
    embedAssets: args.includes("--embed-assets"),
  }
  const target = args.find((arg) => !arg.startsWith("--")) || "zh"
  const languages = target === "all" ? Object.keys(languageConfigs) : [target]

  const outputFiles = languages.map((language) => exportLanguage(language, options))

  for (const outputFile of outputFiles) {
    console.log(`Exported ${path.relative(repoRoot, outputFile)}`)
  }
}

main()
