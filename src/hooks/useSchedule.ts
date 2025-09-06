import { useEffect, useState } from "react";

// Data structure for tracks per day (English)
const mockData = [
  {
    name: "24 de outubro",
    date: "Sexta-feira",
    tracks: [
      {
        name: "Business Application ",
        coordinators: ["Daniel Petrin, Danilo Ciciliotti, Marcelo Pacifico "],
        // talks: [
        //   { title: "Kubernetes in Practice", speaker: "João Pedro", time: "09:00" },
        //   { title: "Modern CI/CD", speaker: "Maria Oliveira", time: "10:00" },
        // ],
      },
      {
        name: "Cloud & Datacenter",
        coordinators: ["Elton Bordim, Josue Vidal, Vinicius Mozart"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Data Platform",
        coordinators: ["Guilherme Salles,  Hugo Venturini, Luiz Gustavo Serra"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Developer Technologies",
        coordinators: ["Bruno Brito, Carlos Santos,  Osanam Giordane, Renicius Pagottto, Talles Valiatti, Tania Stormovsky, Vinicius Moura"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Gestao de Negocios e Empreendedorismo",
        coordinators: ["Jamil Lopes, Marco Lagoa"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Inteligencia Artificial",
        coordinators: ["Felipe Chikuji, Jorge Maia, Sulamita Dantas"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Microsoft 365",
        coordinators: ["Fábio Gatti, João Benito, Thais Mafra"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Microsoft Azure",
        coordinators: ["Diego Matos, Renato Groffe"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Quantum Computing",
        coordinators: ["Anderson Santos, Leonardo Rossato, Rosangela Maraschin"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Security",
        coordinators: ["Daniel Donda, Rebecca Frade"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
    ],
  },
    {
    name: "25 de outubro",
    date: "Sábado",
    tracks: [
      {
        name: "Business Application ",
        coordinators: ["Daniel Petrin, Danilo Ciciliotti, Marcelo Pacifico "],
        // talks: [
        //   { title: "Kubernetes in Practice", speaker: "João Pedro", time: "09:00" },
        //   { title: "Modern CI/CD", speaker: "Maria Oliveira", time: "10:00" },
        // ],
      },
      {
        name: "Cloud & Datacenter",
        coordinators: ["Elton Bordim, Josue Vidal, Vinicius Mozart"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Data Platform",
        coordinators: ["Guilherme Salles,  Hugo Venturini, Luiz Gustavo Serra"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Developer Technologies",
        coordinators: ["Bruno Brito, Carlos Santos,  Osanam Giordane, Renicius Pagottto, Talles Valiatti, Tania Stormovsky, Vinicius Moura"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Gestao de Negocios e Empreendedorismo",
        coordinators: ["Jamil Lopes, Marco Lagoa"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Inteligencia Artificial",
        coordinators: ["Felipe Chikuji, Jorge Maia, Sulamita Dantas"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Microsoft 365",
        coordinators: ["Fábio Gatti, João Benito, Thais Mafra"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Microsoft Azure",
        coordinators: ["Diego Matos, Renato Groffe"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Quantum Computing",
        coordinators: ["Anderson Santos, Leonardo Rossato, Rosangela Maraschin"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
      {
        name: "Security",
        coordinators: ["Daniel Donda, Rebecca Frade"],
        // talks: [
        //   { title: "LLMs and the Future", speaker: "Lucas Martins", time: "09:00" },
        //   { title: "Computer Vision", speaker: "Paula Ramos", time: "10:00" },
        // ],
      },
    ],
  }
];


type Talk = {
  title: string;
  speaker: string;
  time: string;
};
type Track = {
  name: string;
  coordinators: string[];
  talks: Talk[];
};
type Day = {
  name: string;
  date: string;
  tracks: Track[];
};

export function useSchedule() {
  const [data, setData] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate async request
    const timeout = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  return { data, loading };
}
