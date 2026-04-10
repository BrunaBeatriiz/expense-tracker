import calculoTotalDespesasPeriodoFixo from "./funçaoSomaDespesas";

export function categoriaMaisGasta(despesas) {
    if (!despesas || despesas.length === 0) return {
        categoria: "Nenhuma", total: 0
    };

    const somaPorCategoria = despesas.reduce((acc, despesa) => {
        const categoria = despesa.categoria || "Sem categoria";
        acc[categoria] = (acc[categoria] || 0) + parseFloat(despesa.valor);
        return acc;
    }, {});


    const [categoria, total] = Object.entries(somaPorCategoria).sort((a, b) => b[1] - a[1])[0];
    return { categoria, total };
}



/*
Resumo da função categoriaMaisGasta:

1. acc[categoria] = (acc[categoria] || 0) + parseFloat(despesa.valor);
   - acc é o objeto acumulador do reduce.
   - Se a categoria já existe, soma o valor da despesa ao total.
   - Se não existe, inicia com 0 e adiciona o valor da despesa.
   - parseFloat garante que o valor seja numérico.

2. Object.entries(somaPorCategoria).sort((a,b) => b[1] - a[1])[0];
   - Object.entries transforma o objeto em array de pares [categoria, total].
   - sort((a,b) => b[1] - a[1]) ordena do maior para o menor gasto.
   - [0] pega o primeiro elemento, que é a categoria com maior gasto.
   - const [categoria, total] = ... destrutura o par em variáveis separadas.
*/

export function proximaDespesa(despesas){
    if(!despesas || despesas.length === 0) return null;

    const hoje = new Date();

    const proxima = despesas.filter(dia => new Date(dia.data) >= hoje).sort((a,b) => new Date (a.data) - new Date(b.data))[0];

    return proxima || null;
}
