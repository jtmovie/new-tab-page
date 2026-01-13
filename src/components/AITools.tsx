import './AITools.css'

interface AITool {
  name: string
  url: string
  icon: string
  color: string
}

const aiTools: AITool[] = [
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    icon: 'C',
    color: '#10a37f'
  },
  {
    name: 'Claude',
    url: 'https://claude.ai',
    icon: 'A',
    color: '#d4a574'
  },
  {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    icon: 'G',
    color: '#4eabde'
  },
  {
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com',
    icon: 'D',
    color: '#000000'
  },
  {
    name: 'Perplexity',
    url: 'https://www.perplexity.ai',
    icon: 'P',
    color: '#000000'
  },
  {
    name: 'Grok',
    url: 'https://grok.com',
    icon: 'X',
    color: '#000000'
  }
]

function AITools() {
  return (
    <div className="ai-tools">
      <div className="tools-grid">
        {aiTools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tool-card"
            style={{ '--tool-color': tool.color } as React.CSSProperties}
          >
            <span className="tool-icon">{tool.icon}</span>
            <span className="tool-name">{tool.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default AITools
