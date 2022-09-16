import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Header from './header/Header';
import Experience from './pages/Experience';
import Home from './pages/Home';
import Services from './pages/Services';
import Comments from './comments/Comments';
import Footer from './components/Footer';
import { useRef } from 'react';

import './App.css'

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
          <Route path='/home' element={<Home />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/services' element={<Services />} />
          <Route path='/*' element={<Navigate to='/home' replace />} />
        </Routes>
      </BrowserRouter>
      <Comments ref={scrollToRef} />
      <Footer />
      </>
  );
};

export default App;
