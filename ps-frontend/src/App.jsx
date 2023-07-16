import Home from './components/pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
