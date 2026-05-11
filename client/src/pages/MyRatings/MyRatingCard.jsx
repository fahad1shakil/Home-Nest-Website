import { Edit, Star, Trash2, User } from "lucide-react";

const MyRatingCard = ({ review, deleteReviewHandler, handleEdit }) => {
  const {
    _id,
    propertyName,
    propertyImage,
    rating,
    reviewDesc,
    reviewDate,
    reviewer,
  } = review;

  // Format the review date
  const formattedDate = new Date(reviewDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-base-100 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4  gap-5 items-start mt-5 flex flex-col md:flex-row">
      <div>
        <img
          src={propertyImage}
          alt={propertyName}
          className="md:w-36 md:h-32 object-cover rounded-xl shrink-0"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-1 md:mt-0">
            Reviewed on {formattedDate}
          </p>
        </div>

        <h3 className="text-lg font-semibold text-base-content mt-2">
          {propertyName}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mt-1">
          {reviewDesc?.length > 100
            ? reviewDesc.slice(0, 100) + "..."
            : reviewDesc}
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleEdit}
            className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-2"
          >
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => deleteReviewHandler(_id)}
            className="btn btn-sm bg-gray-100 hover:bg-red-100 text-red-500 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
          <div>
            <h1 className="flex flex-1">
              <User /> {reviewer}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRatingCard;
