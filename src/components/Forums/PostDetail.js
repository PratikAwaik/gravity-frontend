import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { handleDownvotesAction, handleUpvotesAction } from '../../actions/post';
import { getSinglePostAction } from '../../actions/post';
import { getCurrentUserDetailsAction } from '../../actions/currentUser';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import fancyToolbarConfig from '../../editor.config';

const PostDetail = () => {
  const [editorContent, setEditorContent] = useState('');
  const { id } = useParams();
  const { post, currentUser } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePostAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser.id) dispatch(getCurrentUserDetailsAction());
  }, [dispatch, currentUser.id]);

  return (
    <div className="mt-24 mb-16 mx-auto max-w-3xl bg-transparent text-theme-white border-4 border-theme-orange rounded-md post-detail-container">
      <div className="p-2 post-detail-wrapper">
        <PostHeader post={post} />
        <PostBody post={post} isPostDetail={true} />
        <PostFooter
          currentUser={currentUser}
          post={post}
          upvoteAction={handleUpvotesAction}
          downvoteAction={handleDownvotesAction}
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
    </div>
  );
}

export default PostDetail;