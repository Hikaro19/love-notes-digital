import React from "react";
import { AlertCircle } from "lucide-react";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary component to catch errors in child components
 * Prevents entire app from crashing
 */
export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("🚨 Error caught by boundary:", error);
        console.error("Error info:", errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-romantic px-4">
                    <div className="flex flex-col items-center gap-4 max-w-md">
                        <AlertCircle className="w-16 h-16 text-destructive" />

                        <h1 className="text-3xl font-bold text-foreground text-center">
                            Oops! Algo deu errado 💔
                        </h1>

                        <p className="text-muted-foreground text-center leading-relaxed">
                            Não conseguimos processar sua solicitação no momento. Tente recarregar a página ou volte mais tarde.
                        </p>

                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <div className="w-full bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                                <p className="font-mono text-xs text-destructive break-words">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={this.handleReset}
                            className="btn-romantic mt-4"
                        >
                            Voltar ao Início
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
