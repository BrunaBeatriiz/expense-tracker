import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button";
import Titulo from "../components/titulo";


const HistoricoDetalhado = () => {
    const {id} = useParams();
    console.log("id url",id);

    const historico = JSON.parse(localStorage.getItem("historicoDespesas")) || [];
    console.log("olha aq:",historico);

    const despesaId = historico.find((mes) => mes.id == id);
    console.log("olha a despesa id",despesaId);


    const mes = (data) => {

        if(!data){
            return "Mês inválido!";
        }

        
        const mesAno = data.split("-");
        const mes = Number(mesAno[1]);
        console.log("mesdoanoaq",mesAno,
        "olha p mes aq",mes);

        if(mes.length < 2){
            return "Mês inválido!"
        }

        const nomes = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
          ];

          return `${nomes[mes - 1]} de ${mesAno[0]}`
    }
    
    const navigate = useNavigate();
     function paginaPrincipal() {
        navigate('/')
    }



     return (
  <main className="bg-gray-50 rounded-lg shadow-lg p-8 w-full max-w-7xl mx-auto">

<header className="flex items-center gap-10 justify-center border-b border-[#53720a]/30 pb-4 mb-8">
            <Button
                className="flex items-center justify-center border border-[#53720a]/30 rounded-full p-2 shadow-md
                transition-all duration-200 cursor-pointer hover:bg-[#DCE8E0] hover:shadow-lg hover:scale-105 hover:border-[#53720a]
                active:scale-95 active:shadow-inner
                focus:outline-none focus:ring-2 focus:ring-[#53720a]/40"
                onClick={paginaPrincipal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#626d00"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
            </Button>
    <Titulo className="text-3xl font-bold text-[#53720a] text-center">
      Despesas do mês
    </Titulo>
    </header>

    <div className="flex flex-col gap-6">

      {/* RESUMO */}
      <section className="bg-[#E8EEDC] p-4 rounded-lg shadow-sm border border-[#53720a]/20">
        <h2 className="text-2xl font-semibold text-[#53720a] mb-2 text-center">
          {mes(despesaId.mes)}
        </h2>

        <div className="flex flex-col gap-1 text-center">
          <p className="text-gray-700">
            Total:
            <span className="text-[#C97C8C] font-bold ml-1">
              {despesaId.totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </p>

          <p className="text-gray-700">
            Meta:
            <span className="text-[#C97C8C] font-bold ml-1">
              {despesaId.meta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </p>

          <p className="text-gray-700">
            Saldo:
            <span className="text-[#53720a] font-bold ml-1">
              {despesaId.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </p>
        </div>
      </section>

      {/* LISTA DE DESPESAS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {despesaId.despesas.map((despesa, index) => (
          <div
            key={index}
            className="relative bg-white p-4 rounded-lg shadow-sm border border-[#53720a]/10
            transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
          >

            {/* barra lateral rosa */}
            <div className="absolute left-0 top-0 h-full w-1 bg-[#C97C8C]/60 rounded-l-md"></div>

            <p className="font-semibold text-[#53720a] mb-1">
              {despesa.nome}
            </p>

            <p className="text-sm text-gray-600">
              Categoria: {despesa.categoria}
            </p>

            <p className="text-[#C97C8C] font-bold mt-2">
              {despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>

          </div>
        ))}

      </section>

    </div>

  </main>
)
        
    }


export default HistoricoDetalhado;