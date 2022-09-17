
import { forwardRef } from 'react';

import CommentsBrowser from './CommentsBrowser';
import AddComment from './AddComment';

import { useHttpRequest } from '../../hooks/UseHttpRequestHook';
import { CommentData } from '../../types';

import classes from './Comments.module.css';

const Comments = forwardRef<HTMLDivElement>((props, scrollToRef) => {
  const [comments, fetchComments] = useHttpRequest<CommentData>('comments');
  const refreshComments = () => {
    fetchComments(); // not enough time to propagate to api
                     // maybe add locally + timout to fetch
  }
  return (
    <>
      <div ref={scrollToRef} className={classes['browser-wrapper']}>
        <CommentsBrowser comments={comments} />
      </div>
      <div className={classes['add-comment-wrapper']}>
        <AddComment onAdded={refreshComments} />
      </div>
    </>
  );
});

export default Comments;
