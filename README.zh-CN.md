# SleepAssistPro Manual Web

**中文** | [English](./README.md)

## 项目简介

这是 `SleepAssistPro` 的用户手册网站项目，基于 `Next.js` 构建。

当前站点主要用于：

- 展示中文用户手册内容
- 按章节浏览首次连接、日常使用、系统设置、账号安全和常见问题
- 结合截图说明 App 内的关键页面和操作步骤

## 本地启动

在项目目录下运行：

```bash
pnpm dev
```

启动后访问：

```text
http://localhost:3000
```

## 常用命令

```bash
pnpm dev
pnpm build
pnpm start
npx tsc --noEmit
```

## 图片资源规则

默认情况下，手册图片直接从本地 `public/manual` 目录读取，所以即使没有配置图床，本地也可以正常预览。

如果后续图片改为单独托管，可以在 `.env.local` 中配置：

```bash
NEXT_PUBLIC_MANUAL_ASSET_BASE_URL=https://your-asset-host
```

配置后，所有以 `/manual/` 开头的图片路径都会自动切到这个外部地址。

例如：

```text
/manual/chapter-04/ai-chat/ai-chat-entry-homepage-ask-me.png
```

会自动解析为：

```text
https://your-asset-host/manual/chapter-04/ai-chat/ai-chat-entry-homepage-ask-me.png
```

如果没有配置这个环境变量，项目会继续读取本地图片。

## 部署说明

项目可以直接部署到 `Vercel`。

如果线上也使用外部图片托管，请在 `Vercel` 项目环境变量中同步配置：

```bash
NEXT_PUBLIC_MANUAL_ASSET_BASE_URL
```

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
