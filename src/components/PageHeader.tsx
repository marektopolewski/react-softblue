import classes from './PageHeader.module.css';

type PageHeaderProps = {
  title: string
  subtitle: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => (
  <div className={classes.header}>
    <h3>{props.title}</h3>
    <h1>{props.subtitle}</h1>
  </div>
);

export default PageHeader;
