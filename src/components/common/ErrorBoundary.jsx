import { Component } from 'react'

// Reusable class-based error boundary (error boundaries can't be hooks yet).
// Wrap any section of the tree that should fail gracefully instead of blanking the whole app.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    window.console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    const { children, title = 'Something went wrong.', message = "This part of the page couldn't load. You can try again." } = this.props

    if (!error) return children

    return (
      <div className="error-boundary" role="alert">
        <h1>{title}</h1>
        <p>{message}</p>
        {import.meta.env.DEV && <pre>{error.message}</pre>}
        <button type="button" className="button button--primary" onClick={this.handleReset}>Try again</button>
      </div>
    )
  }
}

export default ErrorBoundary
