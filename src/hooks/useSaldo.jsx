import { useState, useEffect } from "react";

const useSaldo = () => {
  const [saldo, setSaldo] = useState(() => {
    const saldoSalvo = localStorage.getItem("saldo");
    try {
      return saldoSalvo ? parseFloat(saldoSalvo) : 0;
    } catch (error) {
      console.error("erro ao ler o saldo do localstorage:", error);
      return 0;
    }
  });



  useEffect(() => {
    localStorage.setItem("saldo", saldo.toString());
  }, [saldo]);

  return { saldo, setSaldo };
}


export default useSaldo;