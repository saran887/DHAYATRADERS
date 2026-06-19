import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#0D2136] to-[#0A1724] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-steel/10 rounded-full blur-3xl pointer-events-none" />

            <div className="mx-auto w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <h1 className="text-2xl font-serif font-bold text-white mb-3">
              Unexpected Blueprint Error
            </h1>
            
            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-semibold">
              Something went wrong while rendering this page. Our team is actively reviewing the site structure.
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 bg-red-950/20 border border-red-900/30 rounded-lg text-left">
                <p className="text-[10px] font-mono text-red-400 font-semibold uppercase tracking-wider mb-1">Error Diagnostics</p>
                <p className="text-xs font-mono text-red-300/80 break-words line-clamp-3">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 bg-[#2E6B9E] hover:bg-[#1B3A5C] text-white font-sans text-xs uppercase tracking-widest font-extrabold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reload Page</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-sans text-xs uppercase tracking-widest font-extrabold py-3 px-6 rounded-lg transition-all duration-300 cursor-pointer"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Go Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
