import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["hello", { text: "hole" }]);

  const posts = trpc.useQuery(["posts.get"]);

  if (!hello.data || !posts.data) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <p>{hello.data.greeting}</p>
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
