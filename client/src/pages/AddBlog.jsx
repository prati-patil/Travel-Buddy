import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Button, TextField } from "@mui/material";
import "react-quill/dist/quill.snow.css";

function AddBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'], ['link', 'image']
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const handlePost = () => {
    // You can handle the blog post submission here
    console.log("Title:", title);
    console.log("Content:", content);
    // Add your logic to send the blog post to the server or perform any necessary actions.
  };

  return (<>

    <div className="flex flex-col items-center justify-start gap-8 mt-12 w-full h-full">
    <div>
      <h1 className="text-4xl font-bold text-char">Create Your Own Blog!</h1>
    </div>

      <TextField
        id="outlined-basic"
        label="Blog Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-1/2"
      />

      {/* Quill Editor */}
      <div className="w-full flex flex-col items-center">
        <span className="">
          Content:
        </span>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={content}
        onChange={setContent}
        className="w-1/2 h-64 rounded"
      />
      </div>

      {/* Post Button */}
      <Button
        variant="contained"
        onClick={handlePost}
        className="!mt-20 !mb-16"
      // className="bg-blue-500 text-black px-4 py-2 border rounded hover:bg-blue-700 absolute bottom-0"
      >
        Add Post
      </Button>
    </div>
  </>
  );
}

export default AddBlog;
