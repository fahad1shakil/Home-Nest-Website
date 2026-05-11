import { MapPin } from "lucide-react";
import { Link } from "react-router";

const FeaturedPropertiesCard = ({ property }) => {
  const {
    _id,
    name,
    vehicleName,
    category,
    description,
    location,
    price,
    pricePerDay,
    image,
    coverImage,
  } = property || {};

  const displayName = name || vehicleName;
  const displayPrice = price || pricePerDay;
  const displayImage = image || coverImage;

  return (
    <div className="card-premium group flex flex-col h-full bg-white dark:bg-slate-900 transition-colors">
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={displayImage}
          alt={displayName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 left-4">
          <span className="bg-secondary text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg tracking-widest uppercase">
            {category}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-white text-sm font-medium line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between grow">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-black text-neutral dark:text-white leading-tight group-hover:text-primary transition-colors h-16 line-clamp-2 mb-3">
              {displayName}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold mb-6 text-gray-400">
            <MapPin className="w-4 h-4 text-secondary" />
            {location}
          </div>

          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl font-black price-tag">
              ${displayPrice ? parseInt(displayPrice).toLocaleString() : "N/A"}
            </span>
            {category?.toLowerCase() === 'rent' && <span className="text-gray-400 font-bold">/mo</span>}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-50 dark:border-slate-800">
          <Link
            to={`/property/${_id}`}
            className="btn-premium w-full text-center inline-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertiesCard;
