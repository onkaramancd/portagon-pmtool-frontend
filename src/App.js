import {BrowserRouter as Router, Route} from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import "./styles/base.scss";

function App() {
  return (
      <Router>
        <Route exact path={"/"} component={LandingPage} />
      </Router>
  );
}

export default App;
