'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { searchPosts } from '@/lib/wordpress-api';
import { WordPressPost } from '@/types/wordpress';

interface LiveSearchProps {
  className?: string;
}

interface SearchResult extends WordPressPost {
  highlightedTitle?: string;
  highlightedExcerpt?: string;
}

export default function LiveSearch({ className = '' }: LiveSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const highlightText = useCallback((text: string, searchTerm: string): string => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-900 px-1 rounded">$1</mark>');
  }, []);

  const performSearch = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const searchResults = await searchPosts(searchQuery, 1, 5);
      
      // Add highlighting to search results
      const highlightedResults = searchResults.map(post => ({
        ...post,
        highlightedTitle: highlightText(post.title.rendered, searchQuery),
        highlightedExcerpt: highlightText(post.excerpt.rendered.replace(/<[^>]*>/g, ''), searchQuery)
      }));
      
      setResults(highlightedResults);
      setIsOpen(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, [highlightText]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query.trim());
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to blog page with search parameter
      window.location.href = `/blog?search=${encodeURIComponent(query.trim())}`;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Cari artikel..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
          
          {/* Clear button */}
          {query && !isLoading && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Search button */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ditemukan {results.length} artikel untuk &ldquo;{query}&rdquo;
                </p>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {results.map((post) => (
                  <Link
                    key={post.id}
                    href={`/${post.slug}`}
                    className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="space-y-2">
                      <h4 
                        className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 text-sm"
                        dangerouslySetInnerHTML={{ __html: post.highlightedTitle || post.title.rendered }}
                      />
                      <p 
                        className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.highlightedExcerpt || post.excerpt.rendered.replace(/<[^>]*>/g, '') }}
                      />
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {new Date(post.date).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {results.length >= 5 && (
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`/blog?search=${encodeURIComponent(query)}`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Lihat semua hasil pencarian →
                  </Link>
                </div>
              )}
            </>
          ) : query.trim().length >= 2 && !isLoading ? (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tidak ditemukan artikel untuk &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Coba kata kunci yang berbeda
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
} 