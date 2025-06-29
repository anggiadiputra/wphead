import { 
  getAllPosts, 
  getAllCategories, 
  getAllTags,
  searchPosts,
  getCategoryBySlug,
  getPostsByCategory,
  getPostsByTag,
  getTagBySlug
} from '@/lib/wordpress-api';
import { WordPressPost, WordPressCategory, WordPressTag } from '@/types/wordpress';
import Link from 'next/link';
import { serverCache } from '@/lib/server-cache';
import { SinglePostSkeleton } from '@/components/BlogPostSkeleton';
import PopularPosts from '@/components/PopularPosts';
import LiveSearch from '@/components/LiveSearch';
import NewsletterSignup from '@/components/NewsletterSignup';
import { PostViewCount } from '@/components/PostViews';
import { Suspense } from 'react';

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Function to get featured image URL from post
function getFeaturedImageUrl(post: WordPressPost): string | null {
  if (post.featured_media && post._embedded?.['wp:featuredmedia']?.[0]) {
    const media = post._embedded['wp:featuredmedia'][0];
    return media.media_details?.sizes?.large?.source_url || 
           media.media_details?.sizes?.medium_large?.source_url || 
           media.source_url;
  }
  return null;
}

// Optimize blog data fetching with server cache
async function getBlogPageData(): Promise<{
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];
}> {
  const cacheKey = 'blog-page-data';
  
  // Try server cache first for fastest TTFB
  const cached = serverCache.get<{
    posts: WordPressPost[];
    categories: WordPressCategory[];
    tags: WordPressTag[];
  }>(cacheKey);
  if (cached) {
    return cached;
  }

  // Parallel fetch for optimal performance
  const [posts, categories, tags] = await Promise.all([
    getAllPosts(1, 50),
    getAllCategories(),
    getAllTags()
  ]);

  const blogData = { posts, categories, tags };
  
  // Cache for 10 minutes
  serverCache.set(cacheKey, blogData, 10 * 60 * 1000);
  
  return blogData;
}

// Mark this route as dynamic because it depends on searchParams
export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Properly await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams;

  // Safely normalize searchParams values (string vs string[])
  const pageRaw = Array.isArray(resolvedSearchParams.page) ? resolvedSearchParams.page[0] : resolvedSearchParams.page;
  const currentPage = parseInt(pageRaw || '1', 10);

  const categorySlug = Array.isArray(resolvedSearchParams.category)
    ? resolvedSearchParams.category[0]
    : resolvedSearchParams.category;
  
  const tagSlug = Array.isArray(resolvedSearchParams.tag)
    ? resolvedSearchParams.tag[0]
    : resolvedSearchParams.tag;
  
  const searchQuery = Array.isArray(resolvedSearchParams.search)
    ? resolvedSearchParams.search[0]
    : resolvedSearchParams.search;
  
  const postsPerPage = 8;

  let posts: WordPressPost[] = [];
  let featuredPosts: WordPressPost[] = [];
  let categories: WordPressCategory[] = [];
  let tags: WordPressTag[] = [];
  let selectedCategory: WordPressCategory | null = null;
  let selectedTag: WordPressTag | null = null;
  let error: string | null = null;

  try {
    // Fetch categories, tags, and featured posts first
    const { posts: fetchedPosts, categories: fetchedCategories, tags: fetchedTags } = await getBlogPageData();
    
    posts = fetchedPosts;
    categories = fetchedCategories;
    tags = fetchedTags;
    featuredPosts = posts.slice(0, 5);

    // Handle filtering by category, tag, or search
    if (searchQuery) {
      posts = await searchPosts(searchQuery, currentPage, postsPerPage);
    } else if (categorySlug) {
      selectedCategory = await getCategoryBySlug(categorySlug);
      if (selectedCategory) {
        posts = await getPostsByCategory(selectedCategory.id, currentPage, postsPerPage);
      } else {
        posts = await getAllPosts(currentPage, postsPerPage);
      }
    } else if (tagSlug) {
      selectedTag = await getTagBySlug(tagSlug);
      if (selectedTag) {
        posts = await getPostsByTag(selectedTag.id, currentPage, postsPerPage);
      } else {
        posts = await getAllPosts(currentPage, postsPerPage);
      }
    } else {
      posts = await getAllPosts(currentPage, postsPerPage);
    }
  } catch (err) {
    console.error('Error fetching data for blog page:', err);
    error = 'Failed to load blog content';
  }

  const hasNextPage = posts.length === postsPerPage;
  const hasPrevPage = currentPage > 1;

  // Build pagination URL with category, tag, or search filter
  const buildPaginationUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (categorySlug) params.set('category', categorySlug);
    if (tagSlug) params.set('tag', tagSlug);
    const query = params.toString();
    return `/blog${query ? `?${query}` : ''}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            {(selectedCategory || selectedTag || searchQuery) && (
              <div className="mb-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Kembali ke semua artikel
                </Link>
              </div>
            )}
            
            {/* Search Results Header */}
            {searchQuery && (
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Hasil Pencarian
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Pencarian untuk: <span className="font-medium">&ldquo;{searchQuery}&rdquo;</span>
                </p>
              </div>
            )}

            {/* Error State */}
            {error ? (
              <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-medium">Error Loading Posts</h3>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 border border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300 p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-medium">Tidak Ada Artikel</h3>
                    <p className="text-sm">
                      {searchQuery 
                        ? `Tidak ditemukan artikel untuk "${searchQuery}". Coba kata kunci yang berbeda.`
                        : 'Belum ada artikel blog yang tersedia saat ini.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Blog Posts - Original Horizontal Card Layout */}
                <div className="space-y-6">
                  {posts.map((post, index) => {
                    const featuredImageUrl = getFeaturedImageUrl(post);
                    return (
                      <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="flex flex-col md:flex-row">
                          {/* Featured Image - Left side */}
                          <div className="md:w-80 flex-shrink-0 p-4">
                            <div className="aspect-video md:aspect-[4/3] md:h-48 relative overflow-hidden rounded-lg">
                              {featuredImageUrl ? (
                                <img
                                  src={featuredImageUrl}
                                  alt={post.title?.rendered || 'Article Image'}
                                  className="w-full h-full object-cover"
                                  loading={index < 4 ? "eager" : "lazy"}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Content - Right side */}
                          <div className="flex-1 p-6">
                            {/* Title */}
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              <Link href={`/${post.slug}`}>
                                <span dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled Article' }} />
                              </Link>
                            </h2>

                            {/* Excerpt */}
                            <div className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                              <div dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || 'No description available' }} />
                            </div>

                            {/* Meta Info and Read More */}
                            <div className="flex items-center justify-between">
                              <PostViewCount post={post} />
                              <Link
                                href={`/${post.slug}`}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1"
                              >
                                Baca Selengkapnya
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Pagination */}
                {(hasNextPage || hasPrevPage) && (
                  <div className="mt-12 flex justify-center items-center space-x-4">
                    {hasPrevPage && (
                      <Link
                        href={buildPaginationUrl(currentPage - 1)}
                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Sebelumnya
                      </Link>
                    )}
                    
                    <span className="px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg">
                      Halaman {currentPage}
                    </span>

                    {hasNextPage && (
                      <Link
                        href={buildPaginationUrl(currentPage + 1)}
                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Selanjutnya
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
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
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.slug}`}
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory?.id === category.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      {category.name}
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
                  {tags.slice(0, 20).map(tag => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${tag.slug}`}
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedTag?.id === tag.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <PopularPosts 
                  maxResults={5}
                  layout="vertical"
                  showImages={true}
                  showExcerpt={false}
                  showDate={true}
                  showTrending={true}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 