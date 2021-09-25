import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllPostsDispatcher } from "../../dispatchers/forums";
import { currentUserDetailsDispatcher } from "../../dispatchers/user";
import { sortByDate } from "../../helpers";

const ForumPost = React.lazy(() => import('./ForumPost'));

const Forums = () => {
  const dispatch = useDispatch();
  const forums = useSelector(state => sortByDate(state.forums, true));
  const currentUser = useSelector(state => state.currentUser);

  useEffect(() => {
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
        {forums.map(post => 
          <React.Suspense key={post.id}>
            <ForumPost 
              forums={forums} 
              currentUser={currentUser} 
              post={post} 
            />
          </React.Suspense>
          )}
      </div>
    </div>
  );
}

export default Forums;