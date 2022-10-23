import ForumPost from "./ForumPost";

export default function Forum({ posts }: { posts: any }) {
  return (
    <div className="w-full">
      {posts.allPosts?.map((post: any) => (
        <ForumPost post={post} key={post.id} />
      ))}
    </div>
  );
}
