import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Height } from '../types/Toast';

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
  heights: Height[]
  setHeights: React.Dispatch<React.SetStateAction<Height[]>>
  deleteToast: (id: string) => void
}

export const Toast = ({ id, deleteToast, title, description, isHovering, index, heights, setHeights }: Props) => {
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
    const currentHeight = ref.current?.clientHeight || 0
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
    onClick={() => deleteToast(id)}
  >
    <h4>
      {title}
    </h4>
    <p>{description}</p>
  </StyledToast>
}
