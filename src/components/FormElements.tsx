import React, { ChangeEventHandler } from "react";
import { TextField } from "@mui/material";
import { InputItem } from "../types";
import { setDeepArray } from "../utils";

const FormElements = ({
    data,
    setData,
}: {
    data: InputItem[];
    setData: (editedTask: InputItem[]) => void;
}): JSX.Element => {

    // Handlers
    const onChange = (
        path: string,
        index: number
    ): ChangeEventHandler<HTMLInputElement> => (event) => {
        const newValue = event.target.value;

        // TODO: fix this TS warning
        // @ts-expect-error
        setData((prevData: InputItem[]): InputItem[] => {
            const updatedData = setDeepArray(prevData, index, path, newValue);
            return updatedData;
        });
    };

    // Utils
    const isValidProperty = (obj: object, prop: string): prop is keyof typeof obj => {
        return prop in obj;
    };

    const getValue = (item: InputItem) => {
        const newValue = isValidProperty(item, item.path) && item[item.path as keyof InputItem] !== undefined
            ? item[item.path as keyof InputItem] as string
            : 'defaultValue' in item
                ? item.defaultValue ?? ''
                : '';
        return newValue;
    };

    const formElements = (item: InputItem, index: number) => {
        switch (item.type) {
            case "textInput":
                return (
                    <TextField
                        key={index}
                        label={item.label}
                        id={item.label}
                        name={item.label}
                        value={getValue(item)}
                        onChange={onChange(item.path, index)}
                    />
                );
            case "enumInput":
                return (
                    <TextField
                        key={index}
                        select
                        label={item.label}
                        id={item.label}
                        name={item.label}
                        value={getValue(item)}
                        onChange={onChange(item.path, index)}
                    >
                        {item.values?.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </TextField>
                );
            case "integerInput":
                return (
                    <TextField
                        key={index}
                        type="number"
                        label={item.label}
                        id={item.label}
                        name={item.label}
                        value={getValue(item)}
                        onChange={onChange(item.path, index)}
                        inputProps={{
                            min: item.min,
                            max: item.max,
                        }}
                    />
                );
            case "currencyInput":
                return (
                    <TextField
                        key={index}
                        select
                        label={item.label}
                        id={item.label}
                        name={item.label}
                        value={getValue(item)}
                        onChange={onChange(item.path, index)}
                    >
                        {item.currencies?.map((currency: string) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </TextField>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {data && data.map((item, index) => (
                <div key={index}>
                    {formElements(item, index)}
                </div>
            ))}
        </>

    );
};

export default FormElements;
