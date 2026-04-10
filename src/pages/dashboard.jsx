
import { useNavigate } from "react-router-dom";
import Titulo from "../components/titulo";

import calculoTotalDespesasPeriodoFixo from "../functions/funçaoSomaDespesas";
import { categoriaMaisGasta, proximaDespesa } from "../functions/funcoesCard";
import GraficoCategorias from "../components/graficoPizza";
import calculoSaldo from "../functions/funçaoCalculoSaldo";
import Button from "../components/button";




const Dashboard = ({ despesas, saldo, metaGastos }) => {
    const navigate = useNavigate();

    const irParaProxima = () => {
        navigate('/Despesas')
    }

    const paginaSaldo = () => {
        navigate('/Saldo');
    }

    const paginaDespesasFiltros = () => {
        navigate('/ListaDespesasFiltros');
    }
    const paginaHistorico = () => {
        navigate('/historico');
    }


    const totalDespesas = calculoTotalDespesasPeriodoFixo(despesas);


    const resultadosMetas = (metaGastos || 0) - calculoTotalDespesasPeriodoFixo(despesas);
    console.log("resultados", resultadosMetas);
    const metaPorcento = metaGastos > 0 ? ((totalDespesas / metaGastos) * 100).toFixed(1) : 0;

    const calculoSaldoTotal = calculoSaldo(despesas, saldo);

    const maiorGastoCategoria = categoriaMaisGasta(despesas);

    const proxima = proximaDespesa(despesas);



    return (
        <main className="bg-gray-50 rounded-lg shadow-lg p-6 w-full max-w-6xl mx-auto">

            <Titulo className="text-3xl font-bold text-[#53720a] mb-4">Painel Financeiro:</Titulo>
            <div className="p-2 border-none">
                <section className="flex flex-col gap-3">
                    <h2 className="text-[#C97C8C] font-bold text-2xl mb-1">
                        Saldo: <span className="text-xl">{calculoSaldoTotal}</span>
                    </h2>
                    <Button className="bg-[#DCE8E0] px-3 py-2 rounded shadow-sm text-[#C97C8C] font-bold 
                    transition-all duration-200
                    hover:scale-105 hover:shadow-md hover:bg-[#d2e0d8]
                    active:scale-95 active:shadow-inner
                    focus:outline-none focus:ring-2 focus:ring-[#C97C8C]
                    "
                        onClick={paginaSaldo}>

                        Adidiconar Saldo

                    </Button>
                    <Button className="bg-[#DCE8E0] px-3 py-2 rounded shadow-sm text-[#C97C8C] font-bold 
                    transition-all duration-200
                    hover:scale-105 hover:shadow-md hover:bg-[#d2e0d8]
                    active:scale-95 active:shadow-inner
                    focus:outline-none focus:ring-2 focus:ring-[#C97C8C]
                    "
                        onClick={irParaProxima}>

                        Adicionar despesas

                    </Button>

                    <Button
                        className="bg-[#DCE8E0] px-3 py-2 rounded shadow-sm text-[#C97C8C] font-bold 
                    transition-all duration-200
                    hover:scale-105 hover:shadow-md hover:bg-[#d2e0d8]
                    active:scale-95 active:shadow-inner
                    focus:outline-none focus:ring-2 focus:ring-[#C97C8C]
                    "
                        onClick={paginaDespesasFiltros}>

                        Despesas do Mês

                    </Button>
                    <Button className="bg-[#DCE8E0] px-3 py-2 rounded shadow-sm text-[#C97C8C] font-bold 
                    transition-all duration-200
                    hover:scale-105 hover:shadow-md hover:bg-[#d2e0d8]
                    active:scale-95 active:shadow-inner
                    focus:outline-none focus:ring-2 focus:ring-[#C97C8C]
                    " onClick={paginaHistorico}>

                        Historico de Gastos

                    </Button>
                </section>
                <section className="p-2">
                    <h2 className="text-xl font-bold text-[#53720a] mb-4">Disposição das despesas:</h2>
                    <div className="p-8">
                        <GraficoCategorias despesas={despesas} />
                    </div>
                </section>

            </div>
            <section className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg shadow-sm border-l-4 border-[#53720a] hover:scale-105 hover:shadow-m d hover:bg-green-100 transition-all duration-300 cursor-pointer">
                    <h3 className="text-sm">Total despesas do mês: </h3>
                    <p className="text-lg font-bold text-[#C97C8C]">{totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm border-l-4 border-[#53720a] hover:scale-105 hover:shadow-md hover:bg-green-100 transition-all duration-300 cursor-pointer">
                    <h3 className="text-sm">Gastador do mês: </h3>
                    <p className="font-semibold">{maiorGastoCategoria.categoria}</p>
                    <p className="text-[#C97C8C] font-bold">{maiorGastoCategoria.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm border-l-4 border-[#53720a] hover:scale-105 hover:shadow-md hover:bg-green-100 transition-all duration-300 cursor-pointer">
                    <h3 className="text-sm"> Próximos vencimentos:</h3>
                    {proxima ? (
                        <p className="text-sm">{proxima.titulo} - {new Date(proxima.data).toLocaleDateString("pt-BR")}<br />
                            <span className="text-[#C97C8C] font-bold p-1"> {proxima.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500 p-1">Não há despesas futuras</p>
                    )}
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm border-l-4 border-[#53720a] hover:scale-105 hover:shadow-md hover:bg-green-100 transition-all duration-300 cursor-pointer">
                    <h3 className="text-sm">Meta de Gastos:</h3>
                    <p className="text-[#C97C8C] font-bold">{resultadosMetas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} restantes.</p>
                    <p className="text-sm">{metaPorcento}% foi atingida.</p>
                </div>
            </section>

        </main>

    )
}

export default Dashboard;

// ideias h1: meu controle de gastos,painel financeiro, minhas finanças, visão geral de gastos;


// #626D00