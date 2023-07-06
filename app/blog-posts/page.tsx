interface Post {
  title: string;
  id: number;
}

export default async function Page() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    next: { revalidate: 10 },
  });
  const posts = (await res.json()) as Post[];

  return posts.map((post: Post) => {
    return <li key={post.id}>{post.title}</li>;
  });
}
