'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  href: string;
  label: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  {
    href: '/services',
    label: 'Layanan',
    children: [
      { href: '/services/wordpress-migration', label: 'Migrasi WordPress' },
      { href: '/services/malware-removal', label: 'Pembersihan Malware' },
      { href: '/services/vps-setup', label: 'Setup VPS' },
      { href: '/services/managed-vps', label: 'Kelola VPS' },
    ]
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button - Hidden on desktop (xl+), visible on mobile and tablet */}
      <button
        onClick={toggleMenu}
        className="xl:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 touch-manipulation"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
      >
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm mobile-menu-backdrop"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile/Tablet Menu Panel */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="
            xl:hidden fixed inset-0 z-[50] w-full
            h-[100dvh] bg-white dark:bg-gray-900 shadow-2xl
          "
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                <span className="text-primary-foreground font-bold text-sm">WP</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu</h2>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 touch-manipulation"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || 
                                (item.href !== '/' && pathname.startsWith(item.href)) ||
                                (item.href === '/' && pathname.match(/^\/[^\/]+$/) && !pathname.startsWith('/blog'));
                
                if (item.children) {
                  return (
                    <li key={item.href}>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                        className={`
                          flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 touch-manipulation
                          ${isActive 
                            ? 'text-primary bg-primary/10 border border-primary/20 shadow-sm' 
                            : 'text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-1'
                          }
                        `}
                      >
                        <span className="flex-1">{item.label}</span>
                        <svg 
                          className={`w-4 h-4 ml-2 transform transition-transform ${openDropdown === item.href ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === item.href && (
                        <div className="mt-2 pl-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`
                                block px-3 py-2 rounded-lg
                                ${pathname === child.href 
                                  ? 'text-primary bg-primary/10 font-semibold' 
                                  : 'text-foreground hover:text-primary hover:bg-accent/50'
                                }
                              `}
                              onClick={toggleMenu}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 touch-manipulation
                        ${isActive 
                          ? 'text-primary bg-primary/10 border border-primary/20 shadow-sm' 
                          : 'text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-1'
                        }
                      `}
                      onClick={toggleMenu}
                    >
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Menu Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                © 2025 WP Blog
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Desktop Navigation Component
export function DesktopNavigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Helper to open dropdown with clear
  const handleMouseEnter = (href: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(href);
  };
  // Helper to close dropdown with delay
  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 180); // 180ms delay
  };

  return (
    <nav className="hidden xl:flex items-center space-x-6 text-sm font-medium">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || 
                        (item.href !== '/' && pathname.startsWith(item.href)) ||
                        (item.href === '/' && pathname.match(/^\/[^\/]+$/) && !pathname.startsWith('/blog'));

        if (item.children) {
          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.href)}
              onMouseLeave={handleMouseLeave}
              tabIndex={0}
              onFocus={() => handleMouseEnter(item.href)}
              onBlur={handleMouseLeave}
            >
              <button
                className={`
                  inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-accent/50
                  ${isActive ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}
                `}
                aria-haspopup="true"
                aria-expanded={openDropdown === item.href}
                tabIndex={0}
                onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                onKeyDown={e => {
                  if (e.key === 'Escape') setOpenDropdown(null);
                }}
              >
                {item.label}
                <svg 
                  className="h-4 w-4 opacity-50" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === item.href && (
                <div className="absolute left-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-md border bg-popover p-1 shadow-md animate-in data-[side=bottom]:slide-in-from-top-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`
                        block rounded-sm px-3 py-2 text-sm
                        ${pathname === child.href 
                          ? 'bg-accent text-accent-foreground font-medium' 
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        }
                      `}
                      tabIndex={0}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              rounded-md px-3 py-2 hover:bg-accent/50
              ${isActive ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
} 