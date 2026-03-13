import { useState, useCallback } from "react";

interface AssetLoadState {
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
}

/**
 * Custom hook for handling asset (image/video) loading states and errors
 * Provides loading state, error state, and handlers for onLoad/onError events
 */
export const useAssetLoader = (assetName: string = "Asset") => {
    const [state, setState] = useState<AssetLoadState>({
        isLoading: true,
        hasError: false,
        errorMessage: null,
    });

    const handleLoad = useCallback(() => {
        setState({
            isLoading: false,
            hasError: false,
            errorMessage: null,
        });
    }, []);

    const handleError = useCallback(() => {
        setState({
            isLoading: false,
            hasError: true,
            errorMessage: `${assetName} não pode ser carregado. Tente novamente.`,
        });
        console.warn(`Asset loading failed: ${assetName}`);
    }, [assetName]);

    return {
        ...state,
        handleLoad,
        handleError,
    };
};
