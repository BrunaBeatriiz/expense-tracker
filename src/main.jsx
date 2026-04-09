import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Despesas from './pages/Despesas'
import MostrarListaFiltros from './pages/paginaListaFiltros'
import Saldo from './pages/paginaSaldo'
import TodasDespesas from './pages/todasDespesas'
import Historico from './pages/historico'

import HistoricoDetalhado from './pages/historicoDetalhado'

  const App = () => {
    const [despesas, setDespesas] = useState(() => {
      const despesasSalvas = localStorage.getItem("despesas");
      try{
        return despesasSalvas ? JSON.parse(despesasSalvas) : [];
      }catch(error){
        console.error("erro ao ler o localStorage:", error)
        return [];
      }
    });

    const [saldo, setSaldo] = useState(() => {
      const saldoSalvo = localStorage.getItem("saldo");
      try{
        return saldoSalvo ? parseFloat(saldoSalvo) : 0;
      }catch(error){
        console.error("erro ao ler o saldo do localstorage:", error);
        return 0;
      }
    });

    const [metaGastos, setMetaGastos] = useState(() => {
      const metaSalva = localStorage.getItem("metaGastos");
      try {
          return metaSalva ? parseFloat(metaSalva) : 0;
      } catch (error) {
          console.error("erro ao ler o saldo do localstorage:", error);
          return 0;
      }
  });

    const [historicoDespesas, setHistoricoDespesas] = useState(()=>{
      const historicoSalvo = localStorage.getItem("historicoDespesas");
      try{
        return historicoSalvo ? JSON.parse(historicoSalvo) : [];
      }catch(error) {
        console.log("erro ao tentar resgatar historico:", error);
        return [];
      }
    })


  useEffect(() => {
      localStorage.setItem("metaGastos", metaGastos.toString());
  }, [metaGastos]);


    useEffect(() => {
      localStorage.setItem("despesas", JSON.stringify(despesas));
    }, [despesas]);

    useEffect(() => {
      localStorage.setItem("saldo", saldo.toString());
    }, [saldo]);



    const emClickExcluirDespesa = (despesaId) => {

      const excluirDespesa = despesas.filter((despesa) => despesaId !== despesa.id);

      setDespesas(excluirDespesa);

    }

    
  
      const router = createBrowserRouter([
        {
          path: "/",
          element: <Dashboard saldo={saldo} setSaldo={setSaldo} despesas={despesas} metaGastos={metaGastos} setMetaGastos={setMetaGastos}/>
        },{
          path:"/Despesas",
          element:<Despesas despesas={despesas} setDespesas={setDespesas}/>,
        },{
          path:"/paginaListaFiltros",
          element:<MostrarListaFiltros despesas={despesas}
          emClickExcluirDespesa={emClickExcluirDespesa}/>,
        },
        {
          path:"/Saldo",
          element: <Saldo  despesas={despesas} saldo={saldo} setSaldo={setSaldo} metaGastos={metaGastos} setMetaGastos={setMetaGastos}/>,
        },
        {
          path:"/todasDespesas",
          element:<TodasDespesas despesas={despesas}  emClickExcluirDespesa={emClickExcluirDespesa}/>,
        },
        {
          path:"/historico",
          element: <Historico historicoDespesas={historicoDespesas} setHistoricoDespesas={setHistoricoDespesas} despesas={despesas} metaGastos={metaGastos} saldo={saldo}/>
         
        },
        {
          path:"/historicoDetalhado/:id",
          element: <HistoricoDetalhado historicoDespesas={historicoDespesas}/>
         
        },
      ]);

      return <RouterProvider router={router} />;

}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)



/*
Fluxo de atualização de despesas e saldo com localStorage:

1. No carregamento inicial, useState busca dados salvos no localStorage (se existirem) 
   e inicializa o estado com eles. Caso contrário, começa com valores padrão ([] ou 0).

2. Quando usamos setDespesas ou setSaldo, o estado é atualizado no React e 
   todos os componentes que recebem esse estado via props são re-renderizados.

3. O useEffect detecta mudanças no estado (por causa das dependências [despesas] ou [saldo]) 
   e salva automaticamente o novo valor no localStorage.

4. O localStorage funciona apenas como backup permanente. 
   O estado visível na aplicação sempre vem do React, e não é recarregado do localStorage 
   a cada alteração — só no início.
*/
