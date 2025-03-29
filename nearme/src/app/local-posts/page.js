"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { FaUserCircle } from "react-icons/fa";

export default function LocalPostsPage() {
  const [searchTerm, setSearchTerm] = useState(""); // Search filter
  const [newPost, setNewPost] = useState(""); // Input for creating posts
  const [replyingTo, setReplyingTo] = useState(null); // Stores post being replied to
  const [replyText, setReplyText] = useState(""); // Stores reply input
  const [localPosts, setLocalPosts] = useState([
    { id: 1, name: "John Doe", content: "Looking for a plumber!!!", hashtag: "#plumbers", time: "12:03pm", date: "17/2/25" },
    { id: 2, name: "Jane Smith", content: "Yes, I know a plumber looking for work. He did a great job for me.", hashtag: "#plumbers", time: "12:03pm", date: "17/2/25" },
    { id: 3, name: "Bob Johnson", content: "Great, please put me in contact with them.", hashtag: "#plumbers", time: "12:03pm", date: "17/2/25" },
  ]);

  // Function to handle new post submission
  const handlePostSubmit = () => {
    if (!newPost.trim()) return; // Prevent empty posts

    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const formattedDate = currentDate.toLocaleDateString("en-GB");

    const words = newPost.split(" ");
    let content = "";
    let hashtag = "";
    
    words.forEach(word => {
      if (word.startsWith("#")) {
        hashtag = word;
      } else {
        content += word + " ";
      }
    });

    const newPostObj = {
      id: localPosts.length + 1,
      name: "Ben Feeney",
      content: content.trim(),
      hashtag,
      time: formattedTime,
      date: formattedDate,
    };

    setLocalPosts([newPostObj, ...localPosts]); // Add new post at the top
    setNewPost(""); // Clear input field
  };

  // Function to handle reply submission
  const handleReplySubmit = (postId, postHashtag) => {
    if (!replyText.trim()) return;

    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const formattedDate = currentDate.toLocaleDateString("en-GB");

    const replyPost = {
      id: localPosts.length + 1,
      name: "Ben Feeney",
      content: replyText.trim(),
      hashtag: postHashtag, // Keep the same hashtag
      time: formattedTime,
      date: formattedDate,
    };

    setLocalPosts([replyPost, ...localPosts]); // Add reply at the top
    setReplyingTo(null); // Close reply input
    setReplyText(""); // Clear reply field
  };

  // Filter posts based on search term
  const filteredPosts = localPosts.filter((post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) || post.hashtag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-lg font-bold text-[var(--color-black)]">Lucan posts</h1>
        <p className="text-[var(--color-gray-500)] text-sm mb-4">
          Place is prepopulated with profile but can be changed
        </p>

        {/* Search by thread */}
        <input
          type="text"
          placeholder="Search posts by thread..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Render filtered posts */}
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-[var(--color-card-bg)] p-4 rounded-md shadow mb-3 relative">
            <div className="flex items-start">
              <div className="flex flex-col items-center gap-2">
                <FaUserCircle className="text-3xl text-[var(--color-gray-700)]" />
                <p className="text-[var(--color-black)] font-medium text-sm">{post.name}</p>
              </div>

              <div className="ml-4 flex-1">
                <p className="text-[var(--color-gray-700)] text-sm">{post.content} <span className="text-blue-500">{post.hashtag}</span></p>
                <button
                  className="text-sm text-blue-500 mt-1 hover:underline"
                  onClick={() => setReplyingTo(post.id)}
                >
                  Reply
                </button>

                {/* Show reply input if replying to this post */}
                {replyingTo === post.id && (
                  <div className="mt-2">
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      onClick={() => handleReplySubmit(post.id, post.hashtag)}
                      className="bg-blue-500 text-white text-sm py-1 px-3 rounded hover:bg-blue-600"
                    >
                      Post Reply
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Date and time positioned in the bottom right */}
            <div className="absolute bottom-2 right-2 text-[var(--color-gray-500)] text-xs">
              <p>{post.time}</p>
              <p>{post.date}</p>
            </div>
          </div>
        ))}

        {/* Create a Post Section */}
        <div className="bg-[var(--color-card-bg)] p-4 rounded-md shadow mt-3">
          <div className="flex items-center gap-2 mb-2">
            <FaUserCircle className="text-2xl text-[var(--color-gray-700)]" />
            <p className="text-[var(--color-gray-500)] text-sm">Make a post...</p>
          </div>

          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />

          <button
            onClick={handlePostSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
