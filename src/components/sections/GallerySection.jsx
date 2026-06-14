"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaImage, FaVideo, FaPlay, FaYoutube, FaChevronDown, FaChevronUp } from "react-icons/fa";
import apiService from "@/services/apiService";
import { getImageUrl } from "@/lib/utils";
import SectionHeading from "@/components/shared/SectionHeading";

const extractYouTubeID = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
};

const getYouTubeThumbnail = (url) => {
  const id = extractYouTubeID(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
};

const GallerySection = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    apiService.fetchGallery().then(setItems).catch(() => {});
  }, []);

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);
  const visible = showAll ? filtered : filtered.slice(0, 2);

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Gallery"
          subtitle="Photos and videos from events, appearances, and professional milestones"
        />

        <div className="flex justify-center gap-2 mb-8">
          {["all", "image", "video"].map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setShowAll(false); }}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                filter === f
                  ? "bg-[#0f1d35] text-white shadow-sm"
                  : "bg-white text-gray-500 hover:text-[#0f1d35] border border-gray-200"
              }`}
            >
              {f === "all" ? "All" : f === "image" ? "Photos" : "Videos"}
            </button>
          ))}
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => {
              const videoThumb = item.type === "video" ? getYouTubeThumbnail(item.content) : null;
              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-[#c9a84c]/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    {item.type === "image" ? (
                      <img
                        src={getImageUrl(item.content)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/600x400/0f1d35/ffffff?text=Image";
                        }}
                      />
                    ) : videoThumb ? (
                      <img
                        src={videoThumb}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/600x400/1a1a2e/ffffff?text=Video";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <FaYoutube className="text-red-500 text-4xl" />
                      </div>
                    )}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-red-600/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <FaPlay className="text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/50 text-white text-xs flex items-center gap-1">
                      {item.type === "image" ? <FaImage size={10} /> : <FaVideo size={10} />}
                      {item.type === "image" ? "Photo" : "Video"}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-[#0f1d35] text-sm leading-snug">{item.title}</h4>
                    {item.description && (
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">No gallery items found.</p>
        )}

        {filtered.length > 2 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#0f1d35]/20 text-[#0f1d35] hover:bg-[#0f1d35] hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer"
            >
              {showAll ? (
                <>Show Less <FaChevronUp size={12} /></>
              ) : (
                <>Show More ({filtered.length - 2} more) <FaChevronDown size={12} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
