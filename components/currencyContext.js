'use client'
const { createContext, useState } = require("react");

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency,setCurrency]=useState(localStorage.getItem("currency") || "$");
    const currencyChange=(val)=>{
    
        setCurrency(val);
        localStorage.setItem("currency",val);
      }
  return (
    <CurrencyContext.Provider value={{ currency ,currencyChange}}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  return useContext(CurrencyContext);
};