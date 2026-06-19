"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function MoviePage() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;

    router.replace(`/background/${id}`);
  }, [id, router]);

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center">
      Loading movie…
    </div>
  );
}