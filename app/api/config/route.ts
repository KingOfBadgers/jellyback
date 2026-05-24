import {
  getConfig,
  saveConfig
} from "@/lib/config";

export async function GET() {
  const config =
    await getConfig();

  return Response.json(config);
}

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  await saveConfig(body);

  return Response.json({
    success: true
  });
}