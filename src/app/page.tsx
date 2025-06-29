import Link from 'next/link';
import { getAllPosts } from '@/lib/wordpress-api';
import { WordPressPost } from '@/types/wordpress';
import ClientsCarousel from '@/components/ClientsCarousel';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getHomepageData } from '@/lib/wordpress-api';

// Aggressive caching for homepage
export const revalidate = 300; // 5 minutes ISR

export default async function HomePage() {
  // Use parallel data fetching for optimal TTFB
  const { posts, popularPosts } = await getHomepageData();

  // Comprehensive Schema.org markup for WordPress Maintenance Services
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JasaKami.ID - WordPress Maintenance Services",
    "alternateName": "JasaKami.ID",
    "url": "https://jasakami.id",
    "logo": "https://jasakami.id/logo.png",
    "description": "Spesialis layanan pemeliharaan WordPress profesional: migrasi aman, pembersihan malware, setup VPS, dan pengelolaan server untuk performa website yang optimal.",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-812-3456-7890",
      "contactType": "customer service",
      "availableLanguage": ["Indonesian", "English"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressRegion": "Jakarta",
      "addressLocality": "Jakarta"
    },
    "sameAs": [
      "https://facebook.com/jasakami.id",
      "https://twitter.com/jasakami_id",
      "https://linkedin.com/company/jasakami-id"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "WordPress Maintenance Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jasa Migrasi WordPress",
            "description": "Pindahkan website WordPress Anda dengan aman ke hosting baru. Zero downtime, data lengkap, dan konfigurasi otomatis dengan tim profesional.",
            "provider": {
              "@type": "Organization",
              "name": "JasaKami.ID"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jasa Remove Malware",
            "description": "Pembersihan menyeluruh virus, malware, dan file berbahaya dari website WordPress Anda. Pulihkan keamanan dan kepercayaan pengunjung.",
            "provider": {
              "@type": "Organization",
              "name": "JasaKami.ID"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jasa Setup VPS",
            "description": "Konfigurasi VPS profesional untuk performa maksimal. Instalasi server, security hardening, dan monitoring otomatis untuk website Anda.",
            "provider": {
              "@type": "Organization",
              "name": "JasaKami.ID"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jasa Manage VPS",
            "description": "Pengelolaan VPS profesional 24/7. Maintenance, update keamanan, backup otomatis, dan monitoring real-time untuk stabilitas server Anda.",
            "provider": {
              "@type": "Organization",
              "name": "JasaKami.ID"
            }
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "JasaKami.ID - WordPress Maintenance Services",
    "url": "https://jasakami.id",
    "description": "Spesialis layanan pemeliharaan WordPress profesional di Indonesia",
    "inLanguage": "id-ID",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://jasakami.id/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "JasaKami.ID",
    "image": "https://jasakami.id/logo.png",
    "description": "Spesialis maintenance WordPress: migrasi, malware removal, VPS setup & management",
    "url": "https://jasakami.id",
    "telephone": "+62-812-3456-7890",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressRegion": "Jakarta"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "serviceType": "WordPress Maintenance Services",
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "WordPress Maintenance Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "WordPress Migration Service",
            "serviceType": "Website Migration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Malware Removal Service",
            "serviceType": "Website Security"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "VPS Setup Service",
            "serviceType": "Server Configuration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Managed VPS Service",
            "serviceType": "Server Management"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "100",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Jasa Maintenance
              </span>
              <br />
              <span className="text-white">
                WordPress Terpercaya
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Spesialis pemeliharaan WordPress profesional: migrasi aman, pembersihan malware, 
              setup VPS, dan pengelolaan server 24/7 untuk performa optimal website Anda.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/blog"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Mulai Konsultasi Gratis
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 border-2 border-blue-300 text-blue-100 hover:bg-blue-600 hover:border-blue-600 font-semibold rounded-lg transition-all duration-300"
              >
                Lihat Portfolio
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12">
              <p className="text-blue-200 text-sm mb-4">Dipercaya oleh 500+ website di Indonesia</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-2xl font-bold">★★★★★</div>
                <div className="text-sm">99.9% Uptime</div>
                <div className="text-sm">24/7 Support</div>
                <div className="text-sm">500+ Klien</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-300 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Layanan Profesional Kami</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Solusi lengkap untuk menjaga website WordPress Anda tetap aman, cepat, dan handal.
            </p>
          </div>
          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* WordPress Migration Service */}
            <div className="service-card bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300">
              <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Jasa Migrasi WordPress</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Pindahkan website WordPress Anda dengan aman ke hosting baru. Zero downtime, data lengkap, dan konfigurasi otomatis.
              </p>
              <Link href="/blog" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center">
                Pelajari Lebih Lanjut
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Malware Removal Service */}
            <div className="service-card bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300">
              <div className="h-14 w-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Jasa Remove Malware</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Pembersihan menyeluruh virus, malware, dan file berbahaya dari website WordPress Anda. Pulihkan keamanan dan kepercayaan pengunjung.
              </p>
              <Link href="/blog" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center">
                Pelajari Lebih Lanjut
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* VPS Setup Service */}
            <div className="service-card bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300">
              <div className="h-14 w-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Jasa Setup VPS</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Konfigurasi VPS profesional untuk performa maksimal. Instalasi server, security hardening, dan monitoring otomatis untuk website Anda.
              </p>
              <Link href="/blog" className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 inline-flex items-center">
                Pelajari Lebih Lanjut
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* VPS Management Service */}
            <div className="service-card bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300">
              <div className="h-14 w-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Jasa Manage VPS</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Pengelolaan VPS profesional 24/7. Maintenance, update keamanan, backup otomatis, dan monitoring real-time untuk stabilitas server Anda.
              </p>
              <Link href="/blog" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center">
                Pelajari Lebih Lanjut
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Trust Section */}
      <ClientsCarousel />

      {/* Newsletter Signup Section */}
      <section className="bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Tingkatkan Performa Website Anda
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Dapatkan tips, trik, dan update terbaru seputar WordPress langsung di email Anda.
          </p>
          <div className="mt-8 max-w-lg mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
    </>
  );
} 