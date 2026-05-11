import {
  AlignLeft,
  DollarSign,
  FolderPlus,
  Home,
  Image,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddProperty = () => {
  // Get current logged-in user information
  const { user } = useAuth();
  // Use our secure Axios instance for API calls
  const axiosSecure = useAxiosSecure();
  // Helper to redirect the user to other pages
  const navigate = useNavigate(null);

  // This function runs when the user submits the form
  const handleAddProperty = (e) => {
    e.preventDefault(); // Stop the page from refreshing
    const form = e.target;
    const priceValue = e.target.price.value;

    // Strict validation: Price must be at least 8 digits long
    if (priceValue.length < 8) {
      Swal.fire({
        title: "Haha 😂",
        text: "We will not add the houses of the poor.",
        icon: "error",
        confirmButtonColor: "#E91E63",
      });
      return; // Stop the submission
    }

    // Capture the current date and time
    const postedData = new Date().toISOString();

    // Create the property object with all form data and user info
    const newProperty = {
      name: e.target.name.value,
      vehicleName: e.target.name.value, // Compatibility for different DB field names
      description: e.target.description.value,
      category: e.target.category.value,
      location: e.target.location.value,
      price: e.target.price.value,
      pricePerDay: e.target.price.value, // Compatibility for different DB field names
      image: e.target.image.value,
      coverImage: e.target.image.value, // Compatibility for different DB field names
      owner_name: user.displayName,
      owner: user.displayName, // Compatibility for different DB field names
      owner_email: user.email,
      userEmail: user.email, // Compatibility for different DB field names
      owner_photoURL: user.photoURL,
      postedDate: postedData,
      createdAt: postedData, // Compatibility for different DB field names
    };

    // Send the property data to our server
    axiosSecure
      .post("/properties", newProperty)
      .then(() => {
        toast.success("Property added success!");
        navigate("/all-properties"); // Go to the listings page
        form.reset(); // Clear the form
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <section className="bg-white dark:bg-[#0f172a] min-h-screen py-24 px-6 relative overflow-hidden transition-colors duration-300">
      {/* Decorative background blur effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-[0_20px_70px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-100 dark:border-slate-800 p-8 md:p-16">
          {/* Page Title and Subtitle */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-6 transform -rotate-6">
              <FolderPlus className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-neutral dark:text-white mb-4 tracking-tight">
              List Your <span className="text-[#E91E63] italic">Property</span>
            </h2>
            <p className="text-gray-400 font-bold max-w-lg mx-auto uppercase tracking-widest text-xs">
              Reach thousands of potential buyers and renters by listing your masterpiece on HomeNest.
            </p>
          </div>

          {/* Input Form Section */}
          <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input: Property Name */}
            <div className="md:col-span-2 space-y-3 text-left">
              <label className="text-sm font-black text-neutral dark:text-gray-300 uppercase tracking-widest flex items-center gap-2 px-1">
                <Home className="w-4 h-4 text-primary" /> Property Name
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="e.g. Skyline Luxury Penthouse"
                className="w-full px-8 py-5 rounded-[20px] bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white placeholder-gray-400 transition-all"
              />
            </div>

            {/* Input: Category Selection */}
            <div className="space-y-3 text-left">
              <label className="text-sm font-black text-neutral dark:text-gray-300 uppercase tracking-widest flex items-center gap-2 px-1">
                <FolderPlus className="w-4 h-4 text-primary" /> Category
              </label>
              <select
                required
                name="category"
                className="w-full px-8 py-5 rounded-[20px] bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white transition-all appearance-none"
              >
                <option value="">Select Category</option>
                <option>Rent</option>
                <option>Sale</option>
                <option>Commercial</option>
                <option>Land</option>
              </select>
            </div>

            {/* Input: Price Field */}
            <div className="space-y-3 text-left">
              <label className="text-sm font-black text-neutral dark:text-gray-300 uppercase tracking-widest flex items-center gap-2 px-1">
                <DollarSign className="w-4 h-4 text-primary" /> Price ($)
              </label>
              <input
                required
                name="price"
                type="number"
                placeholder="e.g. 2500000"
                className="w-full px-8 py-5 rounded-[20px] bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white placeholder-gray-400 transition-all"
              />
            </div>

            {/* Input: Location Field */}
            <div className="space-y-3 text-left">
              <label className="text-sm font-black text-neutral dark:text-gray-300 uppercase tracking-widest flex items-center gap-2 px-1">
                <MapPin className="w-4 h-4 text-primary" /> Location
              </label>
              <input
                required
                name="location"
                type="text"
                placeholder="e.g. Gulshan 2, Dhaka"
                className="w-full px-8 py-5 rounded-[20px] bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white placeholder-gray-400 transition-all"
              />
            </div>

            {/* Input: Image Link */}
            <div className="space-y-3 text-left">
              <label className="text-sm font-black text-neutral dark:text-gray-300 uppercase tracking-widest flex items-center gap-2 px-1">
                <Image className="w-4 h-4 text-primary" /> Image URL
              </label>
              <input
                required
                name="image"
                type="text"
                placeholder="https://images.unsplash.com/..."
                className="w-full px-8 py-5 rounded-[20px] bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white placeholder-gray-400 transition-all"
              />
            </div>

            {/* Input: Large Description Area */}
            <div className="md:col-span-2 space-y-3 text-left">
              <label className="text-sm font-black text-neutral dark:text-gray-300 uppercase tracking-widest flex items-center gap-2 px-1">
                <AlignLeft className="w-4 h-4 text-primary" /> Description
              </label>
              <textarea
                required
                name="description"
                placeholder="Share the unique features of this property..."
                className="w-full px-8 py-6 rounded-[30px] bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white placeholder-gray-400 transition-all h-40"
              ></textarea>
            </div>

            {/* Display logged-in user information (Read Only) */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-neutral/5 dark:bg-white/5 rounded-[30px] border border-neutral/5 dark:border-white/10">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Listing Agent</p>
                <p className="text-lg font-black text-neutral dark:text-white">{user.displayName}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Email</p>
                <p className="text-lg font-black text-neutral dark:text-white">{user.email}</p>
              </div>
            </div>

            {/* Final Submission Button */}
            <div className="md:col-span-2 pt-8">
              <button className="btn-premium w-full py-6 text-xl shadow-2xl shadow-primary/20">
                Launch Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProperty;
