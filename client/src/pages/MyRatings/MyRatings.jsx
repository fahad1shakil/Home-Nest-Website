import { MessageSquare, Star } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyRatingCard from "./MyRatingCard";

const MyRatings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [catchError, setCatchError] = useState(null);
  console.log(reviews);

  const deleteReviewHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/ratings/${id}`).then(() => {
          const res = reviews.filter((item) => item._id != id);
          setReviews(res);
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleEdit = () => {
    toast.error("Edit features coming soon!");
  };

  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`/ratings?email=${user?.email}`).then((data) => {
      setReviews(data.data), setLoading(false);
    });
    // .catch((err) => setCatchError(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-white dark:bg-[#0f172a] min-h-screen py-24 px-6 relative overflow-hidden transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-neutral dark:text-white tracking-tight mb-4">
            My <span className="text-[#E91E63] italic">Feedback</span>
          </h1>
          <p className="text-gray-400 font-bold max-w-lg mx-auto uppercase tracking-widest text-xs">
            Review your property experiences and the marks you've left in the community.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-32 bg-gray-50 dark:bg-slate-900 rounded-[50px] border-2 border-dashed border-gray-100 dark:border-slate-800">
            {loading ? (
              <div className="flex flex-col items-center gap-6">
                <Bars height="60" width="60" color="#E91E63" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Gathering your thoughts...</p>
              </div>
            ) : (
              <div className="max-w-md px-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Star className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-neutral dark:text-white mb-4">No Reviews Found</h3>
                <p className="text-gray-400 font-medium mb-10 leading-relaxed italic">
                  "Your voice is your power." — Share your first experience and help the HomeNest community grow.
                </p>
                <Link to="/all-properties" className="btn-premium px-12 py-5 rounded-full inline-block">
                  Explore & Review
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <MyRatingCard
                key={review._id}
                review={review}
                handleEdit={handleEdit}
                deleteReviewHandler={deleteReviewHandler}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyRatings;
