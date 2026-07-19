import { useId, useState } from 'react'
import CodeBlock from './CodeBlock'

const TAB_CONFIG = [
  { id: 'curl', label: 'cURL', language: 'bash' },
  { id: 'javascript', label: 'JavaScript', language: 'javascript' },
  { id: 'python', label: 'Python', language: 'python' },
  { id: 'nodejs', label: 'Node.js', language: 'javascript' },
]

function CodeTabs({ examples }) {
  const baseId = useId()
  const availableTabs = TAB_CONFIG.filter((tab) => examples?.[tab.id])
  const [activeId, setActiveId] = useState(availableTabs[0]?.id)
  const activeTab = availableTabs.find((tab) => tab.id === activeId) || availableTabs[0]

  if (!activeTab) return null

  return (
    <div className="code-tabs">
      <div className="code-tabs__list" role="tablist" aria-label="Code examples">
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={tab.id === activeTab.id}
            aria-controls={`${baseId}-panel-${tab.id}`}
            className={`code-tabs__tab ${tab.id === activeTab.id ? 'is-active' : ''}`}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${baseId}-panel-${activeTab.id}`} aria-labelledby={`${baseId}-tab-${activeTab.id}`}>
        <CodeBlock code={examples[activeTab.id]} language={activeTab.language} title={activeTab.label} />
      </div>
    </div>
  )
}

export default CodeTabs
