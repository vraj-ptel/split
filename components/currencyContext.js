'use client'
const { createContext, useState,useContext } = require("react");

const CurrencyContext = createContext(null);
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
export const CurrencyProvider = ({ children }) => {
     const getInitialCurrency = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('currency') || '$';
    }
    return '$';
  };
  const getInitialTimezone = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('timezone') ||
        Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };
    const [currency,setCurrency]=useState(getInitialCurrency )
    const [timezone, setTimezone] = useState(
      getInitialTimezone
      );
    const [baseCurrency,setBaseCurrency]=useState(currency);
    const changeTimezone=(val)=>{
        setTimezone(val);
        localStorage.setItem("timezone",val);
      }
    const currencyChange=(val)=>{
        setBaseCurrency(currency);
        setCurrency(val);
        localStorage.setItem("currency",val);
      }
  return (
    <CurrencyContext.Provider value={{ currency ,currencyChange,baseCurrency,timezone,changeTimezone}}>
      {children}
    </CurrencyContext.Provider>
  );
};

