
import Button from "../components/button";
import ListaDespesas from "../components/listaDespesas";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";


const opDespesas = ["Moradia", "Alimentação", "Transporte", "Saúde", "Educação", "Contas", "Lazer", "Pessoal", "Outros"];

const TodasDespesas = ({ despesas, emClickExcluirDespesa }) => {

    const [categoriaEscolhida, setCategoriaEscolhida] = useState("");


    const navigate = useNavigate();

    const paginaPrincipal = () => navigate('/');

    const paginaListaUltimoMes = () => navigate('/ListaDespesasFiltros');



    const despesasFiltradas = useMemo(() => {
        // console.log(dataInicial);
        // console.log(dataFinal)
        if (!categoriaEscolhida) return despesas;

        return despesas.filter((despesa) =>
            despesa.categoria === categoriaEscolhida);
    }, [despesas, categoriaEscolhida]);


    return (
        <main className="bg-gray-50 rounded-lg shadow-lg p-6 w-full max-w-6xl mx-auto">
            <div className="flex justify-between mb-4 gap-4 px-2">
                <Button
                    className="flex items-center justify-center border border-[#53720a]/30 rounded-full p-2 shadow-md
                    transition-all duration-200 cursor-pointer hover:bg-[#DCE8E0] hover:shadow-lg hover:scale-105 hover:border-[#53720a]
                    active:scale-95 active:shadow-inner
                    focus:outline-none focus:ring-2 focus:ring-[#53720a]/40"
                    onClick={paginaListaUltimoMes}
                ><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#626d00"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg></Button>
                <select name="categoria"
                    className="bg-[#E8EEDC] w-full px-3 py-1 rounded-lg shadow-sm
                            border border-[#C97C8C]/10
                            focus:outline-none focus:ring-2 focus:ring-[#C97C8C]/40
                            focus:border-[#C97C8C]"
                    onChange={(event) => setCategoriaEscolhida(event.target.value)} id="idcategoria" value={categoriaEscolhida} >
                    <option value="">Selecione o tipo da despesa:</option>
                    {opDespesas.map((opcao) => (
                        <option key={opcao} value={opcao}>{opcao}</option>
                    ))}
                    {/* //parenteses no map, para não usar um return */}
                </select>
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
            </div>

            <ListaDespesas despesas={despesasFiltradas} emClickExcluirDespesa={emClickExcluirDespesa} />
        </main>
    )
}

export default TodasDespesas;



