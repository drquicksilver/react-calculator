'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './contexts/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher'; // Import ThemeSwitcher
import { useMode } from './contexts/ModeContext';
import ModeToggle from './components/ModeToggle';
import NumberButton from './components/NumberButton';
import { NumberButtonProvider } from './components/NumberButtonProvider';
import OperationButton from './components/OperationButton';
import { OperationButtonProvider } from './components/OperationButtonProvider';
import SpecialButton from './components/SpecialButton';
import { SpecialButtonProvider } from './components/SpecialButtonProvider';
import { Operation } from './types';

// SVG Icon Components
const PlusIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"></path></svg>;
const MinusIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path></svg>;
const MultiplyIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>;
const DivideIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <circle cx="12" cy="7" r="1" fill="currentColor"></circle>
    <circle cx="12" cy="17" r="1" fill="currentColor"></circle>
  </svg>
);

export default function Home() {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operation | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const { theme } = useTheme();
  const { mode } = useMode();

  // Clear the display whenever the user switches modes
  useEffect(() => {
    handleClearClick();
  }, [mode]);

  const handleSpecialClick = (value: string) => {
    if (mode === 'algebraic') {
      switch (value) {
        case 'AC':
          handleClearClick();
          break;
        case '.':
          setDisplayValue((prev) => (prev === '0' ? '0.' : prev + '.'));
          break;
        case '(':
        case ')':
          setDisplayValue((prev) => (prev === '0' ? value : prev + value));
          break;
        case '=':
          // evaluation not implemented yet
          break;
        default:
          // ignore other specials in algebraic mode for now
          break;
      }
      return;
    }
    switch (value) {
      case 'AC':
        handleClearClick();
        break;
      case '+/-':
        handleSignToggleClick();
        break;
      case '%':
        handlePercentageClick();
        break;
      case '.':
        handleDecimalClick();
        break;
      case '=':
        handleEqualClick();
        break;
      default:
        console.warn('Unhandled special button value:', value);
    }
  };

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

const operatorSymbols: Record<Operation, string> = {
  [Operation.Add]: '+',
  [Operation.Subtract]: '-',
  [Operation.Multiply]: '×',
  [Operation.Divide]: '÷',
};

  const handleNumberClick = (num: string) => {
    if (mode === 'algebraic') {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
      return;
    }
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? num : displayValue + num);
    }
  };

  const handleOperatorClick = (op: Operation) => {
    if (mode === 'algebraic') {
      const symbol = operatorSymbols[op];
      setDisplayValue(displayValue === '0' ? symbol : displayValue + symbol);
      return;
    }
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
    if (mode === 'algebraic') {
      // evaluation will be implemented later
      return;
    }
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
      {/* Theme and mode toggles */}
      <div className="fixed top-2 right-2 flex flex-col sm:flex-row gap-2 items-end">
        <ModeToggle />
        <ThemeSwitcher />
      </div>
      <div className="calculator-container bg-white p-4 rounded shadow-lg w-80">
        <div className="display bg-gray-200 text-right p-2 rounded mb-4 text-3xl h-20 flex items-center justify-end">
          {displayValue}
        </div>
        <SpecialButtonProvider onSpecialClick={handleSpecialClick}>
          <OperationButtonProvider onOperationClick={handleOperatorClick}>
            <NumberButtonProvider onNumberClick={handleNumberClick}>
              <div className="buttons-grid grid grid-cols-4 gap-2">
                {/* Row 1 */}
                <SpecialButton value="AC" />
                <SpecialButton value="+/-" />
                <SpecialButton value="%" />
                <OperationButton operation={Operation.Divide} icon={<DivideIcon />} />
          {/* Row 2 */}
          <NumberButton value="7" />
          <NumberButton value="8" />
          <NumberButton value="9" />
                <OperationButton operation={Operation.Multiply} icon={<MultiplyIcon />} />
          {/* Row 3 */}
          <NumberButton value="4" />
          <NumberButton value="5" />
          <NumberButton value="6" />
                <OperationButton operation={Operation.Subtract} icon={<MinusIcon />} />
          {/* Row 4 */}
          <NumberButton value="1" />
          <NumberButton value="2" />
          <NumberButton value="3" />
                <OperationButton operation={Operation.Add} icon={<PlusIcon />} />
          {/* Row 5 */}
          <NumberButton
            value="0"
            className={`col-span-2 ${theme === 'typewriter' ? 'justify-self-center' : ''}`}
          />
                <SpecialButton value="." />
                <SpecialButton value="=" className="bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-white" />
                {mode === 'algebraic' && (
                  <>
                    {/* Row 6 */}
                    <SpecialButton value="(" />
                    <SpecialButton value=")" />
                    <div className="invisible" />
                    <div className="invisible" />
                  </>
                )}
              </div>
            </NumberButtonProvider>
          </OperationButtonProvider>
        </SpecialButtonProvider>
      </div>
    </div>
  );
}
