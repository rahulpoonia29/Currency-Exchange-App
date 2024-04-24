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
                backgroundImage: "url(./bg.png)",
                backgroundSize: "cover",
            }}
            className="w-full h-full flex flex-col items-center justify-evenly lg:gap-5 lg:flex-row bg-slate-400"
        >
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
    );
}

export default App;
