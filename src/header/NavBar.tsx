import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

import logo from './imgs/logo.png';

const Logo: React.FC<{ url: string }> = (props) => (
  <div className={classes.logo}>
    <img src={props.url} alt='logo' />
  </div>
);

const Spacer = () => <div className={classes.spacer}></div>;

const NavLinkWrapper: React.FC<{ to: string }> = (props) => {
  const url = '/' + props.to.toLocaleLowerCase();
  return (
    <div className={classes['link-wrapper']}>
      <NavLink className={linkState => `${classes.link} ${linkState.isActive ? classes.activeLink : ''}`} to={url}>
        {props.to}
      </NavLink>
    </div>
  );
};

const CommentsButton = () => {
  const clickHandler = () => alert('comments clicked');
  return (
    <div className={classes['link-wrapper']}>
      <button className={classes.link} onClick={clickHandler}>Comments</button>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav>
      <div className={classes['navbar-wrapper']}>
        <div className={classes.navbar}>
          <Logo url={logo} />
          <Spacer />
          <NavLinkWrapper to='Home' />
          <NavLinkWrapper to='Services' />
          <NavLinkWrapper to='Experience' />
          <CommentsButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
