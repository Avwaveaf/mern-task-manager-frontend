import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from "./components/TaskList/TaskList";

export const URL = process.env.REACT_APP_BACKEND_URL;

function App() {

  return (
    <div className="app">
      <TaskList />
      <ToastContainer/>
    </div>
  );
}

export default App;
