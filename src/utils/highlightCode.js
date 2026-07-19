// Lightweight token generators for the docs code viewer. Not a full language
// parser — just enough regex-based classification to give code blocks a
// syntax-highlighted look without pulling in an external library.

function tokenize(source, regex, resolveType) {
  const tokens = []
  let lastIndex = 0
  let match = regex.exec(source)

  while (match !== null) {
    if (match.index > lastIndex) tokens.push({ type: 'plain', text: source.slice(lastIndex, match.index) })
    tokens.push({ type: resolveType(match), text: match[0] })
    lastIndex = regex.lastIndex
    match = regex.exec(source)
  }

  if (lastIndex < source.length) tokens.push({ type: 'plain', text: source.slice(lastIndex) })
  return tokens
}

const JSON_TOKEN_REGEX = /("(?:\\.|[^"\\])*")(?=\s*:)|"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\btrue\b|\bfalse\b|\bnull\b|[{}[\],:]/g

export function highlightJson(source) {
  return tokenize(source, JSON_TOKEN_REGEX, (match) => {
    const [text] = match
    if (match[1]) return 'key'
    if (text.startsWith('"')) return 'string'
    if (text === 'true' || text === 'false') return 'boolean'
    if (text === 'null') return 'null'
    if (/^[{}[\],:]$/.test(text)) return 'punct'
    return 'number'
  })
}

const CODE_TOKEN_REGEX = /\/\/[^\n]*|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b(?:const|let|var|function|async|await|return|import|from|require|def|print|new|export|default|class|if|else|for|while|True|False|None|true|false|null|curl)\b/g

const KEYWORDS = new Set(['const', 'let', 'var', 'function', 'async', 'await', 'return', 'import', 'from', 'require', 'def', 'print', 'new', 'export', 'default', 'class', 'if', 'else', 'for', 'while', 'true', 'false', 'null', 'True', 'False', 'None', 'curl'])

export function highlightCode(source) {
  return tokenize(source, CODE_TOKEN_REGEX, (match) => {
    const [text] = match
    if (text.startsWith('//') || text.startsWith('#')) return 'comment'
    if (text.startsWith('"') || text.startsWith("'") || text.startsWith('`')) return 'string'
    if (KEYWORDS.has(text)) return 'keyword'
    return 'number'
  })
}
