import React from "react";
import calculoTotalDespesas from "./funçaoSomaDespesas";


const calculoSaldo = (despesas, saldo) => {
    const totalDespesas = calculoTotalDespesas(despesas);
    const saldoNum = parseFloat(saldo);


    const valorSaldo = (saldoNum - totalDespesas);

    const corSaldo = valorSaldo >= 0? "#4e5800":"#f02400";



    return (
        <h2 style={{color: corSaldo}}> {valorSaldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </h2>
    )

}

export default calculoSaldo;