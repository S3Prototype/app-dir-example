import { draftMode } from "next/headers";

async function getContent() {
  const { isEnabled } = draftMode();

  const contentUrl = isEnabled
    ? "https://jsonplaceholder.typicode.com/posts/1"
    : "https://jsonplaceholder.typicode.com/posts/2";

  const res = await fetch(contentUrl);

  return res.json();
}

export default async function Page() {
  const { title, body } = await getContent();

  return (
    <main>
      <h1>{title}</h1>
      <p>{body}</p>
    </main>
  );
}
