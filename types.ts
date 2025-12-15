export type Operator = '/' | '*' | '+' | '-' | null;

export enum ButtonVariant {
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
  ACTION = 'ACTION', // Like Clear
  EQUALS = 'EQUALS'
}

export interface CalculatorState {
  currentInput: string;
  firstOperand: number | null;
  operator: Operator;
  waitingForSecondOperand: boolean;
}