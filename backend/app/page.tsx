"use client";

import { useEffect, useState } from "react";

type RecordItem = {
  id: number;
  name: string;
  email?: string;
  message?: string;
  created_at?: string;
};

export default function Home() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("Loading database...");
  const [loading, setLoading] = useState(false);

  const loadRecords = async () => {
    setLoading(true);
    setStatus("Loading records...");

    try {
      const response = await fetch("/api/db");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reach the database.");
      }

      setRecords(data.records || []);
      setStatus(data.message || "Database is ready.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRecords();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save record.");
      }

      setStatus(data.message || "Record saved.");
      setForm({ name: "", email: "", message: "" });
      await loadRecords();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save record.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/db?id=${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete record.");
      }

      setStatus(data.message || "Record deleted.");
      await loadRecords();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to delete record.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">JC Web Pros</p>
          <h1 className="text-3xl font-semibold">Database operations connected to MySQL</h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Fill in the form to insert a new row into the database, and use the list below to browse or delete records.
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
          {loading ? "Working..." : status}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span>Name</span>
            <input
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 outline-none ring-0"
              placeholder="Enter name"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span>Email</span>
            <input
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 outline-none ring-0"
              placeholder="Enter email"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm md:col-span-2">
            <span>Message</span>
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className="min-h-28 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 outline-none ring-0"
              placeholder="Enter message"
            />
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white transition hover:bg-cyan-500"
            >
              Save Record
            </button>
          </div>
        </form>

        <section className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Saved records</h2>
            <button
              type="button"
              onClick={() => void loadRecords()}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
            >
              Refresh
            </button>
          </div>

          {records.length === 0 ? (
            <p className="text-sm text-slate-400">No records yet. Add one above to test the connection.</p>
          ) : (
            <ul className="space-y-3">
              {records.map((record) => (
                <li key={record.id} className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{record.name}</p>
                      <p className="text-sm text-slate-400">{record.email || "No email provided"}</p>
                      <p className="mt-2 text-sm text-slate-300">{record.message || "No message"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleDelete(record.id)}
                      className="rounded-lg border border-rose-700 px-3 py-2 text-sm text-rose-300 hover:bg-rose-950"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
