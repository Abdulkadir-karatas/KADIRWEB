import React from 'react'
import { Mail } from 'lucide-react'
import FadeIn from './FadeIn'

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-[#080808] relative z-30 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-between mb-16">
            
            {/* Sol Taraf: Harita ve Konum */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <h3 className="text-[#D7E2EA] font-semibold text-lg tracking-wider uppercase mb-2">Konum</h3>
              <div className="w-full h-[250px] rounded-2xl overflow-hidden border border-white/10 shadow-lg relative">
                <iframe
                  title="Gaziantep Şahinbey Haritası"
                  src="https://www.google.com/maps?q=Şahinbey,+Gaziantep&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                ></iframe>
              </div>
              <p className="text-[#D7E2EA]/60 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b600a8]">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Şahinbey / Gaziantep, Türkiye
              </p>
            </div>

            {/* Sağ Taraf: Sosyal İkonlar */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end gap-6">
              <h3 className="text-[#D7E2EA] font-semibold text-lg tracking-wider uppercase mb-2">Bana Ulaşın</h3>
              <div className="flex justify-center md:justify-end items-center gap-6">
                <a
                  href="https://www.instagram.com/abdulkadir_karatass/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA]/60 hover:text-white hover:bg-[#b600a8]/20 hover:border-[#b600a8]/50 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="mailto:Abdulkadir.karatass@hotmail.com"
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA]/60 hover:text-white hover:bg-[#7621b0]/20 hover:border-[#7621b0]/50 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Mail size={24} strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.linkedin.com/in/-abdulkadir-karatas"
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA]/60 hover:text-white hover:bg-[#0077b5]/20 hover:border-[#0077b5]/50 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#D7E2EA]/40">
            <p>© {new Date().getFullYear()} Abdulkadir Karataş. Tüm Hakları Saklıdır.</p>
            <p className="flex items-center gap-1">
              Made with <span className="text-[#b600a8]">❤</span> in Gaziantep
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}

export default FooterSection
