import React, { useState, useEffect } from "react";

function CurrencyRates({ currencyData, currencies, currencyNames }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = (date.getDate() - 2).toString().padStart(2, "0");
    const [pastCurrencyData, setPastCurrencyData] = useState({});

    useEffect(() => {
        (async () => {
            await fetch(
                `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${year}-${month}-${day}/v1/currencies/usd.json`
            )
                .then((res) => res.json())
                .then((data) => {
                    setPastCurrencyData(data);
                })
                .catch((error) => {
                    console.error("Error fetching currency data:", error);
                });
        })();
    });

    return (
        <div className="w-[90%] max-h-[95%] lg:w-[70%] overflow-y-scroll no-scrollbar bg-white p-4 rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg">
            <table className="w-full table-auto text-md text-left">
                <thead className=" border-b-2 bg-gray-100 rounded-xl">
                    <tr>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">
                            Currency
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">
                            Rate (1$)
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">
                            Change (1d)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.map((currency, index) => {
                        let percentageChange = 0;
                        if (currencyData.usd && pastCurrencyData.usd) {
                            percentageChange =
                                Math.round(
                                    ((currencyData.usd[currency] -
                                        pastCurrencyData.usd[currency]) *
                                        10000) /
                                        currencyData.usd[currency]
                                ) / 100;
                        }

                        return (
                            <tr
                                key={index}
                                className="bg-gray-50 border-b border-gray-200"
                            >
                                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                    {currencyNames[currency]} (
                                    {currency.toUpperCase()})
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                    {currencyData &&
                                        currencyData.usd &&
                                        Math.round(
                                            currencyData.usd[currency] * 1000
                                        ) / 1000}
                                </td>
                                <td
                                    className={`px-6 py-4 text-sm font-medium ${
                                        percentageChange >= 0
                                            ? "text-emerald-700"
                                            : "text-red-400"
                                    } ${
                                        percentageChange == 0
                                            ? "text-gray-700"
                                            : null
                                    }
                                    }`}
                                >
                                    {percentageChange}%
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CurrencyRates;
