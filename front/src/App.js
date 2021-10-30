import About from './About';
import Contact from './Contact';
import Home from './Home';
import Projects from './Projects';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/contact" component={Contact} />
    </div>
  );
}

export default App;
