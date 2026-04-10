import { useState, useEffect } from "react";

const useDespesas = () => {

  const [despesas, setDespesas] = useState(() => {
    const despesasSalvas = localStorage.getItem("despesas");
    try {
      return despesasSalvas ? JSON.parse(despesasSalvas) : [];
    } catch (error) {
      console.error("erro ao ler o localStorage:", error)
      return [];
    }
  });


  useEffect(() => {
    localStorage.setItem("despesas", JSON.stringify(despesas));
  }, [despesas]);


  return {despesas, setDespesas};
}

export default useDespesas;