"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateJob() {
  const router = useRouter();

  const [taskName, setTaskName] = useState("");
  const [payload, setPayload] = useState("{}");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedPayload = JSON.parse(payload);
      await api.post("/jobs", {
        taskName,
        payload: parsedPayload,
        priority,
      });
      router.push("/");
    } catch {
      setError("Invalid JSON payload");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Create Job
      </h1>

      <form className="bg-white p-6 rounded-lg shadow max-w-xl">
        {error && (
          <p className="mb-4 text-red-600 font-semibold">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-800">
            Task Name
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-800">
            Payload (JSON)
          </label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded p-2 font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-800">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition"
        >
          Create Job
        </button>
      </form>
    </main>
  );
}
