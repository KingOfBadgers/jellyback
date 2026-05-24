import fs from "fs/promises";
import path from "path";

const CONFIG_PATH = path.join(
  process.cwd(),
  "data",
  "config.json"
);

export type AppConfig = {
  jellyfinUrl: string;
  apiKey: string;
  userId: string;
};

const defaults: AppConfig = {
  jellyfinUrl:
    process.env.JELLYFIN_URL || "",
  apiKey:
    process.env.JELLYFIN_API_KEY || "",
  userId:
    process.env.JELLYFIN_USER_ID || ""
};

export async function getConfig(): Promise<AppConfig> {
  try {
    const raw = await fs.readFile(
      CONFIG_PATH,
      "utf8"
    );

    const fileConfig = JSON.parse(raw);

    return {
      jellyfinUrl:
        fileConfig.jellyfinUrl ||
        defaults.jellyfinUrl,

      apiKey:
        fileConfig.apiKey ||
        defaults.apiKey,

      userId:
        fileConfig.userId ||
        defaults.userId
    };
  } catch {
    return defaults;
  }
}

export async function saveConfig(
  config: AppConfig
) {
  await fs.writeFile(
    CONFIG_PATH,
    JSON.stringify(config, null, 2)
  );
}