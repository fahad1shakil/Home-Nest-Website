import { ClockCheck, Edit, Eye, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router";

// This component displays an individual property card in the 'My Properties' dashboard
const PropertyCard = ({ property, handleMyPropertyDelete }) => {
  // Destructure property data with support for multiple naming conventions
  const {
    _id,
    name,
    vehicleName,
    price,
    pricePerDay,
    location,
    category,
    image,
    coverImage,
    postedDate,
    createdAt,
  } = property;

  // Fallback logic to ensure data is displayed regardless of which field names are used in the database
  const displayName = name || vehicleName;
  const displayPrice = price || pricePerDay;
  const displayImage = image || coverImage;
  const displayDate = postedDate || createdAt;

  return (
    <div className="card-premium group flex flex-col h-full bg-white">
      {/* Visual Section: Displays property image and category badge */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={displayImage}
          alt={displayName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="absolute top-4 left-4 bg-[#E91E63] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg tracking-widest uppercase">
          {category}
        </span>
      </div>

      {/* Information Section: Title, Price, Location, and Date */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title has a fixed height (h-16) to keep cards perfectly aligned in rows */}
        <h2 className="text-2xl font-black text-neutral dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors h-16 line-clamp-2">
          {displayName}
        </h2>
        
        {/* Price tag uses a custom CSS class to ensure correct coloring in dark mode */}
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-3xl font-black price-tag">
            ${displayPrice ? parseInt(displayPrice).toLocaleString() : "N/A"}
          </span>
        </div>

        {/* Location and Date indicators */}
        <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-50 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <p className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-secondary" />
            {location}
          </p>
          <p className="flex items-center gap-1.5">
            <ClockCheck className="w-4 h-4 text-secondary" />
            {displayDate
              ? new Date(displayDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "No Date"}
          </p>
        </div>
      </div>

      {/* Action Buttons: View, Update, and Delete */}
      <div className="flex divide-x divide-gray-100 border-t border-gray-100">
        <Link
          to={`/property/${_id}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-gray-600 font-bold hover:bg-gray-50 hover:text-primary transition-all"
        >
          <Eye className="w-5 h-5" /> View Details
        </Link>

        <Link
          to={`/update/${_id}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-gray-600 font-bold hover:bg-gray-50 hover:text-secondary transition-all"
        >
          <Edit className="w-5 h-5" /> Update
        </Link>

        <button
          onClick={() => handleMyPropertyDelete(_id)}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-red-500 font-bold hover:bg-red-50 transition-all"
        >
          <Trash2 className="w-5 h-5" /> Delete
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
