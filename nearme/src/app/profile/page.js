// "use client";
// import { useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import Navbar from "@/components/Navbar";

// export default function ProfileSetupPage() {
//   const [interests, setInterests] = useState([]);
//   const [newInterest, setNewInterest] = useState("");
//   const [aboutMe, setAboutMe] = useState([]);
//   const [newAbout, setNewAbout] = useState("");
//   const [livingLocation, setLivingLocation] = useState("");
//   const [bio, setBio] = useState("");
//   const [notifications, setNotifications] = useState(false);
//   const [isPrivate, setIsPrivate] = useState(false);

//   const handleAddInterest = () => {
//     if (!newInterest.trim()) return;
//     setInterests((prev) => [...prev, newInterest.trim()]);
//     setNewInterest("");
//   };

//   const handleAddAbout = () => {
//     if (!newAbout.trim()) return;
//     setAboutMe((prev) => [...prev, newAbout.trim()]);
//     setNewAbout("");
//   };

//   const handleConfirm = () => {
//     console.log({
//       interests,
//       aboutMe,
//       livingLocation,
//       bio,
//       notifications,
//       privacy: isPrivate ? "Private" : "Public",
//     });
//     alert("Profile data submitted! (Check console for details.)");
//   };

//   return (
//     <div className="bg-[var(--color-background)] min-h-screen">
//       <Navbar />

//       <h1 className="text-2xl font-bold mb-6 text-center mt-0">
//         Profile
//       </h1>

//       <div className="max-w-md mx-auto bg-[var(--color-card-bg)] p-6 rounded shadow">
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">Interests</h2>
//           <div className="flex flex-wrap gap-2 mb-2">
//             {interests.map((interest, idx) => (
//               <span
//                 key={idx}
//                 className="bg-[var(--color-background)] px-3 py-1 rounded-full text-sm text-[var(--color-gray-700)]"
//               >
//                 {interest}
//               </span>
//             ))}
//           </div>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Add interest"
//               className="border border-gray-300 rounded p-2 flex-1"
//               value={newInterest}
//               onChange={(e) => setNewInterest(e.target.value)}
//             />
//             <button
//               onClick={handleAddInterest}
//               className="p-2 bg-gray-200 rounded"
//             >
//               <FaPlus />
//             </button>
//           </div>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">About Me</h2>
//           <div className="flex flex-wrap gap-2 mb-2">
//             {aboutMe.map((item, idx) => (
//               <span
//                 key={idx}
//                 className="bg-[var(--color-background)] px-3 py-1 rounded-full text-sm text-[var(--color-gray-700)]"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="e.g. Student"
//               className="border border-gray-300 rounded p-2 flex-1"
//               value={newAbout}
//               onChange={(e) => setNewAbout(e.target.value)}
//             />
//             <button
//               onClick={handleAddAbout}
//               className="p-2 bg-gray-200 rounded"
//             >
//               <FaPlus />
//             </button>
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-semibold mb-2">
//             Enter Living Location
//           </label>
//           <input
//             type="text"
//             placeholder="e.g. Lucan"
//             className="border border-gray-300 rounded p-2 w-full"
//             value={livingLocation}
//             onChange={(e) => setLivingLocation(e.target.value)}
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-semibold mb-2">Bio</label>
//           <textarea
//             rows={4}
//             className="border border-gray-300 rounded p-2 w-full"
//             placeholder="Write something about yourself..."
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//           />
//         </div>

//         <div className="mb-6 flex items-center justify-between">
//           <label className="text-sm font-semibold">
//             Receive notifications for events
//           </label>
//           <input
//             type="checkbox"
//             checked={notifications}
//             onChange={() => setNotifications(!notifications)}
//             className="h-5 w-5 accent-[var(--color-black)]"
//           />
//         </div>

//         <div className="mb-2 flex items-center justify-between">
//           <label className="text-sm font-semibold">Account privacy</label>
//           <input
//             type="checkbox"
//             checked={isPrivate}
//             onChange={() => setIsPrivate(!isPrivate)}
//             className="h-5 w-5 accent-[var(--color-black)]"
//           />
//         </div>
//         <p className="text-sm text-gray-500 mb-6">
//           Currently: <strong>{isPrivate ? "Private" : "Public"}</strong>. Private
//           means people that you are not connected with cannot contact you.
//         </p>

//         <button
//           onClick={handleConfirm}
//           className="w-full py-2 bg-[var(--color-black)] text-[var(--color-white)] font-semibold rounded"
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// }














"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Navbar from "@/components/Navbar";

export default function ProfileSetupPage() {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [aboutMe, setAboutMe] = useState([]);
  const [newAbout, setNewAbout] = useState("");
  const [livingLocation, setLivingLocation] = useState("");
  const [bio, setBio] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    setInterests((prev) => [...prev, newInterest.trim()]);
    setNewInterest("");
  };

  const handleAddAbout = () => {
    if (!newAbout.trim()) return;
    setAboutMe((prev) => [...prev, newAbout.trim()]);
    setNewAbout("");
  };

  const handleConfirm = async () => {
    // Prepare data to send to the backend
    const profileData = {
      interests,
      aboutMe,
      livingLocation,
      bio,
      notifications,
      privacy: isPrivate ? "Private" : "Public",
    };

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Success message from the backend
      } else {
        alert(data.error); // Error message from the backend
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save profile data.");
    }
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />

      <h1 className="text-2xl font-bold mb-6 text-center mt-0">Profile</h1>

      <div className="max-w-md mx-auto bg-[var(--color-card-bg)] p-6 rounded shadow">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Interests</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {interests.map((interest, idx) => (
              <span
                key={idx}
                className="bg-[var(--color-background)] px-3 py-1 rounded-full text-sm text-[var(--color-gray-700)]"
              >
                {interest}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add interest"
              className="border border-gray-300 rounded p-2 flex-1"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
            />
            <button onClick={handleAddInterest} className="p-2 bg-gray-200 rounded">
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">About Me</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {aboutMe.map((item, idx) => (
              <span
                key={idx}
                className="bg-[var(--color-background)] px-3 py-1 rounded-full text-sm text-[var(--color-gray-700)]"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. Student"
              className="border border-gray-300 rounded p-2 flex-1"
              value={newAbout}
              onChange={(e) => setNewAbout(e.target.value)}
            />
            <button onClick={handleAddAbout} className="p-2 bg-gray-200 rounded">
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Enter Living Location</label>
          <input
            type="text"
            placeholder="e.g. Lucan"
            className="border border-gray-300 rounded p-2 w-full"
            value={livingLocation}
            onChange={(e) => setLivingLocation(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Bio</label>
          <textarea
            rows={4}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Write something about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <label className="text-sm font-semibold">Receive notifications for events</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="h-5 w-5 accent-[var(--color-black)]"
          />
        </div>

        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-semibold">Account privacy</label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            className="h-5 w-5 accent-[var(--color-black)]"
          />
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Currently: <strong>{isPrivate ? "Private" : "Public"}</strong>. Private
          means people that you are not connected with cannot contact you.
        </p>

        <button onClick={handleConfirm} className="w-full py-2 bg-[var(--color-black)] text-[var(--color-white)] font-semibold rounded">
          Confirm
        </button>
      </div>
    </div>
  );
}
