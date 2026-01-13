import { useState } from 'react'
import Search from './components/Search'
import GitHubTrending from './components/GitHubTrending'
import AITools from './components/AITools'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())

  setInterval(() => setTime(new Date()), 1000)

  return (
    <div className="container">
      <div className="main-content">
        <div className="time-section">
          <h1 className="time">{time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</h1>
          <p className="date">{time.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <Search />
        <AITools />
      </div>
      <GitHubTrending />
    </div>
  )
}

export default App
