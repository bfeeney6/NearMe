"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { FaUsers } from "react-icons/fa";

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [filter, setFilter] = useState("groups");

  const messages = [
    { id: 1, name: "Lucan Runners Club", type: "group", unread: 2 },
    { id: 2, name: "Bray Hiking Club", type: "group", unread: 0 },
    { id: 3, name: "John Doe", type: "friend", unread: 1 },
    { id: 4, name: "Jane Smith", type: "friend", unread: 0 },
  ];

  const displayedMessages = messages.filter((msg) => {
    if (filter === "groups" && msg.type !== "group") return false;
    if (filter === "friends" && msg.type !== "friend") return false;

    if (activeTab === "unread" && msg.unread === 0) return false;

    return true;
  });

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />

      <h1 className="text-2xl font-bold text-center mt-0 mb-6 text-[var(--color-gray-700)]">
        Messages
      </h1>

      <div className="max-w-md mx-auto bg-[var(--color-card-bg)] p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <button
            className={`w-full py-2 rounded-l ${
              activeTab === "all"
                ? "bg-[var(--color-black)] text-[var(--color-white)]"
                : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Messages
          </button>
          <button
            className={`w-full py-2 rounded-r ${
              activeTab === "unread"
                ? "bg-[var(--color-black)] text-[var(--color-white)]"
                : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
            }`}
            onClick={() => setActiveTab("unread")}
          >
            Unread
          </button>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--color-gray-700)]">
            Filter by:
          </span>
          <button
            onClick={() => setFilter("groups")}
            className={`px-3 py-1 rounded ${
              filter === "groups"
                ? "bg-[var(--color-black)] text-[var(--color-white)]"
                : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
            }`}
          >
            groups
          </button>
          <button
            onClick={() => setFilter("friends")}
            className={`px-3 py-1 rounded ${
              filter === "friends"
                ? "bg-[var(--color-black)] text-[var(--color-white)]"
                : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
            }`}
          >
            friends
          </button>
        </div>

        {displayedMessages.length === 0 ? (
          <p className="text-[var(--color-gray-700)]">
            No messages to display.
          </p>
        ) : (
          displayedMessages.map((msg) => (
            <div
              key={msg.id}
              className="flex justify-between items-center mb-4 bg-[var(--color-background)] p-4 rounded"
            >
              <div>
                {msg.type === "group" && (
                  <div className="flex items-center text-[var(--color-gray-700)] mb-1">
                    <FaUsers className="mr-2" />
                    <span className="font-semibold">{msg.name}</span>
                  </div>
                )}
                {msg.type === "friend" && (
                  <div className="text-[var(--color-gray-700)] mb-1 font-semibold">
                    {msg.name}
                  </div>
                )}

                {msg.unread > 0 && (
                  <p className="text-sm text-red-500">
                    {msg.unread} unread message{msg.unread > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <button className="bg-[var(--color-black)] text-[var(--color-white)] px-3 py-1 rounded">
                See Messages
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
