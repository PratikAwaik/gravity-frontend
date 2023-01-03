import { IPost } from "../../models/post";
import ForumPost from "./ForumPost";

interface ForumProps {
  posts: IPost[];
}

export default function Forum({ posts }: ForumProps) {
  return (
    <div className="w-full">
      {posts?.map((post: any) => (
        <ForumPost post={post} key={post.id} />
      ))}
    </div>
  );
}
