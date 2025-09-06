import React from "react";

const images = [
    "https://raw.githubusercontent.com/MVPConf/picture/refs/heads/master/foto000.jpeg",
  "https://raw.githubusercontent.com/MVPConf/picture/refs/heads/master/foto111.jpg",
  "https://raw.githubusercontent.com/MVPConf/picture/refs/heads/master/foto47.jpg",
  "https://raw.githubusercontent.com/MVPConf/picture/refs/heads/master/foto77.jpg",
];

const Carousel: React.FC = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="Carousel" className="py-32 min-h-[60vh] bg-blue-50 flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full">

    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
    Galeria de <span className="gradient-text">Imagens</span>
    </h2>

        <div className="relative w-full max-w-5xl mx-auto mb-8 mt-8">
          <img
            src={images[current]}
            alt={`Imagem ${current + 1}`}
            className="w-full h-[40rem] object-contain rounded-xl shadow-2xl bg-gray-100"
          />
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-4 shadow hover:bg-opacity-100"
            aria-label="Anterior"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-4 shadow hover:bg-opacity-100"
            aria-label="Próxima"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
