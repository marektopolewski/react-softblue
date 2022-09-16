import CommentsBrowser from './CommentsBrowser';
import AddComment from './AddComment';

import classes from './Comments.module.css';
import { forwardRef } from 'react';

const Comments = forwardRef<HTMLDivElement>((props, scrollToRef) => {
  return (
    <>
      <div ref={scrollToRef} className={classes['browser-wrapper']}>
        <CommentsBrowser />
      </div>
      <div className={classes['add-comment-wrapper']}>
        <AddComment />
      </div>
    </>
  );
});

export default Comments;
