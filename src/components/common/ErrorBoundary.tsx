
import React from "react";

class LegacyErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="max-w-sm w-full bg-white rounded-lg shadow p-6 text-center">
            <h1 className="text-xl font-bold text-red-600 mb-2">
              Something went wrong
            </h1>
            <p className="mb-4">{this.state.error.message}</p>
            <button
              className="btn btn-primary-modern"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <LegacyErrorBoundary>{children}</LegacyErrorBoundary>;
}
