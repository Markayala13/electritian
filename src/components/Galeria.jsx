import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imagenes = [
  "/12.jpg",
  "/11.jpg",
  "/10.jpg",
  "/9.jpg",
  "/8.jpg",
  "/7.jpg",
  "/6.jpg",
  "/5.jpg",
  "/4.jpg",
  "/3.jpg",
  "/2.jpg",
  "/13.png",
];

export default function Galeria() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section
      id="galeria"
      className="bg-white py-12"
      style={{ scrollMarginTop: "90px" }} // Ajusta según el alto de tu navbar
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#23272F]">
          Galería de Trabajos
        </h2>
        <Slider {...settings}>
          {imagenes.map((src, idx) => (
            <div key={idx} className="px-2">
              <div className="rounded-xl overflow-hidden shadow-lg bg-[#F5F7FA] flex items-center justify-center">
                <img
                  src={src}
                  alt={`Galería ${idx + 1}`}
                  className="object-cover w-full h-64 md:h-80 transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}