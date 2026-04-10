import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Titulo from "../components/titulo";

import { useState } from "react";

import GraficoBarra from "../components/graficoBarra";
import { useEffect } from "react";


const Historico = ({ historicoDespesas, setHistoricoDespesas, despesas, metaGastos,saldo }) => {

 
 

  const navigate = useNavigate();
  const paginaDetalhada = (id) => {
    navigate(`/historicoDetalhado/${id}`);
}

  useEffect(() => {
    let hoje = new Date();

    let mesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
    const dia = hoje.getDate()

    const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
    // const ultimoRegistro = historicoDespesas[historicoDespesas.length-1];
    // const mesUltimoRegistro = ultimoRegistro?.mes;


    const existeMes = historicoDespesas.some(item => item.mes === mesAtual);

    

    // if(!existeMes && dia === ultimoDiaDoMes){
    //   criarRegistroMes();
    // }

    // if(ultimoRegistro && ultimoRegistro.mes !== mesAtual && dia === 1){
    //   criarRegistroMes();
    // }

    if(!existeMes && (dia === ultimoDiaDoMes || dia === 1)){
      criarRegistroMes();
    }

    
   
  }, [despesas, metaGastos]);

  const criarRegistroMes = () => {
    const totalDespesasMes = despesas.reduce((total, despesa) => total + despesa.valor,0);
 const saldoMes = saldo - totalDespesasMes;
    const hoje = new Date();
    const mesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;


    const ultimasCincoDespesas = [...despesas].slice(0, 5).map((despesa) => ({
      nome: despesa.titulo,
      valor: despesa.valor,
      categoria: despesa.categoria,
      data: despesa.data
    }));

    const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0);


    let registroMes = {
      id: Date.now(),
      mes: mesAtual,
      totalDespesas,
      saldo: saldoMes,
      meta: metaGastos,
      despesas: ultimasCincoDespesas,
      dataRegistro: hoje.toISOString()

    };

    const novoHistorico = [...historicoDespesas, registroMes];
    setHistoricoDespesas(novoHistorico);
    localStorage.setItem("historicoDespesas", JSON.stringify(novoHistorico));
    console.log("Historico atualizado do mes:", registroMes);
  }

  
  const nomeDoMes = (valor) => {
    if (!valor) return "Mês inválido";
  
    const partes = valor.split("-");
    if (partes.length < 2) return "Mês inválido";
  
    const mes = Number(partes[1]);  // pega só o número do mês
    const ano = partes[0];
  
    const nomes = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
  
    return `${nomes[mes - 1]} de ${ano}`;
  };
  


  const [mesEscolhido, setMesEscolhido] = useState("");
  const opMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


  console.log("OLLLLLHA AQ O SAAAALLLDOOOOO:", saldo);

  return (
    <main className="bg-gray-50 rounded-xl shadow-lg p-8 md:12 w-full max-w-6xl mx-auto">
            <Titulo className="text-3xl font-bold text-[#53720a] mb-4 text-center">Painel Financeiro:</Titulo>


      <h2 className="text-xl font-semibold text-[#53720a] mb-6 text-center">Historico</h2>

      {/* grafico */}
     <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-[#53720a]/10">
     <GraficoBarra historicoDespesas={historicoDespesas} />
     </div>
     
      <button onClick={criarRegistroMes}>Forçar novo registro</button>

      <select name="categoria"
        className="bg-[#E8EEDC] w-full px-3 py-1 rounded-lg shadow-sm mb-6
                            border border-[#C97C8C]/20
                            focus:outline-none focus:ring-2 focus:ring-[#C97C8C]/40
                            focus:border-[#C97C8C] transition-all duration-200 hover:shadow-md"
        onChange={(event) => setMesEscolhido(event.target.value)} id="idcategoria" value={mesEscolhido} menuPlacement="bottom">
        <option value="">Selecione o tipo da despesa:</option>
        {opMes.map((opcao) => (
          <option key={opcao} value={opcao}>{opcao}</option>
        ))}
        {/* //parenteses no map, para não usar um return */}
      </select>



      {historicoDespesas.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum historico disponível ainda.</p>
      ) : (
        <section className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {historicoDespesas.map((item, id) => (
            <div
            className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#53720a] hover:scale-[1.02] hover:shadow-lg hover:bg-[#f8faf6] transition-all duration-300 cursor-pointer"
             key={id}>
              <div className="flex justify-between mb-1">
           
                <h2 className="text-lg font-semibold text-[#53720a] mb-4 text-center">{nomeDoMes(item.mes)}</h2>
                <Button className="buttonHistorico" onClick={()=>paginaDetalhada(item.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#626d00"><path d="m298-262-56-56 121-122H80v-80h283L242-642l56-56 218 218-218 218Zm222-18v-80h360v80H520Zm0-320v-80h360v80H520Zm120 160v-80h240v80H640Z"/></svg></Button>
              </div>
              <p className="text-gray-700 text-bold">Total:
               <span className=" text-[#C97C8C] font-bold ml-1">
                R$:{item.totalDespesas.toFixed(2)}
               </span>
               </p>
              <p className="text-gray-700 text-bold">Meta:
                <span className=" text-[#C97C8C] font-bold ml-1">R$:{item.meta.toFixed(2)}</span>
              </p>
              <p><small>Registrado em: {new Date(item.dataRegistro).toLocaleDateString("pt-BR")}</small></p>
              
            </div>
          ))}

        </section>
      )}
    </main>
  )
}

export default Historico;
