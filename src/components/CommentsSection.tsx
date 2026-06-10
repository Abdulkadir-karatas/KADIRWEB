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

      <FadeIn delay={0.1} className="w-full max-w-4xl">
        <div className="w-full">
          <Giscus
            id="comments"
            repo="Abdulkadir-karatas/kadirweb"
            repoId="R_kgDOS1tVAA"
            category="General"
            categoryId="DIC_kwDOS1tVAM4C-32d"
            mapping="pathname"
            strict="0"
            term="Welcome to my portfolio!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="transparent_dark"
            lang="tr"
            loading="lazy"
          />
        </div>
      </FadeIn>
    </section>
  )
}

export default CommentsSection
