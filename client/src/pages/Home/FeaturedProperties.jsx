/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import useAxios from "../../hooks/useAxios";
import FeaturedPropertiesCard from "./FeaturedPropertiesCard";

const FeaturedProperties = () => {
  const axiosInstance = useAxios();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/latest-properties")
      .then((data) => {
        setProperties(data.data);
      })
      .catch((err) => {
        console.error("Error fetching latest properties:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-32 mb-12 max-w-7xl mx-auto px-4 dark:text-white">
      <div className="text-center mb-16">
        <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">Discover</h2>
        <h1 className="font-black text-4xl md:text-6xl text-neutral dark:text-white">
          Newest <span className="text-secondary italic">Listings</span>
        </h1>
      </div>
      {loading && (
        <div className="flex py-20 justify-center items-center flex-col">
          <Bars
            height="60"
            width="60"
            color="#E91E63"
            ariaLabel="bars-loading"
            visible={true}
          />
          <p className="text-gray-400 font-bold mt-6 uppercase tracking-widest text-xs">
            Curating the best homes for you...
          </p>
        </div>
      )}

      {!loading && properties.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 font-bold uppercase tracking-widest">No properties listed yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {properties.map((property) => (
          <FeaturedPropertiesCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
