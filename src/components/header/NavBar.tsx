import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext, AuthContextProvider } from '../../context/AuthContext';

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

const LoginButtonWithContext = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const onClickHandler = () => {
    if (window.confirm(`Are you sure you want to ${auth ? 'logout' : 'login'}?`))
      setAuth(auth => !auth)
  }
  return (
    <button type='button' onClick={onClickHandler}>
      {auth ? '🔓' : '🔐'}
    </button>
  )
};

const LoginButton = () => (
  <AuthContextProvider>
      <LoginButtonWithContext />
  </AuthContextProvider>
);

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
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
