# Mapping Examples

Use this reference when the source is already written in Markdown and the main task is to reshape it into the current manual web structure.

## Rule of thumb

- Chapter intro goes to `DocSection.description`
- `##` usually becomes one `item`
- `###` usually becomes one `child`
- If a section has multiple user tasks and should appear in TOC, split it into `children`
- Each `child` restarts numbering at `1`

## Example 1: Flat Markdown becomes one item with children

Source Markdown:

```md
## Push Notifications

这一节会带您统一调整通知方式，包括早晚提醒、同步提醒，以及通过邮箱接收睡眠报告。

### 打开通知权限

1. 在 Settings 页面点击 Push Notifications。
2. 先打开 Receive Push Notifications。

### 设置早晨提醒

1. 打开或关闭 Morning Notifications。
2. 选择提醒时间。
```

Target shape:

```ts
{
  id: "push-notifications",
  title: "5.6 Push Notifications",
  content: "这一节会带您统一调整通知方式，包括早晚提醒、同步提醒，以及通过邮箱接收睡眠报告。",
  children: [
    {
      id: "push-notification-permission",
      title: "5.6.1 打开通知权限",
      content: `1. 在 Settings 页面点击 Push Notifications。\n2. 先打开 Receive Push Notifications。`,
    },
    {
      id: "morning-notifications",
      title: "5.6.2 设置早晨提醒",
      content: `1. 打开或关闭 Morning Notifications。\n2. 选择提醒时间。`,
    },
  ],
}
```

## Example 2: Keep parent short when children carry the work

Bad:

- parent `content` repeats all child steps
- `children` repeat the same text again

Good:

- parent `content` only says what this section helps the user do
- detailed steps move into `children`

Preferred parent pattern:

```ts
content: "这一节会带您统一调整通知方式，包括早晚提醒、同步提醒，以及通过邮箱接收睡眠报告。"
```

## Example 3: Do not invent runtime parsing

If the user says:

- "这个三级标题要出现在目录里"
- "这里应该像 5.2 一样"
- "应该和之前一样变成 children"

Then the preferred fix is:

- update `lib/docs-data.ts`
- move the subsection into `item.children`

Avoid:

- parsing bold lines at runtime
- building a second TOC-only structure
- creating temporary heading extraction logic when the content model already supports `children`

## Example 4: Screenshot placement

Keep screenshots with the step they explain.

Good:

```md
1. 点击 Bed Settings。

![Bed Settings 入口](...)

2. 确认要修改的是哪一项。
```

Bad:

```md
1. 点击 Bed Settings。
2. 确认要修改的是哪一项。
3. 调整设置。

![三步都相关的图](...)
```

## Example 5: Overview sentence style

Prefer:

- `这一节会带您进入 Settings，并找到接下来要处理的项目。`
- `这一节会带您设置 Sleep Goal，让 App 更贴近您的作息习惯。`
- `这一节会带您统一调整通知方式，包括早晚提醒、同步提醒，以及通过邮箱接收睡眠报告。`

Avoid:

- `这一节帮助您管理当前床体本身的关键设置...`
- `本节主要介绍...`
- `以下内容包括...`

The preferred tone is short, direct, and user-facing.

