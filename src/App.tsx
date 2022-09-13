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

const App = () => {
  return (
      <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/services' element={<Services />} />
          <Route path='/*' element={<Navigate to='/home' replace />} />
        </Routes>
      </BrowserRouter>
      <Comments/>
      <Footer/>
      </>
  );
};

export default App;
