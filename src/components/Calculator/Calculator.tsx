import { Alert, FormControl, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack } from '@chakra-ui/react'
import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from 'react'

const Calculator: React.FC = () => {
  const [riskPerTrade, setRiskPerTrade] = useLocalStorage('riskPerTrade', '500')
  const [entryPrice, setEntryPrice] = useLocalStorage('entryPrice', '0')
  const [stopLossPrice, setStopLossPrice] = useLocalStorage('stopLossPrice', '0')
  const [quantity, setQuantity] = useLocalStorage('quantity', 0)
  const [targets, setTargets] = useLocalStorage<number[]>('targets', [])

  React.useEffect(() => {
    const parsedStopLossPrice = parseInt(stopLossPrice)
    const parsedEntryPrice = parseInt(entryPrice)
    const parsedRiskPerTrade = parseInt(riskPerTrade)
    if (!parsedStopLossPrice || !parsedEntryPrice || !parsedRiskPerTrade) return
    const stopLossInPoints = parsedEntryPrice - parsedStopLossPrice
    const quantity = Math.floor(parsedRiskPerTrade / Math.abs(stopLossInPoints)) || 0
    setQuantity(quantity)
    setTargets([parsedEntryPrice + stopLossInPoints, parsedEntryPrice + 2 * stopLossInPoints, parsedEntryPrice + 3 * stopLossInPoints])
  }, [riskPerTrade, entryPrice, stopLossPrice])

  return (
    <VStack spacing={4}>
      <Heading size='md'>Position Size Calculator</Heading>
      {/* risk per trade input */}
      <FormControl>
        <FormLabel>Risk Per Trade (R)</FormLabel>
        <NumberInput
          value={riskPerTrade}
          onChange={(valueString) => setRiskPerTrade(valueString)}
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
          value={entryPrice}
          onChange={(valueString) => setEntryPrice(valueString)}
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
          value={stopLossPrice}
          onChange={(valueString) => setStopLossPrice(valueString)}
          min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      {
        quantity && (
          <Alert status='info'>
            <VStack alignItems='flex-start'>
              <Text>Quantity: <b>{quantity}</b></Text>
              <Text>Target: <b>{targets.join(' - ')}</b></Text>
            </VStack>
          </Alert>
        )
      }
    </VStack>
  )
}

export default Calculator
