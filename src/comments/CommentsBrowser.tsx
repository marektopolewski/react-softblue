import { useState } from 'react';

import PageWrapper from '../components/PageWrapper';
import Loading from '../components/Loading';
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

type SortOrder = (-1 | 1);
const compareStringDates = (dateString1: string, dateString2: string, order: SortOrder): number => {
  if (dateString1 && dateString2)
    return (new Date(dateString1).getTime() - new Date(dateString2).getTime()) * order;

  // move missing dates at the end
  if (!dateString1 || dateString1 === '')
    return 1;
  return -1;
};

type CommentsItemProps = {
  id: string,
  name: string,
  email: string,
  content: string,
  createdAt: string,
};

const Comment = (item: CommentsItemProps) => (
  <div className={classes.comment}>
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
);

const CommentsBrowser = () => {
  const [comments,] = useHttpRequest<CommentsItemProps>('comments');
  const [sortOrder, setSortOrder] = useState<SortOrder>(-1);

  const onOldestClickHanlder = () => { setSortOrder(1); };
  const onNewestClickHanlder = () => { setSortOrder(-1); };

  const [page, setPage] = useState<number>(1);
  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <PageWrapper className={classes.wrapper}>

      <div className={classes.header}>
        <h2>Comments</h2>
        <div className={classes.sort}>
          <button type='button' className={sortOrder === 1 ? classes['active-sort'] : ''} onClick={onOldestClickHanlder}>
            oldest
          </button>
          <h4>|</h4>
          <button type='button' className={sortOrder === -1 ? classes['active-sort'] : ''} onClick={onNewestClickHanlder}>
            newest
          </button>
        </div>
      </div>

      <Loading what='comments' data={comments}>
        { 
          comments && comments
            .sort((c1, c2) => compareStringDates(c1.createdAt, c2.createdAt, sortOrder))
            .slice((page - 1) * NUM_OF_COMMENTS, page * NUM_OF_COMMENTS)
            .map(item => <Comment key={item.id} {...item} />)
        }
      </Loading>

      <Loading what='comments pages' data={comments}>
        <CommentsBrowserPager
          currentPage={page}
          maxPages={Math.ceil((comments?.length ?? 0) / NUM_OF_COMMENTS)}
          onPageRequested={changePage}
        />
      </Loading>

    </PageWrapper>
  );
};

export default CommentsBrowser;
