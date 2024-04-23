import { useState, useEffect } from "react";
import React from "react";
import Input from "./Input";
import swap from "../../public/swap.png";

function onCurrencyChange(amount, fromCurrency, toCurrency, data) {
    setToAmount(data[fromCurrency] / data[toCurrency]);
}

function Card({ currencyData, currencies}) {


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
                        10000 *
                        (currencyData["usd"][toCurrency] /
                            currencyData["usd"][fromCurrency])
                ) / 10000
            );
        }
    }, [amount, fromCurrency, toCurrency, currencyData]);
    return (
        <div className=" bg-white p-0 rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg">
            <div
                onClick={() => {
                    setFromCurrency(toCurrency);
                    setToCurrency(fromCurrency);
                }}
                style={{ backgroundImage: "url(./swap.png)" }} // Update the path of the image source
                className="p-2 px-4 cursor-pointer z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg select-none bg-blue-400"
            >
                SWAP
            </div>
            <Input
                label="From"
                currencies={currencies}
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
