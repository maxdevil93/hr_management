import React, { createContext, useContext, useState, ReactNode } from 'react';
import "../../styles/alert-modal.css";

interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<{ isOpen: boolean; message?: string }>({
    isOpen: false,
    message: "로딩 중입니다...",
  });

  const showLoading = (message?: string) => 
    setLoading({ isOpen: true, message: message || "로딩 중입니다..." });
    
  const hideLoading = () => 
    setLoading({ isOpen: false });

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {loading.isOpen && (
        <div className="overlay_style">
          <div className="modal_style" style={{ minWidth: '200px' }}>
            <div className="spinner_style"></div>
            <p style={{ marginTop: '16px', fontWeight: 'bold' }} onClick={() => setLoading({isOpen: false})}>
              {loading.message}
            </p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error('useLoading must be used within LoadingProvider');
  return context;
};