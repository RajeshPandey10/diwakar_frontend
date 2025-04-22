import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPlay, FaImage, FaSpinner, FaFacebook } from "react-icons/fa";

// Updated to ensure HTTP (not HTTPS) for local development
const API_URL = "http://localhost:4000/api";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/gallery/items`);
        setGalleryItems(response.data);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const filteredItems =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.type === activeTab);

  const openLightbox = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  // Container and item animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70 },
    },
  };

  const renderGalleryItem = (item) => {
    // Check if it's a Facebook item
    if (item.platform === "facebook") {
      return (
        <React.Fragment>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center">
              <FaFacebook className="text-white text-5xl" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300">
                <FaPlay className="text-white text-xl ml-1" />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    // Default YouTube or image render
    if (item.type === "image") {
      return (
        <React.Fragment>
          <img
            src={item.content}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300?text=Image+Not+Available";
            }}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity flex items-center justify-center">
            <FaImage className="text-white text-3xl" />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="relative w-full h-full">
            <img
              src={`https://img.youtube.com/vi/${item.content}/mqdefault.jpg`}
              alt={item.title}
              className="w-full h-full object-cover brightness-75 group-hover:brightness-50 transition duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Video+Thumbnail+Not+Available";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300">
                <FaPlay className="text-white text-xl ml-1" />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  };

  const renderLightboxContent = (item) => {
    if (item.platform === "facebook") {
      return (
        <div className="aspect-video">
          <iframe
            src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
              item.content
            )}&show_text=true&width=500&height=290`}
            width="500"
            height="290"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      );
    }

    if (item.type === "image") {
      return (
        <img
          src={item.content}
          alt={item.title}
          className="w-full h-auto max-h-[70vh] object-contain"
        />
      );
    } else {
      return (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${item.content}?autoplay=1`}
            title={item.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Gallery
          </h2>
          <p className="text-gray-400 md:w-3/4 mx-auto">
            Explore visual highlights from my professional journey and public
            appearances
          </p>
        </motion.div>

        {/* Tab buttons for filtering */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gray-800 p-1 rounded-lg inline-flex">
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "all"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "image"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setActiveTab("image")}
            >
              Images
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "video"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setActiveTab("video")}
            >
              Videos
            </button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            No {activeTab === "all" ? "gallery items" : activeTab + "s"}{" "}
            available.
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                className="overflow-hidden rounded-lg shadow-lg bg-gray-800 group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => openLightbox(item)}
              >
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                  {renderGalleryItem(item)}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeLightbox}
        >
          <motion.div
            className="relative max-w-4xl w-full bg-gray-900 rounded-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-gray-800/80 text-white rounded-full w-10 h-10 flex items-center justify-center"
              onClick={closeLightbox}
            >
              ×
            </button>

            <div className="max-h-[80vh] overflow-hidden">
              {renderLightboxContent(selectedItem)}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white">
                {selectedItem.title}
              </h3>
              {selectedItem.description && (
                <p className="text-gray-300 mt-2">{selectedItem.description}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
