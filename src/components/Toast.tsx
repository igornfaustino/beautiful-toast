import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

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

const StyledToast = styled(motion.div) <{ index: number, isHovering?: Boolean }>`
  background: #fff;
	position: absolute;
	pointer-events: auto;
  box-sizing: border-box;
	overflow: hidden;
  bottom: 12px;
  right: 12px;
	padding: 10px 20px;
	width: 300px;
	border-radius: 3px 3px 3px 3px;
	box-shadow: 0 0 10px #999;
	color: #000;
	background-position: 15px;
	background-repeat: no-repeat;
  z-index: ${({ index }) => 1000 - index};
`

type Props = {
  id: string
  title: string,
  timestamp: Date,
  description?: string,
  index: number,
  isHovering: Boolean,
  heights: any[]
  setHeights: React.Dispatch<React.SetStateAction<any[]>>
}

const Toast = ({ id, timestamp, title, description, isHovering, index, heights, setHeights }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [currHeight, setCurrHeight] = useState<number | undefined>(0)

  const getOffset = () => {
    const heightBefore = heights.reduce((acc, current, idx) => {
      if (index > idx) {
        return acc + current.height
      }
      return acc
    }, 0)
    const GAP = 10
    return heightBefore + index * GAP
  }

  const listView = () => `translateY(-${getOffset()}px)`
  const stackView = (index: number) => `translateY(calc(-15px * ${index})) scale(calc(-1 * ${index} * 0.05 + 1))`

  useEffect(() => {
    const currentHeight = ref.current?.clientHeight
    setHeights((heights) => [{ height: currentHeight, id: id }, ...heights.filter((h) => h.id !== id)])
    setCurrHeight(currentHeight)
  }, [setHeights, id])

  const cardHeight = !isHovering ? heights[0]?.height : currHeight

  return <StyledToast
    style={{
      height: currHeight ? cardHeight : undefined
    }}
    index={index}
    ref={ref}
    animate={{
      transform: isHovering ? listView() : stackView(index),
      opacity: index > 2 ? 0 : 1
    }}
  >
    <h4>
      {title}
    </h4>
    <p>{description}</p>
  </StyledToast>
}

function ToastProvider() {
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

export default ToastProvider
