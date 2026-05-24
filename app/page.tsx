import MovieGrid from "@/components/MovieGrid";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            JellyBack
          </h1>

          <p className="mt-2 text-slate-400">
            Movies missing back artwork
          </p>
        </div>

        <Link
          href="/settings"
          className="rounded bg-sky-600 px-4 py-2 hover:bg-sky-700"
        >
          Settings
        </Link>
      </div>

      <MovieGrid />
    </div>
  );
}