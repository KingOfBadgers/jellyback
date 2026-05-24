"use client";

import {
  useEffect,
  useState
} from "react";

export default function SettingsForm() {
  const [form, setForm] =
    useState({
      jellyfinUrl: "",
      apiKey: "",
      userId: ""
    });

  const [status, setStatus] =
    useState("");

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then(setForm);
  }, []);

  async function save() {
    await fetch(
      "/api/config",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    setStatus("Saved");
  }

  async function test() {
    setStatus(
      "Testing..."
    );

    const res =
      await fetch(
        "/api/jellyfin/test"
      );

    const json =
      await res.json();

    setStatus(
      json.success
        ? `Connected: ${json.serverName}`
        : json.error
    );
  }

  return (
    <div className="space-y-4">
      <input
        className="w-full rounded bg-slate-800 p-3"
        placeholder="Jellyfin URL"
        value={
          form.jellyfinUrl
        }
        onChange={(e) =>
          setForm({
            ...form,
            jellyfinUrl:
              e.target.value
          })
        }
      />

      <input
        className="w-full rounded bg-slate-800 p-3"
        placeholder="API Key"
        value={
          form.apiKey
        }
        onChange={(e) =>
          setForm({
            ...form,
            apiKey:
              e.target.value
          })
        }
      />

      <input
        className="w-full rounded bg-slate-800 p-3"
        placeholder="User ID"
        value={form.userId}
        onChange={(e) =>
          setForm({
            ...form,
            userId:
              e.target.value
          })
        }
      />

      <div className="flex gap-4">
        <button
          onClick={save}
          className="rounded bg-sky-600 px-4 py-2"
        >
          Save
        </button>

        <button
          onClick={test}
          className="rounded bg-green-600 px-4 py-2"
        >
          Test Connection
        </button>
      </div>

      <p>{status}</p>
    </div>
  );
}