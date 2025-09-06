import React, { useState } from "react";
import { useSchedule } from "../hooks/useSchedule";
import BuyTickets from "./BuyTickets";

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

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);
  const { data: days, loading } = useSchedule() as { data: Day[]; loading: boolean };

  return (
    <section className="py-16 bg-gray-50" id="schedule">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
          Agenda de <span className="gradient-text">Palestras</span>
        </h2>

        {loading || !days.length ? (
          <div className="text-center text-blue-700 py-16 text-lg">Loading schedule...</div>
        ) : (
          <>
            {/* Day tabs */}
            <div className="flex justify-center mb-8 gap-4">
              {days.map((day: Day, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveDay(idx)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border-2 focus:outline-none ${
                    activeDay === idx
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {day.name} <span className="ml-2 text-xs">{day.date}</span>
                </button>
              ))}
            </div>

            {/* Tracks for selected day */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {days[activeDay]?.tracks.map((track: Track, idx: number) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-blue-700">{track.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Coordenadores:</span> {track.coordinators.join(", ")}
                  </p>
                  {track.talks && track.talks.length > 0 ? (
                    <ul className="flex-1 space-y-3">
                      {track.talks.map((talk: Talk, i: number) => (
                        <li key={i} className="border-l-4 border-blue-500 pl-3 py-2 bg-blue-50 rounded">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{talk.title}</span>
                            <span className="text-xs text-gray-400">{talk.time}</span>
                          </div>
                          <div className="text-sm text-gray-600">{talk.speaker}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded text-center text-sm">
                        Em breve anunciaremos as palestras dessa trilha! Fiquem ligados nas nossas redes sociais para mais informações.
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

        <BuyTickets title="Adquira seu Ingresso" />

    </section>
  );
};

export default Schedule;