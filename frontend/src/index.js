import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookText, FileText, Image } from 'lucide-react'; // Ensure icons are imported

import './index.css';
import App from './App';
import AdvocateDashboard from './AdvocateDashboard';
import BlogPostDetail from './BlogPostDetail';

// Define your backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://advocate-zmb8.onrender.com';

const RootComponent = () => {
  const [advocatePosts, setAdvocatePosts] = useState([]);
  const [resources, setResources] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Lifted state for login status

  // useCallback ensures fetchAllData function reference is stable across renders
  // This is crucial for it to be a dependency of useEffect
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [postsRes, resourcesRes, blogPostsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/posts`),
        fetch(`${BACKEND_URL}/api/resources`),
        fetch(`${BACKEND_URL}/api/blogposts`)
      ]);

      if (!postsRes.ok) {
          const errorText = await postsRes.text();
          throw new Error(`Failed to fetch advocate posts: ${postsRes.status} - ${errorText.substring(0, 100)}...`);
      }
      if (!resourcesRes.ok) {
          const errorText = await resourcesRes.text();
          throw new Error(`Could not fetch resources: ${resourcesRes.status} - ${errorText.substring(0, 100)}...`);
      }
      if (!blogPostsRes.ok) {
          const errorText = await blogPostsRes.text();
          throw new Error(`Could not fetch blog posts: ${blogPostsRes.status} - ${errorText.substring(0, 100)}...`);
      }

      const postsData = await postsRes.json();
      const resourcesData = await resourcesRes.json();
      const blogPostsData = await blogPostsRes.json();

      // Add icons to resources data for consistent display
      const resourcesWithIcons = resourcesData.map(res => {
          let iconComponent;
          switch (res.type) {
              case 'pdf': iconComponent = <BookText className="w-10 h-10 text-teal-400" />; break;
              case 'note': iconComponent = <FileText className="w-10 h-10 text-teal-400" />; break;
              case 'image': iconComponent = <Image className="w-10 h-10 text-teal-400" />; break;
              case 'video': iconComponent = <Image className="w-10 h-10 text-teal-400" />; break; // Placeholder for video
              case 'document': iconComponent = <FileText className="w-10 h-10 text-teal-400" />; break; // Placeholder for document
              default: iconComponent = <BookText className="w-10 h-10 text-teal-400" />;
          }
          return { ...res, icon: iconComponent };
      });

      setAdvocatePosts(postsData);
      setResources(resourcesWithIcons);
      setBlogPosts(blogPostsData);
      setLoading(false);

    } catch (err) {
      console.error("Error fetching initial data for RootComponent:", err);
      setError(err.message);
      setLoading(false);
    }
  }, []); // Empty dependency array for useCallback, as fetchAllData doesn't depend on external state

  // This useEffect will run on initial mount and whenever fetchAllData is called (e.g., from dashboard)
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]); // Add fetchAllData to dependency array

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-teal-400 text-2xl">
        <svg className="animate-spin h-8 w-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading website content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-500 text-xl p-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Error Loading Content</h2>
        <p className="mb-4">There was a problem fetching data from the server:</p>
        <p className="font-mono bg-gray-800 p-3 rounded-md text-sm break-all">{error}</p>
        <p className="mt-6 text-gray-400">Please ensure your backend is deployed, running, and accessible at <span className="font-semibold text-teal-400">{BACKEND_URL}</span>.</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public-facing routes */}
      <Route
        path="/"
        element={
          <App
            advocatePosts={advocatePosts}
            resources={resources}
            blogPosts={blogPosts}
          />
        }
      />
      {/* Dynamic route for individual blog post */}
      <Route
        path="/blog/:id"
        element={<BlogPostDetail blogPosts={blogPosts} />}
      />
      {/* Dashboard route */}
      <Route
        path="/dashboard"
        element={
          <AdvocateDashboard
            advocatePosts={advocatePosts}
            setAdvocatePosts={setAdvocatePosts}
            resources={resources}
            setResources={setResources}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            refreshData={fetchAllData} // Pass the refresh function
            isLoggedIn={isLoggedIn}     // Pass isLoggedIn state
            setIsLoggedIn={setIsLoggedIn} // Pass setIsLoggedIn setter
          />
        }
      />
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* BrowserRouter now correctly wraps the RootComponent */}
      <RootComponent />
    </BrowserRouter>
  </React.StrictMode>
);
