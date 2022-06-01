import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { Height, ToastType } from "../types/Toast";
import { Toast } from "./Toast";

const TIME_TO_LIVE_NOTIFICATION_IN_MS = 10 * 1000

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
  const [heights, setHeights] = useState<Height[]>([])

  const addToast = useCallback(({ title, description }: { title: string, description?: string }) => {
    setToastList(toastList => [{
      title: title,
      description: description,
      timestamp: new Date(),
      id: uuidv4(),
    }, ...toastList])
  }, [])

  const deleteToast = (id: string) => {
    setToastList(toastList => toastList.filter(toast => toast.id !== id))
    setHeights((heights) => heights.filter(height => height.id !== id))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const threshold = Date.now() - TIME_TO_LIVE_NOTIFICATION_IN_MS
      const idsToRemove: string[] = []
      setToastList(toastList => toastList.filter(toast => {
        const isOldToast = toast.timestamp.getTime() < threshold
        if (isOldToast) idsToRemove.push(toast.id)
        return !isOldToast
      }))
      setHeights((heights) => heights.filter(height => !idsToRemove.includes(height.id)))
    }, 1000)
    return () => clearInterval(interval)
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
              deleteToast={deleteToast}
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

