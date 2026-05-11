import { formatDistanceToNow, parseISO } from "date-fns";
import { CalendarDays, MapPin, User } from "lucide-react";
import { Link } from "react-router";

// This component represents a single property card used in the All Properties listing page
const AllPropertyCard = ({ property }) => {
  // Destructure property data, using empty object as fallback
  const {
    _id,
    name,
    vehicleName,
    category,
    price,
    pricePerDay,
    location,
    image,
    owner_name,
    owner,
    postedDate,
    createdAt,
    coverImage,
    description,
  } = property || {};

  // Support for multiple database naming conventions (Data Normalization)
  const displayName = name || vehicleName;
  const displayOwner = owner_name || owner;
  const displayDate = postedDate || createdAt;
  const displayImage = image || coverImage;
  const displayPrice = price || pricePerDay;

  // Logic to calculate how long ago the property was posted
  const posted = displayDate ? parseISO(displayDate) : new Date();
  const daysAgo = displayDate 
    ? formatDistanceToNow(posted, { addSuffix: true })
    : "Recently";

  // Flag properties posted within the last 7 days as "New Listing"
  const isNew = displayDate
    ? (new Date() - new Date(displayDate)) / (1000 * 60 * 60 * 24) <= 7
    : true;

  return (
    <div className="card-premium group flex flex-col h-full bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 transition-all duration-300">
      {/* Visual Header: Property Image and Status Badge */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={displayImage}
          alt={displayName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Shows "New Listing" badge for recent properties */}
        {isNew && (
          <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg tracking-widest uppercase">
            New Listing
          </span>
        )}
        
        {/* Description overlay that appears on hover */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-white text-sm font-medium line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Details Section: Title, Category, Location, Price, and Metadata */}
      <div className="p-6 flex flex-col justify-between grow">
        <div>
          {/* Property Title (Aligned across cards with fixed height) */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-black text-neutral dark:text-white leading-tight group-hover:text-primary transition-colors h-16 line-clamp-2">
              {displayName}
            </h3>
          </div>

          {/* Category Badge and Location Info */}
          <div className="flex items-center gap-4 text-sm font-bold mb-6">
            <span className="px-3 py-1 bg-[#E91E63]/10 text-[#E91E63] rounded-lg uppercase tracking-wider">
              {category}
            </span>
            <span className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
              <MapPin className="w-4 h-4 text-secondary" />
              {location}
            </span>
          </div>

          {/* Price Section with currency formatting */}
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl font-black price-tag">
              ${displayPrice ? parseInt(displayPrice).toLocaleString() : "N/A"}
            </span>
            {category?.toLowerCase() === 'rent' && <span className="text-gray-400 dark:text-gray-500 font-bold">/mo</span>}
          </div>

          {/* Footer of the card showing Owner Name and Relative Date */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-slate-800 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-base-300 dark:bg-slate-800 flex items-center justify-center">
                <User className="w-3 h-3 text-gray-500" />
              </div>
              <span className="dark:text-gray-400">{displayOwner}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-secondary" />
              {daysAgo}
            </span>
          </div>
        </div>

        {/* Action Button: Navigate to Details Page */}
        <div className="mt-8">
          <Link
            to={`/property/${_id}`}
            className="btn-premium w-full text-center inline-block"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPropertyCard;
