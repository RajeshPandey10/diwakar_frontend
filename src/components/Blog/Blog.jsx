import React, { useEffect, useState } from "react";
import apiService, { getImageUrl } from "../../services/apiService";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaCommentDots,
  FaPen,
  FaCheck,
  FaTimes,
  FaReply,
  FaFilter,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [commentData, setCommentData] = useState({ name: "", comment: "" });
  const [expandedComments, setExpandedComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isWritingComment, setIsWritingComment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data =
          selectedCategory === "All"
            ? await apiService.fetchBlogPosts()
            : await apiService.fetchFilteredBlogs(selectedCategory);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        toast.error("Failed to fetch blog posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  const isCommentValid = (comment) => {
    const prohibitedWords = ["harmful", "sexual", "violent", "abusive", "fuck"];
    return !prohibitedWords.some((word) =>
      comment.toLowerCase().includes(word)
    );
  };

  const handleCommentSubmit = async (blogId) => {
    if (!isCommentValid(commentData.comment)) {
      toast.error("Your comment contains inappropriate content.");
      return;
    }

    try {
      await apiService.postComment(blogId, commentData);
      setCommentData({ name: "", comment: "" });
      setIsWritingComment((prev) => ({ ...prev, [blogId]: false }));
      toast.success("Comment posted successfully!");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    }
  };

  const handleLikeToggle = async (blogId, isLiked) => {
    try {
      const updatedBlog = isLiked
        ? await apiService.dislikeBlogPost(blogId)
        : await apiService.likeBlogPost(blogId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === blogId
            ? { ...post, likes: updatedBlog.blog.likes, isLiked: !isLiked }
            : post
        )
      );

      toast.success(
        isLiked ? "Blog disliked successfully!" : "Blog liked successfully!"
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to toggle like");
    }
  };

  const toggleComments = (blogId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
    setIsWritingComment((prev) => ({ ...prev, [blogId]: false }));
  };

  const toggleWriteComment = (blogId) => {
    setIsWritingComment((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  const togglePostExpansion = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const isContentLong = (content, category) => {
    if (category === "Poem") {
      return content.split("\n").length > 10;
    }
    return content.length > 300;
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const ADMIN_IMAGE =
    "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/484512443_28725990397046134_3302050677838970313_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=KYC-fwYP2GIQ7kNvwEOlu5W&_nc_oc=AdljGGBrH9UX_sY-CNH9_hcUAuof1U1Wwmn1UI8Om83TPTlDtXfE9Jrwq2fo6GqbgAIjkB8nnH14aFWm7zkDYHOv&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=KmJJTFFJDz92-eqfYSbkUA&oh=00_AfGduARmYiFHApZevO37P9nU7uaIPTNdnUMnkBlT_EhbEA&oe=68094F8C";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Blog Posts
        </h1>
        <p className="text-gray-400 md:w-3/4 mx-auto">
          Explore my thoughts, insights and experiences across various topics
        </p>
      </motion.div>

      <motion.div
        className="mb-8 flex flex-wrap gap-3 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {["All", "Article", "Status", "Poem"].map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === category
                ? "bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/30"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category === "All" ? <FaFilter className="inline mr-1" /> : null}
            {category}
          </motion.button>
        ))}
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : posts.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-gray-400 text-lg">
            No posts found for this category.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              className="bg-gray-800/70 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden flex flex-col border border-gray-700 hover:border-gray-500 transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-blue-400">
                    {post.title}
                  </h2>
                  <span className="px-3 py-1 bg-gray-700 text-xs rounded-full text-gray-300">
                    {post.category}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-4">
                  Posted on {formatDate(post.createdAt)}
                </div>

                <div className="mb-4">
                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        className="w-full h-auto rounded-lg object-cover max-h-64 shadow-lg transform transition hover:scale-105 duration-500"
                        onError={(e) => {
                          console.error("Failed to load image:", post.image);
                          e.target.src =
                            "https://via.placeholder.com/600x400?text=Image+Not+Available";
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                  )}

                  {post.category === "Poem" ? (
                    <div>
                      <pre
                        className={`text-gray-300 whitespace-pre-wrap font-sans ${
                          !expandedPosts[post._id] &&
                          isContentLong(post.content, post.category)
                            ? "line-clamp-10"
                            : ""
                        }`}
                      >
                        {post.content}
                      </pre>
                      {isContentLong(post.content, post.category) && (
                        <motion.button
                          onClick={() => togglePostExpansion(post._id)}
                          className="mt-2 text-blue-400 hover:text-blue-300 flex items-center transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {expandedPosts[post._id] ? (
                            <>
                              <FaAngleUp className="mr-1" /> Show Less
                            </>
                          ) : (
                            <>
                              <FaAngleDown className="mr-1" /> Read Full Poem
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p
                        className={`text-gray-300 whitespace-pre-line ${
                          !expandedPosts[post._id] &&
                          isContentLong(post.content, post.category)
                            ? "line-clamp-4"
                            : ""
                        }`}
                      >
                        {post.content}
                      </p>
                      {isContentLong(post.content, post.category) && (
                        <motion.button
                          onClick={() => togglePostExpansion(post._id)}
                          className="mt-2 text-blue-400 hover:text-blue-300 flex items-center transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {expandedPosts[post._id] ? (
                            <>
                              <FaAngleUp className="mr-1" /> Show Less
                            </>
                          ) : (
                            <>
                              <FaAngleDown className="mr-1" /> Read More
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-gray-700 bg-gray-800/90">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLikeToggle(post._id, post.isLiked)}
                    className={`flex items-center ${
                      post.isLiked ? "text-red-500" : "text-gray-400"
                    } hover:text-red-500 transition-colors px-3 py-1 rounded-full hover:bg-gray-700/50`}
                  >
                    {post.isLiked ? (
                      <FaHeart className="animate-pulse" />
                    ) : (
                      <FaRegHeart />
                    )}{" "}
                    <span className="ml-1">{post.likes || 0}</span>
                  </button>
                  <button
                    onClick={() => toggleComments(post._id)}
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 rounded-full hover:bg-gray-700/50"
                  >
                    <FaCommentDots />{" "}
                    <span className="ml-1">{post.comments?.length || 0}</span>
                  </button>
                </div>
              </div>

              {expandedComments[post._id] && (
                <motion.div
                  className="bg-gray-750 border-t border-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-3 flex items-center text-blue-400">
                      <FaCommentDots className="mr-2" /> Comments
                    </h3>

                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      {post.comments?.map((comment, index) => (
                        <div
                          key={index}
                          className="bg-gray-750 rounded-lg overflow-hidden"
                        >
                          <div className="p-3">
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-blue-600 flex items-center justify-center">
                                {comment.name && (
                                  <div className="font-bold text-white">
                                    {getInitials(comment.name)}
                                  </div>
                                )}
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="bg-gray-700 rounded-lg p-3 relative">
                                  {comment.isLovedByAdmin && (
                                    <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full border-2 border-gray-800 shadow-lg">
                                      <img
                                        src={ADMIN_IMAGE}
                                        alt="Admin"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                      <div className="absolute -right-1 -bottom-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                                        <FaHeart className="text-white text-xs" />
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex items-center">
                                    <p className="font-semibold text-white">
                                      {comment.name}
                                    </p>
                                    <span className="ml-2 text-xs text-gray-400">
                                      {formatDate(comment.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-gray-200 mt-1 whitespace-pre-line">
                                    {comment.comment}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {comment.reply && (
                              <div className="ml-8 mt-2">
                                <div className="flex items-start">
                                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-600">
                                    <img
                                      src={ADMIN_IMAGE}
                                      alt="Diwakar Pandey"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="ml-2 flex-1">
                                    <div className="bg-gray-600 rounded-lg p-2 relative">
                                      <div className="flex items-center">
                                        <p className="font-semibold text-white">
                                          Diwakar Pandey
                                        </p>
                                        <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                          Admin
                                        </span>
                                      </div>
                                      <p className="text-gray-200 mt-1 whitespace-pre-line">
                                        {comment.reply}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {post.comments?.length === 0 && (
                        <div className="text-center text-gray-400 py-4">
                          No comments yet. Be the first to comment!
                        </div>
                      )}
                    </div>

                    {!isWritingComment[post._id] ? (
                      <motion.button
                        onClick={() => toggleWriteComment(post._id)}
                        className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <FaPen className="mr-2" /> Write a comment
                      </motion.button>
                    ) : (
                      <motion.div
                        className="mt-4 bg-gray-700 p-4 rounded-lg shadow-inner"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center mb-2">
                          <FaPen className="text-blue-400 mr-2" />
                          <h4 className="font-medium">Add your comment</h4>
                        </div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={commentData.name}
                          onChange={(e) =>
                            setCommentData({
                              ...commentData,
                              name: e.target.value,
                            })
                          }
                          className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500 mb-2 focus:border-blue-500 focus:outline-none"
                          required
                        />
                        <textarea
                          placeholder="Your Comment"
                          value={commentData.comment}
                          onChange={(e) =>
                            setCommentData({
                              ...commentData,
                              comment: e.target.value,
                            })
                          }
                          className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500 mb-2 focus:border-blue-500 focus:outline-none"
                          rows="3"
                          required
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() =>
                              setIsWritingComment((prev) => ({
                                ...prev,
                                [post._id]: false,
                              }))
                            }
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition flex items-center"
                          >
                            <FaTimes className="mr-2" /> Cancel
                          </button>
                          <button
                            onClick={() => handleCommentSubmit(post._id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center"
                          >
                            <FaCheck className="mr-2" /> Post Comment
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Blog;
