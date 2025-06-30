import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jasa Migrasi WordPress Profesional | JasaKami.ID',
  description: 'Layanan migrasi website WordPress yang aman dan terpercaya. Pindahkan website WordPress tanpa kehilangan data dan peringkat SEO.',
};

export default function WordPressMigrationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-b from-primary/5 to-transparent pb-12 pt-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Jasa Migrasi Website WordPress
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Pindahkan website WordPress Anda dengan aman tanpa kehilangan data. 
              Proses migrasi cepat dan profesional dengan jaminan SEO tetap terjaga.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="#pricing"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90"
              >
                Lihat Paket Migrasi
              </a>
              <a 
                href="https://wa.me/your-number" 
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-green-700"
              >
                Chat WhatsApp
              </a>
            </div>
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
              {[
                { number: '500+', label: 'Website Berhasil Dimigrasikan' },
                { number: '99.9%', label: 'Tingkat Keberhasilan' },
                { number: '24/7', label: 'Dukungan Teknis' },
                { number: '100%', label: 'Garansi Kepuasan' }
              ].map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Kenapa Memilih Layanan Migrasi Kami?
            </h2>
            <p className="text-lg text-muted-foreground">
              Tim ahli kami telah membantu ratusan bisnis dalam migrasi WordPress dengan aman. 
              Kami menggabungkan teknologi terbaik dengan layanan personal untuk hasil maksimal.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Zero Downtime Migration',
                description: 'Website Anda tetap online 100% selama proses migrasi. Tidak ada gangguan pada bisnis, traffic, atau transaksi online Anda.',
                icon: '🚀',
                color: 'from-blue-500 to-blue-600',
                features: ['Migrasi tanpa downtime', 'Tidak ada kehilangan traffic', 'Bisnis tetap berjalan']
              },
              {
                title: 'Backup & Keamanan',
                description: 'Sistem backup berlapis dengan enkripsi untuk keamanan data. Kami melakukan backup file, database, dan konfigurasi sebelum migrasi.',
                icon: '🔒',
                color: 'from-green-500 to-green-600',
                features: ['Backup otomatis', 'Enkripsi data', 'Versioning sistem']
              },
              {
                title: 'Proteksi SEO',
                description: 'Jaminan peringkat SEO tetap terjaga. Kami memastikan semua URL, meta tags, dan struktur konten tidak berubah setelah migrasi.',
                icon: '📈',
                color: 'from-purple-500 to-purple-600',
                features: ['Peringkat Google aman', 'URL structure terjaga', 'Redirect mapping']
              },
              {
                title: 'Optimasi Performa',
                description: 'Peningkatan kecepatan loading dengan optimasi database dan server. Website Anda akan lebih cepat setelah migrasi.',
                icon: '⚡',
                color: 'from-yellow-500 to-yellow-600',
                features: ['Database cleanup', 'Cache optimization', 'Server tuning']
              },
              {
                title: 'Keamanan Premium',
                description: 'Setup keamanan lengkap dengan SSL, firewall, dan monitoring. Lindungi website Anda dari serangan dan malware.',
                icon: '🔐',
                color: 'from-red-500 to-red-600',
                features: ['SSL/HTTPS setup', 'Web Application Firewall', 'Security monitoring']
              },
              {
                title: 'Support Premium',
                description: 'Tim support dedicated siap 24/7 via chat, email, dan phone. Dapatkan bantuan teknis kapanpun Anda butuhkan.',
                icon: '💬',
                color: 'from-indigo-500 to-indigo-600',
                features: ['Support 24/7', 'Dedicated engineer', 'Fast response time']
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Proses Migrasi Website
          </h2>
          <div className="max-w-5xl mx-auto">
            {[
              {
                step: 1,
                title: 'Analisis Website',
                description: 'Pemeriksaan menyeluruh kondisi website, plugin, tema, dan kebutuhan server. Kami menganalisis semua aspek untuk memastikan migrasi lancar.',
                icon: '🔍'
              },
              {
                step: 2,
                title: 'Backup & Persiapan',
                description: 'Backup lengkap file, database, dan konfigurasi website. Persiapan server tujuan dengan spesifikasi optimal untuk performa terbaik.',
                icon: '💾'
              },
              {
                step: 3,
                title: 'Proses Migrasi',
                description: 'Transfer data dan konten dengan metode yang aman. Setiap file dan konfigurasi dipindahkan dengan teliti untuk menjaga integritas website.',
                icon: '🔄'
              },
              {
                step: 4,
                title: 'Pengujian & Optimasi',
                description: 'Pengujian menyeluruh dan optimasi performa website di server baru. Memastikan semua fitur berfungsi sempurna.',
                icon: '✅'
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="flex items-start space-x-6 mb-8 p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-lg"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-2xl text-white">
                  {step.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <div className="text-sm font-medium text-primary bg-primary/10 rounded-full px-3 py-1 mr-3">
                      Langkah {step.step}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Paket Migrasi WordPress
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Basic',
                price: 'Rp 499K',
                description: 'Cocok untuk website WordPress sederhana',
                features: [
                  'Migrasi 1 Website',
                  'Backup Lengkap',
                  'SSL Gratis',
                  'Optimasi Dasar',
                  'Support 7 Hari',
                  'Garansi 100%'
                ],
                isPopular: false
              },
              {
                name: 'Professional',
                price: 'Rp 999K',
                description: 'Untuk website bisnis dengan traffic tinggi',
                features: [
                  'Migrasi 1 Website',
                  'Backup Lengkap',
                  'SSL Premium',
                  'Optimasi Lanjutan',
                  'CDN Setup',
                  'Support 30 Hari',
                  'Garansi 100%',
                  'Konsultasi Teknis'
                ],
                isPopular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'Solusi khusus untuk multiple website',
                features: [
                  'Migrasi Multiple Site',
                  'Backup Real-time',
                  'SSL Wildcard',
                  'Optimasi Premium',
                  'CDN Premium',
                  'Support 90 Hari',
                  'Garansi 100%',
                  'Konsultasi Prioritas'
                ],
                isPopular: false
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`
                  relative rounded-2xl p-8 bg-white dark:bg-gray-900 border
                  ${plan.isPopular ? 'border-primary shadow-xl scale-105' : 'border-border shadow-lg'}
                `}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                    Terpopuler
                  </div>
                )}
                <div className="text-2xl font-bold mb-2">{plan.name}</div>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground ml-2">/website</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact" 
                  className={`
                    inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-base font-medium shadow transition-all hover:scale-105
                    ${plan.isPopular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-accent text-accent-foreground hover:bg-accent/90'
                    }
                  `}
                >
                  Pilih Paket
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pertanyaan Umum
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Berapa lama proses migrasi WordPress?',
                answer: 'Waktu migrasi bervariasi tergantung ukuran website, biasanya antara 2-24 jam. Kami selalu mengutamakan keamanan dan ketelitian dalam proses migrasi.'
              },
              {
                question: 'Apakah website akan down saat migrasi?',
                answer: 'Tidak, kami menggunakan metode migrasi tanpa downtime. Website Anda akan tetap online selama proses migrasi berlangsung.'
              },
              {
                question: 'Bagaimana dengan SEO website?',
                answer: 'Kami menjamin tidak ada dampak negatif terhadap SEO. Semua URL, meta tag, dan struktur website akan tetap sama seperti sebelumnya.'
              },
              {
                question: 'Apakah ada garansi layanan?',
                answer: 'Ya, kami memberikan garansi 100% uang kembali jika terjadi masalah dalam proses migrasi yang tidak bisa kami selesaikan.'
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="rounded-xl border bg-white dark:bg-gray-900 p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Pindahkan Website WordPress Anda?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Konsultasikan kebutuhan migrasi website Anda dengan tim ahli kami. 
              Dapatkan penawaran khusus untuk migrasi multiple website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90"
              >
                Konsultasi Gratis
              </Link>
              <a 
                href="https://wa.me/your-number" 
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-green-700"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 