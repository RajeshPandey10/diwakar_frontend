"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaCommentDots,
  FaPen,
  FaCheck,
  FaTimes,
  FaFilter,
  FaAngleDown,
  FaAngleUp,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";
import apiService from "@/services/apiService";
import {
  getImageUrl,
  formatDate,
  getInitials,
  isContentLong,
  isCommentValid,
} from "@/lib/utils";

const ADMIN_IMAGE =
  "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/484512443_28725990397046134_3302050677838970313_n.jpg";

const categories = ["All", "Article", "Status", "Poem"];

const BlogList = ({ fullPage = true }) => {
  const [posts, setPosts] = useState([]);
  const [commentData, setCommentData] = useState({ name: "", comment: "" });
  const [expandedComments, setExpandedComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isWritingComment, setIsWritingComment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [showAllPosts, setShowAllPosts] = useState(false);
  const visiblePosts = fullPage || showAllPosts ? posts : posts.slice(0, 2);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data =
          selectedCategory === "All"
            ? await apiService.fetchBlogPosts()
            : await apiService.fetchFilteredBlogs(selectedCategory);
        setPosts(data);
      } catch {
        toast.error("Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCategory]);

  const handleCommentSubmit = async (blogId) => {
    if (!isCommentValid(commentData.comment)) {
      toast.error("Comment contains inappropriate content.");
      return;
    }
    try {
      await apiService.postComment(blogId, commentData);
      setCommentData({ name: "", comment: "" });
      setIsWritingComment((prev) => ({ ...prev, [blogId]: false }));
      toast.success("Comment posted!");
    } catch {
      toast.error("Failed to post comment");
    }
  };

  const handleLikeToggle = async (blogId, isLiked) => {
    try {
      const updated = isLiked
        ? await apiService.dislikeBlogPost(blogId)
        : await apiService.likeBlogPost(blogId);
      setPosts((prev) =>
        prev.map((p) =>
          p._id === blogId
            ? { ...p, likes: updated.blog.likes, isLiked: !isLiked }
            : p
        )
      );
    } catch {
      toast.error("Failed to toggle like");
    }
  };

  const Wrapper = fullPage ? "section" : "div";

  return (
    <Wrapper
      className={fullPage ? "min-h-screen pt-28 pb-20 px-6 bg-[#fafbfc]" : ""}
    >
      <div className="max-w-7xl mx-auto">
        {fullPage && (
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0f1d35] mb-4">
            Blog Posts
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Thoughts, insights and experiences across various topics
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-[#c9a84c]/30" />
            <span className="w-12 h-0.5 rounded-full bg-[#c9a84c]" />
            <span className="w-8 h-0.5 rounded-full bg-[#c9a84c]/30" />
          </div>
        </div>
        )}

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#0f1d35] text-white shadow-sm"
                  : "bg-white text-gray-500 hover:text-[#0f1d35] border border-gray-200"
              }`}
            >
              {cat === "All" && <FaFilter className="inline mr-1.5" size={11} />}
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <FaSpinner className="animate-spin text-[#c9a84c]/60 text-3xl" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visiblePosts.map((post) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="group rounded-2xl bg-white border border-gray-100 overflow-hidden flex flex-col hover:border-[#c9a84c]/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-lg font-semibold text-[#0f1d35] leading-snug">
                      {post.title}
                    </h2>
                    <span className="shrink-0 px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg font-medium">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    {formatDate(post.createdAt)}
                  </p>

                  {post.image && (
                    <div className="mb-5 rounded-xl overflow-hidden">
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        className="w-full h-44 object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/600x400?text=Image";
                        }}
                      />
                    </div>
                  )}

                  {post.category === "Poem" ? (
                    <pre
                      className={`text-sm text-gray-500 whitespace-pre-wrap font-sans leading-relaxed ${
                        !expandedPosts[post._id] &&
                        isContentLong(post.content, post.category)
                          ? "line-clamp-10"
                          : ""
                      }`}
                    >
                      {post.content}
                    </pre>
                  ) : (
                    <p
                      className={`text-sm text-gray-500 leading-relaxed ${
                        !expandedPosts[post._id] &&
                        isContentLong(post.content, post.category)
                          ? "line-clamp-4"
                          : ""
                      }`}
                    >
                      {post.content}
                    </p>
                  )}

                  {isContentLong(post.content, post.category) && (
                    <button
                      onClick={() =>
                        setExpandedPosts((prev) => ({
                          ...prev,
                          [post._id]: !prev[post._id],
                        }))
                      }
                      className="cursor-pointer mt-3 text-[#c9a84c] hover:text-[#d4b96a] text-sm flex items-center gap-1.5 transition-colors"
                    >
                      {expandedPosts[post._id] ? (
                        <>
                          <FaAngleUp size={12} /> Show Less
                        </>
                      ) : (
                        <>
                          <FaAngleDown size={12} />{" "}
                          {post.category === "Poem"
                            ? "Read Full Poem"
                            : "Read More"}
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => handleLikeToggle(post._id, post.isLiked)}
                    className={`cursor-pointer flex items-center gap-1.5 text-sm transition-colors ${
                      post.isLiked
                        ? "text-red-400"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  >
                    {post.isLiked ? (
                      <FaHeart size={13} />
                    ) : (
                      <FaRegHeart size={13} />
                    )}
                    {post.likes || 0}
                  </button>
                  <button
                    onClick={() =>
                      setExpandedComments((prev) => ({
                        ...prev,
                        [post._id]: !prev[post._id],
                      }))
                    }
                    className="cursor-pointer flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#c9a84c] transition-colors"
                  >
                    <FaCommentDots size={13} />
                    {post.comments?.length || 0}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedComments[post._id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-100 overflow-hidden"
                    >
                      <div className="p-6 bg-gray-50">
                        <h4 className="text-sm font-semibold text-[#0f1d35] mb-5 flex items-center gap-2">
                          <FaCommentDots size={13} />
                          Comments ({post.comments?.length || 0})
                        </h4>

                        <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                          {post.comments?.map((comment, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-xl bg-[#0f1d35]/10 flex items-center justify-center text-[#0f1d35] text-xs font-bold shrink-0">
                                {getInitials(comment.name)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="rounded-xl bg-white p-3.5 border border-gray-100 relative">
                                  {comment.isLovedByAdmin && (
                                    <div className="absolute -right-1.5 -top-1.5">
                                      <img
                                        src={ADMIN_IMAGE}
                                        alt=""
                                        className="w-5 h-5 rounded-full ring-2 ring-white"
                                      />
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium text-[#0f1d35]">
                                      {comment.name}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      {formatDate(comment.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed">
                                    {comment.comment}
                                  </p>
                                </div>

                                {comment.reply && (
                                  <div className="ml-6 mt-2 flex items-start gap-2.5">
                                    <div className="w-7 h-7 rounded-lg border-2 border-[#c9a84c]/30 shrink-0 overflow-hidden">
                                      <img
                                        src={ADMIN_IMAGE}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="rounded-xl bg-white/60 p-3 flex-1 border border-gray-100">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-[#0f1d35]">
                                          Diwakar Pandey
                                        </span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#c9a84c]/15 text-[#b8963a] font-medium">
                                          Admin
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed">
                                        {comment.reply}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          {(!post.comments || post.comments.length === 0) && (
                            <p className="text-center text-gray-400 text-sm py-6">
                              No comments yet.
                            </p>
                          )}
                        </div>

                        {!isWritingComment[post._id] ? (
                          <button
                            onClick={() =>
                              setIsWritingComment((prev) => ({
                                ...prev,
                                [post._id]: true,
                              }))
                            }
                            className="cursor-pointer mt-5 w-full py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-500 hover:text-[#0f1d35] hover:border-[#c9a84c]/30 transition-all flex items-center justify-center gap-2"
                          >
                            <FaPen size={11} />
                            Write a comment
                          </button>
                        ) : (
                          <div className="mt-5 rounded-xl bg-white border border-gray-200 p-4">
                            <input
                              type="text"
                              placeholder="Your name"
                              value={commentData.name}
                              onChange={(e) =>
                                setCommentData({
                                  ...commentData,
                                  name: e.target.value,
                                })
                              }
                              className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[#0f1d35] text-sm placeholder-gray-400 focus:outline-none focus:border-[#c9a84c]/40 transition-colors mb-2"
                            />
                            <textarea
                              placeholder="Write your comment..."
                              value={commentData.comment}
                              onChange={(e) =>
                                setCommentData({
                                  ...commentData,
                                  comment: e.target.value,
                                })
                              }
                              rows={3}
                              className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[#0f1d35] text-sm placeholder-gray-400 focus:outline-none focus:border-[#c9a84c]/40 transition-colors mb-3 resize-none"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() =>
                                  setIsWritingComment((prev) => ({
                                    ...prev,
                                    [post._id]: false,
                                  }))
                                }
                                className="cursor-pointer px-4 py-2 rounded-lg text-sm text-gray-500 hover:text-[#0f1d35] bg-gray-100 hover:bg-gray-200 transition-all flex items-center gap-1.5"
                              >
                                <FaTimes size={11} />
                                Cancel
                              </button>
                              <button
                                onClick={() => handleCommentSubmit(post._id)}
                                className="cursor-pointer px-4 py-2 rounded-lg text-sm bg-[#0f1d35] hover:bg-[#1a2d52] text-white transition-all flex items-center gap-1.5"
                              >
                                <FaCheck size={11} />
                                Post
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {!fullPage && posts.length > 2 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAllPosts(!showAllPosts)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#0f1d35]/20 text-[#0f1d35] hover:bg-[#0f1d35] hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer"
            >
              {showAllPosts ? (
                <>Show Less <FaAngleUp size={12} /></>
              ) : (
                <>Show More ({posts.length - 2} more) <FaAngleDown size={12} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default BlogList;
