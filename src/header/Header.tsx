import NavBar from './NavBar';

import classes from './Header.module.css';

const Header: React.FC<{ onScrollToComments: () => void }> = (props) => {
  return (
    <header>
      <div className={classes['header-wrapper']}>
        <NavBar onScrollToComments={props.onScrollToComments} />
      </div>
    </header>
  );
};

export default Header;
