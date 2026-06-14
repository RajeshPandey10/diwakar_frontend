import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cadiwakarpandey.com.np/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return "https://via.placeholder.com/600x400?text=Image+Not+Available";
};

export const fetchBlogPosts = async () => {
  try {
    const response = await api.get('/blog/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error.response?.data || 'Error fetching blog posts';
  }
};

export const createBlogPost = async (blogData) => {
  try {
    if (blogData.image) {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);
      formData.append('category', blogData.category);
      formData.append('image', blogData.image);

      const response = await axios.post(`${API_URL}/blog/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await api.post('/blog/posts', blogData);
      return response.data;
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error.response?.data || 'Error creating blog post';
  }
};

export const sendMessage = async (messageData) => {
  try {
    const response = await api.post('/message/send', messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error.response?.data || { error: 'Failed to send message' };
  }
};

export const fetchMessages = async () => {
  try {
    const response = await api.get('/message/messages');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error.response?.data || 'Error fetching messages';
  }
};

export const postComment = async (blogId, commentData) => {
  try {
    const response = await api.post(`/blog/posts/${blogId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error.response?.data || 'Error posting comment';
  }
};

export const likeBlogPost = async (blogId) => {
  try {
    const response = await api.post(`/blog/posts/${blogId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking blog post:', error);
    throw error.response?.data || 'Error liking blog post';
  }
};

export const dislikeBlogPost = async (blogId) => {
  try {
    const response = await api.post(`/blog/posts/${blogId}/dislike`);
    return response.data;
  } catch (error) {
    console.error('Error disliking blog post:', error);
    throw error.response?.data || 'Error disliking blog post';
  }
};

export const fetchFilteredBlogs = async (category) => {
  try {
    const response = await api.get(`/blog/posts?category=${encodeURIComponent(category)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered blogs:', error);
    throw error.response?.data || 'Error fetching filtered blogs';
  }
};

export const fetchExperiences = async (type) => {
  try {
    const params = type ? `?type=${type}` : '';
    const response = await api.get(`/experiences${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error.response?.data || 'Error fetching experiences';
  }
};

export const fetchTestimonials = async () => {
  try {
    const response = await api.get('/testimonials?active=true');
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error.response?.data || 'Error fetching testimonials';
  }
};

export const fetchGallery = async () => {
  try {
    const response = await api.get('/gallery/items');
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
};

export default {
  fetchBlogPosts,
  createBlogPost,
  sendMessage,
  fetchMessages,
  postComment,
  likeBlogPost,
  dislikeBlogPost,
  fetchFilteredBlogs,
  fetchExperiences,
  fetchTestimonials,
  fetchGallery,
  getImageUrl,
};
