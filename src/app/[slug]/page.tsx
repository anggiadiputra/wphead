import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs, getAllCategories, getAllTags, getAllPosts } from '@/lib/wordpress-api';
import { WordPressPost, WordPressCategory, WordPressTag } from '@/types/wordpress';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import TableOfContents from '@/components/TableOfContents';
import LiveSearch from '@/components/LiveSearch';
import RelatedPosts from '@/components/RelatedPosts';
import SocialShare from '@/components/SocialShare';
import PostViews from '@/components/PostViews';
import NewsletterSignup from '@/components/NewsletterSignup';
import PopularPosts from '@/components/PopularPosts';
import { 
  generateBreadcrumbSchema, 
  generateArticleSchema, 
  generateOrganizationSchema, 
  generateWebPageSchema 
} from '@/lib/schema-generator';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post || !post.title || !post.excerpt) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const plainTitle = post.title?.rendered ? post.title.rendered.replace(/<[^>]*>/g, '') : 'Untitled Post';
  const plainExcerpt = post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>/g, '') : `Read ${plainTitle} on our blog`;

  return {
    title: `${plainTitle} | Headless WordPress Blog`,
    description: plainExcerpt || `Read ${plainTitle} on our blog`,
    openGraph: {
      title: plainTitle,
      description: plainExcerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      url: `/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: plainTitle,
      description: plainExcerpt,
    },
    alternates: {
      canonical: `/${post.slug}`,
    },
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  
  // Handle special case: redirect 'blog' slug to proper blog page
  if (resolvedParams.slug === 'blog') {
    redirect('/blog');
  }

  let post: WordPressPost | null = null;
  let allCategories: WordPressCategory[] = [];
  let allTags: WordPressTag[] = [];
  let featuredPosts: WordPressPost[] = [];
  let error: string | null = null;

  try {
    [post, allCategories, allTags, featuredPosts] = await Promise.all([
      getPostBySlug(resolvedParams.slug),
      getAllCategories(),
      getAllTags(),
      getAllPosts(1, 6) // Get featured posts for sidebar
    ]);
  } catch (err) {
    console.error('Error fetching post:', err);
    error = 'Failed to load post content';
  }

  if (!post || !post.title || !post.title.rendered || !post.excerpt || !post.excerpt.rendered) {
    notFound();
  }

  const postCategories = allCategories.filter(cat => 
    post?._embedded?.['wp:term']?.some((term: any) => 
      term.some((t: any) => t.taxonomy === 'category' && t.id === cat.id)
    )
  );
  
  const postTags = allTags.filter(tag => 
    post?._embedded?.['wp:term']?.some((term: any) => 
      term.some((t: any) => t.taxonomy === 'post_tag' && t.id === tag.id)
    )
  );

  // Function to get featured image URL
  function getFeaturedImageUrl(post: WordPressPost): string | null {
    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'].length > 0) {
      const featuredMedia = post._embedded['wp:featuredmedia'][0];
      if (featuredMedia.media_details && featuredMedia.media_details.sizes) {
        const sizes = featuredMedia.media_details.sizes;
        if (sizes.large) {
          return sizes.large.source_url;
        } else if (sizes.medium_large) {
          return sizes.medium_large.source_url;
        } else if (sizes.medium) {
          return sizes.medium.source_url;
        }
      }
      return featuredMedia.source_url || null;
    }
    return null;
  }

  // Filter featured posts to exclude current post
  const sidebarFeaturedPosts = featuredPosts.filter(p => p.id !== post?.id);
  const featuredImageUrl = getFeaturedImageUrl(post);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Dynamic JSON-LD Schema - Automatically adapts to any domain */}
            
            {/* Breadcrumb Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateBreadcrumbSchema({
                  post,
                  postCategories,
                  postTags,
                  featuredImageUrl
                }))
              }}
            />

            {/* Article Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateArticleSchema({
                  post,
                  postCategories,
                  postTags,
                  featuredImageUrl
                }))
              }}
            />

            {/* Organization Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateOrganizationSchema())
              }}
            />

            {/* WebPage Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateWebPageSchema({
                  post,
                  postCategories,
                  postTags,
                  featuredImageUrl
                }))
              }}
            />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                {postCategories.length > 0 ? (
                  <>
                    <li className="flex items-center">
                      <Link 
                        href={`/category/${postCategories[0].slug}`} 
                        className="hover:text-foreground transition-colors"
                      >
                        <span dangerouslySetInnerHTML={{ __html: postCategories[0].name }} />
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center">
                      <Link href="/blog" className="hover:text-foreground transition-colors">
                        Blog
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </li>
                  </>
                )}
                <li className="text-foreground font-medium break-words">
                  <span dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled Post' }} />
                </li>
              </ol>
            </nav>

            {/* Article Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Article Header */}
              <header className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-700">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                  <span dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled Post' }} />
                </h1>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 text-muted-foreground">
                  <div>
                    {post.modified !== post.date ? (
                      <time dateTime={post.modified} className="text-sm">
                        Updated{' '}
                        {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'UTC'
                        }).format(new Date(post.modified))}
                      </time>
                    ) : (
                      <time dateTime={post.date} className="text-sm">
                        Published on{' '}
                        {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'UTC'
                        }).format(new Date(post.date))}
                      </time>
                    )}
                  </div>
                  <div className="ml-auto">
                    <PostViews post={post} trackView={true} />
                  </div>
                </div>
              </header>

              {/* Table of Contents */}
              <div className="px-6 sm:px-8 py-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <TableOfContents 
                  content={post.content?.rendered || ''} 
                  postTitle={post.title?.rendered || 'Untitled Post'}
                />
              </div>
              
              {/* Article Content */}
              <article className="px-6 sm:px-8 py-8" data-content="article">
                {featuredImageUrl && (
                  <div className="mb-8">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={featuredImageUrl}
                        alt={(post.title?.rendered || 'Untitled Post').replace(/<[^>]*>/g, '')}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                        priority
                      />
                    </div>
                  </div>
                )}
                {post.blocks && post.blocks.length > 0 && post.blocks.some(block => block.blockName !== null) ? (
                  <BlockRenderer 
                    blocks={post.blocks} 
                    className="prose prose-lg prose-gray max-w-none"
                  />
                ) : (
                  <div className="prose prose-lg prose-gray max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }} />
                  </div>
                )}
              </article>

              {/* Article Footer */}
              <footer className="border-t border-gray-200 dark:border-gray-700 px-6 sm:px-8 py-6 bg-gray-50 dark:bg-gray-700">
                <div className="flex flex-col space-y-6">
                  {/* Tags Section */}
                  {postTags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-muted-foreground font-medium">Tags:</span>
                      <div className="flex flex-wrap gap-2">
                        {postTags.map((tag) => (
                          <Link
                            key={tag.id}
                            href={`/tag/${tag.slug}`}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full transition-colors"
                          >
                            #<span dangerouslySetInnerHTML={{ __html: tag.name }} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories Section */}
                  {postCategories.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-muted-foreground font-medium">Categories:</span>
                      <div className="flex flex-wrap gap-2">
                        {postCategories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full transition-colors"
                          >
                            <span dangerouslySetInnerHTML={{ __html: category.name }} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Social Share Section */}
                  <div className="pt-6 border-t border-gray-300">
                    <SocialShare 
                      post={post}
                      url={`${process.env.NEXT_PUBLIC_SITE_URL}/${post.slug}`}
                      layout="horizontal"
                      showLabels={true}
                      showCopyLink={true}
                    />
                  </div>
                </div>
              </footer>
            </div>

            {/* Author Profile Section */}
            <section className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl p-8 mt-8 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">JK</span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">JasaKami.ID Team</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">WordPress Expert</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-2xl">
                      Tim ahli WordPress dengan pengalaman 5+ tahun dalam pengembangan, migrasi, keamanan, 
                      dan optimasi website WordPress. Kami menyediakan solusi lengkap untuk semua kebutuhan WordPress Anda.
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-4 mt-4">
                    <a 
                      href={process.env.NEXT_PUBLIC_SITE_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </a>
                    <a 
                      href={process.env.NEXT_PUBLIC_TWITTER_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a 
                      href={process.env.NEXT_PUBLIC_LINKEDIN_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </a>
                  </div>


                </div>
              </div>
            </section>

            {/* Related Posts Section */}
            <RelatedPosts 
              currentPost={post}
              postCategories={postCategories}
              postTags={postTags}
              maxResults={6}
              showMatchReason={true}
              className="mt-12"
            />
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {/* Search Box */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg">Cari Artikel</h3>
                <LiveSearch />
              </div>

              {/* Newsletter Signup */}
              <NewsletterSignup variant="sidebar" />

              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg">Kategori</h3>
                <div className="space-y-2">
                  {allCategories.map(category => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.slug}`}
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        postCategories.some(pc => pc.id === category.id)
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      <span dangerouslySetInnerHTML={{ __html: category.name }} />
                      {category.count && (
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          ({category.count})
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg">Tag Populer</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 20).map(tag => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${tag.slug}`}
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        postTags.some(pt => pt.id === tag.id)
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span dangerouslySetInnerHTML={{ __html: tag.name }} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Articles */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg">Artikel Populer</h3>
                <div className="space-y-4">
                  {sidebarFeaturedPosts.slice(0, 5).map((featuredPost, index) => {
                    const featuredImageUrl = getFeaturedImageUrl(featuredPost);
                    return (
                      <article key={featuredPost.id} className="group">
                        <Link href={`/${featuredPost.slug}`} className="block">
                          <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden relative">
                              {featuredImageUrl ? (
                                <Image
                                  src={featuredImageUrl}
                                  alt={featuredPost.title.rendered}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                <span dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }} />
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(featuredPost.date).toLocaleDateString('id-ID', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
} 