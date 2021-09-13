import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ForumPost from './ForumPost';
import { getAllPostsAction } from "../../actions/forums";

const Forums = () => {
  const dispatch = useDispatch();
  const forums = useSelector(state => state.forums);

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [dispatch]);

  return (
    <div className="mt-16 forums-post-container pt-9 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-2 text-theme-black bg-theme-orange px-2 py-2 rounded-md">Forums</h2>
      <hr className="mb-5" />
      
      <div className="forums-post-wrapper">
        {forums.map(post => <ForumPost key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default Forums;