import {
  AlignLeft,
  DollarSign,
  FolderPlus,
  Home,
  Image,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateProperty = () => {
  const [property, setProperty] = useState({});
  const axiosSecure = useAxiosSecure();
  const { id: paramsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get(`/property/${paramsId}`).then((data) => {
      setProperty(data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateProperty = (e) => {
    e.preventDefault();
    
    const priceValue = e.target.price.value;
    if (priceValue.length < 8) {
      Swal.fire({
        title: "Haha 😂",
        text: "We will not add the houses of the poor.",
        icon: "error",
        confirmButtonColor: "#0F5660",
      });
      return;
    }

    const update = {
      name: e.target.name.value,
      description: e.target.description.value,
      category: e.target.category.value,
      price: e.target.price.value,
      location: e.target.location.value,
      image: e.target.image.value,
      owner_email: property.owner_email,
    };

    axiosSecure.patch(`/property/${property._id}`, update).then((data) => {
      if (data.data.modifiedCount) {
        toast.success("Update Success");
        navigate("/my-properties");
      }
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-[#0f172a] min-h-screen py-14 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[30px] shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-neutral dark:text-white mb-3">
            Update <span className="text-[#E91E63] italic">Property</span>
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            Modify your listing details to keep your property information current.
          </p>
        </div>

        <form onSubmit={handleUpdateProperty} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="form-control md:col-span-2">
            <label className="label text-xs font-black text-neutral dark:text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <Home className="w-4 h-4 text-primary" /> Property Name
            </label>
            <input
              defaultValue={property.name || property.vehicleName}
              type="text"
              name="name"
              placeholder="Enter property name"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white transition-all"
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label text-xs font-black text-neutral dark:text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <AlignLeft className="w-4 h-4 text-primary" /> Description
            </label>
            <textarea
              name="description"
              defaultValue={property.description}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white transition-all h-32"
              placeholder="Describe the property..."
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label text-xs font-black text-neutral dark:text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <FolderPlus className="w-4 h-4 text-primary" /> Category
            </label>
            <select
              name="category"
              defaultValue={property.category}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white transition-all appearance-none"
            >
              <option>Rent</option>
              <option>Sale</option>
              <option>Commercial</option>
              <option>Land</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label text-xs font-black text-neutral dark:text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <DollarSign className="w-4 h-4 text-primary" /> Price ($)
            </label>
            <input
              name="price"
              defaultValue={property.price || property.pricePerDay}
              type="number"
              placeholder="Enter property price"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white transition-all"
            />
          </div>

          <div className="form-control">
            <label className="label text-xs font-black text-neutral dark:text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <MapPin className="w-4 h-4 text-primary" /> Location
            </label>
            <input
              name="location"
              defaultValue={property.location}
              type="text"
              placeholder="Enter property location"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white transition-all"
            />
          </div>

          <div className="form-control">
            <label className="label text-xs font-black text-neutral dark:text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <Image className="w-4 h-4 text-primary" /> Image URL
            </label>
            <input
              name="image"
              defaultValue={property.image || property.coverImage}
              type="text"
              placeholder="Enter image link"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-primary/10 font-bold text-neutral dark:text-white transition-all"
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-neutral/5 dark:bg-white/5 rounded-2xl mt-4">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Owner Name</p>
              <p className="font-bold text-neutral dark:text-white">{property.owner_name || property.owner}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Owner Email</p>
              <p className="font-bold text-neutral dark:text-white">{property.owner_email || property.userEmail}</p>
            </div>
          </div>

          <div className="md:col-span-2 mt-10 flex gap-6">
            <Link
              to={"/my-properties"}
              className="flex-1 py-4 text-center rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 font-black uppercase tracking-widest text-xs hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-premium flex-[2] py-4 rounded-2xl shadow-xl shadow-primary/20"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProperty;
