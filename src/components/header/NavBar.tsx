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
      <NavLink className={linkState => `${classes.link} ${linkState.isActive ? classes['active-link'] : ''}`} to={url}>
        {props.to}
      </NavLink>
    </div>
  );
};

const CommentsButton: React.FC<{ onClicked: () => void }> = (props) => {
  const clickHandler = () => { props.onClicked(); };
  return (
    <div className={`${classes['link-wrapper']} ${classes['comment-link']}`}>
      <button type='button' className={classes.link} onClick={clickHandler}>Comments</button>
    </div>
  );
};

const NavBar: React.FC<{ onScrollToComments: () => void }> = (props) => {
  return (
    <nav>
      <div className={classes['navbar-wrapper']}>
        <div className={classes.navbar}>
          <Logo url={logo} />
          <Spacer />
          <NavLinkWrapper to='Home' />
          <NavLinkWrapper to='Services' />
          <NavLinkWrapper to='Experience' />
          <CommentsButton onClicked={props.onScrollToComments} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
