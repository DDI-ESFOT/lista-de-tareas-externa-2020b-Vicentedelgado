import React from 'react';
import {useState,useEffect} from 'react';
import '../styles/tasks.css';
import UserList from "./UserList";

const Tasks= () =>{
    const [ todos, setTodos ] = useState( [] );
    const [ darkMode, setdarkMode ] = useState( false );
    const [ error, setShowError ] = useState( false );
    const [ userData, setUserData ] = useState( null);
    const [ userId, setUserId ] = useState( 1);


    useEffect(() => {

        const getData = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const data = await response.json();
            console.log('data',data);
            setUserData(data);
        }
        getData();

        const getListTask = async () => {
            const answer= await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
            const tasks = await answer.json();
            console.log('Tareas',tasks);
            setTodos(tasks);
        }
        getListTask();

    }, [userId]);

    useEffect(()=>{
        console.log("useEffect: Se renderizó el compomente",todos.length);
        if (todos.length > 0){
            document.title = `${todos.length} tarea pendiente`;
        }else{
            document.title = `No tienes tareas pendientes`;
        }
    }, [todos]);

    useEffect(() => {
        console.log('cambio de fondo', darkMode);
        if(darkMode){
            console.log('DARK');
        }else{
            console.log('LIGHT');
        }

    },[darkMode]);

    ///botones anterior y siguiente usuario

    const anteriorUser = () => {
        if (userId > 1) {
            setUserId((prevState) => prevState - 1);
        }
    };

    const siguienteUser = () => {
        if (userId < 10) {
            setUserId((prevState) => prevState + 1);
        }
    };
    /////

    const handleDarkMode = () =>{
        setdarkMode(!darkMode);
    };

    const handleAddTask = () => {
        const task = document.querySelector( '#task' ).value;
        const nuevaTask ={
            userId: userId,
            id: todos[todos.length -1].id + 1,
            title:task,
            completed: false,
        };
        setTodos((prevState) =>{
            return [...prevState, nuevaTask];
        });
        document.querySelector("#task").value = "";
    };

    const handleDeleteTask = ( index ) => {
        setTodos( ( prevState ) => {
            return prevState.filter( ( task, i ) => i !== index );
        } );
    };

    const handleCompleteTask = ( index ) => {
        setTodos( ( prevState ) => {
           const ListHelp= [...prevState];
           ListHelp[index].completed =true;
           return ListHelp;
        });

    };


    const handChangeInput = (event) =>{
        console.log('e', event.target.value);
        if(event.target.value !== ""){
            setShowError(false);
        }else{
            setShowError(true);
        }
    };
    return (
        <>
            <button onClick={ () => setdarkMode(!darkMode)}>
                {
                    darkMode
                        ? 'Modo Claro'
                        : 'Modo Oscuro'
                }
            </button><br />
            <div className={darkMode ? 'dark-mode' : ''}>
                <button onClick={anteriorUser} disabled={userId <= 1}>
                    Anterior usuario
                </button>
                <button onClick={siguienteUser} disabled={userId >= 10}>
                    Siguiente usuario
                </button>
                {userData ? <UserList userData={userData} /> : null}
                <div >
                    <div>

                        <label htmlFor='task'>Tarea</label>
                        <input type='text' id='task' onChange={handChangeInput}/>
                        {error && <div className= 'error'>Ingrese el nombre de la tarea</div>}

                        <button onClick={ handleAddTask }>Agregar tarea</button>
                    </div>
                    <h1>Lista de tareas ({ todos.length } en total)</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Eliminar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.map( ( task, index ) => {
                            return (
                                <tr key={ task.id }>
                                    <td>{ task.title }</td>
                                    <td>
                                        {task.completed ?(
                                            <p className="completedTask">Completada</p>
                                        ):(
                                            <button className="marcaCompleted" onClick={() => handleCompleteTask(index)}>
                                                Marcar como completada
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={ () => handleDeleteTask( index ) }>Eliminar</button>
                                    </td>

                                </tr>
                            );
                        }) }
                        </tbody>
                    </table>
                </div>

            </div>

        </>
    );
};

export default Tasks;