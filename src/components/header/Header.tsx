import NavBar from './NavBar';

import classes from './Header.module.css';

const Header: React.FC<{ onScrollToComments: () => void }> = (props) => {
  return (
    <header>
      <div className={classes['header-wrapper']}>
        <NavBar onScrollToComments={props.onScrollToComments} />
        <div className={classes.hello}>
          <h4>Hello!</h4>
          <h1>I am a <span>HRS</span> Pathan</h1>
          <h1>Creative UI/UX Designer</h1>
          <ol>
            <li>UI/UX Design</li>
            <li>Product Design</li>
            <li>Web Design</li>
            <li>Front-end Design</li>
          </ol>
        </div>
      </div>
    </header>
  );
};

export default Header;
