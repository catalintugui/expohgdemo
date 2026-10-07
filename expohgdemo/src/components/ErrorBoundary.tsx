import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorPage } from '../pages/ErrorPage'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unexpected application error:', error, info.componentStack)
  }

  reset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage onReset={this.reset} />
    }

    return this.props.children
  }
}
