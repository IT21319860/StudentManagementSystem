import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Loggin'
import Navbar from './components/Navbar'





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">

          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login"
              element={<Login />}
            />
            <Route 
              path="/signup"
              element={<Signup />}
            />
            
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
