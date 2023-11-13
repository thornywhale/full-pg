import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ToDoPage from "./pages/ToDoPage";
import UsersPage from "./pages/UsersPage";
import NavMenu from "./components/NavMenu";

const App = () => {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<ToDoPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
