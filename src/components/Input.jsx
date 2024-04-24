import React, { useId, useState } from "react";

function Input({
    label,
    currencies,
    currencyNames,
    amount,
    currency,
    onAmountChange,
    onCurrencyChange,
    readonly = false,
}) {
    const id = useId();
    const id1 = useId();
    return (
        <div className="text-md text-gray-700 p-5 m-4 flex justify-between gap-5 rounded-lg bg-gray-50">
            <div className="w-2/5  flex flex-col gap-4">
                <label className="" htmlFor={id}>
                    {label}
                </label>
                <input
                    className="rounded-lg bg-gray-200 p-1.5 px-3"
                    type="number"
                    name="input"
                    id={id}
                    readOnly={readonly}
                    value={amount}
                    onChange={(e) => {
                        onAmountChange(e.target.value);
                    }}
                />
            </div>
            <div className="w-2/5 flex flex-col gap-4">
                <label className="text-end" htmlFor={id1}>
                    Currency
                </label>

                <select
                    className="rounded-lg bg-gray-200 p-1.5 px-3"
                    name="currency"
                    id={id1}
                    value={currency}
                    onChange={(e) => {
                        onCurrencyChange(e.target.value);
                    }}
                >
                    {currencies.map(
                        (currency, key) =>
                            currency.charAt(0).match(/[a-z]/i) && (
                                <option
                                    key={key}
                                    value={currency}
                                    className="font-semibold test-sm text-gray-700"
                                >
                                    {/* {currencyNames[currency]}  */}
                                    {currency.toUpperCase()}
                                </option>
                            )
                    )}
                </select>
            </div>
        </div>
    );
}

export default Input;
