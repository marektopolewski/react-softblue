import classes from './PageWrapper.module.css';

const PageWrapper: React.FC<{ children: React.ReactNode }> = (props) => (
  <div className={classes.wrapper}>
    {props.children}
  </div>
);

export default PageWrapper;
