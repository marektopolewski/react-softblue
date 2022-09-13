import CommentsBrowser from './CommentsBrowser';
import AddComment from './AddComment';

import classes from './Comments.module.css';
import { forwardRef } from 'react';

const Comments = forwardRef<HTMLDivElement>((props, scrollToRef) => {
  return (
    <div ref={scrollToRef} className={classes.wrapper}>
      <CommentsBrowser />
      <AddComment />
    </div>
  );
});

export default Comments;
