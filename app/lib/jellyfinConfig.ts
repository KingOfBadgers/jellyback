import fs from "fs";

export type JellyfinConfig = {
  jellyfinUrl: string;
  apiKey: string;
  userId: string;
};

let cachedConfig: JellyfinConfig | null = null;

export function getJellyfinConfig(): JellyfinConfig {
  if (cachedConfig) return cachedConfig;

  const configPath = "/home/server/jellyback/data/config.json";

  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found at ${configPath}`);
  }

  const raw = fs.readFileSync(configPath, "utf-8");
  const parsed = JSON.parse(raw);

  if (!parsed.jellyfinUrl || !parsed.apiKey || !parsed.userId) {
    throw new Error("Invalid Jellyfin config file");
  }

  cachedConfig = {
    jellyfinUrl: parsed.jellyfinUrl,
    apiKey: parsed.apiKey,
    userId: parsed.userId,
  };

  return cachedConfig;
}