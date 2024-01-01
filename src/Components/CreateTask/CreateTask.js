import React from 'react'
import './CreateTask.css';
import { Container, TextField, Box } from '@mui/material';
import {Check} from '@mui/icons-material'
import { useTodoContext } from '../State/AuthContext';
function CreateTask() {
  const {appTheme, setTasks, tasks}= useTodoContext();

  const [task, setTask] = React.useState({
    title:'',
    isCompleted:false
  });

  function handleChange(e){
   
    setTask(prev =>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }
  
  const isCompleted = false;



  function handleSubmit(e){
    e.preventDefault();
    const localTasks = JSON.parse(localStorage.getItem('todo-tasks'));
    if(!localTasks && task.title){
      localStorage.setItem('todo-tasks', JSON.stringify([task]))
      setTasks([task]);
      setTask({ title:'',
      isCompleted:false});
    }
    else if(task.title && localTasks){
      localTasks.unshift(task);
      localStorage.setItem('todo-tasks', JSON.stringify(localTasks));

      setTasks(localTasks);
      setTask({ title:'',
      isCompleted:false});

    }

    console.log(tasks);
    
  }

  React.useEffect(()=>{ 
    console.log(tasks);
  }, [tasks])


  return (
    <Container className='app-container'>
      <form onSubmit={handleSubmit} >
        <Box bgcolor={appTheme?.palette?.primary?.main} className="todo-input-container">

          

            <div onClick={handleSubmit} style={{border:`1px solid ${appTheme?.palette?.secondary?.sub}`}} className={`${isCompleted?'completedTodo':""} todo-input-radio`}>
                  {task.title && <Check className='check-icon'/>}
            </div>

              <input style={{color:appTheme?.palette?.secondary?.input}} name='title' value={task?.title} onChange={handleChange} placeholder='Create a new todo...' type="text" className='todo-input-text' />
          
        
        </Box>
        </form>

    </Container>
  )
}

export default CreateTask