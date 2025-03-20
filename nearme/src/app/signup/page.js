"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    const signupData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      } else {
        setError(data.error || "Failed to sign up");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while trying to sign up.");
    }
  };

  return (
    <>
      <Head>
        <title>NearMe - Sign Up</title>
        <meta
          name="description"
          content="Sign up for NearMe to connect with people, events, and local posts."
        />
      </Head>

      <main className="bg-[var(--color-background)] min-h-screen flex flex-col items-center px-4 pt-12">
        <div className="w-full max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <button className="text-[var(--color-black)] text-lg font-semibold border-b-4 border-[var(--color-black)]">
              Signup
            </button>
            <button className="text-[var(--color-gray-500)] text-lg font-semibold border-b-4 border-transparent">
              Login
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">NearMe</h1>

        <div className="w-full max-w-sm bg-[var(--color-card-bg)] p-6 rounded-md shadow">
          <p className="text-[var(--color-gray-700)] mb-6">
            Create an account to get started.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <label
            className="block text-[var(--color-gray-700)] text-sm font-bold mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label
            className="block text-[var(--color-gray-700)] text-sm font-bold mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            className="mb-6 w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-sm text-[var(--color-gray-500)] mb-6">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>.
          </p>

          <button
            onClick={handleSignup}
            className="w-full py-2 bg-[var(--color-black)] text-[var(--color-white)] font-semibold rounded"
          >
            Continue
          </button>
        </div>

        <p className="mt-4">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Log in
          </a>
        </p>
      </main>
    </>
  );
}


