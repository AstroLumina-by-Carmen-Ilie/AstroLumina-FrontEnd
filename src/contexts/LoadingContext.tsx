import React, { createContext, useState, useCallback } from "react";
import LoadingAnimation from "@/components/animations/LoadingAnimation";

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export { LoadingContext };

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      <div className="min-h-screen">
        {children}
        {isLoading && (
          <div className="fixed inset-0 bg-slate-900 z-[9999]">
            <LoadingAnimation />
          </div>
        )}
      </div>
    </LoadingContext.Provider>
  );
};
