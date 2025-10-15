import Hero from '@/components/Hero'
import Features from '@/components/Features'
import WaitlistForm from '@/components/WaitlistForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Hero />
      <Features />
      <WaitlistForm />
      <Footer />
    </main>
  )
}