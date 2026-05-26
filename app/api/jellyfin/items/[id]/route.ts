import { NextResponse } from "next/server";
import { getJellyfinConfig } from "@/lib/jellyfinConfig";

function buildHeaders(apiKey: string) {
  return {
    "X-Emby-Token": apiKey,
    "Content-Type": "application/json",
  };
}

function buildBaseQuery(fields: string[]) {
  return new URLSearchParams({
    Fields: fields.join(","),
  }).toString();
}

// =========================
// RESPONSE VALIDATION
// =========================
function isValidItem(data: any) {
  return data && (data.Id || data.id) && (data.Name || data.title);
}

async function fetchSystemItem(
  baseUrl: string,
  apiKey: string,
  id: string,
  fields: string[]
) {
  const url = `${baseUrl}/Items/${id}?api_key=${apiKey}&${buildBaseQuery(fields)}`;

  const res = await fetch(url, {
    headers: buildHeaders(apiKey),
  });

  if (!res.ok) {
    const raw = await res.text();
    return {
      ok: false,
      source: "system",
      status: res.status,
      raw,
      url,
    };
  }

  const json = await res.json();

  return {
    ok: isValidItem(json),
    source: "system",
    data: json,
  };
}

async function fetchUserItem(
  baseUrl: string,
  apiKey: string,
  userId: string,
  id: string,
  fields: string[]
) {
  if (!userId) {
    return null;
  }

  const url = `${baseUrl}/Users/${userId}/Items/${id}?api_key=${apiKey}&${buildBaseQuery(
    fields
  )}`;

  const res = await fetch(url, {
    headers: buildHeaders(apiKey),
  });

  if (!res.ok) {
    const raw = await res.text();
    return {
      ok: false,
      source: "user",
      status: res.status,
      raw,
      url,
    };
  }

  const json = await res.json();

  return {
    ok: isValidItem(json),
    source: "user",
    data: json,
  };
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const fields = [
      "Overview",
      "ProviderIds",
      "ProductionYear",
      "RunTimeTicks",
      "OfficialRating",
      "Genres",
      "Tags",
      "Studios",
      "MediaStreams",
      "MediaSources",
      "People",
      "ImageTags",
      "BackdropImageTags",
    ];

    // =========================
    // CONFIG (FIXED CONSISTENCY)
    // =========================
    const config = getJellyfinConfig();

    const baseUrl = config?.jellyfinUrl?.replace(/\/$/, "");
    const apiKey = config?.apiKey;
    const userId = config?.userId;

    if (!baseUrl || !apiKey) {
      return NextResponse.json(
        { error: "Missing Jellyfin config" },
        { status: 500 }
      );
    }

    // =========================
    // USER FETCH (PRIMARY)
    // =========================
    const userResult = await fetchUserItem(
      baseUrl,
      apiKey,
      userId,
      id,
      fields
    );

    if (userResult?.ok) {
      return NextResponse.json(userResult.data);
    }

    // =========================
    // SYSTEM FETCH (FALLBACK)
    // =========================
    const systemResult = await fetchSystemItem(
      baseUrl,
      apiKey,
      id,
      fields
    );

    if (systemResult?.ok) {
      return NextResponse.json(systemResult.data);
    }

    // =========================
    // FINAL FALLBACK RESPONSE
    // =========================
    return NextResponse.json(
      {
        error: "Jellyfin request failed",
        user: userResult,
        system: systemResult,
      },
      { status: 500 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Unhandled Jellyfin route error",
        message: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}