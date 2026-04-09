
import { useMemo } from "react";
import FormDespesas from "../components/formDespesas";
import TotalDespesas from "../functions/totalDespesas";
import '../estilos/index.css';

import Titulo from "../components/titulo";
import ListaDespesas from "../components/listaDespesas";
import filtrarLista from "../functions/funcaoFiltrarLista";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";


const Despesas = ({ despesas, setDespesas }) => {

    const navigate = useNavigate();

    const emClickAdicionar = (titulo, valor, data, categoria) => {
        const novaDespesa = {
            id: despesas.length + 1,
            titulo: titulo,
            valor: parseFloat(valor),
            data: data,
            categoria: categoria,
        }
        console.log("Adicionandos:", novaDespesa)
        setDespesas([...despesas, novaDespesa]);

    }

    const mostrarUltimoMes = useMemo(() => {
        const resultado = filtrarLista(despesas);
        console.log("filtradas:", resultado);
        return resultado;
    }, [despesas]);

    const ultimasCinco = useMemo(() => {
        return mostrarUltimoMes.slice(-5);
    }, [mostrarUltimoMes])
    // const ultimasCinco = despesas.slice(-5);

    const verMais = () => {
        navigate("/paginaListaFiltros");
    }


    const paginaPrincipal = () => {
        navigate('/')
    }


    return (
        <main className="bg-gray-50 rounded-lg shadow-lg p-6 w-full max-w-6xl mx-auto">
            <header className="relative flex items-center mb-4 border-b border-[#53720a]/30 pb-2 gap-24">
                <Button
                    className="flex items-center justify-center border border-[#53720a]/30 rounded-full p-2 shadow-md
                    transition-all duration-200 cursor-pointer hover:bg-[#DCE8E0] hover:shadow-lg hover:scale-105 hover:border-[#53720a]
                    active:scale-95 active:shadow-inner
                    focus:outline-none focus:ring-2 focus:ring-[#53720a]/40"
                    onClick={paginaPrincipal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="21px" fill="#626d00"
                    ><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg>
                </Button>
                <Titulo className=" text-2xl font-bold text-[#53720a] mb-4">
                    Cadastrar Despesas:

                </Titulo>





            </header>
            <div className="p-4">
                <FormDespesas emClickAdicionar={emClickAdicionar} />

                <section className="">
                    <h2 className=" text-xl font-bold text-[#53720a] mb-4">Lista de despesas:</h2>




                    <ListaDespesas despesas={ultimasCinco} resumida={true} />
                    <TotalDespesas despesas={despesas} />
                    <Button
                        onClick={verMais}
                        className="mt-6 w-full flex items-center justify-center gap-2
                        bg-[#F5E4E7] text-[#C97C8C] font-semibold py-2 rounded-lg
                        shadow-sm border border-[#C97C8C]/20
                        transition-all duration-200
                        hover:bg-[#efd6db] hover:gap-3 hover:shadow-md hover:scale-[1.01]
                        active:scale-95"
                    >
                        Ver mais
                        <span className="transition-all duration-200 group-hover:translate-x-1">→</span>
                    </Button>
                </section>
            </div>
        </main>
    )


}


export default Despesas;


