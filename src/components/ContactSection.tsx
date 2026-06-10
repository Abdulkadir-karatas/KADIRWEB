import React, { useRef, useState } from 'react'
import FadeIn from './FadeIn'

const ContactSection: React.FC = () => {
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.user_name.trim()) newErrors.user_name = 'İsim zorunludur'
    
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'E-posta zorunludur'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Geçerli bir e-posta adresi giriniz'
    }

    if (formData.user_phone.trim()) {
      // İsteğe bağlı olarak başta +, rakamlar, boşluklar, parantezler içerebilir. 10-15 karakter uzunluğunda.
      if (!/^[\d\s()+-]{10,15}$/.test(formData.user_phone)) {
        newErrors.user_phone = 'Geçerli bir telefon numarası giriniz'
      }
    }

    if (!formData.subject.trim()) newErrors.subject = 'Konu zorunludur'
    if (!formData.message.trim()) newErrors.message = 'Mesaj zorunludur'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Kullanıcı yazarken bu alanın hatasını temizle
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    if (!form.current) return
    setIsSubmitting(true)
    setStatus('idle')

    fetch("https://formsubmit.co/ajax/Abdulkadir.karatass@hotmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `Yeni İletişim Formu Mesajı: ${formData.subject}`,
        İsim: formData.user_name,
        Email: formData.user_email,
        Telefon: formData.user_phone || 'Belirtilmedi',
        Konu: formData.subject,
        Mesaj: formData.message
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setStatus('success')
        setIsSubmitting(false)
        setFormData({ user_name: '', user_email: '', user_phone: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Gönderim başarısız')
      }
    })
    .catch(error => {
      console.error('FormSubmit Error:', error)
      setStatus('error')
      setIsSubmitting(false)
      setTimeout(() => setStatus('idle'), 5000)
    })
  }

  const inputClasses =
    "w-full bg-[#0C0C0C] border border-[#D7E2EA]/15 rounded-xl px-5 py-4 text-[#D7E2EA] placeholder:text-[#D7E2EA]/40 focus:outline-none focus:border-[#D7E2EA]/50 focus:ring-1 focus:ring-[#D7E2EA]/20 transition-all"

  return (
    <section id="iletisim" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 flex flex-col items-center">
      <FadeIn>
        <h2 className="hero-heading font-black uppercase leading-none text-center mb-16 sm:mb-20 md:mb-28 tracking-[0.1em]" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          İLETİŞİM
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} className="w-full max-w-5xl">
        <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Sol Sütun - Girdiler */}
          <div className="flex flex-col gap-5">
            <div>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Adınız"
                className={`${inputClasses} ${errors.user_name ? 'border-red-500/50 focus:border-red-500/80' : ''}`}
              />
              {errors.user_name && <p className="text-red-400 text-xs mt-1.5 ml-2">{errors.user_name}</p>}
            </div>

            <div>
              <input
                type="text"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder="E-posta"
                className={`${inputClasses} ${errors.user_email ? 'border-red-500/50 focus:border-red-500/80' : ''}`}
              />
              {errors.user_email && <p className="text-red-400 text-xs mt-1.5 ml-2">{errors.user_email}</p>}
            </div>

            <div>
              <input
                type="text"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                placeholder="Telefon (İsteğe Bağlı)"
                className={`${inputClasses} ${errors.user_phone ? 'border-red-500/50 focus:border-red-500/80' : ''}`}
              />
              {errors.user_phone && <p className="text-red-400 text-xs mt-1.5 ml-2">{errors.user_phone}</p>}
            </div>

            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Konu"
                className={`${inputClasses} ${errors.subject ? 'border-red-500/50 focus:border-red-500/80' : ''}`}
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1.5 ml-2">{errors.subject}</p>}
            </div>
          </div>

          {/* Sağ Sütun - Metin Alanı ve Buton */}
          <div className="flex flex-col gap-5 h-full">
            <div className="flex-1 flex flex-col">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mesajınız"
                className={`${inputClasses} flex-1 resize-none min-h-[200px] ${errors.message ? 'border-red-500/50 focus:border-red-500/80' : ''}`}
              ></textarea>
              {errors.message && <p className="text-red-400 text-xs mt-1.5 ml-2">{errors.message}</p>}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              {/* Durum Mesajları */}
              <div className="text-sm font-medium">
                {status === 'success' && (
                  <span className="text-green-400">Mesajınız başarıyla gönderildi!</span>
                )}
                {status === 'error' && (
                  <span className="text-red-400">Gönderim hatası. Bilgilerinizi (EmailJS) kontrol edin.</span>
                )}
              </div>
              
              {/* Gönder Butonu */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#b600a8] to-[#7621b0] text-white font-medium uppercase tracking-wider px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(182,0,168,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </button>
            </div>
          </div>
        </form>

      </FadeIn>
    </section>
  )
}

export default ContactSection
