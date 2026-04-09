import React, { useState, useEffect } from "react";

import TotalDespesas from "../functions/totalDespesas";
import Titulo from "../components/titulo";
import Button from "../components/button";
import calculoSaldo from "../functions/funçaoCalculoSaldo";
import { useActionData, useNavigate } from "react-router-dom";
import { calculoMeta } from "../functions/funcoesCard";

const Saldo = ({ saldo, setSaldo, despesas, metaGastos, setMetaGastos }) => {
    const [nonoValor, setNovoValor] = useState("");
    const [nonoValorMeta, setNovoValorMeta] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    function mostrarErro(msg) {
        setErro(msg);
        setSucesso(false);
        setTimeout(() => setErro(""), 3000);
    }

    function mostrarSucesso() {
        setErro("");
        setSucesso(true);
        setTimeout(() => setSucesso(false), 3000);
    }



    const navigate = useNavigate();

    const adicionarSaldo = (event) => {
        event.preventDefault();
        const valorConvertido = parseFloat(nonoValor) || 0;
        const saldoConvertido = parseFloat(saldo);
        setSaldo(saldoConvertido + valorConvertido);
        setNovoValor("");

    }
    const adicionarMeta = (event) => {
        event.preventDefault();
        const MetaConvertido = parseFloat(nonoValorMeta) || 0;
        // console.log("Valor digitado",nonoValorMeta, "convertido", MetaConvertido, "saldo", metaGastos);
        if (!nonoValorMeta.trim()) {
            setErro("Digite um valor para a meta.");
            return;
        }

        if (isNaN(MetaConvertido)) {
            setErro("O valor digitado não é válido.")
            return;
        }

        if (MetaConvertido <= 0) {
            setErro("A meta precisa ser maior que zero.")
        }

        // setMetaGastos(MetaConvertido)
        // setNovoValorMeta("");
        // setErro("")
        // setSucesso(true);

        // setTimeout(() => setSucesso(false),3000);
        // setTimeout(() => setErro(""), 3000);
        // return;

        setMetaGastos(MetaConvertido);
        setNovoValorMeta("");
        mostrarSucesso();



    }



    const calculoSaldoTotal = calculoSaldo(despesas, saldo);

    const meta = calculoMeta(despesas, metaGastos);

    function paginaPrincipal() {
        navigate('/')
    }

   return (
 <main className="bg-gray-50 rounded-xl shadow-lg p-8 md:p-12 w-full max-w-[95%] mx-auto">

        {/* HEADER */}
        <header className="flex items-center gap-6 border-b border-[#53720a]/30 pb-4">
            <Button
                className="flex items-center justify-center border border-[#53720a]/30 rounded-full p-2 shadow-md
                transition-all duration-200 cursor-pointer hover:bg-[#DCE8E0] hover:shadow-lg hover:scale-105 hover:border-[#53720a]
                active:scale-95 active:shadow-inner
                focus:outline-none focus:ring-2 focus:ring-[#53720a]/40"
                onClick={paginaPrincipal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="21px" fill="#626d00">
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                </svg>
            </Button>

            <Titulo className="text-2xl font-bold text-[#53720a]">
                Meu Saldo:
            </Titulo>
        </header>

        {/* CONTEÚDO */}
        <div className="flex flex-col gap-8 w-full mt-6">

            {/* FORMULÁRIOS */}
            <section className="flex flex-col gap-6 w-full">

                {/* SALDO */}
                <form onSubmit={adicionarSaldo} className="flex flex-col gap-3 w-full bg-white p-4 rounded-lg shadow-sm border border-[#53720a]/10">
                    <input
                        className="w-full bg-[#E8EEDC] px-3 py-2 rounded-lg shadow-sm
                        border border-[#C97C8C]/10
                        placeholder:text-gray-500
                        focus:outline-none focus:ring-2 focus:ring-[#C97C8C]/40
                        focus:border-[#C97C8C]"
                        placeholder="Adicione um novo valor ao seu saldo:"
                        value={nonoValor}
                        onChange={(event) => setNovoValor(event.target.value)}
                        type="number"
                    />

                    <Button
                        className="w-full flex items-center justify-center gap-2
                        bg-[#F5E4E7] text-[#C97C8C] font-semibold py-2 rounded-lg
                        shadow-sm border border-[#C97C8C]/20
                        transition-all duration-200
                        hover:bg-[#efd6db] hover:gap-3 hover:shadow-md hover:scale-[1.01]
                        active:scale-95"
                        type="submit"
                    >
                        Adicionar
                    </Button>
                </form>

                {/* META */}
                <div className="flex flex-col gap-2 w-full bg-white p-4 rounded-lg shadow-sm border border-[#53720a]/10">
                    <form onSubmit={adicionarMeta} className="flex flex-col gap-3 w-full">
                        <input
                            className="w-full bg-[#E8EEDC] px-3 py-2 rounded-lg shadow-sm
                            border border-[#C97C8C]/10
                            placeholder:text-gray-500
                            focus:outline-none focus:ring-2 focus:ring-[#C97C8C]/40
                            focus:border-[#C97C8C]"
                            placeholder="Adicionar meta de gastos:"
                            value={nonoValorMeta}
                            onChange={(event) => setNovoValorMeta(event.target.value)}
                            type="number"
                        />

                        <Button
                            className="w-full flex items-center justify-center gap-2
                            bg-[#F5E4E7] text-[#C97C8C] font-semibold py-2 rounded-lg
                            shadow-sm border border-[#C97C8C]/20
                            transition-all duration-200
                            hover:bg-[#efd6db] hover:gap-3 hover:shadow-md hover:scale-[1.01]
                            active:scale-95"
                            type="submit"
                        >
                            Adicionar
                        </Button>
                    </form>

                    {erro && (
                        <p className="text-red-600 text-sm">{erro}</p>
                    )}

                    {sucesso && (
                        <p className="text-[#53720a] text-sm">
                            Meta de gastos adicionada com sucesso!
                        </p>
                    )}
                </div>

            </section>

            {/* CARDS */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-white rounded-lg p-4 shadow-md border border-[#53720a]/10
                hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                    <h2 className="text-[#53720a] font-semibold">Valor adicionado:</h2>
                    <p className="text-[#C97C8C] font-bold text-lg">
                        {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border border-[#53720a]/10
                hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                    <TotalDespesas despesas={despesas} />
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border border-[#53720a]/10
                hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                    <h2 className="text-[#53720a] font-semibold">Saldo:</h2>
                    <p className="text-[#C97C8C] font-bold text-lg">
                        {calculoSaldoTotal}
                    </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border border-[#53720a]/10
                hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                    <h2 className="text-[#53720a] font-semibold">Meta de gastos:</h2>
                    <p className="text-[#C97C8C] font-bold text-lg">
                        {metaGastos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                </div>

            </section>

        </div>
    </main>
)

}

export default Saldo;