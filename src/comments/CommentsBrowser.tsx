import { useState } from 'react';

import PageWrapper from '../components/PageWrapper';
import CommentsBrowserPager from './CommentsBrowserPager';

import useHttpRequest from '../hooks/UseHttpRequestHook';

import classes from './CommentsBrowser.module.css';

const NUM_OF_COMMENTS = 4;

const toLocaleDateString = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  return (new Date(dateString)).toLocaleDateString('en-US', options);
}

type CommentsItemProps = {
  id: string,
  name: string,
  email: string,
  content: string,
  createdAt: string,
};

const CommentsBrowser = () => {
  const [comments,] = useHttpRequest<CommentsItemProps>('comments');
  const onOldestClickHanlder = () => { alert('sort by oldest') };
  const onNewestClickHanlder = () => { alert('sort by newest') };

  const [page, setPage] = useState<number>(1);
  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  if (!comments || comments.length === 0)
    return (
      <PageWrapper className={classes.wrapper}>
        <p>Loading...</p>
      </PageWrapper>
    );

  return (
    <PageWrapper className={classes.wrapper}>

      <div className={classes.header}>
        <h2>Comments</h2>
        <div className={classes.sort}>
          <button onClick={onOldestClickHanlder}>oldest</button>
          <h4>|</h4>
          <button onClick={onNewestClickHanlder}>newest</button>
        </div>
      </div>

      {
        comments
          .slice((page - 1) * NUM_OF_COMMENTS, page * NUM_OF_COMMENTS)
          .map(item => (
            <div key={item.id} className={classes.comment}>
              <h5>{toLocaleDateString(item.createdAt)}</h5>
              {
                item.name
                  ? <h3>{item.name} {item.email}</h3>
                  : <h3><i>Anonymous</i> {item.email}</h3>
              }
              {
                item.content
                  ? <p>{item.content}</p>
                  : <p><i>empty message</i></p>
              }
            </div>
          ))
      }

      <CommentsBrowserPager
        currentPage={page}
        maxPages={Math.floor(comments.length / NUM_OF_COMMENTS)}
        onPageRequested={changePage}
      />

    </PageWrapper>
  );
};

export default CommentsBrowser;
