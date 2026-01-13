import { useState, useEffect } from 'react'
import './GitHubTrending.css'

interface Repo {
  author: string
  name: string
  description: string
  stars: number
  language: string
  url: string
}

function GitHubTrending() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('daily')

  useEffect(() => {
    fetchRepos()
  }, [timeRange])

  const fetchRepos = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${getDateOffset()}&sort=stars&order=desc&per_page=10`
      )
      const data = await response.json()
      if (data.items) {
        setRepos(data.items.slice(0, 10))
      }
    } catch (error) {
      console.error('Failed to fetch GitHub trending:', error)
      // Use mock data as fallback
      setRepos(getMockRepos())
    }
    setLoading(false)
  }

  const getDateOffset = () => {
    const date = new Date()
    date.setDate(date.getDate() - (timeRange === 'daily' ? 1 : timeRange === 'weekly' ? 7 : 30))
    return date.toISOString().split('T')[0]
  }

  const getMockRepos = (): Repo[] => {
    return [
      { author: 'microsoft', name: 'TypeScript', description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.', stars: 105000, language: 'TypeScript', url: 'https://github.com/microsoft/TypeScript' },
      { author: 'vercel', name: 'next.js', description: 'The React Framework for the Web', stars: 98000, language: 'JavaScript', url: 'https://github.com/vercel/next.js' },
      { author: 'facebook', name: 'react', description: 'A library for building user interfaces.', stars: 220000, language: 'JavaScript', url: 'https://github.com/facebook/react' },
      { author: 'tailwindlabs', name: 'tailwindcss', description: 'A utility-first CSS framework for rapid UI development.', stars: 78000, language: 'CSS', url: 'https://github.com/tailwindlabs/tailwindcss' },
      { author: 'vuejs', name: 'vue', description: 'The Progressive JavaScript Framework.', stars: 205000, language: 'JavaScript', url: 'https://github.com/vuejs/vue' },
    ]
  }

  const formatStars = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
    return num.toString()
  }

  return (
    <div className="github-trending">
      <div className="trending-header">
        <svg className="github-icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <h2>GitHub Trending</h2>
        <div className="time-filters">
          <button
            className={`filter-btn ${timeRange === 'daily' ? 'active' : ''}`}
            onClick={() => setTimeRange('daily')}
          >
            今日
          </button>
          <button
            className={`filter-btn ${timeRange === 'weekly' ? 'active' : ''}`}
            onClick={() => setTimeRange('weekly')}
          >
            本周
          </button>
          <button
            className={`filter-btn ${timeRange === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeRange('monthly')}
          >
            本月
          </button>
        </div>
      </div>
      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        <div className="repo-list">
          {repos.map((repo, index) => (
            <a
              key={`${repo.author}-${repo.name}`}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-item"
            >
              <span className="repo-rank">{index + 1}</span>
              <div className="repo-info">
                <span className="repo-name">{repo.author}/{repo.name}</span>
                <span className="repo-desc">{repo.description}</span>
                <div className="repo-meta">
                  <span className="repo-stars">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {formatStars(repo.stars)}
                  </span>
                  <span className="repo-language">{repo.language}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default GitHubTrending
