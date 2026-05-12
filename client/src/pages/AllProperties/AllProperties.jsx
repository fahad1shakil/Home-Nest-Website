/* eslint-disable react-hooks/exhaustive-deps */
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import AllPropertyCard from "../../components/AllPropertyCard";
import LoadingScreen from "../../components/LoadingScreen";
import useAxios from "../../hooks/useAxios";

const AllProperties = () => {
  const axios = useAxios();
  const [properties, setProperties] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/all-properties?sort=${sortBy}`)
      .then((res) => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Detailed Fetch Error:", err.response?.data || err.message);
        setLoading(false);
      });
  }, [sortBy]);

  const filteredProperties = properties.filter((item) => {
    if (!searchValue) return true;
    const name = item?.name || item?.propertyTitle || "";
    return name.toLowerCase().includes(searchValue.toLowerCase());
  });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-[#0f172a] transition-colors duration-300 min-h-screen">
      <section className="py-16">
        {/* Page Header with Titles */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="space-y-4">
            <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm">Discover</h2>
            <h1 className="text-4xl md:text-6xl font-black text-neutral dark:text-white tracking-tight">
              Premium <span className="text-secondary italic">Listings</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl font-medium">
              Explore our hand-picked collection of luxury properties and find your next masterpiece.
            </p>
          </div>
        </div>

        {/* Filter Section: Search Bar and Sort Dropdown */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary/50" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search by property name or address..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-base-200 dark:bg-slate-800 text-neutral dark:text-white font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all border-none"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered w-full md:w-64 h-[60px] rounded-2xl border-gray-200 dark:border-slate-800 font-bold text-neutral dark:text-white bg-white dark:bg-slate-800 focus:ring-4 focus:ring-primary/10"
            >
              <option value="newest">Latest First</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid displaying the filtered property cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <AllPropertyCard key={property._id} property={property} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-base-300 dark:bg-slate-800 mb-6 text-gray-400">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-neutral dark:text-white mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
