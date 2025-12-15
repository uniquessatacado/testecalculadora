import React, { useState, useCallback } from 'react';
import Display from './components/Display';
import Button from './components/Button';
import { ButtonVariant, Operator } from './types';

const App: React.FC = () => {
  const [currentInput, setCurrentInput] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const performCalculation = {
    '/': (first: number, second: number) => second === 0 ? NaN : first / second,
    '*': (first: number, second: number) => first * second,
    '+': (first: number, second: number) => first + second,
    '-': (first: number, second: number) => first - second,
  };

  const handleDigitClick = useCallback((digit: string) => {
    if (waitingForSecondOperand) {
      setCurrentInput(digit);
      setWaitingForSecondOperand(false);
    } else {
      setCurrentInput(prev => prev === '0' ? digit : prev + digit);
    }
  }, [waitingForSecondOperand]);

  const handleDecimalClick = useCallback(() => {
    if (waitingForSecondOperand) {
      setCurrentInput('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!currentInput.includes('.')) {
      setCurrentInput(prev => prev + '.');
    }
  }, [currentInput, waitingForSecondOperand]);

  const handleClear = useCallback(() => {
    setCurrentInput('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  }, []);

  const handleOperatorClick = useCallback((nextOperator: Operator) => {
    const inputValue = parseFloat(currentInput);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator && !waitingForSecondOperand) {
      // Perform pending calculation before setting new operator
      const result = performCalculation[operator](firstOperand, inputValue);
      
      if (isNaN(result) || !isFinite(result)) {
          setCurrentInput('Erro');
          setFirstOperand(null);
          setOperator(null);
          setWaitingForSecondOperand(false);
          return;
      }

      // Round to avoid floating point long strings
      const roundedResult = Math.round(result * 100000000) / 100000000;
      setCurrentInput(String(roundedResult));
      setFirstOperand(roundedResult);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  }, [currentInput, firstOperand, operator, waitingForSecondOperand]);

  const handleEqualClick = useCallback(() => {
    if (!operator || firstOperand === null) return;

    const inputValue = parseFloat(currentInput);
    const result = performCalculation[operator](firstOperand, inputValue);

    if (isNaN(result) || !isFinite(result)) {
        setCurrentInput('Erro');
    } else {
        const roundedResult = Math.round(result * 100000000) / 100000000;
        setCurrentInput(String(roundedResult));
        setFirstOperand(roundedResult);
    }
    
    setOperator(null);
    setWaitingForSecondOperand(true);
  }, [currentInput, firstOperand, operator]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
        
        <div className="mb-2 flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm px-1">
            <span>Calculadora Simples</span>
            <span>React + Tailwind</span>
        </div>

        <Display value={currentInput} />

        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button 
            label="C" 
            onClick={handleClear} 
            variant={ButtonVariant.ACTION} 
          />
          <Button 
            label="/" 
            onClick={() => handleOperatorClick('/')} 
            variant={ButtonVariant.OPERATOR} 
          />
          <Button 
            label="×" 
            onClick={() => handleOperatorClick('*')} 
            variant={ButtonVariant.OPERATOR} 
          />
          <Button 
            label="-" 
            onClick={() => handleOperatorClick('-')} 
            variant={ButtonVariant.OPERATOR} 
          />

          {/* Row 2 */}
          <Button label="7" onClick={() => handleDigitClick('7')} />
          <Button label="8" onClick={() => handleDigitClick('8')} />
          <Button label="9" onClick={() => handleDigitClick('9')} />
          <Button 
            label="+" 
            onClick={() => handleOperatorClick('+')} 
            variant={ButtonVariant.OPERATOR} 
          />

          {/* Row 3 */}
          <Button label="4" onClick={() => handleDigitClick('4')} />
          <Button label="5" onClick={() => handleDigitClick('5')} />
          <Button label="6" onClick={() => handleDigitClick('6')} />
          
          {/* Row 4 (1-3) & Equals (spans 2 rows vertically effectively in design logic, but grid is simple here) */}
          {/* To match the requested layout where = is big or standard grid: 
              The requested layout had 1,2,3 then 0, ., =. 
              Let's stick to a standard 4x5 or 4x4 grid. 
              The prompt CSS had equals spanning 2 columns.
          */}
          
          {/* Row 4 */}
          <Button label="1" onClick={() => handleDigitClick('1')} />
          <Button label="2" onClick={() => handleDigitClick('2')} />
          <Button label="3" onClick={() => handleDigitClick('3')} />
          
          {/* To make the grid work nicely with the Equals button taking 2 columns/rows, 
             we often put equals at the bottom right.
             Let's use a standard grid and handle the span via classname. 
          */}
          <Button 
            label="=" 
            onClick={handleEqualClick} 
            variant={ButtonVariant.EQUALS}
            className="row-span-2 h-full" 
          />

          {/* Row 5 */}
          <Button label="0" onClick={() => handleDigitClick('0')} className="col-span-2" />
          <Button label="." onClick={handleDecimalClick} />
        </div>
      </div>
    </div>
  );
};

export default App;