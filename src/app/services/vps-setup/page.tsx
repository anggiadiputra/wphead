import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jasa Setup VPS WordPress | JasaKami.ID',
  description: 'Layanan konfigurasi VPS khusus WordPress. Optimalkan performa website dengan setup server yang tepat dan aman.',
};

export default function VpsSetupPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Jasa Setup VPS WordPress
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Tingkatkan performa website WordPress Anda dengan konfigurasi VPS yang optimal. 
          Kami siap membantu setup server sesuai kebutuhan website Anda.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: 'Optimasi Server',
            description: 'Setup server yang dioptimalkan khusus untuk WordPress.',
            icon: '⚡'
          },
          {
            title: 'Keamanan Server',
            description: 'Konfigurasi keamanan server tingkat tinggi.',
            icon: '🔒'
          },
          {
            title: 'Setup Cache',
            description: 'Konfigurasi cache untuk performa maksimal.',
            icon: '🚀'
          },
          {
            title: 'Instalasi SSL',
            description: 'Pemasangan SSL dan pengamanan koneksi HTTPS.',
            icon: '🔐'
          },
          {
            title: 'Optimasi Database',
            description: 'Konfigurasi database untuk performa terbaik.',
            icon: '📊'
          },
          {
            title: 'Setup Monitoring',
            description: 'Pemasangan sistem monitoring dan notifikasi.',
            icon: '📈'
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Server Stack */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Teknologi Server Terbaik
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Web Server',
              items: ['Nginx', 'Apache', 'OpenLiteSpeed'],
              icon: '🌐'
            },
            {
              title: 'Konfigurasi PHP',
              items: ['PHP-FPM', 'OPcache', 'Custom PHP.ini'],
              icon: '⚙️'
            },
            {
              title: 'Database',
              items: ['MariaDB', 'MySQL', 'Percona'],
              icon: '💾'
            },
            {
              title: 'Sistem Cache',
              items: ['Redis', 'Memcached', 'Varnish'],
              icon: '⚡'
            }
          ].map((stack, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border bg-card"
            >
              <div className="text-3xl mb-4">{stack.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{stack.title}</h3>
              <ul className="space-y-2">
                {stack.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Process */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Tahapan Setup VPS
        </h2>
        <div className="space-y-8">
          {[
            {
              step: 1,
              title: 'Persiapan Server',
              description: 'Konfigurasi awal dan pengamanan dasar server.'
            },
            {
              step: 2,
              title: 'Instalasi Komponen',
              description: 'Pemasangan web server, PHP, dan database.'
            },
            {
              step: 3,
              title: 'Optimasi WordPress',
              description: 'Setup khusus WordPress dan sistem cache.'
            },
            {
              step: 4,
              title: 'Pengamanan Server',
              description: 'Penerapan sistem keamanan dan firewall.'
            },
            {
              step: 5,
              title: 'Setup Monitoring',
              description: 'Konfigurasi sistem monitoring dan backup.'
            }
          ].map((step, index) => (
            <div 
              key={index}
              className="flex items-start space-x-4 p-6 rounded-lg border bg-card"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold">{step.step}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-primary/5 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-4">
          Siap Setup VPS WordPress?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Dapatkan performa terbaik untuk website WordPress Anda. 
          Konsultasikan kebutuhan server Anda dengan tim ahli kami.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Konsultasi Gratis
          </Link>
          <a 
            href="https://wa.me/your-number" 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-3 text-lg font-medium text-white shadow transition-colors hover:bg-green-700"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
} 