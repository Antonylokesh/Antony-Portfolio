import styles from './App.module.css'
import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { Education } from './components/Education/Education'
import { Experience } from './components/Experience/Experience'
import { Footer } from './components/Footer/Footer'
import { Hero } from './components/Hero/Hero'
import { Navbar } from './components/Navbar/Navbar'
import { Projects } from './components/Projects/Projects'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
import { TechShowcase } from './components/TechShowcase/TechShowcase'

function App() {

  return <div className={styles.App}>
    <Navbar />
    <Hero />
    <About />
    <Education />
    <Experience />
    <TechShowcase />
    <Projects />
    <Contact />
    <Footer />
    <ScrollToTop />
  </div>
    
}

export default App
