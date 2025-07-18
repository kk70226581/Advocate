// frontend/src/index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookText, FileText, Image, Newspaper } from 'lucide-react';

import './index.css';
import App from './App';
import AdvocateDashboard from './AdvocateDashboard';
import BlogPostDetail from './BlogPostDetail'; // NEW: Import the new component

const RootComponent = () => {
  const [advocatePosts, setAdvocatePosts] = useState([]);
  const [resources, setResources] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const postsResponse = await fetch('http://localhost:5000/api/posts');
        if (!postsResponse.ok) {
            const errorText = await postsResponse.text();
            throw new Error(`Could not fetch advocate posts: ${postsResponse.status} - ${errorText.substring(0, 100)}...`);
        }
        const postsData = await postsResponse.json();
        setAdvocatePosts(postsData);

        const resourcesResponse = await fetch('http://localhost:5000/api/resources');
        if (!resourcesResponse.ok) {
            const errorText = await resourcesResponse.text();
            throw new Error(`Could not fetch resources: ${resourcesResponse.status} - ${errorText.substring(0, 100)}...`);
        }
        const resourcesData = await resourcesResponse.json();
        const resourcesWithIcons = resourcesData.map(res => {
            let iconComponent;
            switch (res.type) {
                case 'pdf': iconComponent = <BookText className="w-10 h-10 text-teal-400" />; break;
                case 'note': iconComponent = <FileText className="w-10 h-10 text-teal-400" />; break;
                case 'image': iconComponent = <Image className="w-10 h-10 text-teal-400" />; break;
                default: iconComponent = <BookText className="w-10 h-10 text-teal-400" />;
            }
            return { ...res, icon: iconComponent };
        });
        setResources(resourcesWithIcons);

        const blogPostsResponse = await fetch('http://localhost:5000/api/blogposts');
        if (!blogPostsResponse.ok) {
            const errorText = await blogPostsResponse.text();
            throw new Error(`Could not fetch blog posts: ${blogPostsResponse.status} - ${errorText.substring(0, 100)}...`);
        }
        const blogPostsData = await blogPostsResponse.json();
        setBlogPosts(blogPostsData);

      } catch (error) {
        console.error("Error fetching initial data for RootComponent:", error);
      }
    };

    fetchAllData();
  }, []); // Runs only once on mount

  return (
    <React.StrictMode>
      <BrowserRouter>
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
          {/* NEW: Dynamic route for individual blog post */}
          <Route
            path="/blog/:id"
            element={<BlogPostDetail blogPosts={blogPosts} />} // Pass full list for next/prev navigation
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
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);