
import logo from './logo.svg';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Header from './Component/Header';
import DisplayQuiz from './Component/DisplayQuiz';
import Quiz from './Component/Quiz';
import Quizdata from './Component/Quizdata';



function App() {
  return (
    <div className="App">
           <BrowserRouter>
         <Header/>
          <Routes>
                 
                  <Route path="/" element={<DisplayQuiz />} />
                  <Route path="/quizdata" element={<Quizdata/>} />
                  <Route path="/quiz/:id" element={<Quiz />} />
                  
                
                  
                  
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
