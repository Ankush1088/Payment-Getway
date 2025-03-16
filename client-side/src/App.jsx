import "./App.css";
import Products from "./components/Products";
import PaymentsSuccess from "./components/PaymentsSuccess";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/PaymentSuccess" element={<PaymentsSuccess/>} />
      </Routes>
    </Router>
  );
}

export default App;
