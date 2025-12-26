import React, { createContext, useContext, useState, ReactNode } from 'react';
import "../../styles/alert-modal.css";
//import "./Modal.css";

interface AlertOptions {
  title: string,
  message: string,
  confirmText?: string,
  cancelText?: string,
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AlertContextType {
  showAlert: () => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({children} : {children : ReactNode}) => {
  const [alert, setAlert] = useState<AlertOptions | null>(null);

  const showAlert = (options : AlertOptions) => setAlert(options);
  const hideAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <div className='overlay_style'>
          <div className='modal_style'>
            <h3 style={{marginTop: 0}}>{alert.title}</h3>
            <p>{alert.message}</p>
            <div className='button_container_style'>
              {alert.cancelText && (
                <button
                  onClick={() => {alert.onCancel?.(); hideAlert();}}
                  className='button_style'
                  style={{ backgroundColor: '#fff', color: '#000' }}>
                    {alert.cancelText}
                </button>
              )}
              <button
                onClick={() => {alert.onConfirm?.(); hideAlert();}}
                className='button_style'
                style={{ backgroundColor: '#000', color: '#fff' }}>
                  {alert.confirmText || "확인"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};