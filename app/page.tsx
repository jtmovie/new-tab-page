'use client'

import { useState, useEffect } from 'react'

// 时钟组件
function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  return (
    <>
      <div className="clock">{formatTime(time)}</div>
      <div className="date">{formatDate(time)}</div>
    </>
  )
}

// 搜索组件
function Search() {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank')
    }
  }

  return (
    <form className="search-box" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="Google 搜索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-btn">🔍</button>
    </form>
  )
}

// GitHub 热榜组件
type TimeRange = 'daily' | 'weekly' | 'monthly'

interface Repo {
  rank: number
  name: string
  description: string
  stars: number
  url: string
}

const timeRanges: TimeRange[] = ['daily', 'weekly', 'monthly']

function GitHubTrending() {
  const [activeRange, setActiveRange] = useState<TimeRange>('daily')
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true)
      try {
        const res = await fetch(
          `https://api.trending.best/rewrite?url=https://github.com/trending/${activeRange}?spoken_language_code=zh`
        )
        const html = await res.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const items = doc.querySelectorAll('.Box-row')

        const trendingRepos: Repo[] = []
        items.slice(0, 10).forEach((item, index) => {
          const link = item.querySelector('h2 a')
          const desc = item.querySelector('.col-repo-description')
          const stars = item.querySelector('.d-flex a[href$="stargazers"]')

          if (link) {
            const name = link.textContent?.trim() || ''
            const url = 'https://github.com' + link.getAttribute('href')
            const description = desc?.textContent?.trim() || ''
            const starText = stars?.textContent?.trim() || '0'
            const starsNum = parseInt(starText.replace(/,/g, '')) || 0

            trendingRepos.push({
              rank: index + 1,
              name,
              description,
              stars: starsNum,
              url,
            })
          }
        })
        setRepos(trendingRepos)
      } catch (error) {
        console.error('Failed to fetch trending:', error)
        // 使用备用数据
        setRepos(getFallbackRepos(activeRange))
      }
      setLoading(false)
    }

    fetchTrending()
  }, [activeRange])

  return (
    <div className="section">
      <h2 className="section-title">GitHub 热榜</h2>
      <div className="trending-tabs">
        {timeRanges.map((range) => (
          <button
            key={range}
            className={`trending-tab ${activeRange === range ? 'active' : ''}`}
            onClick={() => setActiveRange(range)}
          >
            {range === 'daily' ? '今日' : range === 'weekly' ? '本周' : '本月'}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        <div className="repo-list">
          {repos.map((repo) => (
            <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer" className="repo-item">
              <span className="repo-rank">{repo.rank}</span>
              <div className="repo-info">
                <div className="repo-name">{repo.name}</div>
                <div className="repo-desc">{repo.description}</div>
              </div>
              <span className="repo-stars">⭐ {repo.stars.toLocaleString()}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// 备用数据
function getFallbackRepos(range: TimeRange): Repo[] {
  const multiplier = range === 'weekly' ? 7 : range === 'monthly' ? 30 : 1
  return [
    { rank: 1, name: 'microsoft/TypeScript', description: 'TypeScript 是一种用于应用级 JavaScript 的语言', stars: 100000 * multiplier, url: 'https://github.com/microsoft/TypeScript' },
    { rank: 2, name: 'vuejs/core', description: 'Vue.js 核心框架', stars: 45000 * multiplier, url: 'https://github.com/vuejs/core' },
    { rank: 3, name: 'facebook/react', description: '用于构建用户界面的库', stars: 230000 * multiplier, url: 'https://github.com/facebook/react' },
    { rank: 4, name: 'vercel/next.js', description: 'React 框架', stars: 120000 * multiplier, url: 'https://github.com/vercel/next.js' },
    { rank: 5, name: 'tailwindlabs/tailwindcss', description: '实用优先的 CSS 框架', stars: 78000 * multiplier, url: 'https://github.com/tailwindlabs/tailwindcss' },
    { rank: 6, name: 'nodejs/node', description: 'Node.js JavaScript 运行时', stars: 105000 * multiplier, url: 'https://github.com/nodejs/node' },
    { rank: 7, name: 'denoland/deno', description: '现代 JavaScript 运行时', stars: 95000 * multiplier, url: 'https://github.com/denoland/deno' },
    { rank: 8, name: 'remix-run/react-router', description: 'React 的路由库', stars: 56000 * multiplier, url: 'https://github.com/remix-run/react-router' },
    { rank: 9, name: 'shadcn-ui/ui', description: '使用 Radix UI 和 Tailwind 的组件库', stars: 67000 * multiplier, url: 'https://github.com/shadcn-ui/ui' },
    { rank: 10, name: 'pmndrs/zustand', description: 'React 的状态管理', stars: 48000 * multiplier, url: 'https://github.com/pmndrs/zustand' },
  ]
}

// AI 工具组件
interface AITool {
  name: string
  url: string
  icon: string
  color: string
}

const aiTools: AITool[] = [
  { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'C', color: '#10a37f' },
  { name: 'Claude', url: 'https://claude.ai', icon: 'A', color: '#d4a574' },
  { name: 'Gemini', url: 'https://gemini.google.com', icon: 'G', color: '#4ea1d3' },
  { name: 'DeepSeek', url: 'https://chat.deepseek.com', icon: 'D', color: '#0052cc' },
  { name: 'Perplexity', url: 'https://www.perplexity.ai', icon: 'P', color: '#545454' },
  { name: 'Grok', url: 'https://grok.com', icon: 'X', color: '#000' },
]

function AITools() {
  return (
    <div className="section">
      <h2 className="section-title">AI 工具</h2>
      <div className="ai-tools">
        {aiTools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ai-tool"
          >
            <div className="ai-icon" style={{ background: tool.color }}>
              {tool.icon}
            </div>
            <span className="ai-name">{tool.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// 主页面
export default function Home() {
  return (
    <div className="container">
      <Clock />
      <Search />
      <GitHubTrending />
      <AITools />
    </div>
  )
}
