import React, { ChangeEventHandler } from "react";
import { MenuItem, TextField } from "@mui/material";
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
        if (
            isValidProperty(item, item.path) &&
            item[item.path as keyof InputItem] !== undefined
        ) {
            return item[item.path as keyof InputItem] as string
        } else if ('defaultValue' in item) {
            return item.defaultValue ?? '';
        } else {
            return '';
        }
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
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
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
                            <MenuItem key={currency} value={currency}>
                                {currency}
                            </MenuItem>
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
