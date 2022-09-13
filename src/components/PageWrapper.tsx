import classes from './PageWrapper.module.css';

type PageWrapperProps = {
  className?: string
  children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = (props) => (
  <div className={`${classes.wrapper} ${props.className}`}>
    {props.children}
  </div>
);

export default PageWrapper;
