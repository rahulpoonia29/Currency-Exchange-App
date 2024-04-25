import { useEffect, useState } from "react";
import Card from "./components/Card.jsx";
import CurrencyRates from "./components/CurrencyRates.jsx";

function App() {
    const [currencies] = useState([
        "usd",
        "eur",
        "jpy",
        "gbp",
        "cny",
        "aud",
        "cad",
        "chf",
        "hkd",
        "sgd",
        "sek",
        "krw",
        "nok",
        "nzd",
        "inr",
        "mxn",
        "twd",
        "zar",
        "brl",
        "dkk",
        "pln",
        "thb",
        "ils",
        "idr",
        "czk",
        "aed",
        "try",
        "huf",
        "clp",
        "sar",
        "php",
        "myr",
        "cop",
        "rub",
        "ron",
        "pen",
        "bhd",
        "bgn",
        "ars",
    ]);
    const [currencyData, setCurrencyData] = useState({});
    const [currencyNames, setCurrencyNames] = useState({});

    useEffect(() => {
        (async () => {
            await fetch(
                "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
            )
                .then((res) => res.json())
                .then((data) => {
                    setCurrencyData(data);
                })
                .catch((error) => {
                    console.error("Error fetching currency data:", error);
                });
        })();
    }, []);

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
        <div
            style={{
                backgroundImage: "url(./bg2.svg)",
                backgroundRepeat: "repeat",
            }}
            className="w-full py-5 gap-8 text-center flex flex-col items-center justify-evenly"
        >
            <div className="text-gray-700 px-5 py-3 rounded-lg bg-gray-50 inline-block">
                <h1 className="text-violet-800 text-3xl">ConvertMaster</h1>
                <p className="text-sm font-semibold">
                    {" "}
                    Your Ultimate Currency Converter
                </p>
            </div>
            {/* <div className="w-full h-full flex flex-col items-center justify-evenly lg:gap-5 lg:flex-col"> */}
            <Card
                currencyData={currencyData}
                currencies={currencies}
                currencyNames={currencyNames}
            />
            <CurrencyRates
                currencyData={currencyData}
                currencies={currencies}
                currencyNames={currencyNames}
                
            />
        </div>
        // </div>
    );
}

export default App;
