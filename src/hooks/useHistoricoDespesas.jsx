import { useEffect, useState} from "react"; 

const useHistoricoDespesas = () => {
  const [historicoDespesas, setHistoricoDespesas] = useState(()=>{
      const historicoSalvo = localStorage.getItem("historicoDespesas");
      try{
        return historicoSalvo ? JSON.parse(historicoSalvo) : [];
      }catch(error) {
        console.log("erro ao tentar resgatar historico:", error);
        return [];
      }
    })


    useEffect (() => {
      localStorage.setItem("historicoDetalhado", historicoDespesas.toString());

    },[historicoDespesas])



 return {historicoDespesas, setHistoricoDespesas};
}

export default useHistoricoDespesas;