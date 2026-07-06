import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { MobileBottomNav } from './components/layout/MobileBottomNav'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HomePage />
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

export default App
