// frontend/src/BlogPostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, Home } from 'lucide-react'; // Import icons

const BlogPostDetail = ({ blogPosts }) => { // Receives all blogPosts to find next/prev
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/blogposts/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch blog post: ${response.status} - ${errorText.substring(0, 100)}...`);
        }
        const data = await response.json();
        setBlogPost(data);
      } catch (err) {
        console.error("Error fetching single blog post:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]); // Re-fetch whenever the ID in the URL changes

  // Logic to find next and previous blog posts
  const currentIndex = blogPosts.findIndex(post => post._id === id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p className="text-xl">Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-xl mb-4">Error: {error}</p>
        <Link to="/blog" className="text-teal-400 hover:underline flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to all Blogs
        </Link>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-xl mb-4">Blog post not found.</p>
        <Link to="/blog" className="text-teal-400 hover:underline flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to all Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="font-inter antialiased text-gray-100 bg-gray-900 min-h-screen">
      {/* Header (simplified for detail page, or you can integrate your full header) */}
      <header className="bg-gray-800 shadow-lg py-4 px-6 md:px-12">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white flex items-center space-x-2">
            <Home className="w-6 h-6 text-teal-400" /> <span>Home</span>
          </Link>
          <Link to="/blog" className="text-gray-300 hover:text-teal-400 font-medium transition duration-300 flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" /> All Blogs
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-12 px-6 md:px-12 max-w-4xl">
        <article className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          {blogPost.image && (
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-80 object-cover rounded-md mb-8 shadow-md"
            />
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {blogPost.title}
          </h1>
          <div className="flex items-center text-gray-400 text-sm mb-6 space-x-4">
            <span className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> {new Date(blogPost.date).toLocaleDateString('en-IN')}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {blogPost.readTime}</span>
            <span>By {blogPost.author}</span>
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
            {/* Using dangerouslySetInnerHTML for content, be careful if content comes from untrusted sources */}
            <p className="mb-4 text-lg font-semibold italic">{blogPost.excerpt}</p>
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>
          </div>
        </article>

        {/* Next/Previous Navigation */}
        <nav className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700">
          <div>
            {prevPost && (
              <Link
                to={`/blog/${prevPost._id}`}
                className="inline-flex items-center text-teal-400 hover:text-teal-500 font-medium transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" /> Previous Blog
              </Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link
                to={`/blog/${nextPost._id}`}
                className="inline-flex items-center text-teal-400 hover:text-teal-500 font-medium transition-colors"
              >
                Next Blog <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            )}
          </div>
        </nav>
      </main>

      <footer className="bg-gray-950 text-white py-6 px-6 md:px-12 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Advocate Site. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostDetail;