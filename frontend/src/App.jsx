import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AdminUsers from "./pages/AdminUsers";
import HomePage from "./pages/HomePage";
import CreateTaskpage from "./pages/CreateTaskpage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/createtask" element={<CreateTaskpage />} />
    </Routes>
  );
}

export default App;
