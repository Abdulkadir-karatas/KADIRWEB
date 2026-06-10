import React from 'react'
import Giscus from '@giscus/react'
import FadeIn from './FadeIn'

const CommentsSection: React.FC = () => {
  return (
    <section id="comments" className="bg-[#0C0C0C] relative z-30 px-5 sm:px-8 md:px-10 py-10 sm:py-16 md:py-20 flex flex-col items-center">
      <FadeIn>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none text-center mb-10 tracking-widest text-[#D7E2EA] drop-shadow-lg">
          Yorumlar
        </h2>
        <p className="text-[#D7E2EA]/60 text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          Projelerim, tasarımlarım veya genel olarak portfolyom hakkında düşüncelerinizi paylaşabilirsiniz. Geri bildirimleriniz benim için değerli!
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="w-full max-w-5xl">
        <div className="bg-[#111111] p-6 sm:p-10 rounded-3xl border border-white/5 shadow-[0_0_40px_rgba(182,0,168,0.05)] backdrop-blur-sm relative overflow-hidden">
          {/* Dekoratif Arka Plan Efekti */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#b600a8] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#7621b0] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            <Giscus
              id="comments"
              repo="KULLANICI_ADI/REPO_ADI" // TODO: Buraya kendi GitHub kullanıcı adınızı ve repo adınızı yazın (Örn: "kullanici/repo")
              repoId="REPO_ID_BURAYA" // TODO: Giscus'tan aldığınız Repo ID
              category="General" // TODO: Giscus'tan aldığınız Kategori adı
              categoryId="KATEGORI_ID_BURAYA" // TODO: Giscus'tan aldığınız Kategori ID
              mapping="pathname"
              term="Welcome to my portfolio!"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="transparent_dark"
              lang="tr"
              loading="lazy"
            />
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5 text-xs text-[#D7E2EA]/40 text-center">
            * Yorum yapabilmek için GitHub hesabınızla giriş yapmanız gerekmektedir. Giscus yorumları doğrudan GitHub Discussions üzerinden yönetilir.
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

export default CommentsSection
