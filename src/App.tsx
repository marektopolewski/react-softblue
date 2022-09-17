import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Header from './components/header/Header';
import Comments from './components/comments/Comments';
import Footer from './components/Footer';
import React, { useRef } from 'react';

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

const App = () => {
  const scrollToRef = useRef<HTMLDivElement>(null);
  const onScrollToComments = () => {
    scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
      <>
      <BrowserRouter>
        <Header onScrollToComments={onScrollToComments} />
        <Routes>
          <Route path='/home' element={<LazyPage><Home /></LazyPage>} />
          <Route path='/experience' element={<LazyPage><Experience /></LazyPage>} />
          <Route path='/services' element={<LazyPage><Services /></LazyPage>} />
          <Route path='/*' element={<Navigate to='/home' replace />} />
        </Routes>
      </BrowserRouter>
      <Comments ref={scrollToRef} />
      <Footer />
      </>
  );
};

export default App;
