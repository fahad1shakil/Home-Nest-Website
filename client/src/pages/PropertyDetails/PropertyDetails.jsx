import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BadgeCheck, Calendar, Home, Mail, MapPin, SearchX, User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";
import LoadingScreen from "../../components/LoadingScreen";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PropertyDetails = () => {
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { id: paramsId } = useParams();

  const fetchPropertyAndReviews = async () => {
    setLoading(true);
    try {
      const propRes = await axiosSecure.get(`/property/${paramsId}`);
      setProperty(propRes.data);
      
      if (propRes.data) {
        const reviewRes = await axiosSecure.get(`/ratings?propertyName=${propRes.data.name || propRes.data.vehicleName}`);
        setReviews(reviewRes.data);
      }
    } catch (error) {
      console.error("Error fetching details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyAndReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsId]);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const submissionTime = new Date().toISOString();
    const reviewDesc = e.target.reviewInput.value;
    const newReview = {
      reviewDesc,
      rating,
      location: property?.location,
      reviewer: user?.displayName,
      reviewerEmail: user?.email,
      reviewerPhoto: user?.photoURL,
      propertyName: property?.name || property?.vehicleName,
      propertyImage: property?.image || property?.coverImage,
      reviewDate: submissionTime,
    };

    axiosSecure.post("/ratings", newReview).then(() => {
      toast.success("Review Submitted");
      setRating(0);
      e.target.reset();
      fetchPropertyAndReviews(); // Refresh reviews
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!property) {
    return (
      <section className="flex flex-col items-center justify-center text-center min-h-[70vh] px-6 bg-white">
        <div className="relative mb-10">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <SearchX className="w-16 h-16 text-primary" />
          </div>
        </div>
        <h2 className="text-4xl font-black text-neutral mb-4">
          Property Not Found
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg font-medium">
          The property you are looking for might have been moved or deleted.
        </p>
        <Link
          to="/all-properties"
          className="btn-premium px-10"
        >
          Explore Listings
        </Link>
      </section>
    );
  }

  const {
    name,
    vehicleName,
    category,
    price,
    pricePerDay,
    location,
    image,
    coverImage,
    owner_name,
    owner,
    owner_email,
    owner_photoURL,
    postedDate,
    createdAt,
    description,
    availability,
    rating: propertyRating,
    booked
  } = property;

  const displayName = name || vehicleName;
  const displayPrice = price || pricePerDay;
  const displayImage = image || coverImage;
  const displayOwner = owner_name || owner;
  const displayDate = postedDate || createdAt;

  return (
    <div className="bg-[#f8fafc] dark:bg-[#0f172a] min-h-screen py-24 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* The "Exact Card" from Screenshot */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] p-8 md:p-12 flex flex-col lg:flex-row items-center lg:items-start gap-12 border border-gray-50 dark:border-slate-800">
          
          {/* Left: Image with Padding and Rounded Corners */}
          <div className="w-full lg:w-[45%] shrink-0">
            <img
              src={displayImage}
              alt={displayName}
              className="w-full aspect-[4/3] object-cover rounded-[24px] shadow-lg"
            />
          </div>

          {/* Right: Details */}
          <div className="flex-1 space-y-6 pt-4">
            <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] dark:text-white tracking-tight">
              {displayName}
            </h1>

            {/* Tags from Screenshot */}
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-1.5 border-2 border-[#E91E63] text-[#E91E63] rounded-full font-bold text-sm">
                {category}
              </span>
              <span className="px-5 py-1.5 border-2 border-[#E91E63] text-[#E91E63] rounded-full font-bold text-sm">
                Booked: {booked || 0}
              </span>
            </div>

            <p className="text-[#64748b] dark:text-gray-400 text-lg font-medium leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Owner / Posted By Information */}
            <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-slate-800 rounded-[20px] border border-gray-100 dark:border-slate-700">
              <img 
                src={owner_photoURL || `https://ui-avatars.com/api/?name=${displayOwner}`} 
                className="w-14 h-14 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" 
                alt={displayOwner} 
              />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Posted By</p>
                <p className="text-lg font-black text-[#0f172a] dark:text-white">{displayOwner}</p>
                <p className="text-sm font-bold text-[#E91E63]">{owner_email}</p>
              </div>
            </div>

            {/* Price Info */}
            <div className="pt-4">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Asking Price</p>
              <p className="text-4xl font-black text-[#E91E63]">
                ${displayPrice ? parseInt(displayPrice).toLocaleString() : "N/A"}
                {category?.toLowerCase() === 'rent' && <span className="text-xl text-gray-400 font-bold ml-1">/month</span>}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button className="px-10 py-4 bg-[#0f172a] dark:bg-primary text-white font-black rounded-full shadow-xl hover:bg-[#1e293b] transition-all flex items-center gap-2">
                 Instant Inquiry
              </button>
              <button className="px-10 py-4 border-2 border-[#E91E63] text-[#E91E63] font-black rounded-full hover:bg-[#E91E63] hover:text-white transition-all">
                Contact Owner
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-24 space-y-12">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-8">
            <h3 className="text-3xl font-black text-[#0f172a] dark:text-white">
              User <span className="text-[#E91E63]">Reviews</span>
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-3xl font-black text-[#0f172a] dark:text-white">
                  {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "5.0"}
                </p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Average Rating</p>
              </div>
              <Rating style={{ maxWidth: 120 }} value={reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 5} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.length > 0 ? (
              reviews.map((rev, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[30px] shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img src={rev.reviewerPhoto || "https://ui-avatars.com/api/?name=" + rev.reviewer} className="w-12 h-12 rounded-full border-2 border-gray-50 dark:border-slate-800" alt="" />
                      <div>
                        <p className="font-black text-[#0f172a] dark:text-white">{rev.reviewer}</p>
                        <p className="text-xs text-gray-400 font-bold">{new Date(rev.reviewDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Rating style={{ maxWidth: 80 }} value={rev.rating} readOnly />
                  </div>
                  <p className="text-[#64748b] dark:text-gray-400 font-medium leading-relaxed italic">"{rev.reviewDesc}"</p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-gray-50 dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-slate-800">
                <p className="text-gray-400 font-bold uppercase tracking-widest">No reviews yet. Share your experience!</p>
              </div>
            )}
          </div>

          <div className="bg-[#0f172a] dark:bg-slate-900 p-10 md:p-16 rounded-[40px] shadow-2xl text-white relative overflow-hidden border dark:border-slate-800">
            <h3 className="text-2xl font-black mb-10 relative z-10">Add Your Review</h3>
            <form onSubmit={reviewSubmitHandler} className="max-w-2xl space-y-8 relative z-10">
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Rating</p>
                <Rating
                  style={{ maxWidth: 180 }}
                  value={rating}
                  onChange={setRating}
                  isRequired={true}
                />
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Experience</p>
                <textarea
                  required
                  name="reviewInput"
                  className="w-full h-32 p-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E91E63] font-medium"
                  placeholder="Describe your stay..."
                ></textarea>
              </div>
              <button className="px-10 py-4 bg-[#E91E63] text-white font-black rounded-full shadow-lg hover:opacity-90 transition-all">
                Submit Review
              </button>
            </form>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E91E63]/10 blur-[100px] rounded-full"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertyDetails;
