"use client";

import {
  useEffect,
  useState
} from "react";
import Link from "next/link";

type Movie = {
  id: string;
  title: string;
  poster: string | null;
  year?: number;
};

export default function MovieGrid() {
  const [movies, setMovies] =
    useState<Movie[]>([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  useEffect(() => {
    fetch("/api/jellyfin/movies")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(
            data.error
          );
        } else {
          setMovies(data);
        }
      })
      .catch(() =>
        setError(
          "Failed to load movies"
        )
      )
      .finally(() =>
        setLoading(false)
      );
  }, []);

  if (loading) {
    return (
      <p className="text-slate-400">
        Loading movies...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-400">
        {error}
      </p>
    );
  }

  if (!movies.length) {
    return (
      <p className="text-slate-400">
        No movies missing Back artwork 🎉
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className="group"
        >
          <div className="overflow-hidden rounded-lg bg-slate-800">
            <img
              src={
                movie.poster ||
                "/placeholder-poster.png"
              }
              className="h-[300px] w-full object-cover transition group-hover:scale-105"
            />

            <div className="p-2">
              <p className="text-sm font-medium">
                {movie.title}
              </p>

              {movie.year && (
                <p className="text-xs text-slate-400">
                  {movie.year}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}