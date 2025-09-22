import axios from 'axios';

const API_URL = 'https://diwakar.nepoproduct.com/api'; // Update with your backend API URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get image URL 
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    
    // If it's already a full URL (like Cloudinary URL), return it directly
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // For local development testing with placeholder
    return "https://via.placeholder.com/600x400?text=Image+Not+Available";
};

// Fetch all blog posts
export const fetchBlogPosts = async () => {
    try {
        const response = await api.get('/blog/posts'); // Correct endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw error.response?.data || 'Error fetching blog posts';
    }
};

// Create blog post with image support
export const createBlogPost = async (blogData) => {
    try {
        // If there's an image, we need to use FormData instead of JSON
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

// Send a message to the backend
export const sendMessage = async (messageData) => {
    try {
        const response = await api.post('/message/send', messageData);
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error.response?.data || { error: 'Failed to send message' };
    }
};

// Fetch messages
export const fetchMessages = async () => {
    try {
        const response = await api.get('/message/messages');
        return response.data || []; // Ensure the response is an array
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error.response?.data || 'Error fetching messages';
    }
};

// Post a comment on a blog
export const postComment = async (blogId, commentData) => {
    try {
        const response = await api.post(`/blog/posts/${blogId}/comments`, commentData);
        return response.data;
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error.response?.data || 'Error posting comment';
    }
};

// Like a blog post
export const likeBlogPost = async (blogId) => {
    try {
        const response = await api.post(`/blog/posts/${blogId}/like`);
        return response.data;
    } catch (error) {
        console.error('Error liking blog post:', error);
        throw error.response?.data || 'Error liking blog post';
    }
};

// Dislike a blog post
export const dislikeBlogPost = async (blogId) => {
    try {
        const response = await api.post(`/blog/posts/${blogId}/dislike`);
        return response.data;
    } catch (error) {
        console.error('Error disliking blog post:', error);
        throw error.response?.data || 'Error disliking blog post';
    }
};

// Fetch blogs filtered by category
export const fetchFilteredBlogs = async (category) => {
    try {
        // Make sure we're using a proper query parameter for filtering
        const response = await api.get(`/blog/posts?category=${encodeURIComponent(category)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered blogs:', error);
        throw error.response?.data || 'Error fetching filtered blogs';
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
    getImageUrl,
};
