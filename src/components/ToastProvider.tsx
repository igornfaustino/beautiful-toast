import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { ToastType } from "../types/Toast";
import { Toast } from "./Toast";

const NotificationContainer = styled.div`
  position: fixed;
  font-size: 14px;
  box-sizing: border-box;
  bottom: 12px;
  right: 12px;
  width: 324px;

  &:hover {
    height: 100vh;
  }
`

export const ToastContext = React.createContext<{
  dispatchToast: (args: Pick<ToastType, 'title' | 'description'>) => void
}>({
  dispatchToast: () => { }
})

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [toastList, setToastList] = useState<ToastType[]>([])
  const [heights, setHeights] = useState<any[]>([])

  const addToast = useCallback(({ title, description }: { title: string, description?: string }) => {
    setToastList(toastList => [{
      title: title,
      description: description,
      timestamp: new Date(),
      id: uuidv4(),
    }, ...toastList])
  }, [])

  return (
    <ToastContext.Provider value={{
      dispatchToast: addToast
    }}>
      {children}
      <NotificationContainer onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
        {
          [...toastList].map((toast, index) => (
            <Toast
              heights={heights}
              setHeights={setHeights}
              index={index}
              isHovering={isHovering}
              key={toast.id}
              title={toast.title}
              id={toast.id}
              timestamp={toast.timestamp}
              description={toast.description}
            />
          ))
        }
      </NotificationContainer >
    </ToastContext.Provider>

  )
}

