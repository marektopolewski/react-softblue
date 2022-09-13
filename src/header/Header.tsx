import NavBar from './NavBar';

import classes from './Header.module.css';

const Header = () => {
  return (
    <header>
      <div className={classes['header-wrapper']}>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
