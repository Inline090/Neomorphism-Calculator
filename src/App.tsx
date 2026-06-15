import React, { useState, useEffect } from "react";
import Switch from "./components/Switch";

type Operator = "+" | "-" | "X" | "/" | "%";

function formatNumber(n: number) {
  if (Number.isInteger(n)) return String(n);
  return String(n);
}

export default function App() {
  const [display, setDisplay] = useState<string>("0");
  const [calculations, setCalculations] = useState<string>("");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<Operator | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  const inputDigit = (d: string) => {
    if (waiting) {
      setDisplay(d);
      setWaiting(false);
    } else {
      setDisplay((p) => (p === "0" ? d : p + d));
    }
    setCalculations((c) => (waiting ? c + d : c === "0" ? d : c + d));
  };

  const inputDot = () => {
    if (waiting) {
      setDisplay("0.");
      setWaiting(false);
      setCalculations((c) => c + "0.");
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
      setCalculations((c) => c + ".");
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setCalculations("");
    setPrev(null);
    setOp(null);
    setWaiting(false);
  };

  const toggleSign = () => {
    const value = parseFloat(display) || 0;
    const toggled = -value;
    setDisplay(formatNumber(toggled));
    setCalculations((c) => c.replace(/(-?\d*\.?\d+)$/g, String(toggled)));
  };

  const applyPercent = () => {
    const value = parseFloat(display) || 0;
    const res = value / 100;
    setDisplay(String(res));
    setCalculations((c) => c.replace(/(-?\d*\.?\d+)$/g, String(res)));
  };

  const performCalc = (a: number, operator: Operator, b: number) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "X":
        return a * b;
      case "/":
        return b === 0 ? Infinity : a / b;
      default:
        return b;
    }
  };

  const handleOperator = (operator: Operator) => {
    const current = parseFloat(display);
    if (prev === null) {
      setPrev(current);
    } else if (op && !waiting) {
      const result = performCalc(prev, op, current);
      setPrev(result);
      setDisplay(formatNumber(result));
    }
    setOp(operator);
    setWaiting(true);
    setCalculations((c) => c + operator);
  };

  const calculate = () => {
    if (op == null || prev == null) return;
    const current = parseFloat(display);
    const result = performCalc(prev, op, current);
    setDisplay(formatNumber(result));
    setCalculations(String(prev) + op + String(current));
    setPrev(null);
    setOp(null);
    setWaiting(true);
  };

  const handleButton = (label: string) => {
    if (/^[0-9]$/.test(label)) return inputDigit(label);
    if (label === ".") return inputDot();
    if (label === "C") return clearAll();
    if (label === "+/-") return toggleSign();
    if (label === "%") return applyPercent();
    if (label === "=") return calculate();
    if (["+", "-", "X", "/"].includes(label))
      return handleOperator(label as Operator);
  };

  const buttons = [
    "C",
    "/",
    "%",
    "X",
    "7",
    "8",
    "9",
    "-",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "0",
    ".",
    "+/-",
    "=",
  ];

  return (
    <div>
      <div className="header-bar">
        <h1 className="title">Neomorphic Calculator</h1>
        <Switch checked={isDark} onChange={setIsDark} />
      </div>
      <div className="result">
        <div className="result-des">
          <div className="column-wrapper">
            <div className="output">{display}</div>
            <div className="calculations">{calculations}</div>
          </div>
        </div>

        <div className="main-body-grid">
          {buttons.map((b, i) => {
            const id = b === "+" ? "plus" : undefined;
            return (
              <button
                key={i}
                id={id}
                className="calc-nums"
                onClick={() => handleButton(b)}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
