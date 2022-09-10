import { Profile } from "types";

type Context = {
  profile: Profile;
};

export default function Index({ profile }: Context) {
  if (!profile.ok) {
    return <>{profile.message}</>;
  }

  console.log(profile);
  return <>{profile.username}</>;
}

export async function getServerSideProps({ params }) {
  const url = process.env.NEXT_PUBLIC_API_URL;

  const { slug } = params;

  if (!slug) {
    return null;
  }

  const profile = await fetch(`${url}/profile/${slug}`).then((res) =>
    res.json()
  );

  return {
    props: {
      profile,
    },
  };
}
