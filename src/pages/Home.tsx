import { useEffect } from 'react'
import { About } from '../components/About'
import { Certifications } from '../components/Certifications'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { Journey } from '../components/Journey'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills'
import { setHomepageSeo } from '../utils/seo'

export function Home() {
  useEffect(() => {
    setHomepageSeo()
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Certifications />
      <Contact />
    </>
  )
}
