import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import Homepage from "./pages/Homepage";
import { ProtectRoute } from "./components/protectedRoute/ProtectedRoute";
import FavoritePage from "./pages/FavoritePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AuthenticationPage />} />
        <Route
          path="/home"
          element={
            <ProtectRoute>
              <Homepage />
            </ProtectRoute>
          }
        />
        <Route
          path="/interest"
          element={
            <ProtectRoute>
              <FavoritePage />
            </ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
