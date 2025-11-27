import "./App.css";
import Home from "./assets/pages/Home/Home";
import Registration from "./assets/pages/Registration/Registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./assets/pages/Users/Users";
import Registr from "./assets/pages/Registr/Registr";
import Hikvision from "./assets/pages/Hikvision/Hikvision";
import Payment from "./assets/pages/Payment/Payment";
import Date from "./assets/pages/Date/Date";
import Prices from "./assets/pages/Prices/Prices";
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
