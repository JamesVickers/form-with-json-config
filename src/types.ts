type CurrencyInputValue =  'EUR' | 'USD' | 'GBP';
type EnumInputValue = 'yes' | 'no' | 'maybe';

interface TextInput {
    type: 'textInput';
    label: string;
    path: string;
    defaultValue?: string;
  }
  
  interface EnumInput {
    type: 'enumInput';
    label: string;
    path: string;
    values: EnumInputValue[];
    defaultValue?: string;
  }
  
  interface IntegerInput {
    type: 'integerInput';
    label: string;
    path: string;
    min?: number;
    max?: number;
    defaultValue?: number;
  }
  
  interface CurrencyInput {
    type: 'currencyInput';
    label: string;
    path: string;
    min?: number;
    max?: number;
    currencies: CurrencyInputValue[];
  }

export type InputItem = TextInput | EnumInput | IntegerInput | CurrencyInput;

type ObjectAttribute = Record<string, unknown>;
