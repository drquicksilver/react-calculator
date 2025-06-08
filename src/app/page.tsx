'use client';

import { useState } from 'react';

enum Operation {
  Add = '+',
  Subtract = '-',
  Multiply = 'x',
  Divide = '➗',
}

export default function Home() {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operation | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const calculate = (val1: number, op: Operation, val2: number): number => {
    switch (op) {
      case Operation.Add:
        return val1 + val2;
      case Operation.Subtract:
        return val1 - val2;
      case Operation.Multiply:
        return val1 * val2;
      case Operation.Divide:
        if (val2 === 0) {
          return NaN; // Handle division by zero
        }
        return val1 / val2;
      default:
        return val2; // Should not happen
    }
  };

  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? num : displayValue + num);
    }
  };

  const handleOperatorClick = (op: Operation) => {
    const currentValue = parseFloat(displayValue);

    if (isNaN(currentValue) && displayValue !== "Error") return; // Ignore if current display is not a number unless it's already an error

    if (operator && previousValue !== null && !waitingForOperand) {
      if (displayValue === "Error") { // If previous operation resulted in error
        setPreviousValue(null);
        setOperator(op);
        // waitingForOperand remains true
        return;
      }
      const result = calculate(previousValue, operator, currentValue);
      if (isNaN(result)) {
        setDisplayValue("Error");
      } else {
        setDisplayValue(result.toString());
        setPreviousValue(result);
      }
    } else {
      if (displayValue === "Error") { // if display is "Error", treat current value as 0 for next operation
         setPreviousValue(0);
      } else {
         setPreviousValue(currentValue);
      }
    }
    setOperator(op);
    setWaitingForOperand(true);
  };

  const handleEqualClick = () => {
    const currentValue = parseFloat(displayValue);

    if (isNaN(currentValue) && displayValue !== "Error") return;

    if (operator && previousValue !== null) {
      if (displayValue === "Error") { // If current display is "Error", reset
        handleClearClick();
        return;
      }
      const result = calculate(previousValue, operator, currentValue);
      if (isNaN(result)) {
        setDisplayValue("Error");
      } else {
        setDisplayValue(result.toString());
      }
      setPreviousValue(null);
      setOperator(null);
      // setWaitingForOperand(true); // Common behavior, can be false if we want to start a new calculation immediately
      setWaitingForOperand(true);
    }
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleSignToggleClick = () => {
    if (displayValue === "Error") return;
    if (displayValue !== "0") {
      setDisplayValue((parseFloat(displayValue) * -1).toString());
    }
  };

  const handlePercentageClick = () => {
    if (displayValue === "Error") return;
    setDisplayValue((parseFloat(displayValue) / 100).toString());
    // setWaitingForOperand(true); // Behavior might vary, often % acts immediately
  };

  const handleDecimalClick = () => {
    if (displayValue === "Error") return;
    if (waitingForOperand) {
        setDisplayValue("0.");
        setWaitingForOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="calculator-container bg-white p-4 rounded shadow-lg w-80">
        <div className="display bg-gray-200 text-right p-2 rounded mb-4 text-3xl h-20 flex items-center justify-end">
          {displayValue}
        </div>
        <div className="buttons-grid grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button onClick={handleClearClick} className="p-2 bg-gray-300 rounded text-xl">AC</button>
          <button onClick={handleSignToggleClick} className="p-2 bg-gray-300 rounded text-xl">+/-</button>
          <button onClick={handlePercentageClick} className="p-2 bg-gray-300 rounded text-xl">%</button>
          <button onClick={() => handleOperatorClick(Operation.Divide)} className="p-2 bg-orange-400 text-white rounded text-xl">➗</button>
          {/* Row 2 */}
          <button onClick={() => handleNumberClick('7')} className="p-2 bg-gray-300 rounded text-xl">7</button>
          <button onClick={() => handleNumberClick('8')} className="p-2 bg-gray-300 rounded text-xl">8</button>
          <button onClick={() => handleNumberClick('9')} className="p-2 bg-gray-300 rounded text-xl">9</button>
          <button onClick={() => handleOperatorClick(Operation.Multiply)} className="p-2 bg-orange-400 text-white rounded text-xl">x</button>
          {/* Row 3 */}
          <button onClick={() => handleNumberClick('4')} className="p-2 bg-gray-300 rounded text-xl">4</button>
          <button onClick={() => handleNumberClick('5')} className="p-2 bg-gray-300 rounded text-xl">5</button>
          <button onClick={() => handleNumberClick('6')} className="p-2 bg-gray-300 rounded text-xl">6</button>
          <button onClick={() => handleOperatorClick(Operation.Subtract)} className="p-2 bg-orange-400 text-white rounded text-xl">-</button>
          {/* Row 4 */}
          <button onClick={() => handleNumberClick('1')} className="p-2 bg-gray-300 rounded text-xl">1</button>
          <button onClick={() => handleNumberClick('2')} className="p-2 bg-gray-300 rounded text-xl">2</button>
          <button onClick={() => handleNumberClick('3')} className="p-2 bg-gray-300 rounded text-xl">3</button>
          <button onClick={() => handleOperatorClick(Operation.Add)} className="p-2 bg-orange-400 text-white rounded text-xl">+</button>
          {/* Row 5 */}
          <button onClick={() => handleNumberClick('0')} className="col-span-2 p-2 bg-gray-300 rounded text-xl">0</button>
          <button onClick={handleDecimalClick} className="p-2 bg-gray-300 rounded text-xl">.</button>
          <button onClick={handleEqualClick} className="p-2 bg-orange-400 text-white rounded text-xl">=</button>
        </div>
      </div>
    </div>
  );
}
