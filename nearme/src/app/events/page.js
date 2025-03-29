"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("search");
  const [events, setEvents] = useState([]);
  const [searchedEvents, setSearchedEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      const mockData = [
        { id: 1, location: "Lucan", interest: "Soccer", startDate: "2024-05-01", endDate: "2024-05-01" },
        { id: 2, location: "Lucan", interest: "Soccer", startDate: "2024-05-02", endDate: "2024-05-02" },
        { id: 3, location: "Dublin", interest: "Music", startDate: "2024-06-01", endDate: "2024-06-01" },
        { id: 4, location: "Dublin", interest: "Cooking", startDate: "2024-06-05", endDate: "2024-06-06" }
      ];
      await new Promise((res) => setTimeout(res, 500)); 
      setEvents(mockData);
    }
    fetchEvents();
  }, []);

  const handleSearch = (location, interest, startDate, endDate) => {
    const filteredEvents = events.filter((event) => {
      const matchLocation = location ? event.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchInterest = interest ? event.interest.toLowerCase().includes(interest.toLowerCase()) : true;
      const matchStartDate = startDate ? new Date(event.startDate) >= new Date(startDate) : true;
      const matchEndDate = endDate ? new Date(event.endDate) <= new Date(endDate) : true;
      return matchLocation && matchInterest && matchStartDate && matchEndDate;
    });
    setSearchedEvents(filteredEvents);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setActiveTab("create");
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.some((event) => event.id === updatedEvent.id)
        ? prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
        : [...prevEvents, updatedEvent]
    );
    setEditingEvent(null);
    setActiveTab("manage");
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />

      <h1 className="text-2xl font-bold text-center mt-0 mb-6 text-[var(--color-gray-700)]">Events</h1>

      <div className="max-w-md mx-auto bg-[var(--color-card-bg)] p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          {["manage", "search", "create"].map((tab) => (
            <button
              key={tab}
              className={`w-full py-2 ${activeTab === tab ? "bg-[var(--color-black)] text-white" : "bg-[var(--color-background)] text-[var(--color-gray-700)]"} ${tab === "manage" ? "rounded-l" : tab === "create" ? "rounded-r" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </button>
          ))}
        </div>

        {activeTab === "search" && <SearchEventsSection handleSearch={handleSearch} searchedEvents={searchedEvents} />}
        {activeTab === "manage" && <ManageEventsSection events={events} onDelete={handleDeleteEvent} onEdit={handleEditEvent} />}
        {activeTab === "create" && <CreateEventsSection event={editingEvent} onUpdate={handleUpdateEvent} />}
      </div>
    </div>
  );
}

function SearchEventsSection({ handleSearch, searchedEvents }) {
  const [location, setLocation] = useState("");
  const [interest, setInterest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(location, interest, startDate, endDate);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">Search Events</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-[var(--color-gray-700)]">Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 w-full rounded" />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-semibold text-[var(--color-gray-700)]">Activity/Interest</label>
          <input type="text" value={interest} onChange={(e) => setInterest(e.target.value)} className="border p-2 w-full rounded" />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-semibold text-[var(--color-gray-700)]">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 w-full rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-[var(--color-gray-700)]">End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 w-full rounded" />
        </div>

        <button type="submit" className="w-full py-2 bg-green-500 text-white rounded">Search</button>
      </form>

      <div className="mt-4">
        {searchedEvents.length > 0 ? (
          searchedEvents.map((event) => (
            <div key={event.id} className="border p-3 rounded flex justify-between items-center mb-2">
              <div>
                <strong>Location:</strong> {event.location} <br />
                <strong>Interest:</strong> {event.interest} <br />
                <strong>Start Date:</strong> {event.startDate} <br />
                <strong>End Date:</strong> {event.endDate}
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">Join Event</button>
            </div>
          ))
        ) : (
          <div>No events found</div>
        )}
      </div>
    </div>
  );
}

function ManageEventsSection({ events, onDelete, onEdit }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">Manage Existing Events</h2>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="border p-3 rounded flex justify-between items-center mb-2">
            <div>
              <strong>Location:</strong> {event.location} <br />
              <strong>Interest:</strong> {event.interest} <br />
              <strong>Start Date:</strong> {event.startDate} <br />
              <strong>End Date:</strong> {event.endDate}
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(event)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={() => onDelete(event.id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <div>No events found</div>
      )}
    </div>
  );
}

function CreateEventsSection({ event, onUpdate }) {
  const [location, setLocation] = useState(event?.location || "");
  const [interest, setInterest] = useState(event?.interest || "");
  const [startDate, setStartDate] = useState(event?.startDate || "");
  const [endDate, setEndDate] = useState(event?.endDate || "");

  useEffect(() => {
    if (event) {
      setLocation(event.location);
      setInterest(event.interest);
      setStartDate(event.startDate);
      setEndDate(event.endDate);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ id: event?.id || Date.now(), location, interest, startDate, endDate });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">{event ? "Edit Event" : "Create New Event"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-[var(--color-gray-700)]">Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 w-full rounded" required />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-semibold text-[var(--color-gray-700)]">Activity/Interest</label>
          <input type="text" value={interest} onChange={(e) => setInterest(e.target.value)} className="border p-2 w-full rounded" required />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-semibold text-[var(--color-gray-700)]">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 w-full rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-[var(--color-gray-700)]">End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 w-full rounded" required />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">{event ? "Update Event" : "Create Event"}</button>
      </form>
    </div>
  );
}




