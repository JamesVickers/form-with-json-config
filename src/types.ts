type CurrencyInputValue = 'EUR' | 'USD' | 'GBP';
type EnumInputValue = 'yes' | 'no' | 'maybe';

export interface TextInput {
    type: 'textInput';
    label: string;
    path: string;
    defaultValue?: string;
}

export interface EnumInput {
    type: 'enumInput';
    label: string;
    path: string;
    values: EnumInputValue[];
    defaultValue?: string;
}

export interface IntegerInput {
    type: 'integerInput';
    label: string;
    path: string;
    min?: number;
    max?: number;
    defaultValue?: number;
}

export interface CurrencyInput {
    type: 'currencyInput';
    label: string;
    path: string;
    min?: number;
    max?: number;
    currencies: CurrencyInputValue[];
}

export type InputItem = TextInput | EnumInput | IntegerInput | CurrencyInput;

type ObjectAttribute = Record<string, unknown>;
