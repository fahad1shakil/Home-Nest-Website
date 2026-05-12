import { Link } from "react-router";
// Import Swiper components and styles for the sliding effect
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import local images used for the slides
import classicFamily from "../../assets/classic_family.png";
import urbanRetreat from "../../assets/urban_retreat.png";
import luxuryPenthouse from "../../assets/luxury_penthouse.png";
import modernVilla from "../../assets/modern_villa.png";

const Banner = () => {
  // Array of data for each slide in the banner
  const slides = [
    {
      id: 1,
      image: classicFamily,
      title: "Homenest Classic Family Home",
      description: "A beautiful, spacious home designed for creating lasting family memories.",
      btnText: "Explore Listings",
    },
    {
      id: 2,
      image: urbanRetreat,
      title: "Homenest Urban Retreat",
      description: "Experience modern luxury and tranquility in the heart of the city.",
      btnText: "Browse All Properties",
    },
    {
      id: 3,
      image: luxuryPenthouse,
      title: "Homenest Luxury Penthouse",
      description: "Elevate your lifestyle with breathtaking views and sophisticated design.",
      btnText: "Explore Collection",
    },
    {
      id: 4,
      image: modernVilla,
      title: "Homenest Modern Villa",
      description: "Escape to your own private oasis with world-class amenities and design.",
      btnText: "View Masterpieces",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80",
      title: "Modern Living Starts Here",
      description: "Experience luxurious spaces with verified listings, curated for your lifestyle.",
      btnText: "Browse All Properties",
    },
  ];

  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative">
      {/* Swiper component configuration */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation            // Show next/prev arrows
        pagination={{ clickable: true }} // Show dots at the bottom
        autoplay={{
          delay: 4000,        // Change slide every 4 seconds
          disableOnInteraction: false,
        }}
        loop={true}           // Go back to the first slide after the last one
        className="w-full h-full overflow-hidden"
      >
        {/* Loop through the slides array and render each one */}
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background image for the slide */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover brightness-[0.50]" // Darken image for text readability
              />

              {/* Text overlay on top of the image */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-12 md:px-10">
                <h1 className="text-3xl md:text-7xl font-black mb-4 md:mb-6 drop-shadow-2xl tracking-tight leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl max-w-3xl mb-6 md:mb-10 drop-shadow-lg font-medium text-white/90">
                  {slide.description}
                </p>
                {/* Call to action button */}
                <Link
                  to="/all-properties"
                  className="btn-premium px-10 py-5 text-lg"
                >
                  {slide.btnText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
