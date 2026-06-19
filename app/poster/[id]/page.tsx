import PosterClient from "./PosterClient";

export default async function Page({ params, searchParams }: any) {
  const { id } = await params;
  const { img } = await searchParams;

  return <PosterClient id={id} img={img} />;
}