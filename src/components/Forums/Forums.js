import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ForumPost from './ForumPost';
import { Link } from 'react-router-dom';
import { getAllPostsDispatcher } from "../../dispatchers/forums";
import { currentUserDetailsDispatcher } from "../../dispatchers/user";

const Forums = () => {
  const dispatch = useDispatch();
  const { forums, currentUser } = useSelector(state => state);

  useEffect(() => {
    // dispatch(getAllPostsAction());
    getAllPostsDispatcher(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (currentUser.id) currentUserDetailsDispatcher(dispatch);
  }, [dispatch, currentUser.id]);

  return (
    <div className="mt-16 forums-post-container pt-9 max-w-3xl mx-auto mb-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl mb-2 px-2 py-2 rounded-md font-bold">Forums</h2>  
        <Link 
          to="/forums/create" 
          className="border-2 border-theme-green py-1 px-2 rounded-md hover:bg-theme-green hover:text-theme-white"
        >Create Post</Link>
      </div>
      
      <hr className="mb-5" />
      
      <div className="forums-post-wrapper">
        {forums.map(post => <ForumPost key={post.id} forums={forums} currentUser={currentUser} post={post} />)}
      </div>
    </div>
  );
}

export default Forums;