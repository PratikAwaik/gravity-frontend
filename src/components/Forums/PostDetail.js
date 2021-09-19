import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Editor } from "react-draft-wysiwyg";
import MDEditor from '@uiw/react-md-editor';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import { handleDownvotesAction, handleUpvotesAction } from '../../actions/post';
import { getSinglePostAction } from '../../actions/post';
import { getCurrentUserDetailsAction } from '../../actions/currentUser';
import { 
  hasUpvotedAlreadyHelper, 
  hasDownvotedAlreadyHelper,
  handleUpvoteHelper, 
  handleDownvoteHelper,
  fancyToolbarConfig
} from '../../helpers';

// TODO: Separate post header, body, footer, comments in separate components 

const PostDetail = () => {
  const [editorContent, setEditorContent] = useState('');
  const { id } = useParams();
  const { post, currentUser } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePostAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser.id) dispatch(getCurrentUserDetailsAction());
  }, [dispatch, currentUser.id]);

  const hasUpvotedAlready = hasUpvotedAlreadyHelper(currentUser, id);
  const hasDownvotedAlready = hasDownvotedAlreadyHelper(currentUser, id);

  const handleUpvoteClick = () => {
    handleUpvoteHelper(dispatch, currentUser, post, hasUpvotedAlready, hasDownvotedAlready, handleUpvotesAction);
  }

  const handleDownvoteClick = () => {
    handleDownvoteHelper(dispatch, currentUser, post, hasUpvotedAlready, hasDownvotedAlready, handleDownvotesAction);
  }

  return (
    <div className="mt-24 mb-16 mx-auto max-w-3xl bg-theme-white  text-theme-black border-4 border-theme-orange rounded-md post-detail-container">
      <div className="p-2 post-detail-wrapper">
        <div className="post-detail-header text-sm text-theme-gray mb-3 flex items-center">
          Posted by 
          {
            post.user && post.user.username ? 
            <Link to={`/user/${post.user.username}`} className="ml-1 underline z-10">{ post.user.username }</Link> :
            <span className="ml-1 underline z-10">{'[deleted]'}</span>
          }
          <i className="ri-checkbox-blank-circle-fill mx-1 text-xs" style={{fontSize: '0.5rem'}}></i> 
          { moment(post.createdAt).fromNow() }
        </div>

        <div className="post-detail-body mb-3">
          <div className="post-detail-body-title mb-2">
            <h3 className="text-xl font-bold">{post.title}</h3>
          </div>

          <div className="post-detail-body-content">
            { post.type === 'editor' ?
              <div 
                className="text-base forum-post-body-content" 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(draftToHtml(JSON.parse(post.content))) }} 
              /> :
              <div className="text-base forum-post-content">
                <MDEditor.Markdown source={post.content} />
              </div>
            }
          </div>
        </div>

        <div className="post-detail-footer mb-5 flex items-center">
          { currentUser.username ?
            <div className="mr-2 flex items-center">
              <i 
                className={`ri-rocket-2-line cursor-pointer text-xl z-10 ${hasUpvotedAlready ? 'text-theme-purple' : ''}`}
                onClick={handleUpvoteClick}
              ></i>
              {post.upvotes}
            </div> :
            <div>
              <Link to="/login" className="mr-2 flex items-center">
                <i 
                  className="ri-rocket-2-line cursor-pointer text-xl z-1}"
                ></i>
                {post.upvotes}
              </Link>
            </div>
          }

          { currentUser.username ?
            <div className="mr-4 flex items-center">
              <i 
                className={`ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10 ${hasDownvotedAlready ? 'text-theme-red' : ''}`}
                onClick={handleDownvoteClick}
              ></i>
              {post.downvotes}
            </div> :
            <Link to="/login" className="mr-4 flex items-center">
              <i 
                className="ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10"
              ></i> 
              {post.downvotes}
            </Link>
          }

          <div className="flex items-center cursor-pointer z-10">
            <i className="ri-chat-1-line mr-1 text-xl"></i>
            comments
          </div>
        </div>

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

        <div className="post-detail-comments"></div>

      </div>
    </div>
  );
}

export default PostDetail;