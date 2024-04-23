import React, { useState, useEffect } from "react";

function CurrencyRates({ currencyData, currencies}) {


    const [currencyNames, setCurrencyNames] = useState({});

    useEffect(() => {
        (async () => {
            await fetch(
                "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
            )
                .then((res) => res.json())
                .then((data) => {
                    setCurrencyNames(data);
                })
                .catch((error) => {
                    console.error("Error fetching currency data:", error);
                });
        })();
    });

    return (
        <div className="w-[40%] max-h-[90%] overflow-y-scroll no-scrollbar bg-white p-4 rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg">
            <div className="w-full rounded-lg bg-gray-100">
                <table className="w-full table-auto text-md text-left">
                    <thead className=" border-b-2 border-gray-200 rounded-xl">
                        <tr>
                            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">
                                Currency
                            </th>
                            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">
                                Rate (1$)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currencies.map((currency, index) => (
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CurrencyRates;
