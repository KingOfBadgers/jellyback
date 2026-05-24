"use client";

import { Image, Group } from "react-konva";
import useImage from "use-image";
import { getActorImage } from "@/lib/jellyfin";

export default function ActorCollage({
  cast,
  baseUrl,
  apiKey,
  x,
  y,
  size = 100
}: any) {
  return (
    <Group x={x} y={y}>
      {cast.map((actor: any, i: number) => {
        const url = getActorImage(
          baseUrl,
          actor.id,
          apiKey
        );

        const [img] = useImage(url);

        return (
          <Group key={actor.id} x={(i % 4) * (size + 10)} y={Math.floor(i / 4) * (size + 40)}>
            {img && (
              <Image
                image={img}
                width={size}
                height={size}
                cornerRadius={10}
              />
            )}
          </Group>
        );
      })}
    </Group>
  );
}