import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Jasa Kelola VPS WordPress | JasaKami.ID',
  description: 'Layanan pengelolaan VPS WordPress dengan dukungan teknis 24 jam. Fokus pada bisnis Anda, biarkan kami yang mengelola server.',
};

export default function ManagedVpsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Jasa Kelola VPS WordPress
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Fokus kembangkan bisnis Anda, biarkan kami yang kelola server VPS Anda. 
          Dapatkan dukungan teknis 24 jam dari tim ahli kami.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: 'Monitoring 24 Jam',
            description: 'Pemantauan server secara real-time dan penanganan masalah proaktif.',
            icon: '👀'
          },
          {
            title: 'Optimasi Performa',
            description: 'Peningkatan performa server secara berkala untuk kecepatan maksimal.',
            icon: '⚡'
          },
          {
            title: 'Pengelolaan Keamanan',
            description: 'Manajemen keamanan server dan update patch secara rutin.',
            icon: '🔒'
          },
          {
            title: 'Manajemen Backup',
            description: 'Backup otomatis dan sistem pemulihan data.',
            icon: '💾'
          },
          {
            title: 'Update Berkala',
            description: 'Pembaruan sistem dan software secara teratur.',
            icon: '🔄'
          },
          {
            title: 'Bantuan Teknis',
            description: 'Dukungan teknis 24 jam via tiket, email, dan WhatsApp.',
            icon: '🎯'
          }
        ].map((service, index) => (
          <div 
            key={index}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Management Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Fitur Pengelolaan Server
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Monitoring Proaktif',
              items: [
                'Pemantauan Resource Server',
                'Pengecekan Status Layanan',
                'Metrik Performa',
                'Notifikasi Alert'
              ]
            },
            {
              title: 'Manajemen Keamanan',
              items: [
                'Konfigurasi Firewall',
                'Update Patch Keamanan',
                'Pemindaian Malware',
                'Proteksi DDoS'
              ]
            },
            {
              title: 'Sistem Backup',
              items: [
                'Backup Harian Otomatis',
                'Penyimpanan Backup Terpisah',
                'Pemulihan Cepat',
                'Recovery Point Fleksibel'
              ]
            },
            {
              title: 'Manajemen Performa',
              items: [
                'Load Balancing',
                'Optimasi Cache',
                'Tuning Database',
                'Skalabilitas Resource'
              ]
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border bg-card"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.items.map((item, itemIndex) => (
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

      {/* Service Levels */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Paket Layanan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Paket Dasar',
              features: [
                'Monitoring Server',
                'Keamanan Dasar',
                'Backup Mingguan',
                'Email Support',
                'Laporan Bulanan'
              ],
              isPopular: false
            },
            {
              title: 'Paket Bisnis',
              features: [
                'Monitoring 24 Jam',
                'Keamanan Lanjutan',
                'Backup Harian',
                'Prioritas Support',
                'Laporan Mingguan',
                'Optimasi Performa',
                'Setup CDN'
              ],
              isPopular: true
            },
            {
              title: 'Paket Enterprise',
              features: [
                'Monitoring Kustom',
                'Keamanan Enterprise',
                'Backup Real-time',
                'Dedicated Support',
                'Laporan Kustom',
                'Load Balancing',
                'High Availability'
              ],
              isPopular: false
            }
          ].map((package_, index) => (
            <div 
              key={index}
              className={`
                p-6 rounded-lg border bg-card relative
                ${package_.isPopular ? 'border-primary shadow-lg' : ''}
              `}
            >
              {package_.isPopular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  Terpopuler
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{package_.title}</h3>
              <ul className="space-y-3 mb-8">
                {package_.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="/contact" 
                className={`
                  inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-base font-medium shadow transition-colors
                  ${package_.isPopular 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-accent text-accent-foreground hover:bg-accent/90'
                  }
                `}
              >
                Pilih Paket
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-primary/5 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-4">
          Ingin Server Dikelola Profesional?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Serahkan pengelolaan server kepada ahlinya. 
          Konsultasikan kebutuhan server Anda dengan tim kami.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Konsultasi Gratis
          </a>
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