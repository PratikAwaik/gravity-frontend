import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ForumPost from './ForumPost';
import { getAllPostsAction } from "../../actions/forums";
import { Link } from "react-router-dom";

const Forums = () => {
  const dispatch = useDispatch();
  const { forums, currentUser } = useSelector(state => state);

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [dispatch]);

  const createPostLink = currentUser.username ? '/forums/create' : '/login';

  return (
    <div className="mt-16 forums-post-container pt-9 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl mb-2 px-2 py-2 rounded-md font-bold">Forums</h2>  
        <Link to={createPostLink} className="border-2 border-theme-orange py-1 px-2 rounded-md hover:bg-theme-orange hover:text-theme-black">Create Post</Link>
      </div>
      
      <hr className="mb-5" />
      
      <div className="forums-post-wrapper">
        {forums.map(post => <ForumPost key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default Forums;