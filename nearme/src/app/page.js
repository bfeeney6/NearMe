"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleLogin = () => {
    setError("Demo mode: No backend set up yet!");
  };

  return (
    <>
      <Head>
        <title>NearMe - Login</title>
        <meta
          name="description"
          content="Login to NearMe to connect with people, events, and local posts."
        />
      </Head>

      <main className="bg-[var(--color-background)] min-h-screen flex flex-col items-center px-4 pt-12">
        <div className="w-full max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <button className="text-[var(--color-gray-500)] text-lg font-semibold border-b-4 border-transparent">
              Signup
            </button>
            <button className="text-[var(--color-black)] text-lg font-semibold border-b-4 border-[var(--color-black)]">
              Login
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">NearMe</h1>

        <div className="w-full max-w-sm bg-[var(--color-card-bg)] p-6 rounded-md shadow">
          <p className="text-[var(--color-gray-700)] mb-6">
            Enter your credentials to log in.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <label className="block text-[var(--color-gray-700)] text-sm font-bold mb-1" htmlFor="email">
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

          <label className="block text-[var(--color-gray-700)] text-sm font-bold mb-1" htmlFor="password">
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
            onClick={handleLogin}
            className="w-full py-2 bg-[var(--color-black)] text-[var(--color-white)] font-semibold rounded"
          >
            Continue
          </button>
        </div>

        <p className="mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="underline">
            Sign up
          </a>
        </p>
      </main>
    </>
  );
}
