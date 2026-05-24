import {
  testConnection
} from "@/lib/jellyfin";

export async function GET() {
  try {
    const result =
      await testConnection();

    return Response.json({
      success: true,
      serverName:
        result.ServerName
    });
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: err.message
      },
      { status: 500 }
    );
  }
}