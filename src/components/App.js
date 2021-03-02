import React, {useState} from "react";
import '../styles/App.css';
import Tasks from "./Tasks";
import UserList from "./UserList";

const App = () => {
  const [ show, setshow] = useState(true);

  return <>
    <button onClick={() => setshow(!show)}>{show ?'Desmontar':'Montar'} todo list</button>
    {show && <Tasks />}

  </>;
};

export default App;
