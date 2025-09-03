import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2025",
    subtitle: "Discover the latest trends",
    description:
      "Elevate your style with our curated summer collection featuring the newest fashion trends.",
    image:
      "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1200",
    buttonText: "Shop Now",
    buttonLink: "/catalog?category=Fashion",
    gradient: "from-primary-600/70 to-primary-900/50",
  },
  {
    id: 2,
    title: "Premium Electronics",
    subtitle: "Technology that inspires",
    description:
      "Experience the future with our cutting-edge electronics and smart devices.",
    image:
      "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200",
    buttonText: "Explore",
    buttonLink: "/catalog?category=Electronics",
    gradient: "from-primary-700/70 to-primary-950/50",
  },
  {
    id: 3,
    title: "Home Essentials",
    subtitle: "Transform your space",
    description:
      "Create the perfect home environment with our carefully selected furniture and decor.",
    image:
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200",
    buttonText: "Shop Home",
    buttonLink: "/catalog?category=Home",
    gradient: "from-primary-800/60 to-primary-950/60",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl border border-primary-200">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-20" : "opacity-100 z-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
            />
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <p className="text-primary-300 text-sm font-semibold mb-3 animate-fade-in tracking-wide uppercase">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in-delay-1 tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-100 mb-8 leading-relaxed animate-fade-in-delay-2 max-w-lg">
                    {slide.description}
                  </p>
                  <a
                    href={slide.buttonLink}
                    className="inline-flex items-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 animate-fade-in-delay-3 hover:scale-105 hover:shadow-xl shadow-lg group"
                  >
                    {slide.buttonText}
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-primary-600/30 hover:bg-primary-600/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-primary-600/30 hover:bg-primary-600/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-600 shadow-lg scale-125"
                : "bg-white/50 hover:bg-primary-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
