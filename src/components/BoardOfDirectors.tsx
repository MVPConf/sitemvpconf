import React from "react";

const BoardOfDirectors: React.FC = () => {
  // Lista de exemplo de conselheiros
  const members = [
    { nome: "Rosani Coutinho", funcao: "Diretora Presidente" },
    { nome: "Johnson Cruz", funcao: "Diretor Executivo" },
    { nome: "Gustavo Moraes", funcao: "Conselho Administração" },
    { nome: "Heber Lopes", funcao: "Conselho Administração" },
    { nome: "Mayumi Shingaki", funcao: "Conselho Administração" },
    { nome: "Sulamita Dantas", funcao: "Conselho Administração" },
    { nome: "Claudio Raposo", funcao: "Conselho Fiscal" },
    { nome: "Thaise Medeiros", funcao: "Conselho Fiscal" },
    { nome: "Vanessa Valle", funcao: "Conselho Fiscal" },
  ];

  return (
    <section id="board" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            Conselho <span className="gradient-text">Administrativo</span>
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <tbody>
              {members.map((membro, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="py-3 px-6 border-b">{membro.nome}</td>
                  <td className="py-3 px-6 border-b">{membro.funcao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
