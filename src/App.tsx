import * as React from 'react'
import Calculator from './components/Calculator/Calculator'
import { Box } from '@chakra-ui/react'

const App: React.FC = () => {
  return (
    <Box p={10} maxW='500px'>
      <Calculator />
    </Box>
  )
}

export default App
