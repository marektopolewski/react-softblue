import CommentsBrowser from './CommentsBrowser';
import AddComment from './AddComment';

import classes from './Comments.module.css';

const Comments = () => (
  <div className={classes.wrapper}>
    <CommentsBrowser />
    <AddComment />
  </div>
);

export default Comments;
