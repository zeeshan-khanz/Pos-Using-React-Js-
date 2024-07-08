import{
  browerRouter as Router,
  Routes,
  Route,
}from 'react-dom';
import Homepage from './pages/Homepage';
import POSpage from './pages/POSpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/pos" element={<POSpage/>}/>
      </Routes>
     
    </Router>
  );
}

export default App;
