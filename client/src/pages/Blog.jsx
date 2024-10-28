import React, { useEffect, useState } from 'react';
import { blogList } from '../components/blog/config/data';
import Add from '../components/Add'

function Blog() {
  const [id, setId] = useState(window.location.pathname.split('/')[2]);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogId = parseInt(window.location.pathname.split('/')[2], 10);
    setId(blogId);
    const selectedBlog = blogList.find((blog) => blog.id === blogId);
    setBlog(selectedBlog);
  }, [window.location.pathname]);

  return (
    <div className="container mx-auto px-4">
      {blog ? (
        <div className="max-w-2xl mx-auto mt-8 flex flex-col">
        <h1 className="text-center font-bold mb-4 text-6xl">{blog.authorName}</h1>
          <h5 className="text-3xl ">{blog.title}</h5>
          <div className="inline-block bg-gray rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-[150px] text-white"># {blog.category}</div>
         
          <img src={blog.cover} alt={blog.title} className="w-full mb-4" />
          <p className="text-gray">{blog.description}</p>
          <p className="text-gray mb-2  self-end bottom-0 right-0">{blog.createdAt}</p>
          {/* Add more JSX to display other properties of the blog */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Blog