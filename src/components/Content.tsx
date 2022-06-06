import styled from 'styled-components'
import { useToast } from '../hooks/useToast'

const MainView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 15px;
`

const Button = styled.button`
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-size: 100%;
  height: 44px;
  padding: 0 25px;
`

const Content = () => {
  const { dispatchToast } = useToast()

  return (
    <MainView>
      <Button onClick={() => dispatchToast({ title: 'Title', description: 'loren ipsum' })}>Add larger toast</Button>
      <Button onClick={() => dispatchToast({ title: 'Title' })}>Add small toast</Button>
    </MainView>
  )
}

export default Content
