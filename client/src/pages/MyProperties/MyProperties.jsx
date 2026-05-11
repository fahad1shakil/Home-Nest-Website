import { EraserIcon, Home } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyPropertyCard from "./MyPropertyCard";

const MyProperties = () => {
  // State for storing properties posted by the current user
  const [myProperties, setProperties] = useState([]);
  const { user } = useAuth(); // Access logged-in user info
  const axiosSecure = useAxiosSecure(); // Access secure Axios instance

  // State to manage the loading spinner
  const [loading, setLoading] = useState(true);

  // Effect to fetch user-specific properties from the database
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/property?email=${user?.email}`) // API call with user email as filter
      .then((data) => {
        setProperties(data.data);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        toast.error("Failed to load properties");
      })
      .finally(() => {
        setLoading(false); // Stop loading regardless of success or failure
      });
  }, [user]);

  // Function to delete a property after user confirmation
  const handleMyPropertyDelete = (id) => {
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
        // If confirmed, call the delete API
        axiosSecure.delete(`/property/${id}`).then((data) => {
          if (data.data.deletedCount) {
            toast.success("Property is Deleted!");
            // Update the UI by removing the deleted property from state
            const resData = myProperties.filter((item) => item._id != id);
            setProperties(resData);
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your property has been removed.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
    <section className="bg-white dark:bg-[#0f172a] min-h-screen py-24 px-6 relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-neutral dark:text-white tracking-tight mb-4">
            My <span className="text-[#E91E63] italic">Sanctuary</span>
          </h1>
          <p className="text-gray-400 font-bold max-w-lg mx-auto uppercase tracking-widest text-xs">
            Manage your personal collection of listed masterpieces and property ventures.
          </p>
        </div>

        {/* Empty State / Loading State */}
        {myProperties.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-32 bg-gray-50 dark:bg-slate-900 rounded-[50px] border-2 border-dashed border-gray-100 dark:border-slate-800">
            {loading ? (
              // Display spinner while data is being fetched
              <div className="flex flex-col items-center gap-6">
                <Bars height="60" width="60" color="#E91E63" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Retrieving your listings...</p>
              </div>
            ) : (
              // Display "No Properties" message if the list is truly empty
              <div className="max-w-md px-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Home className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-neutral dark:text-white mb-4">No Properties Yet</h3>
                <p className="text-gray-400 font-medium mb-10 leading-relaxed italic">
                  "The magic of home is that it feels good to leave, and it feels even better to come back." — Let's start by adding one!
                </p>
                <Link to="/add-properties" className="btn-premium px-12 py-5 rounded-full inline-block">
                  Launch Your First Property
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Grid of property cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {myProperties.map((property) => (
            <MyPropertyCard
              key={property._id}
              property={property}
              handleMyPropertyDelete={handleMyPropertyDelete}
            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default MyProperties;
