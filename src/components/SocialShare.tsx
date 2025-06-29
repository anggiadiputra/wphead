'use client';

import { useState } from 'react';
import type { WordPressPost } from '@/types/wordpress';

interface SocialShareProps {
  post: WordPressPost;
  url: string;
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'compact';
  showLabels?: boolean;
  showCopyLink?: boolean;
}

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  shareUrl: (url: string, title: string, excerpt: string) => string;
  color: string;
  hoverColor: string;
}

export default function SocialShare({
  post,
  url,
  className = '',
  layout = 'horizontal',
  showLabels = true,
  showCopyLink = true
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const title = post.title?.rendered?.replace(/<[^>]*>/g, '') || '';
  const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160) || '';

  const platforms: SocialPlatform[] = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      shareUrl: (url, title) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      shareUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'text-gray-900',
      hoverColor: 'hover:bg-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      shareUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'text-blue-700',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      shareUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      color: 'text-green-600',
      hoverColor: 'hover:bg-green-600'
    },
    {
      name: 'Telegram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      shareUrl: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'text-blue-500',
      hoverColor: 'hover:bg-blue-500'
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      shareUrl: (url, title, excerpt) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${excerpt}\n\nBaca selengkapnya: ${url}`)}`,
      color: 'text-gray-600',
      hoverColor: 'hover:bg-gray-600'
    }
  ];

  const handleShare = (platform: SocialPlatform) => {
    const shareUrl = platform.shareUrl(url, title, excerpt);
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Responsive layout: vertical on mobile, horizontal on desktop
  const responsiveLayout = 'flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3';
  const responsiveButton = 'w-full sm:w-auto flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200';

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          Bagikan Artikel Ini
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Bantu teman-teman Anda menemukan artikel yang bermanfaat ini
        </p>
      </div>

      {/* Social Share Buttons */}
      <div className={responsiveLayout}>
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform)}
            className={`
              ${responsiveButton}
              ${platform.color}
              border-gray-200 dark:border-gray-700
              group
              ${platform.name === 'Facebook' ? 'hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white' : ''}
              ${platform.name === 'Twitter' ? 'hover:bg-sky-500 dark:hover:bg-sky-400 hover:text-white' : ''}
              ${platform.name === 'LinkedIn' ? 'hover:bg-blue-700 dark:hover:bg-blue-500 hover:text-white' : ''}
              ${platform.name === 'WhatsApp' ? 'hover:bg-green-500 dark:hover:bg-green-400 hover:text-white' : ''}
              ${platform.name === 'Telegram' ? 'hover:bg-blue-400 dark:hover:bg-blue-300 hover:text-white' : ''}
              ${platform.name === 'Email' ? 'hover:bg-gray-600 dark:hover:bg-gray-400 hover:text-white dark:hover:text-gray-900' : ''}
              hover:border-transparent hover:shadow-lg hover:scale-105 dark:bg-gray-800
            `}
            title={`Bagikan ke ${platform.name}`}
          >
            <span className="flex-shrink-0">
              {platform.icon}
            </span>
            {showLabels && (
              <span className="font-medium text-sm">
                {platform.name}
              </span>
            )}
          </button>
        ))}

        {/* Copy Link Button */}
        {showCopyLink && (
          <button
            onClick={handleCopyLink}
            className={`
              ${responsiveButton}
              ${copied ? 'text-green-600 border-green-300 bg-green-50' : 'text-blue-600 border-gray-200 dark:border-gray-700'}
              hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white hover:border-transparent
              hover:shadow-lg hover:scale-105 dark:bg-gray-800
              group
            `}
            title="Salin link artikel"
          >
            <span className="flex-shrink-0">
              {copied ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </span>
            {showLabels && (
              <span className="font-medium text-sm">
                {copied ? 'Link Disalin!' : 'Salin Link'}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Share Stats (Optional Enhancement) */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          💡 Tip: Bagikan artikel ini untuk membantu lebih banyak orang mendapatkan informasi bermanfaat
        </p>
      </div>
    </div>
  );
} 