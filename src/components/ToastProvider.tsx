import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
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

export function ToastProvider() {
  const [isHovering, setIsHovering] = useState(false)
  const [toastList, setToastList] = useState<any[]>([])
  const [heights, setHeights] = useState<any[]>([])

  useEffect(() => {
    let itens = 0
    const interval = setInterval(() => {
      if (itens >= 10) {
        return
      }
      itens++
      setToastList(toastList => [{
        title: `Toast ${toastList.length + 1}`,
        description: 'test',
        timestamp: new Date(),
        id: uuidv4(),
        index: toastList.length + 1
      }, ...toastList])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
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
            description={toast.index % 2 !== 0 ? toast.description : ''}
          />
        ))
      }
    </NotificationContainer >
  )
}

