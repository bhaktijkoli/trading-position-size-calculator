import { Alert, FormControl, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack } from '@chakra-ui/react'
import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from 'react'

const Calculator: React.FC = () => {
  const [riskPerTrade, setRiskPerTrade] = useLocalStorage('riskPerTrade', 500)
  const [entryPrice, setEntryPrice] = useLocalStorage('entryPrice', 0)
  const [stopLossPrice, setStopLossPrice] = useLocalStorage('stopLossPrice', 0)
  const [quantity, setQuantity] = useLocalStorage('quantity', 0)

  React.useEffect(() => {
    const stopLossInPoints = Math.abs(entryPrice - stopLossPrice)
    const quantity = Math.floor(riskPerTrade / stopLossInPoints) || 0
    setQuantity(quantity)
  }, [riskPerTrade, entryPrice, stopLossPrice])

  return (
    <VStack spacing={4}>
      <Heading size='md'>Position Size Calculator</Heading>
      {/* risk per trade input */}
      <FormControl>
        <FormLabel>Risk Per Trade (R)</FormLabel>
        <NumberInput
          value={riskPerTrade || 1}
          onChange={(valueString) => setRiskPerTrade(parseInt(valueString))}
          min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      {/* entry price input */}
      <FormControl>
        <FormLabel>Entry Price</FormLabel>
        <NumberInput
          value={entryPrice || 1}
          onChange={(valueString) => setEntryPrice(parseInt(valueString))}
          min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      {/* stoploss price input */}
      <FormControl>
        <FormLabel>Stop Loss (SL)</FormLabel>
        <NumberInput
          value={stopLossPrice || 1}
          onChange={(valueString) => setStopLossPrice(parseInt(valueString))}
          min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Alert status='info'>
        <VStack justifyContent='flex-start'>
          <Text>Quantity: <b>{quantity}</b></Text>
        </VStack>
      </Alert>
    </VStack>
  )
}

export default Calculator
