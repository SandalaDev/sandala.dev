# Qwen Analysis of sandala-dev Project

## Project Overview
This is a **Payload CMS website template** built with Next.js, using PostgreSQL as the database and S3 for media storage. It's a full-featured content management system with a Next.js frontend that serves as both the admin panel and the public-facing website.

## Key Technologies & Architecture
- **Framework**: Next.js 15.4.4 with App Router
- **CMS**: Payload CMS 3.58.0
- **Database**: PostgreSQL (with `@payloadcms/db-postgres`)
- **Media Storage**: S3-compatible storage (using Cloudflare R2)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Rich Text**: Lexical editor
- **Deployment**: Docker-ready with standalone output

## Project Structure
- `/src/app/(frontend)` - Frontend Next.js pages with layout builder functionality
- `/src/app/(payload)` - Admin panel and API routes
- `/src/collections` - Data models (Pages, Posts, Media, Users, Categories)
- `/src/blocks` - Reusable content blocks for the layout builder
- `/src/heros` - Hero section components
- `/src/components` - React components
- `/src/access` - Access control functions
- `/src/hooks` - Payload hooks for revalidation and business logic

## Core Features
1. **Content Management**:
   - Pages and Posts with rich text editing (Lexical)
   - Media library with image processing
   - Category taxonomy
   - User authentication system

2. **Layout Builder**:
   - Drag-and-drop block-based content creation
   - Pre-built blocks (Hero, Content, Media, Call-to-Action, Archive)
   - Customizable page layouts

3. **Advanced Features**:
   - Draft preview and live preview
   - SEO management with meta tags and descriptions
   - On-demand revalidation for fresh content
   - Redirect management system
   - Job queue for scheduled publishing
   - Search functionality

4. **Frontend Features**:
   - Responsive design with mobile/tablet/desktop previews
   - Dark mode support
   - Dynamic routing for pages and posts
   - Admin bar for content creators

## Configuration Highlights
- Uses environment variables for sensitive data (database URL, S3 credentials, SMTP settings)
- Email system configured with Brevo SMTP
- Media served through Cloudflare R2 via a custom worker proxy
- Custom domain and URL handling for both local and production environments

This is a production-ready, enterprise-grade website template with a comprehensive content management solution. It's designed for websites, blogs, or portfolios that require a full editorial workflow with publishing capabilities.