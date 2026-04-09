import React, { useState } from "react";
import Button from "./button";

const FormDespesas = ({ emClickAdicionar }) => {
    const [titulo, setTitulo] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");
    const [categoria, setCategoria] = useState("");

    const opDespesas = ["Moradia", "Alimentação", "Transporte", "Saúde", "Educação", "Contas", "Lazer", "Pessoal", "Outros"];

    const escolha = (event) => {
        setCategoria(event.target.value);
        //atualiza a categoria escolhida
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!titulo.trim() || !valor.trim()) {
            return alert("Preencha o título e o valor da despesa.");
        }

        if (!data) {
            return alert("Selecione uma data.")
        }

        const dataObj = new Date(data);
        const hoje = new Date();
        const doisAnos = new Date();
        doisAnos.setFullYear(hoje.getFullYear() - 2);

        if (dataObj < doisAnos) {
            return alert("A data selecionada deve ser de no máximo dois anos atrás.")
        }
        if (!categoria) {
            return alert("Selecione uma categoria.")
        }

        emClickAdicionar(titulo, valor, data, categoria);

        setTitulo("");
        setValor("");
        setData("");
        setCategoria("");
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

  <input
    className="bg-[#E8EEDC] px-3 py-2 rounded-lg shadow-sm
    border border-[#C97C8C]/10
    placeholder:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-[#C97C8C]/40
    focus:border-[#C97C8C]
    transition-all duration-200"
    type="text"
    value={titulo}
    placeholder="Digite o nome da despesa:"
    onChange={(e) => setTitulo(e.target.value)}
  />

  <input
    className="bg-[#E8EEDC] px-3 py-2 rounded-lg shadow-sm
    border border-[#C97C8C]/10
    focus:outline-none focus:ring-2 focus:ring-[#C97C8C]/40
    focus:border-[#C97C8C]"
    type="date"
    value={data}
    onChange={(e) => setData(e.target.value)}
  />

  <select
    className="bg-[#E8EEDC] px-3 py-2 rounded-lg shadow-sm
    border border-[#C97C8C]/10
    focus:outline-none focus:ring-2 focus:ring-[#C97C8C]/40
    focus:border-[#C97C8C]"
    value={categoria}
    onChange={escolha}
  >
    <option value="">Selecione o tipo da despesa:</option>
    {opDespesas.map((opcao) => (
      <option key={opcao} value={opcao}>{opcao}</option>
    ))}
  </select>

  <input
    className="bg-[#E8EEDC] px-3 py-2 rounded-lg shadow-sm
    border border-[#C97C8C]/10
    placeholder:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-[#C97C8C]/40
    focus:border-[#C97C8C]"
    type="number"
    value={valor}
    placeholder="Digite o valor da despesa:"
    onChange={(e) => setValor(e.target.value)}
  />

  <Button
    className="bg-[#C97C8C] px-3 py-2 rounded-lg shadow-md  mb-4 text-white font-semibold
    transition-all duration-200
    hover:scale-105 hover:shadow-lg hover:bg-[#b76c7c]
    active:scale-95 active:shadow-inner
    focus:outline-none focus:ring-2 focus:ring-[#C97C8C]"
    type="submit"
  >
    Adicionar
  </Button>

</form>
        </div>
    )
}

export default FormDespesas;