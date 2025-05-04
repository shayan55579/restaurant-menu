import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CategoryPage from './pages/CategoryPage'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div className="p-4 text-center text-3xl font-bold">خوش آمدید به منوی رستوران</div>} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
