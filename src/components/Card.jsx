import { useState, useEffect } from "react";
import React from "react";
import Input from "./Input";

function onCurrencyChange(amount, fromCurrency, toCurrency, data) {
    setToAmount(data[fromCurrency] / data[toCurrency]);
}

function Card({ currencyData, currencies, currencyNames }) {
    const [amount, setAmount] = useState(1);
    const [toAmount, setToAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("usd");
    const [toCurrency, setToCurrency] = useState("inr");

    useEffect(() => {
        if (
            Object.keys(currencyData).length !== 0 &&
            currencyData["usd"] &&
            currencyData["usd"][toCurrency] &&
            currencyData["usd"][fromCurrency]
        ) {
            setToAmount(
                Math.round(
                    amount *
                        100 *
                        (currencyData["usd"][toCurrency] /
                            currencyData["usd"][fromCurrency])
                ) / 100
            );
        }
    }, [amount, fromCurrency, toCurrency, currencyData]);
    return (
        <div className="w-[90%] md:w-[500px] text-md bg-white p-0 rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg">
            <div
                onClick={() => {
                    setFromCurrency(toCurrency);
                    setToCurrency(fromCurrency);
                }}
                className="p-2 px-4 cursor-pointer z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg select-none bg-violet-400 hover:bg-violet-500 transition-colors ease-in-out"
            >
                SWAP
            </div>
            <Input
                label="From"
                currencies={currencies}
                currencyNames={currencyNames}
                amount={amount}
                currency={fromCurrency}
                onAmountChange={setAmount}
                onCurrencyChange={(curr) => {
                    setFromCurrency(curr);
                }}
            ></Input>
            <Input
                label="To"
                currencies={currencies}
                currencyNames={currencyNames}
                amount={toAmount}
                currency={toCurrency}
                onAmountChange={setAmount}
                onCurrencyChange={(curr) => {
                    setToCurrency(curr);
                    console.log(curr);
                }}
                readonly={true}
            ></Input>
        </div>
    );
}

export default Card;
