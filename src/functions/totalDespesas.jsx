import React from "react";
import calculoTotalDespesasPeriodoFixo from "./funçaoSomaDespesas";


const TotalDespesas = ({ despesas}) => {
    const totalDespesas = calculoTotalDespesasPeriodoFixo(despesas);

    return (
       <div className="mt-6 flex flex-col">
         <h2 className="text-sm text-gray-500 ">Total das despesas: </h2>
        <h3 className="text-xl font-bold text-[#C97C8C]"> {totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
       </div>
           
       
    )


}

export default TotalDespesas;

