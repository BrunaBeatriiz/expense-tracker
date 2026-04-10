import React from "react";
import Button from "./button";
//o valor padrão da prop sempre sera um array vazio, as vezes a prop não é passado ou está indisponivel no momento da renderização.
const ListaDespesas = ({ despesas = [], resumida = false,
    emClickExcluirDespesa }) => {
    if (despesas.length === 0) {
        return (<p className="text-center text-gray-500 mt-4">Nenhuma despesa encontrada.</p>);
    }

    return (
        <ul className="flex flex-col gap-2">
            {/* //usamos parenteses para dizer que é um retorno automatico (explicito). */}
            {despesas.map((despesa) => (
                <li key={despesa.id}>
                    {resumida ? (
                        <div className="bg-[#C4D1A6] px-3 py-2 rounded-md flex justify-between
                        shadow-sm border border-[#6B7D3A]/20 relative

                        transition-all duration-200 ease-in-out
                        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]
                        active:scale-95

                        animate-[fadeIn_0.3s_ease-in-out]">

                            <div className="absolute left-0 top-0 h-full w-1 bg-[#C97C8C]/80 rounded-l-md"></div>

                            <p className="font-semibold text-[#3f4d20] ml-2">
                                {despesa.titulo.toUpperCase()}
                            </p>

                            <p className="text-[#C97C8C] font-bold">
                                {Number(despesa.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>

                        </div>
                    ) : (
                        <div className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200
                        transition-all duration-200 hover:shadow-md hover:border-[#C97C8C]/30">

                            {/* título */}
                            <h3 className="font-semibold text-[#53720a] text-sm">
                                {despesa.titulo?.toUpperCase()}
                            </h3>

                            {/* categoria (estilo tag) */}
                            <span className="inline-block text-[10px] bg-[#F5E4E7] text-[#C97C8C] px-2 py-[2px] rounded-full">
                                {despesa.categoria}
                            </span>

                            {/* parte de baixo */}
                            <div className="flex justify-between items-center mt-1">

                                {/* lado esquerdo */}
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">
                                        {despesa.data && new Date(despesa.data).toLocaleDateString('pt-BR')}
                                    </span>

                                    <span className="text-[#C97C8C] font-bold text-sm mt-1">
                                        {Number(despesa.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                </div>

                                {/* botões */}
                                <div className="flex gap-1">
                                    <Button
                                        onClick={() => emClickExcluirDespesa?. (despesa.id)}
                                        className="p-1 rounded hover:bg-red-100 transition"
                                    >
                                        🗑️
                                    </Button>

                                    <Button className="p-1 rounded hover:bg-gray-100 transition">
                                        ⚙️
                                    </Button>
                                </div>

                            </div>

                        </div>

                    )}
                </li>
            ))
            }
        </ul >
    )
}

export default ListaDespesas;