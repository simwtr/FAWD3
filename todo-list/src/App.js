import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TodoListPage } from "./pages/TodoListPage";
import { TaskInfoPage } from "./pages/TaskInfoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/todos" element={<TodoListPage />} />
        <Route exact path="/todos/:id" element={<TaskInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
