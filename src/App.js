
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import QuizCreationPage from './Pages/QuizCreationPage/QuizCreationPage';
import SignupPage from './Pages/SignupPage/SignupPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/create-quiz' element={<QuizCreationPage/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
