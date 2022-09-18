import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { AuthContext, AuthContextProvider } from '../../context/AuthContext';
import { configureStore } from '../../store/hooks/auth-store';
import { useStore } from '../../store/hooks/store';
import AuthReduxProvider, { StoreState, toggle } from '../../store/redux/store';

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
  return (
    <button type='button' onClick={() => setAuth(auth => !auth)}>
      {auth ? '🔓' : '🔐'}
    </button>
  );
};

configureStore();
const LoginButtonWithHook = () => {
  const [state, dispatch] = useStore();
  const onClickHandler = () => {
    if (window.confirm(`Are you sure you want to ${state.auth ? 'logout' : 'login'}?`))
      dispatch('TOGGLE_AUTH');
  }
  return (
    <button type='button' onClick={onClickHandler}>
      {state.auth ? '💁‍♀️' : '🙅‍♀️'}
    </button>
  );
};


const LoginButtonWithRedux = () => {
  const auth = useSelector((state: StoreState) => state.authentication.auth);
  const dispatch = useDispatch();
  return (
    <button type='button' onClick={() => dispatch(toggle())}>
      {auth ? '✅' : '❌'}
    </button>
  );
};

const LoginButton = () => (
  <>
  <AuthContextProvider>
      <LoginButtonWithContext />
  </AuthContextProvider>
  <LoginButtonWithHook />
  <AuthReduxProvider>
      <LoginButtonWithRedux />
  </AuthReduxProvider>
  </>
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
