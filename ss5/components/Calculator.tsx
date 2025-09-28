import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = width / 4 - 12;

type CalculatorButtonProps = {
  label: string;
  onPress: () => void;
  isOperator?: boolean;
  isDouble?: boolean;
  isEquals?: boolean;
};

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onPress,
  isOperator = false,
  isDouble = false,
  isEquals = false,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      isDouble && styles.doubleButton,
      isOperator && styles.operatorButton,
      isEquals && styles.equalsButton,
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[
      styles.buttonText,
      isOperator && styles.operatorText,
      isEquals && styles.equalsText,
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const Calculator: React.FC = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  const handleNumberPress = (number: string) => {
    if (currentNumber === '0' || shouldReset) {
      setCurrentNumber(number);
      setShouldReset(false);
    } else {
      setCurrentNumber(`${currentNumber}${number}`);
    }
  };

  const handleOperatorPress = (op: string) => {
    if (currentNumber === '0' && previousNumber) {
      setOperation(op);
      return;
    }

    if (previousNumber) {
      const result = calculate();
      setCurrentNumber(String(result));
      setPreviousNumber(String(result));
    } else {
      setPreviousNumber(currentNumber);
    }
    setOperation(op);
    setShouldReset(true);
  };

  const calculate = (): number => {
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    
    if (isNaN(prev) || isNaN(current)) return 0;

    switch (operation) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (!operation || shouldReset) return;

    const result = calculate();
    setCurrentNumber(String(result));
    setPreviousNumber('');
    setOperation('');
    setShouldReset(true);
  };

  const handleClear = () => {
    setCurrentNumber('0');
    setPreviousNumber('');
    setOperation('');
    setShouldReset(false);
  };

  const handleDecimal = () => {
    if (shouldReset) {
      setCurrentNumber('0.');
      setShouldReset(false);
      return;
    }

    if (!currentNumber.includes('.')) {
      setCurrentNumber(`${currentNumber}.`);
    }
  };

  const handlePlusMinus = () => {
    setCurrentNumber(String(parseFloat(currentNumber) * -1));
  };

  const handlePercentage = () => {
    setCurrentNumber(String(parseFloat(currentNumber) / 100));
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.previousText}>
          {previousNumber} {operation}
        </Text>
        <Text style={styles.resultText} numberOfLines={1}>
          {currentNumber}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <CalculatorButton label="C" onPress={handleClear} isOperator />
          <CalculatorButton label="±" onPress={handlePlusMinus} isOperator />
          <CalculatorButton label="%" onPress={handlePercentage} isOperator />
          <CalculatorButton label="÷" onPress={() => handleOperatorPress('÷')} isOperator />
        </View>

        <View style={styles.row}>
          <CalculatorButton label="7" onPress={() => handleNumberPress('7')} />
          <CalculatorButton label="8" onPress={() => handleNumberPress('8')} />
          <CalculatorButton label="9" onPress={() => handleNumberPress('9')} />
          <CalculatorButton label="×" onPress={() => handleOperatorPress('×')} isOperator />
        </View>

        <View style={styles.row}>
          <CalculatorButton label="4" onPress={() => handleNumberPress('4')} />
          <CalculatorButton label="5" onPress={() => handleNumberPress('5')} />
          <CalculatorButton label="6" onPress={() => handleNumberPress('6')} />
          <CalculatorButton label="-" onPress={() => handleOperatorPress('-')} isOperator />
        </View>

        <View style={styles.row}>
          <CalculatorButton label="1" onPress={() => handleNumberPress('1')} />
          <CalculatorButton label="2" onPress={() => handleNumberPress('2')} />
          <CalculatorButton label="3" onPress={() => handleNumberPress('3')} />
          <CalculatorButton label="+" onPress={() => handleOperatorPress('+')} isOperator />
        </View>

        <View style={styles.row}>
          <CalculatorButton 
            label="0" 
            onPress={() => handleNumberPress('0')} 
            isDouble 
          />
          <CalculatorButton label="." onPress={handleDecimal} />
          <CalculatorButton label="=" onPress={handleEquals} isEquals />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    padding: 20,
  },
  previousText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 30,
    textAlign: 'right',
  },
  resultText: {
    color: '#fff',
    fontSize: 60,
    textAlign: 'right',
    marginTop: 10,
  },
  buttonsContainer: {
    flex: 5,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 4,
  },
  doubleButton: {
    width: BUTTON_SIZE * 2 + 12,
    alignItems: 'flex-start',
    paddingLeft: BUTTON_SIZE / 2 + 6,
  },
  operatorButton: {
    backgroundColor: '#ff9f0a',
  },
  equalsButton: {
    backgroundColor: '#ff9f0a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  operatorText: {
    color: '#fff',
  },
  equalsText: {
    color: '#fff',
  },
});
