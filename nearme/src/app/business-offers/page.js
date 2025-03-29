"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { FaUserCircle } from "react-icons/fa";

export default function BusinessOffersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [offers, setOffers] = useState([
    {
      id: 1,
      business: "The Food Shack",
      title: "Family meal for 2 kids, 2 adults for £50",
      details: "on Tuesdays",
      hashtag: "#tastytue", // Added hashtag
      time: "12:03pm",
      date: "17/2/25",
      replies: [], // To store replies for each post
    },
    {
      id: 2,
      business: "O Carroll's",
      title: "O Carroll's offering 2 beers for 10€",
      details: "on Fridays",
      hashtag: "#fridayspecial", // Added hashtag
      time: "12:03pm",
      date: "17/2/25",
      replies: [], // To store replies for each post
    },
  ]);

  const [newOffer, setNewOffer] = useState("");
  const [newReply, setNewReply] = useState(""); // State for the reply text

  // Function to get the current time and date
  const getCurrentTimeAndDate = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const date = now.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
    return { time, date };
  };

  // Function to add a new offer for O Carroll's at the bottom
  const handleAddOffer = () => {
    if (newOffer.trim() === "") return; // Prevent empty posts

    const { time, date } = getCurrentTimeAndDate();
    const hashtag = extractHashtag(newOffer); // Extract hashtag from new offer
    const titleWithoutHashtagAndDay = newOffer
      .replace(hashtag, "") // Remove hashtag
      .replace(/on\s(\w+\s?\w*)/i, "") // Remove the "on [day]" part
      .trim(); // Remove extra spaces

    const newPost = {
      id: offers.length + 1,
      business: "O Carroll's",
      title: titleWithoutHashtagAndDay, // Title without hashtag and day
      details: extractDay(newOffer), // Extract the "on [day]" part
      hashtag: hashtag, // Set hashtag
      time,
      date,
      replies: [], // Initialize replies as an empty array
    };

    // Handle adding a reply if it's provided
    if (newReply.trim() !== "") {
      const replyHashtag = extractHashtag(newReply);
      const replyWithoutHashtagAndDay = newReply
        .replace(replyHashtag, "") // Remove hashtag
        .replace(/on\s(\w+\s?\w*)/i, "") // Remove the "on [day]" part
        .trim(); // Remove extra spaces

      const newReplyPost = {
        id: Date.now(), // Generate a unique ID based on timestamp
        text: replyWithoutHashtagAndDay,
        hashtag: replyHashtag, // Add hashtag to the reply
      };

      newPost.replies.push(newReplyPost); // Add the reply to the post
    }

    console.log("Adding new offer:", newPost); // Debugging log

    setOffers((prevOffers) => [...prevOffers, newPost]); // Append to the bottom of the list
    setNewOffer(""); // Clear input field for offer
    setNewReply(""); // Clear input field for reply
  };

  // Helper function to extract "on [day]" from the offer
  const extractDay = (offerText) => {
    const match = offerText.match(/on\s(\w+\s?\w*)/i); // Look for "on [day]"
    return match ? match[0] : "";
  };

  // Helper function to extract hashtag from the offer
  const extractHashtag = (offerText) => {
    const match = offerText.match(/#(\w+\w*)/); // Look for the hashtag
    return match ? `#${match[1]}` : ""; // Return hashtag if found
  };

  // Function to render text with hashtags as blue
  const renderTextWithHashtags = (text) => {
    const regex = /(#\w+)/g;
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.match(regex) ? (
        <span key={index} className="text-blue-500">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />

      <div className="max-w-md mx-auto p-4">
        <h1 className="text-lg font-bold text-[var(--color-black)]">
          Lucan Business Offers
        </h1>
        <p className="text-[var(--color-gray-500)] text-sm mb-4">
          Place is prepopulated with profile but can be changed
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Enter category to search"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* List of Offers */}
        {offers.map((offer) => (
          <div key={offer.id} className="bg-[var(--color-card-bg)] p-4 rounded-md shadow mb-3 relative">
            <div className="flex items-start gap-3">
              {/* Profile Icon + Business Name */}
              <div className="flex flex-col items-center">
                <FaUserCircle className="text-3xl text-[var(--color-gray-700)]" />
                <p className="text-[var(--color-black)] font-medium text-sm text-center">
                  {offer.business}
                </p>
              </div>

              {/* Offer Details */}
              <div className="flex-1">
                <p className="text-[var(--color-gray-700)] text-sm font-medium">
                  {renderTextWithHashtags(offer.title)} {/* Render with hashtags in blue */}
                </p>
                <p className="text-[var(--color-gray-500)] text-xs">{offer.details}</p>
                {offer.hashtag && <p className="text-blue-500 text-xs">{offer.hashtag}</p>} {/* Display hashtag below */}
              </div>
            </div>

            {/* Date & Time in Bottom Right */}
            <div className="absolute bottom-2 right-2 text-[var(--color-gray-500)] text-xs">
              <p>{offer.time}</p>
              <p>{offer.date}</p>
            </div>

            {/* Reply Button */}
            <button
              className="text-blue-500 text-xs mt-2"
              onClick={() => setNewReply(`Replying with ${offer.hashtag}`)} // Set default reply text with hashtag
            >
              Reply
            </button>

            {/* Replies Section */}
            <div className="mt-3">
              {offer.replies.length > 0 && (
                <div>
                  {offer.replies.map((reply) => (
                    <div key={reply.id} className="text-sm text-[var(--color-gray-700)] mt-2">
                      {renderTextWithHashtags(reply.text)}
                      {reply.hashtag && (
                        <p className="text-blue-500 text-xs">{reply.hashtag}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* New Offer Input Field - Appears Below the Offers */}
        <div className="bg-[var(--color-card-bg)] p-4 rounded-md shadow mt-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-3xl text-[var(--color-gray-700)]" />
            <input
              type="text"
              placeholder="Make an offer for O Carroll's..."
              className="flex-1 p-2 border border-gray-300 rounded"
              value={newOffer}
              onChange={(e) => setNewOffer(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Write your reply..."
            className="flex-1 p-2 border border-gray-300 rounded mt-2"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-2"
            onClick={handleAddOffer}
          >
            Publish Offer with Reply
          </button>
        </div>
      </div>
    </div>
  );
}
