import classes from './CommentsBrowser.module.css';

type CommentsBrowserPagerProps = {
  currentPage: number
  maxPages: number
  onPageRequested: (page: number) => void
};

const CommentsBrowserPager: React.FC<CommentsBrowserPagerProps> = (props) => {
  const { currentPage, maxPages, onPageRequested } = props;
  let pagesToList: number[] = [];
  if (currentPage === 1)
    pagesToList = [1, 2, 3];
  else if (currentPage === maxPages)
    pagesToList = [maxPages - 2, maxPages - 1, maxPages];
  else
    pagesToList = [currentPage - 1, currentPage, currentPage + 1];
  pagesToList = pagesToList.filter(p => p > 0 && p <= maxPages);

  return (
    <div className={classes.pages}>
      {
        pagesToList.map(page => (
          <button
            key={page}
            type='button'
            className={page === currentPage ? classes['active-page'] : ''}
            onClick={() => { onPageRequested(page); }}
          >
            <p>{page}</p>
          </button>
        ))
      }
      <p>...</p>
      <p>{props.maxPages}</p>
    </div>
    
  );
};

export default CommentsBrowserPager;