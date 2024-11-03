import './App.css';
import './app.py';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Login from "./Login";
import CourseList from "./CourseList"


const Body = () =>{
  return(
      <body className="App-body">
        <div className="body-wrapper">

        </div>

      </body>
  )
}
const Header = () => {
    return (
        <header className="App-header">
            <div className="header-wrapper">
                <div className="nav">
                    <div className="nav-wrapper">
                        <Link to="/login">Login</Link>
                        <Link to="/courselist">Courses</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/courselist" element={<CourseList/>}/>
                </Routes>
                <Body/>
            </div>
        </Router>
    );

}


export default App;
