interface PostFooterProps {
  post: any;
  isPostDetail: boolean;
}

export default function PostFooter({ post, isPostDetail }: PostFooterProps) {
  return (
    <div
      className={`forum-post-footer flex items-center justify-between ${
        isPostDetail && "mb-5"
      }`}
    ></div>
  );
}
