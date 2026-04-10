import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Despesas from './pages/Despesas'
import ListaDespesasFiltros from './pages/ListaDespesasFiltros'
import Saldo from './pages/paginaSaldo'
import TodasDespesas from './pages/todasDespesas'
import Historico from './pages/historico'
import useDespesas from './hooks/useDespesas'
import HistoricoDetalhado from './pages/historicoDetalhado'
import useSaldo from './hooks/useSaldo'
import useMetaGastos from './hooks/useMetaGastos'
import useHistoricoDespesas from './hooks/useHistoricoDespesas'

const App = () => {

  const { despesas, setDespesas } = useDespesas();

  const { saldo, setSaldo } = useSaldo();

  const { metaGastos, setMetaGastos } = useMetaGastos();

  const { historicoDespesas, setHistoricoDespesas } = useHistoricoDespesas();



  const emClickExcluirDespesa = (despesaId) => {

    const excluirDespesa = despesas.filter((despesa) => despesaId !== despesa.id);

    setDespesas(excluirDespesa);

  }



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard saldo={saldo} setSaldo={setSaldo} despesas={despesas} metaGastos={metaGastos} setMetaGastos={setMetaGastos} />
    }, {
      path: "/Despesas",
      element: <Despesas despesas={despesas} setDespesas={setDespesas} />,
    }, {
      path: "/ListaDespesasFiltros",
      element: <ListaDespesasFiltros despesas={despesas}
        emClickExcluirDespesa={emClickExcluirDespesa} />,
    },
    {
      path: "/Saldo",
      element: <Saldo despesas={despesas} saldo={saldo} setSaldo={setSaldo} metaGastos={metaGastos} setMetaGastos={setMetaGastos} />,
    },
    {
      path: "/todasDespesas",
      element: <TodasDespesas despesas={despesas} emClickExcluirDespesa={emClickExcluirDespesa} />,
    },
    {
      path: "/historico",
      element: <Historico historicoDespesas={historicoDespesas} setHistoricoDespesas={setHistoricoDespesas} despesas={despesas} metaGastos={metaGastos} saldo={saldo} />

    },
    {
      path: "/historicoDetalhado/:id",
      element: <HistoricoDetalhado historicoDespesas={historicoDespesas} />

    },
  ]);

  return <RouterProvider router={router} />;

}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
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
