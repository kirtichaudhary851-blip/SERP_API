import { useState } from 'react'
import { highlightCode, highlightJson } from '../../utils/highlightCode'
import CopyButton from './CopyButton'

function CodeBlock({ code, language = 'json', title, collapsible = false, defaultCollapsed = false }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const lines = code.split('\n')
  const highlighter = language === 'json' ? highlightJson : highlightCode

  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span className="code-block__title">{title || language}</span>
        <div className="code-block__actions">
          {collapsible && (
            <button className="code-block__toggle" type="button" onClick={() => setCollapsed((value) => !value)} aria-expanded={!collapsed}>
              {collapsed ? 'Expand' : 'Collapse'}
            </button>
          )}
          <CopyButton value={code} />
        </div>
      </div>
      {!collapsed && (
        <pre className="code-block__body" tabIndex={0}>
          <code>
            {lines.map((line, lineIndex) => {
              const tokens = highlighter(line)
              return (
                <span className="code-line" key={lineIndex}>
                  <span className="code-line__number" aria-hidden="true">{lineIndex + 1}</span>
                  <span className="code-line__content">
                    {tokens.length === 0
                      ? ' '
                      : tokens.map((token, tokenIndex) => (
                        <span className={`tok tok--${token.type}`} key={tokenIndex}>{token.text}</span>
                      ))}
                  </span>
                </span>
              )
            })}
          </code>
        </pre>
      )}
    </div>
  )
}

export default CodeBlock
