"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("search");
  const [events, setEvents] = useState([]);
  const [searchedEvents, setSearchedEvents] = useState([]); // Store search results

  useEffect(() => {
    async function fetchEvents() {
      // Mock data
      const mockData = [
        {
          id: 1,
          location: "Lucan",
          interest: "Soccer",
          startDate: "2024-05-01",
          endDate: "2024-05-01",
        },
        {
          id: 2,
          location: "Lucan",
          interest: "Soccer",
          startDate: "2024-05-02",
          endDate: "2024-05-02",
        },
      ];
      await new Promise((res) => setTimeout(res, 500)); // Simulate API delay
      setEvents(mockData); // Save mock events
    }

    fetchEvents();
  }, []);

  // Handle search function
  const handleSearch = (location, interest) => {
    const filteredEvents = events.filter(
      (event) =>
        event.location.toLowerCase().includes(location.toLowerCase()) &&
        event.interest.toLowerCase().includes(interest.toLowerCase())
    );
    setSearchedEvents(filteredEvents); // Update search results
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />

      <h1 className="text-2xl font-bold text-center mt-0 mb-6 text-[var(--color-gray-700)]">
        Events
      </h1>

      <div className="max-w-md mx-auto bg-[var(--color-card-bg)] p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <button
            className={`w-full py-2 rounded-l ${
              activeTab === "manage"
                ? "bg-[var(--color-black)] text-[var(--color-white)]"
                : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Existing Events
          </button>
          <button
            className={`w-full py-2 ${
              activeTab === "search"
                ? "bg-[var(--color-black)] text-[var(--color-white)]"
                : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
            }`}
            onClick={() => setActiveTab("search")}
          >
            Search for New Events
          </button>
          <button
            className={`w-full py-2 rounded-r ${
              activeTab === "create"
                ? "bg-[var(--color-black)] text-[var(--color-white)]"
                : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create New Events
          </button>
        </div>

        {activeTab === "search" && (
          <SearchEventsSection
            handleSearch={handleSearch}
            searchedEvents={searchedEvents}
          />
        )}
        {activeTab === "manage" && <ManageEventsSection events={events} />}
        {activeTab === "create" && <CreateEventsSection />}
      </div>
    </div>
  );
}

/* 
   Search Section
 */
function SearchEventsSection({ handleSearch, searchedEvents }) {
  const [location, setLocation] = useState("");
  const [interest, setInterest] = useState("");

  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleInterestChange = (e) => setInterest(e.target.value);
  const onSearch = () => handleSearch(location, interest);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">
        Search for New Events
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
          Activity/Interest
        </label>
        <input
          type="text"
          value={interest}
          onChange={handleInterestChange}
          placeholder="Enter activity or interest"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <button
        onClick={onSearch}
        className="w-full py-2 rounded bg-[var(--color-black)] text-[var(--color-white)] font-semibold"
      >
        Search
      </button>

      {/* Display search results */}
      {searchedEvents.length > 0 && (
        <div>
          <h3 className="mt-6 text-lg font-semibold text-[var(--color-gray-700)]">
            Upcoming Events
          </h3>
          <div className="space-y-4 mt-4">
            {searchedEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-300 rounded p-4 text-[var(--color-gray-700)]"
              >
                <div>
                  <div>
                    <strong>Location:</strong> {event.location}
                  </div>
                  <div>
                    <strong>Interest:</strong> {event.interest}
                  </div>
                  <div>
                    <strong>Start Date:</strong> {event.startDate}
                  </div>
                  <div>
                    <strong>End Date:</strong> {event.endDate}
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Join Event
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* 
   Manage Section
 */
function ManageEventsSection({ events }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">
        Manage Existing Events
      </h2>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="border border-gray-300 rounded p-3 text-[var(--color-gray-700)] flex justify-between items-center"
            >
              <div>
                <div>
                  <strong>Location:</strong> {event.location}
                </div>
                <div>
                  <strong>Interest:</strong> {event.interest}
                </div>
                <div>
                  <strong>Start Date:</strong> {event.startDate}
                </div>
                <div>
                  <strong>End Date:</strong> {event.endDate}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[var(--color-gray-700)]">No events found.</p>
      )}
    </div>
  );
}

/* 
   Create Section
 */
function CreateEventsSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">
        Create New Events
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
          Location
        </label>
        <input
          type="text"
          placeholder="Enter location"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
          Activity/Interest
        </label>
        <input
          type="text"
          placeholder="Enter activity or interest"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
            Start Date
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="dd/mm/yyyy"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
            End Date
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="dd/mm/yyyy"
          />
        </div>
      </div>

      <button className="w-full py-2 rounded bg-[var(--color-black)] text-[var(--color-white)] font-semibold">
        Create
      </button>
    </div>
  );
}