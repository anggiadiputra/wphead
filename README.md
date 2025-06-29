# Headless WordPress Blog

A modern, fast, and SEO-optimized headless WordPress website built with Next.js, Tailwind CSS, and wp-block-to-html. This project demonstrates how to create a performant blog frontend that connects to a WordPress backend while providing superior user experience.

## 🚀 Features

- **Headless WordPress**: Uses WordPress as a CMS while providing a modern frontend
- **Next.js 14+**: Built with the latest Next.js features including App Router and Server Components
- **wp-block-to-html**: Converts WordPress blocks to HTML with Tailwind CSS integration
- **Static Site Generation**: Pre-built pages for optimal performance with ISR support
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **SEO Optimized**: Meta tags, structured data, and sitemap generation
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS v3 with @tailwindcss/typography
- **Content Management**: WordPress (Headless)
- **Block Processing**: wp-block-to-html v1.0.0
- **Language**: TypeScript
- **Deployment**: Vercel/Netlify ready

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- A WordPress site with the REST API enabled
- Access to your WordPress site's API endpoint

## ⚡ Quick Start

1. **Clone and install dependencies:**

```bash
git clone <your-repo-url>
cd wphead
npm install
```

2. **Configure environment variables:**

Create a `.env.local` file in the root directory:

```bash
# WordPress API Configuration
WORDPRESS_API_URL=https://wp.indexof.id/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.indexof.id/wp-json/wp/v2

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Headless WordPress Blog
NEXT_PUBLIC_SITE_DESCRIPTION=A modern, fast, and SEO-optimized headless WordPress website

# Performance Configuration
REVALIDATE_TIME=3600
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── blog/            # Blog listing and post pages
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Homepage
├── components/          # Reusable React components
│   └── blocks/         # WordPress block rendering components
├── config/             # Configuration files
├── lib/                # Utility functions and API services
│   └── wordpress-api.ts # WordPress REST API integration
└── types/              # TypeScript type definitions
    └── wordpress.ts    # WordPress API types
```

## 🔧 Configuration

### WordPress Setup

Your WordPress site needs to have:

1. **REST API enabled** (default in WordPress 4.7+)
2. **CORS configured** if running on a different domain
3. **Gutenberg blocks** for content creation

### wp-block-to-html Configuration

The project uses wp-block-to-html v1.0.0 with the following configuration:

```typescript
const config = {
  cssFramework: 'tailwind',
  hydration: {
    strategy: 'viewport',
    rootSelector: '#content',
  },
  ssrOptions: {
    enabled: true,
    optimizationLevel: 'maximum',
    lazyLoadMedia: true,
  },
};
```

### Next.js Configuration

Key configurations in `next.config.js`:

- Image optimization for WordPress media
- Bundle optimization for wp-block-to-html
- Remote patterns for WordPress images

## 📝 WordPress Block Support

The application supports all WordPress core blocks:

- ✅ Paragraph blocks
- ✅ Heading blocks (H1-H6)
- ✅ Image blocks with Next.js Image optimization
- ✅ List blocks (ordered/unordered)
- ✅ Quote blocks
- ✅ Code blocks
- ✅ Gallery blocks
- ✅ Embed blocks
- ✅ Column layouts
- ✅ Button blocks

Unsupported blocks fall back gracefully with error boundaries.

## 🎨 Styling

The project uses Tailwind CSS with:

- Custom WordPress block styles
- Typography plugin for prose content
- Dark/light mode support (variables ready)
- Responsive breakpoints
- Accessibility-focused design tokens

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Configure environment variables
4. Set up continuous deployment

## 📈 Performance

The application is optimized for:

- **Core Web Vitals**: < 2.5s LCP, < 100ms FID, < 0.1 CLS
- **Lighthouse Scores**: 90+ in all categories
- **Bundle Size**: Optimized with Next.js code splitting
- **wp-block-to-html**: 947 blocks/ms processing speed

## 🔍 SEO Features

- Dynamic meta tags for each post
- Structured data (JSON-LD) for articles
- XML sitemap generation
- Open Graph and Twitter Card support
- Canonical URLs
- Social sharing integration

## 🧪 Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript checks
```

### WordPress API Testing

To test your WordPress API connection:

1. Visit `https://your-wordpress-site.com/wp-json/wp/v2/posts`
2. Ensure CORS is properly configured
3. Check that posts are returned in JSON format

### Block Rendering Testing

The BlockRenderer component includes:
- Error boundaries for failed block conversions
- Fallback rendering for unsupported blocks
- Console logging for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [wp-block-to-html Documentation](https://docs-block.madebyaris.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WordPress REST API Documentation](https://developer.wordpress.org/rest-api/)

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Configure your WordPress site to allow requests from your Next.js domain
2. **wp-block-to-html Errors**: Check that block data structure is valid
3. **Build Errors**: Ensure all environment variables are set correctly
4. **Performance Issues**: Check WordPress API response times and optimize if needed

### Getting Help

- Check the GitHub issues for common problems
- Review the WordPress REST API logs
- Use browser developer tools to debug API calls

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WordPress](https://wordpress.org/) for the excellent CMS
- [Next.js](https://nextjs.org/) for the amazing React framework
- [wp-block-to-html](https://docs-block.madebyaris.com/) for block conversion
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

Built with ❤️ using headless WordPress, Next.js, and modern web technologies. 