import FeedComment from "./FeedComment";
import LoadingIcon from "../Utils/LoadingIcon";
import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import { GET_ALL_USER_COMMENTS } from "../../graphql/comments/query";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useCommentsStore } from "../../stores/comments";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";

interface UserCommentsProps {
  userId: string;
}

export default function UserComments({ userId }: UserCommentsProps) {
  const ref = useRef(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.5 });
  const { pageNo, setPageNo, hasMore, setHasMore } = useCommentsStore(
    (state) => ({
      pageNo: state.userCommentsPageNo,
      setPageNo: state.setUserCommentsPageNo,
      hasMore: state.userCommentsHasMore,
      setHasMore: state.setUserCommentsHasMore,
    })
  );
  const { data, loading, fetchMore } = useQuery(GET_ALL_USER_COMMENTS, {
    variables: {
      userId,
      pageNo: 0,
    },
    skip: !userId,
  });

  useEffect(() => {
    // setPageNo(0);
    // setHasMore(false);
    scrollToPreviousPosition(LOCAL_STORAGE_KEYS.USER_COMMENTS_SCROLL_POSITION);
  }, []);

  useEffect(() => {
    (async () => {
      if (isIntersecting && (hasMore || pageNo === 0)) {
        const fetchMoreResult = await fetchMore({
          variables: {
            pageNo: pageNo + 1,
            userId: userId,
          },
        });
        setHasMore(fetchMoreResult?.data?.getAllUserComments?.length === 12);
        setPageNo(pageNo + 1);
      }
    })();
  }, [isIntersecting]);

  if (loading) return null;

  return (
    <div className="w-full">
      {data?.getAllUserComments?.map((comment: any) => (
        <FeedComment key={comment?.id} comment={comment} />
      ))}
      {hasMore ? (
        <LoadingIcon ref={ref} />
      ) : (
        <div className="w-full my-5 flex items-center justify-center">
          You've seen it all!
        </div>
      )}
    </div>
  );
}
