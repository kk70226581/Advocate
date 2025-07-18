import React, { useState, useEffect } from 'react';
import {
  LogIn, LogOut, PlusCircle, Upload, Camera, Trash2,
  BookText, FileText, Image, UserCircle,
  Newspaper, BookOpen, ChevronRight,
  ShieldCheck, Lock, User as UserIcon
} from 'lucide-react';

const AdvocateDashboard = ({ advocatePosts, setAdvocatePosts, resources, setResources, blogPosts, setBlogPosts }) => { // NEW: blogPosts and setBlogPosts props
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const advocate = {
    name: "Advocate Nitish Kumar Bhardwaj",
    profilePic: "/images/advocate.jpg"
  };

  const [newPost, setNewPost] = useState({
    caption: '',
    imageUrl: '',
  });

  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'pdf',
    url: '',
  });

  // NEW: State for new blog post form
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    content: '',
    readTime: '',
    image: '',
    excerpt: ''
  });

  // Effect to fetch data when the user logs in
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const postsResponse = await fetch('http://localhost:5000/api/posts');
        if (!postsResponse.ok) {
            const errorText = await postsResponse.text();
            throw new Error(`Could not fetch posts for dashboard: ${postsResponse.status} - ${errorText.substring(0, 100)}...`);
        }
        const postsData = await postsResponse.json();
        setAdvocatePosts(postsData);

        const resourcesResponse = await fetch('http://localhost:5000/api/resources');
        if (!resourcesResponse.ok) {
            const errorText = await resourcesResponse.text();
            throw new Error(`Could not fetch resources for dashboard: ${resourcesResponse.status} - ${errorText.substring(0, 100)}...`);
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

        // NEW: Fetch Blog Posts for Dashboard
        const blogPostsResponse = await fetch('http://localhost:5000/api/blogposts');
        if (!blogPostsResponse.ok) {
            const errorText = await blogPostsResponse.text();
            throw new Error(`Could not fetch blog posts for dashboard: ${blogPostsResponse.status} - ${errorText.substring(0, 100)}...`);
        }
        const blogPostsData = await blogPostsResponse.json();
        setBlogPosts(blogPostsData); // Update central state

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (isLoggedIn) {
      fetchDashboardData();
    }
  }, [isLoggedIn, setAdvocatePosts, setResources, setBlogPosts]); // Added setBlogPosts to dependencies

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (username === 'advocate' && password === 'password123') {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
      console.log("Logged in successfully!");
    } else {
      setLoginError('Invalid username or password.');
      console.log("Login failed: Invalid credentials.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginError('');
    setAdvocatePosts([]);
    setResources([]);
    setBlogPosts([]); // NEW: Clear blog posts on logout
    console.log("Logged out.");
  };

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.caption || !newPost.imageUrl) {
      alert('Please provide both a caption and an image URL for the post.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPost,
          author: advocate.name,
          profilePic: advocate.profilePic
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to add post: Server responded with ${response.status}`);
      }

      const savedPost = await response.json();
      setAdvocatePosts(prevPosts => [savedPost, ...prevPosts]);
      setNewPost({ caption: '', imageUrl: '' });
      alert('Post added successfully! Check the public page.');
    } catch (error) {
      console.error("Error adding post:", error);
      alert(`Failed to add post: ${error.message}`);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to delete post: Server responded with ${response.status}`);
        }
        setAdvocatePosts(prevPosts => prevPosts.filter(post => post._id !== id));
        alert('Post deleted successfully!');
      } catch (error) {
        console.error("Error deleting post:", error);
        alert(`Failed to delete post: ${error.message}`);
      }
    }
  };

  const handleNewResourceChange = (e) => {
    const { name, value } = e.target;
    setNewResource(prev => ({ ...prev, [name]: value }));
  };

  const handleNewResourceSubmit = async (e) => {
    e.preventDefault();
    if (!newResource.title || !newResource.url || !newResource.type) {
      alert('Please provide a title, URL, and type for the resource.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to add resource: Server responded with ${response.status}`);
      }

      const savedResource = await response.json();
      let iconComponent;
      switch (savedResource.type) {
          case 'pdf': iconComponent = <BookText className="w-10 h-10 text-teal-400" />; break;
          case 'note': iconComponent = <FileText className="w-10 h-10 text-teal-400" />; break;
          case 'image': iconComponent = <Image className="w-10 h-10 text-teal-400" />; break;
          default: iconComponent = <BookText className="w-10 h-10 text-teal-400" />;
      }
      setResources(prevResources => [{...savedResource, icon: iconComponent}, ...prevResources]);
      setNewResource({ title: '', description: '', type: 'pdf', url: '' });
      alert('Resource added successfully! Check the public page.');
    } catch (error) {
      console.error("Error adding resource:", error);
      alert(`Failed to add resource: ${error.message}`);
    }
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/resources/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to delete resource: Server responded with ${response.status}`);
        }
        setResources(prevResources => prevResources.filter(resource => resource._id !== id));
        alert('Resource deleted successfully!');
      } catch (error) {
        console.error("Error deleting resource:", error);
        alert(`Failed to delete resource: ${error.message}`);
      }
    }
  };

  // NEW: Blog Post Logic
  const handleNewBlogPostChange = (e) => {
    const { name, value } = e.target;
    setNewBlogPost(prev => ({ ...prev, [name]: value }));
  };

  const handleNewBlogPostSubmit = async (e) => {
    e.preventDefault();
    if (!newBlogPost.title || !newBlogPost.content || !newBlogPost.excerpt) {
      alert('Please provide title, content, and an excerpt for the blog post.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/blogposts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBlogPost,
          author: newBlogPost.author || advocate.name, // Allow custom author or use default
          date: new Date(), // Always use current date for submission
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to add blog post: Server responded with ${response.status}`);
      }

      const savedBlogPost = await response.json();
      setBlogPosts(prevBlogPosts => [savedBlogPost, ...prevBlogPosts]); // Update central state
      setNewBlogPost({ title: '', content: '', readTime: '', image: '', excerpt: '' }); // Clear form
      alert('Blog post added successfully! Check the public page.');
    } catch (error) {
      console.error("Error adding blog post:", error);
      alert(`Failed to add blog post: ${error.message}`);
    }
  };

  const handleDeleteBlogPost = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/blogposts/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to delete blog post: Server responded with ${response.status}`);
        }
        setBlogPosts(prevBlogPosts => prevBlogPosts.filter(post => post._id !== id));
        alert('Blog post deleted successfully!');
      } catch (error) {
        console.error("Error deleting blog post:", error);
        alert(`Failed to delete blog post: ${error.message}`);
      }
    }
  };


  return (
    <div className="font-inter antialiased text-gray-100 bg-gray-900 min-h-screen">
      <header className="bg-gray-800 shadow-lg py-4 px-6 md:px-12 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-8 h-8 text-teal-400" />
            <span className="text-2xl font-bold text-white">Advocate Dashboard</span>
          </div>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center bg-teal-500 text-gray-900 hover:bg-teal-600 px-4 py-2 rounded-full font-semibold transition duration-300 shadow-md"
            >
              <LogOut className="w-5 h-5 mr-2" /> Logout
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto py-12 px-6 md:px-12">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Advocate Login</h2>
            <p className="text-gray-400 text-center mb-6">Use username: <span className="font-semibold text-teal-400">advocate</span>, password: <span className="font-semibold text-teal-400">password123</span></p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="advocate"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="password123"
                    required
                  />
                </div>
              </div>
              {loginError && (
                <div className="text-red-500 text-center text-sm">{loginError}</div>
              )}
              <button
                type="submit"
                className="w-full bg-teal-500 text-gray-900 py-3 px-6 rounded-md font-semibold text-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            </form>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Welcome, {advocate.name}!</h2>

            {/* Create New Post Form (Advocate's Updates) */}
            <section className="bg-gray-700 p-8 rounded-lg shadow-xl mb-12 border border-gray-600">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <PlusCircle className="w-6 h-6 mr-3 text-teal-400" /> Create New Post (Advocate's Updates)
              </h3>
              <form onSubmit={handleNewPostSubmit} className="space-y-6">
                <div>
                  <label htmlFor="newPostCaption" className="block text-sm font-medium text-gray-300 mb-2">Caption</label>
                  <textarea
                    id="newPostCaption"
                    name="caption"
                    value={newPost.caption}
                    onChange={handleNewPostChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-y"
                    placeholder="What's on your mind?"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="newPostImageUrl" className="block text-sm font-medium text-gray-300 mb-2">Image URL (e.g., /images/my_new_post.jpg or an external link)</label>
                  <div className="relative">
                    <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="url" // Back to URL type
                      id="newPostImageUrl"
                      name="imageUrl"
                      value={newPost.imageUrl}
                      onChange={handleNewPostChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                      placeholder="/images/your_new_post_image.jpg"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-gray-900 py-3 px-6 rounded-md font-semibold text-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Post Update</span>
                </button>
              </form>
            </section>

            {/* Display Advocate Posts */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-white mb-6">Your Recent Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {advocatePosts.map((post) => (
                  <div key={post._id} className="bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-600 pb-4">
                    <div className="flex items-center p-4">
                      <img
                        src={post.profilePic}
                        alt={`${post.author}'s profile`}
                        className="w-10 h-10 rounded-full object-cover mr-3 border border-teal-400"
                      />
                      <div>
                        <p className="font-semibold text-white">{post.author}</p>
                        <p className="text-gray-400 text-sm">{new Date(post.timestamp).toLocaleString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                    <img src={post.imageUrl} alt={post.caption} className="w-full h-64 object-cover" />
                    <div className="p-4">
                      <p className="text-gray-300 mb-3 leading-relaxed">{post.caption}</p>
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-400 hover:text-blue-600 transition duration-200">
                          <Newspaper className="w-5 h-5 inline-block mr-1" /> Edit
                        </button>
                        <button onClick={() => handleDeletePost(post._id)} className="text-red-400 hover:text-red-600 transition duration-200">
                          <Trash2 className="w-5 h-5 inline-block mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* NEW: Create New Blog Post Form */}
            <section className="bg-gray-700 p-8 rounded-lg shadow-xl mb-12 border border-gray-600">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-teal-400" /> Create New Blog Post
              </h3>
              <form onSubmit={handleNewBlogPostSubmit} className="space-y-6">
                <div>
                  <label htmlFor="newBlogPostTitle" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    id="newBlogPostTitle"
                    name="title"
                    value={newBlogPost.title}
                    onChange={handleNewBlogPostChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="e.g., Understanding Property Disputes"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newBlogPostExcerpt" className="block text-sm font-medium text-gray-300 mb-2">Excerpt (Short Summary)</label>
                  <textarea
                    id="newBlogPostExcerpt"
                    name="excerpt"
                    value={newBlogPost.excerpt}
                    onChange={handleNewBlogPostChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-y"
                    placeholder="A brief summary of the blog post for listings."
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="newBlogPostContent" className="block text-sm font-medium text-gray-300 mb-2">Content (Full Blog Post)</label>
                  <textarea
                    id="newBlogPostContent"
                    name="content"
                    value={newBlogPost.content}
                    onChange={handleNewBlogPostChange}
                    rows="8"
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-y"
                    placeholder="Write your full blog post here..."
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="newBlogPostImage" className="block text-sm font-medium text-gray-300 mb-2">Image URL (Optional)</label>
                  <div className="relative">
                    <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="url"
                      id="newBlogPostImage"
                      name="image"
                      value={newBlogPost.image}
                      onChange={handleNewBlogPostChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                      placeholder="e.g., /images/blog_post_hero.jpg or https://example.com/image.png"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="newBlogPostReadTime" className="block text-sm font-medium text-gray-300 mb-2">Estimated Read Time (e.g., 5 min read)</label>
                  <input
                    type="text"
                    id="newBlogPostReadTime"
                    name="readTime"
                    value={newBlogPost.readTime}
                    onChange={handleNewBlogPostChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="5 min read"
                  />
                </div>
                {/* Author and Date are defaulted in backend, but could be added here if needed */}
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-gray-900 py-3 px-6 rounded-md font-semibold text-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Publish Blog Post</span>
                </button>
              </form>
            </section>

            {/* NEW: Display Blog Posts (for dashboard view) */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-white mb-6">Your Existing Blog Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <div key={post._id} className="bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-600 pb-4">
                    {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />}
                    <div className="p-4">
                      <h4 className="text-xl font-semibold text-white mb-2">{post.title}</h4>
                      <p className="text-gray-300 text-sm mb-2">{post.excerpt}</p>
                      <div className="flex items-center text-gray-400 text-xs mb-3 space-x-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('en-IN')}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-400 hover:text-blue-600 transition duration-200">
                          <BookOpen className="w-5 h-5 inline-block mr-1" /> Edit
                        </button>
                        <button onClick={() => handleDeleteBlogPost(post._id)} className="text-red-400 hover:text-red-600 transition duration-200">
                          <Trash2 className="w-5 h-5 inline-block mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Create New Resource Form */}
            <section className="bg-gray-700 p-8 rounded-lg shadow-xl mb-12 border border-gray-600">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <PlusCircle className="w-6 h-6 mr-3 text-teal-400" /> Add New Resource
              </h3>
              <form onSubmit={handleNewResourceSubmit} className="space-y-6">
                <div>
                  <label htmlFor="newResourceTitle" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    id="newResourceTitle"
                    name="title"
                    value={newResource.title}
                    onChange={handleNewResourceChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="e.g., Guide to Property Law"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newResourceDescription" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    id="newResourceDescription"
                    name="description"
                    value={newResource.description}
                    onChange={handleNewResourceChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-y"
                    placeholder="Brief description of the resource"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="newResourceType" className="block text-sm font-medium text-gray-300 mb-2">Resource Type</label>
                  <select
                    id="newResourceType"
                    name="type"
                    value={newResource.type}
                    onChange={handleNewResourceChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="note">Text Note</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Other Document</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="newResourceUrl" className="block text-sm font-medium text-gray-300 mb-2">File URL (e.g., /documents/my_guide.pdf or external link)</label>
                  <input
                    type="url"
                    id="newResourceUrl"
                    name="url"
                    value={newResource.url}
                    onChange={handleNewResourceChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="/documents/your_new_resource.pdf"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-gray-900 py-3 px-6 rounded-md font-semibold text-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Add Resource</span>
                </button>
              </form>
            </section>

            {/* Display Resources (for dashboard view) */}
            <section>
              <h3 className="text-2xl font-semibold text-white mb-6">Your Current Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource) => (
                  <div key={resource._id} className="block bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700 p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-gray-700 rounded-full">{resource.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-teal-400 text-sm font-medium">
                      {resource.type === 'pdf' && 'Download PDF'}
                      {resource.type === 'note' && 'View Note'}
                      {resource.type === 'image' && 'View Image'}
                      {resource.type === 'video' && 'View Video'}
                      {resource.type === 'document' && 'View Document'}
                      <ChevronRight className="w-4 h-4 inline-block ml-1" />
                    </a>
                    <div className="flex justify-end space-x-2 mt-4 w-full">
                      <button className="text-blue-400 hover:text-blue-600 transition duration-200">
                        <BookOpen className="w-5 h-5 inline-block mr-1" /> Edit
                      </button>
                      <button onClick={() => handleDeleteResource(resource._id)} className="text-red-400 hover:text-red-600 transition duration-200">
                        <Trash2 className="w-5 h-5 inline-block mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-gray-950 text-white py-6 px-6 md:px-12 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Advocate Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdvocateDashboard;