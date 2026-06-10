import React from 'react'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import CertificatesSection from './components/CertificatesSection'
import ContactSection from './components/ContactSection'
import CommentsSection from './components/CommentsSection'
import FooterSection from './components/FooterSection'

const App: React.FC = () => {
  return (
    <div
      className="main-wrapper"
      style={{ overflowX: 'clip', background: '#0C0C0C' }}
    >
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      <CommentsSection />
      <FooterSection />
    </div>
  )
}

export default App
