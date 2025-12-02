import "./App.css";
import Home from "../src/pages/Home/Home"
import Registration from "../src/pages/Registration/Registration"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "../src/pages/Users/Users"
import Registr from "../src/pages/Registr/Registr"
import Hikvision from "../src/pages/Hikvision/Hikvision"
import Payment from "../src/pages/Payment/Payment"
import Date from "../src/pages/Date/Date"
import Prices from "../src/pages/Prices/Prices"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/users" element={<Users />} />
        <Route path="/registr" element={<Registr />} />
        <Route path="/users" element={<Users />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/hikvision" element={<Hikvision />} />
        <Route path="/date" element={<Date />} />
        <Route path="/prices" element={<Prices />} />
      </Routes>
    </Router>
  );
}

export default App;
