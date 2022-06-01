import React from 'react'
import { useToast } from '../hooks/useToast'

const Content = () => {
  const { dispatchToast } = useToast()

  return (
    <div>
      <button onClick={() => dispatchToast({ title: 'Title', description: 'loren ipsum' })}>Add larger toast</button>
      <button onClick={() => dispatchToast({ title: 'Title' })}>Add small toast</button>
    </div>
  )
}

export default Content
