import { useState, useEffect } from "react";

const useMetaGastos = () => {
  const [metaGastos, setMetaGastos] = useState(() => {
    const metaSalva = localStorage.getItem("metaGastos");
    try {
      return metaSalva ? parseFloat(metaSalva) : 0;
    } catch (error) {
      console.error("erro ao ler o saldo do localstorage:", error);
      return 0;
    }
  });


  useEffect(() => {
    localStorage.setItem("metaGastos", metaGastos.toString());
  }, [metaGastos]);

  return { metaGastos, setMetaGastos };
}

export default useMetaGastos;