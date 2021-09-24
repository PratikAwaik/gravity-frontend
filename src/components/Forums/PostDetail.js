import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { getCurrentUserDetailsAction } from '../../actions/currentUser';
import { getAllPostsDispatcher } from '../../dispatchers/forums';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import fancyToolbarConfig from '../../editor.config';

const PostDetail = () => {
  const [editorContent, setEditorContent] = useState('');
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { currentUser, forums } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      if (forums.length === 0) {
        await getAllPostsDispatcher(dispatch);
        setPost(forums.find(post => post.id === id));
      } else {
        setPost(forums.find(post => post.id === id));
      }
    })();
  }, [dispatch, forums, id]);

  useEffect(() => {
    if (currentUser.id) dispatch(getCurrentUserDetailsAction());
  }, [dispatch, currentUser.id]);

  return ( 
    post.id ?
    <div className="mt-24 mb-16 mx-auto max-w-3xl bg-transparent text-theme-white border-4 border-theme-orange rounded-md post-detail-container">
      <div className="p-2 post-detail-wrapper">
        <PostHeader post={post} />
        <PostBody post={post} isPostDetail={true} />
        <PostFooter
          currentUser={currentUser}
          post={post}
          isPostDetail={true}
        />

        {
          currentUser.username &&
          <div className="post-detail-add-comment mb-5">
            <span className="text-sm mb-3">Comment as 
              <Link className="ml-1 text-theme-orange underline" to={`/user/${currentUser.username}`}>{ currentUser.username }</Link>
            </span>
            <Editor
              editorState={editorContent}
              toolbarClassName="bg-theme-purple text-theme-black"
              wrapperClassName="border-2 border-theme-purple rounded-md"
              editorClassName="p-2"
              toolbar={fancyToolbarConfig}
              onEditorStateChange={(editorState) => setEditorContent(editorState)}
              placeholder="What are your thoughts?"
              handlePastedText={() => false} 
            />
          </div>
        }
        
        <div className="post-detail-comments"></div>

      </div>
    </div> :
    null
  );
}

export default PostDetail;