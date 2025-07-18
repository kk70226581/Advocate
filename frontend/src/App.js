import React, { useState } from 'react';
// Removed Link import as it's not used for navigation in this file
// Removed emailjs import as per your provided code, assuming you prefer mailto:

// Lucide React icons for a modern look
import {
  Briefcase,
  Scale,
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Send,
  Info,
  BookOpen,
  Star,
  ChevronRight,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Newspaper,
  CalendarDays,
  Clock,
  BookText,
  FileText
} from 'lucide-react';

// Main App Component
const App = ({ advocatePosts, resources, blogPosts }) => {
  // Corrected typo: setIsMobileMenuMenuOpen -> setIsMobileMenuOpen
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    console.log('Contact Form submitted (via mailto:):', formData);

    const recipientEmail = 'nitishkumar961657@gmail.com';
    const subject = encodeURIComponent(`Inquiry from ${formData.name}: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    try {
      // Attempt to open the mail client
      window.location.href = mailtoLink;
      // Small delay to allow mailto: to trigger before showing alert
      await new Promise(resolve => setTimeout(resolve, 500));

      setSubmissionStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Using alert as per previous code, consider custom modal for better UX
      alert("Please send the email from your mail client. Your message has been prepared.");

    } catch (error) {
      console.error('Failed to open mail client:', error);
      setSubmissionStatus('error');
      alert("Failed to open your mail client. Please send your inquiry directly to " + recipientEmail);
    }
  };

  const advocate = {
    name: "Adv. Nitish Kumar Bhardwaj",
    tagline: "Your Trusted Legal Partner for Justice and Resolution",
    bio: `With over 15 years of dedicated experience in diverse legal fields including corporate law, family law, criminal defense, and intellectual property, Advocate Nitish Kumar Bhardwaj is committed to providing exceptional legal counsel and representation. His academic background includes B.A. LLB (Hons.). His enrollment details include ID ${"AY-8296"} (Enrollment No. ${"UP08552/25"}) with the Bar Council of U.P., enrolled on ${"March 5, 2025"} (Born on ${"July 2, 2002"}). His practice is built on a foundation of integrity, client-focused solutions, and a relentless pursuit of justice. We understand that legal challenges can be daunting, and we are here to guide you through every step with clarity and confidence.`,
    specialties: [
      "Corporate Law & Business Litigation",
      "Family Law & Divorce",
      "Criminal Defense",
      "Real Estate Law",
      "Intellectual Property",
      "Civil Litigation",
      "Constitutional Law",
      "Environmental Law"
    ],
    contact: {
      phone1: "+91-9616577276",
      phone2: "+91-6387424388",
      email: "info@youradvocate.com",
      officeAddress: "Office-Diwani Kachahari, Sthayi Lok Adalat Ke Paas, Gorakhpur, Uttar Pradesh",
      fullAddress: "H. No. 01 Sonawal, P.O. Piprahi, P.S. Shyamdeurawa, Maharanjganj, Gorakhpur, Uttar Pradesh, India - 273001",
      mapLink: "https://www.google.com/maps/search/Diwani+Kachahari+Gorakhpur"
    },
    social: {
      facebook: "https://facebook.com/youradvocate",
      twitter: "https://twitter.com/youradvocate",
      linkedin: "https://linkedin.com/in/youradvocate",
      instagram: "https://instagram.com/youradvocate"
    },
    idCardDetails: {
      idNumber: "AY-8296",
      enrollmentNumber: "UP08552/25",
      enrollmentDate: "05/03/2025",
      dateOfBirth: "02/07/2002",
      barCouncil: "Bar Council of U.P.",
      fatherHusbandName: "Parmaatma"
    }
  };

  const services = [
    {
      icon: <Briefcase className="w-8 h-8 text-teal-400" />,
      title: "Corporate & Business Law",
      description: "Assisting businesses with formation, contracts, compliance, mergers, acquisitions, and dispute resolution."
    },
    {
      icon: <Scale className="w-8 h-8 text-teal-400" />,
      title: "Family Law Matters",
      description: "Compassionate legal support for divorce, child custody, alimony, and domestic violence cases."
    },
    {
      icon: <User className="w-8 h-8 text-teal-400" />,
      title: "Criminal Defense",
      description: "Vigorous defense for individuals facing criminal charges, ensuring fair trials and protecting rights."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-teal-400" />,
      title: "Real Estate & Property",
      description: "Handling property disputes, transactions, landlord-tenant issues, and property registration."
    },
    {
      icon: <Info className="w-8 h-8 text-teal-400" />,
      title: "Intellectual Property",
      description: "Protecting your innovations, trademarks, copyrights, and trade secrets through legal means."
    },
    {
      icon: <Star className="w-8 h-8 text-teal-400" />,
      title: "Civil Litigation",
      description: "Representing clients in various civil disputes, from contract breaches to personal injury claims."
    }
  ];

  const testimonials = [
    {
      quote: "Advocate Nitish Kumar Bhardwaj provided exceptional guidance during a complex property dispute. Their expertise and dedication led to a favorable outcome.",
      author: "Ritu Sharma"
    },
    {
      quote: "I highly recommend Advocate Nitish Kumar Bhardwaj for their professional and empathetic approach to family law. They made a difficult time much easier.",
      author: "Anil Kumar"
    },
    {
      quote: "The legal advice received was clear, concise, and incredibly helpful for my startup. Truly a reliable legal partner.",
      author: "Priya Singh"
    }
  ];

  // Gallery Images - Still local for now, can be moved to backend if needed
  const galleryImages = [
    {
      id: 1,
      src: "https://placehold.co/600x400/2F4F4F/ADD8E6?text=Legal+Consultation+1",
      alt: "Legal Consultation Session"
    },
    {
      id: 2,
      src: "https://placehold.co/600x400/4682B4/B0C4DE?text=Courtroom+View",
      alt: "Inside a Courtroom"
    },
    {
      id: 3,
      src: "https://placehold.co/600x400/6A5ACD/E6E6FA?text=Law+Books",
      alt: "Law Books and Documents"
    },
    {
      id: 4,
      src: "https://placehold.co/600x400/2F4F4F/DDA0DD?text=Client+Meeting",
      alt: "Advocate Meeting with Client"
    },
    {
      id: 5,
      src: "https://placehold.co/600x400/4682B4/F0E68C?text=Justice+Symbol",
      alt: "Symbol of Justice"
    },
    {
      id: 6,
      src: "https://placehold.co/600x400/6A5ACD/FFE4E1?text=Legal+Team",
      alt: "Advocate with Legal Team"
    }
  ];


  return (
    <div className="font-inter antialiased text-gray-100 bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg py-4 px-6 md:px-12 sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Scale className="w-8 h-8 text-teal-400" />
            <a href="#" className="text-2xl font-bold text-white">{advocate.name.split(' ')[0]} Law</a>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-teal-400 font-medium transition duration-300">Home</a>
            <a href="#about" className="text-gray-300 hover:text-teal-400 font-medium transition duration-300">About Us</a>
            <a href="#services" className="text-gray-300 hover:text-teal-400 font-medium transition duration-300">Services</a>
            <a href="#blog" className="text-gray-300 hover:text-teal-400 font-medium transition duration-300">Blog</a>
            {/* Removed Gallery link as it's not in your current code */}
            <a href="#advocate-updates" className="text-gray-300 hover:text-teal-400 font-medium transition duration-300">Advocate's Updates</a>
            <a href="#resources" className="text-gray-300 hover:text-teal-400 font-medium transition duration-300">Resources</a>
            <a href="#testimonials" className="text-gray-300 hover:text-teal-400 font-medium transition duration-300">Testimonials</a>
            <a href="#contact" className="text-gray-300 hover:text-teal-400 font-medium transition duration-300">Contact</a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-teal-400 focus:outline-none">
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </nav>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 mt-4 rounded-lg shadow-lg py-4">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-2 text-gray-300 hover:bg-gray-700 transition duration-200">Home</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-2 text-gray-300 hover:bg-gray-700 transition duration-200">About Us</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-2 text-gray-300 hover:bg-gray-700 transition duration-200">Services</a>
            <a href="#blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-2 text-gray-300 hover:bg-gray-700 transition duration-200">Blog</a>
            {/* Removed Gallery link from mobile menu */}
            <a href="#advocate-updates" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-2 text-gray-300 hover:bg-gray-700 transition duration-200">Advocate's Updates</a>
            <a href="#resources" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-2 text-gray-300 hover:bg-gray-700 transition duration-200">Resources</a>
            <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-2 text-gray-300 hover:bg-gray-700 transition duration-200">Contact</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24 px-6 md:px-12 overflow-hidden rounded-b-lg shadow-lg">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            {advocate.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up delay-200">
            {advocate.tagline}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center bg-teal-500 text-gray-900 hover:bg-teal-600 px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400"
          >
            Get a Free Consultation <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
        {/* Abstract background shapes for visual appeal */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <circle cx="20" cy="80" r="15" fill="currentColor" className="text-gray-700 animate-pulse-slow" />
            <circle cx="80" cy="20" r="20" fill="currentColor" className="text-gray-600 animate-pulse-slow delay-500" />
            <rect x="50" y="50" width="10" height="10" fill="currentColor" className="text-gray-700 animate-pulse-slow delay-1000" transform="rotate(45 55 55)" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 md:px-12 bg-gray-900 text-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">About {advocate.name}</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={`${process.env.PUBLIC_URL}/images/Advocate.jpg`} // Using PUBLIC_URL for images in public folder
                alt="Advocate Profile"
                className="rounded-lg shadow-xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/333333/EEEEEE?text=Advocate+Profile+Fallback"; }} // Fallback if local image not found
              />
            </div>
            <div className="md:w-1/2 text-lg text-gray-300 leading-relaxed">
              <p className="mb-6">{advocate.bio}</p>
              <h3 className="text-2xl font-semibold text-white mb-4">Areas of Expertise:</h3>
              <ul className="list-disc list-inside space-y-2">
                {advocate.specialties.map((specialty, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 md:px-12 bg-gray-800 text-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Our Legal Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center border border-gray-600"
              >
                <div className="mb-4 p-3 bg-gray-600 rounded-full">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section - Now dynamic from `blogPosts` prop */}
      <section id="blog" className="py-16 px-6 md:px-12 bg-gray-900 text-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Latest Insights & News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => ( // Use blogPosts from props
              <div key={post._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700">
                {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm mb-4 space-x-4">
                    <span className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> {new Date(post.date).toLocaleDateString('en-IN')}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {post.readTime}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  {/* Changed to <a> tag for simplicity as react-router-dom Link is not imported */}
                  <a href={`/blog/${post._id}`} className="text-teal-400 hover:underline font-medium flex items-center">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            {/* Changed to <a> tag for simplicity as react-router-dom Link is not imported */}
            <a href="/blog" className="inline-flex items-center bg-teal-500 text-gray-900 hover:bg-teal-600 px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105">
              View All Posts <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Advocate's Updates Section (Social Media Style) - Data now comes from `index.js` state */}
      <section id="advocate-updates" className="py-16 px-6 md:px-12 bg-gray-800 text-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Advocate's Updates</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advocatePosts.map((post) => (
              <div key={post._id} className="bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-600 pb-4">
                <div className="flex items-center p-4">
                  <img
                    src={post.profilePic}
                    alt={`${post.author}'s profile`}
                    className="w-10 h-10 rounded-full object-cover mr-3 border border-teal-400"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/50x50/ADD8E6/2F4F4F?text=A"; }} // Fallback
                  />
                  <div>
                    <p className="font-semibold text-white">{post.author}</p>
                    <p className="text-gray-400 text-sm">{new Date(post.timestamp).toLocaleString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <img src={post.imageUrl} alt={post.caption} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <p className="text-gray-300 mb-3 leading-relaxed">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section - Data now comes from `index.js` state */}
      <section id="resources" className="py-16 px-6 md:px-12 bg-gray-900 text-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Legal Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <a
                key={resource._id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700 p-6 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-gray-700 rounded-full">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
                <span className="text-teal-400 text-sm font-medium">
                  {resource.type === 'pdf' && 'Download PDF'}
                  {resource.type === 'note' && 'View Note'}
                  {resource.type === 'image' && 'View Image'}
                  {resource.type === 'video' && 'View Video'}
                  {resource.type === 'document' && 'View Document'}
                  <ChevronRight className="w-4 h-4 inline-block ml-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Still local for now */}
      <section id="gallery" className="py-16 px-6 md:px-12 bg-gray-800 text-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Our Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Using static placeholder images for now */}
            {galleryImages.map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold text-center px-4">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="inline-flex items-center bg-teal-500 text-gray-900 hover:bg-teal-600 px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105">
              View All Images <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 md:px-12 bg-gray-900 text-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700">
                <Star className="w-6 h-6 text-yellow-500 mb-4" fill="currentColor" />
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-white font-semibold">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modified Contact Section */}
      <section id="contact" className="py-16 px-6 md:px-12 bg-gray-800 text-gray-100 rounded-t-lg shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Get in Touch</h2>
          <div className="flex flex-col md:flex-row md:space-x-12">
            {/* Contact Details Column */}
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Contact Information</h3>
              <div className="space-y-4 text-lg text-gray-300">
                {/* Email */}
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-6 h-6 mr-3 text-teal-400 flex-shrink-0" />
                  <a href={`mailto:${advocate.contact.email}`} className="hover:underline text-xl font-medium">
                    {advocate.contact.email}
                  </a>
                </div>
                {/* Primary Phone */}
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-6 h-6 mr-3 text-teal-400 flex-shrink-0" />
                  <a href={`tel:${advocate.contact.phone1}`} className="hover:underline">
                    {advocate.contact.phone1}
                  </a>
                </div>
                {/* Secondary Phone (if available) */}
                {advocate.contact.phone2 && (
                  <div className="flex items-center justify-center md:justify-start">
                    <Phone className="w-6 h-6 mr-3 text-teal-400 flex-shrink-0" />
                    <a href={`tel:${advocate.contact.phone2}`} className="hover:underline">
                      {advocate.contact.phone2}
                    </a>
                  </div>
                )}
                {/* Office Address */}
                <div className="flex items-start justify-center md:justify-start">
                  <MapPin className="w-6 h-6 mr-3 text-teal-400 flex-shrink-0 mt-1" />
                  <a href={advocate.contact.mapLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {advocate.contact.officeAddress}
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <h3 className="text-2xl font-semibold mt-10 mb-4 text-white text-center">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                {advocate.social.facebook && (
                  <a href={advocate.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
                    <Facebook className="w-8 h-8" />
                  </a>
                )}
                {advocate.social.twitter && (
                  <a href={advocate.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
                    <Twitter className="w-8 h-8" />
                  </a>
                )}
                {advocate.social.linkedin && (
                  <a href={advocate.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
                    <Linkedin className="w-8 h-8" />
                  </a>
                )}
                {advocate.social.instagram && (
                  <a href={advocate.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
                    <Instagram className="w-8 h-8" />
                  </a>
                )}
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="md:w-1/2 bg-gray-900 p-8 rounded-lg shadow-xl text-gray-100 border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-white">Send Us Your Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                      placeholder="Inquiry about Family Law"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message / Problem</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-gray-500" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-y"
                      placeholder="Describe your legal problem or inquiry here..."
                      required
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-gray-900 py-3 px-6 rounded-md font-semibold text-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submissionStatus === 'submitting'}
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
                {submissionStatus === 'success' && (
                  <div className="mt-4 p-3 bg-green-700 text-white rounded-md text-center">
                    Your message has been prepared! Please send the email from your mail client.
                  </div>
                )}
                {submissionStatus === 'error' && (
                  <div className="mt-4 p-3 bg-red-700 text-white rounded-md text-center">
                    Failed to open your mail client. Please send your inquiry directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-10 px-6 md:px-12 rounded-t-lg">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <Scale className="w-10 h-10 text-teal-500 mx-auto mb-3" />
            <p className="text-xl font-bold">{advocate.name.split(' ')[0]} Law</p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#home" className="text-gray-400 hover:text-white transition duration-300">Home</a>
            <a href="#about" className="text-gray-400 hover:text-white transition duration-300">About</a>
            <a href="#services" className="text-gray-400 hover:text-white transition duration-300">Services</a>
            <a href="#blog" className="text-gray-400 hover:text-white transition duration-300">Blog</a>
            {/* Removed Gallery from footer links */}
            <a href="#advocate-updates" className="text-gray-400 hover:text-white transition duration-300">Advocate's Updates</a>
            <a href="#resources" className="text-gray-400 hover:text-white transition duration-300">Resources</a>
            <a href="#testimonials" className="text-gray-400 hover:text-white transition duration-300">Testimonials</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            {advocate.social.facebook && (
                  <a href={advocate.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
            {advocate.social.twitter && (
                  <a href={advocate.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
            {advocate.social.linkedin && (
                  <a href={advocate.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
            {advocate.social.instagram && (
                  <a href={advocate.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {advocate.name.split(' ')[0]} Law. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
