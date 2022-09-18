import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import Header from './components/header/Header';
import Comments from './components/comments/Comments';
import Footer from './components/Footer';
import React, { useEffect, useRef } from 'react';

import './App.css'
import { LoadingDots } from './components/Loading';

const Home = React.lazy(() => import('./pages/Home'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Services = React.lazy(() => import('./pages/Services'));

const LazyPage: React.FC<{ children: React.ReactElement }> = (props) => (
  <React.Suspense fallback={<LoadingDots />}>
    {props.children}
  </React.Suspense>
);

const Pages = () => {
  const location = useLocation();
  const pagesRef = useRef<HTMLDivElement>(null);
  const isFirstLoadRef = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }
    if (location.pathname.startsWith('/home'))
      return;
    pagesRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [location, pagesRef, isFirstLoadRef]);

  return (
    <div ref={pagesRef}>
      <Routes>
        <Route path='/home' element={<LazyPage><Home /></LazyPage>} />
        <Route path='/experience' element={<LazyPage><Experience /></LazyPage>} />
        <Route path='/services' element={<LazyPage><Services /></LazyPage>} />
        <Route path='/*' element={<Navigate to='/home' replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const scrollToRef = useRef<HTMLDivElement>(null);
  const onScrollToComments = () => {
    scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
      <>
      <BrowserRouter>
        <Header onScrollToComments={onScrollToComments} />
        <Pages />
      </BrowserRouter>
      <Comments ref={scrollToRef} />
      <Footer />
      </>
  );
};

export default App;
