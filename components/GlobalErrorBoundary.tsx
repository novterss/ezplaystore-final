'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export default class GlobalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white font-mono">
                    <h1 className="text-3xl text-red-500 font-bold mb-4">Something went wrong</h1>
                    <div className="bg-gray-900 p-6 rounded-xl border border-red-500/30 max-w-4xl w-full overflow-auto">
                        <h2 className="text-xl text-red-400 mb-2">{this.state.error?.toString()}</h2>
                        <details className="whitespace-pre-wrap text-sm text-gray-400">
                            <summary className="cursor-pointer hover:text-white mb-2">Click for Stack Trace</summary>
                            {this.state.errorInfo?.componentStack}
                        </details>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
