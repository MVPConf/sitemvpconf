import React from "react";

const BoardOfDirectors: React.FC = () => {
  type Member = {
    nome: string;
    funcao: string;
    image: string;
  };

  const members: Member[] = [
    {
      nome: "Rosani Coutinho",
      funcao: "Diretora Presidente",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Rosani Coutinho.jpeg",
    },
    {
      nome: "Johnson Cruz",
      funcao: "Diretor Executivo",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Johnson de Souza Cruz.jpeg",
    },
    {
      nome: "Mayumi Shingaki",
      funcao: "Conselho Administração",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Mayumi Shingaki.png",
    },
    {
      nome: "Gustavo Moraes",
      funcao: "Conselho Administração",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Gustavo Moraes.jpeg",
    },
    {
      nome: "Sulamita Dantas",
      funcao: "Conselho Administração",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Sulamita Dantas.jpeg",
    },
    {
      nome: "Heber Lopes",
      funcao: "Conselho Administração",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Heber Lopes.jpeg",
    },
    {
      nome: "Thaise Medeiros",
      funcao: "Conselho Fiscal",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Thaise Medeiros.jpeg",
    },
    {
      nome: "Claudio Raposo",
      funcao: "Conselho Fiscal",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Claudio Filipe Lima Raposo.jpeg",
    },
    {
      nome: "Vanessa Valle",
      funcao: "Conselho Fiscal",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Vanessa Valle.jpeg",
    },
    {
      nome: "Jamil Lopes",
      funcao: "Conselho Consultivo",
      image: "https://stmvpconf2025.blob.core.windows.net/data/speakers/Jamil Lopes.png",
    },
  ];

  return (
    <section id="board" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
          Conselho <span className="gradient-text">Administrativo</span>
        </h2>

        {/* Grid único sem hierarquia por função */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {members
            .slice() // mantém a ordem original do array
            .map((membro, idx) => (
              <div
                key={`${membro.nome}-${idx}`}
                className="bg-gradient-to-br from-ms-blue-50 to-white rounded-2xl shadow-lg overflow-hidden card-hover group flex flex-col items-center py-8 px-5 border-2 border-ms-blue-200"
              >
                <img
                  src={membro.image}
                  alt={membro.nome}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-ms-blue-300 shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-avatar.svg"; // fallback
                  }}
                />

                <h4 className="text-base font-bold text-gray-900 text-center">{membro.nome}</h4>
                <p className="text-ms-blue-900 text-xs font-semibold text-center mt-1">{membro.funcao}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
