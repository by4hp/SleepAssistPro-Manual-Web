---
name: md-to-manual-page
description: 把 Markdown 格式的手册文稿整理成当前 SleepAssistPro 手册网页想要的页面结构时使用。适用于把章节文稿转成 `lib/docs-data.ts` 的 section、item、children 结构，整理步骤、配图和目录层级，并顺手优化为更自然的用户手册页面文案。
---

# Markdown To Manual Page

## Overview

Use this skill when the source material is a Markdown draft and the target is the current SleepAssistPro manual web page structure.

The goal is not just to paste Markdown into the site.
The goal is to reshape the manuscript into the page model the project already uses:

- chapter overview
- second-level page items
- third-level child items for TOC and page subsections
- short user-facing copy
- steps and screenshots that stay aligned

Default target file: `lib/docs-data.ts`.

## Read This When Needed

- For concrete Markdown-to-page mapping patterns: [references/mapping-examples.md](references/mapping-examples.md)

Open the reference when the manuscript is already written and the main question is how to split it into chapter intro, `items`, and `children`.

## Use This Skill When

- The user gives a Markdown draft and wants it turned into the current manual web page
- The user wants a chapter or section split into page items and sub-items
- The user wants page-level copy polished while preserving the confirmed flow
- The user wants the right-side directory or mobile section list to reflect the manuscript structure

## Do Not Use This Skill When

- The task is to design a brand new visual system or page shell
- The task is to build a standalone landing page unrelated to the current manual site
- The task is mainly screenshot moving, renaming, or path rewrites

## Target Structure

Map the manuscript into the project's existing content model:

- `DocSection`: chapter
- `items`: second-level pages inside the chapter
- `children`: third-level sub-pages inside one page

Prefer `children` over ad hoc runtime parsing when the user wants subsections to appear in the directory.

Do not invent a new content layer if `item.children` already solves the problem.

## Workflow

### 1. Read the manuscript as structure first

Before rewriting, identify:

- chapter goal
- second-level sections
- places where a second-level section actually contains multiple user tasks
- ordered steps
- screenshots and which step each screenshot belongs to

If the manuscript is flat but clearly contains multiple subflows, split those subflows into `children`.

### 2. Map Markdown to page hierarchy

Use these defaults:

- chapter intro paragraph -> `DocSection.description`
- `##` level content -> `items`
- `###` level content or clearly separate subflows -> `children`
- numbered Markdown steps -> numbered steps in each page or child page
- image lines -> keep next to the step they support

See [references/mapping-examples.md](references/mapping-examples.md) for concrete before/after examples.

If one `item` has several internal mini-sections and the user expects them in TOC, convert them into `children` instead of leaving them as bold inline headings.

### 3. Rewrite for page readability

For each `item` or `child`:

- start with one short overview sentence
- say what the user can do here
- keep one sentence to one action
- keep visible UI labels in English if that is what the user sees
- remove internal product language

Good overview pattern:

- `这一节会带您...`
- `这一页会带您...`

Avoid stiff over-explaining, taxonomy wording, and repeated framing.

### 4. Keep steps and images aligned

- Do not change confirmed step order unless the user explicitly asks
- Do not change screenshot order casually
- Keep each screenshot close to the step it supports
- If a section is split into `children`, each child starts its own numbering from `1`

### 5. Preserve the project's rendering model

The current manual site already knows how to render:

- section overview
- item page
- child page TOC
- inline images
- ordered lists

So the preferred change is usually content restructuring in `lib/docs-data.ts`, not new rendering logic.

Only change React rendering when the existing structure truly cannot express the manuscript.

## Page Writing Rules

- Chinese by default
- Calm, restrained, reliable tone
- Write for end users, not for PMs or engineers
- Prefer short paragraphs
- Avoid repeating the same explanation in both overview and steps
- If a child page already makes the action clear, keep the parent `item.content` short

## Review Checklist

Before finishing:

- Does the chapter intro sound like a human-written page overview?
- Are second-level sections and third-level subsections split correctly?
- Are TOC-worthy subsections represented as `children`?
- Does each child page restart numbering at `1`?
- Are screenshots still paired with the correct step?
- Did you avoid inventing a new runtime structure when content restructuring was enough?
