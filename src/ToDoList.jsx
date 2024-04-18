import { useState, useEffect } from "react";

function ToDoList(){
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('todolist')) || []);
    const [newTask,setnewTask] = useState(" ");

    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(tasks));
        // console.log('useEffect');
    }, [tasks]);

    function inputChange(event){
        setnewTask(event.target.value);
    }
    
    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setnewTask("");
        }
    }

    function delTasks(index){
        console.log(`deleteTast, ${index}`);
        const upTasks=tasks.filter((element,i) => i !== index);
        setTasks(upTasks);
        console.log(upTasks);
    }
    
    function movTaskup(index){
        console.log(`deleteTast, ${index}`);
        if(index > 0){
            const upTasks=[...tasks];
            [upTasks[index],upTasks[index-1]] = [upTasks[index-1],upTasks[index]];
            setTasks(upTasks);
        }
    }
    
    function movTaskdown(index){
        console.log(`deleteTast, ${index}`);
        if(index < tasks.length -1 ){
            const upTasks=[...tasks];
            [upTasks[index],upTasks[index+1]] = [upTasks[index+1],upTasks[index]];
            setTasks(upTasks);
        }
    }

    return(
        <>
          <div className="to-do-list">
            
            <h1>To-Do_list</h1>
            <div>
                <form onSubmit={() => {addTask()}}>
                    <input type="text" placeholder="Enter a task" value={newTask} onChange={inputChange}/>
                    <button type="submit" className="add-button">
                        Add
                    </button>
                </form>
            </div>

            <ol>
                {tasks.map((task,index)=>
                   <li key={index}>
                    <span className="text">{task}</span>
                    <button className="delete-button" onClick={ () => delTasks(index) }>
                        Delete
                    </button>
                    <button className="move-button" onClick={ () => movTaskup(index) }>
                        Up
                    </button>
                    <button className="move-button" onClick={ () => movTaskdown(index) }>
                        Down
                    </button>
                   </li>
            )}
            </ol>

          </div>
        </>
    );

}

export default ToDoList