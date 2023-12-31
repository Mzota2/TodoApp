import React from 'react'
import './TaskList.css';
import { Container , Typography, Box} from '@mui/material';
import { Close , Check} from '@mui/icons-material';
import { useTodoContext } from '../State/AuthContext';

function TaskList() {
    const {tasks, setTasks} = useTodoContext();
    const {appTheme} = useTodoContext();

    const [filterTasks, setFilterTasks] = React.useState();
    const [numLeft, setNumLeft] = React.useState();


    const [active, setActive] = React.useState('All');

    function handleActive(e){
        setActive(e.target.innerText);
    }

    function removeTask(index){
        const [removedTask] = tasks.slice().splice(index , 1);
        const remainingTasks = tasks.filter((task)=> task !== removedTask);
        console.log(remainingTasks);
        setTasks(remainingTasks);
        localStorage.setItem('todo-tasks', JSON.stringify(remainingTasks));
      }

    function completeTask(index){
        const foundTask = tasks.find((task)=> tasks.indexOf(task) === index);
        if(foundTask){
            foundTask.isCompleted = !foundTask.isCompleted;
            const result = [...tasks];
            result[index] = foundTask;
            setTasks(result);
            localStorage.setItem('todo-tasks', JSON.stringify(result));
        }
        
    }

    function handleClearCompleted(){
        const remainingItems = tasks.filter((task)=> task.isCompleted === false);
        setTasks(remainingItems);
        localStorage.setItem('todo-tasks', JSON.stringify(remainingItems))
    }

    function handleFilter(e){
        if(e.target.innerText === 'All'){
            setFilterTasks(prev=> tasks )
        }
        else if(e.target.innerText === 'Active'){
            const activeTodo = tasks?.filter((task)=> task.isCompleted === false)
            setFilterTasks(prev => activeTodo);
            
        }

        else if(e.target.innerText ==='Completed'){
            const completedTodo = tasks?.filter((task)=> task.isCompleted === true)
            setFilterTasks(prev => completedTodo)
        }
    }

    React.useEffect(()=>{
        setFilterTasks(tasks);
        setNumLeft((tasks?.filter(task => task.isCompleted === false))?.length)
    }, [tasks]);
     
  return (
    <Container className='app-container'>
        <div className="todo-tasks-list-container">
            {filterTasks?.map((task, index)=>{
                const {title, isCompleted} = task;
                return(
                    <Box key={index} bgcolor={appTheme?.palette?.primary?.main} className="todo-task-container">
                        
                        <div onClick={()=>completeTask(index)} style={{border:`1px solid ${appTheme?.palette?.secondary?.sub}`}} className={`${isCompleted?'completedTodo':""} todo-input-radio`}>
                            {isCompleted && <Check className='check-icon'/>}
                        </div>

                        <Typography style={{textDecoration:isCompleted?'line-through':""}} color={appTheme?.palette?.secondary?.main} className='todo-title' variant='p' component={'h4'}>{title}</Typography>
                        
                        <div onClick={()=> removeTask(index)} className='close-icon-container' >
                            <Close style={{color:appTheme?.palette?.secondary?.sub}} className='close-icon'/>
                        </div>
                    </Box>
                )
            })}
        </div>
       

        {tasks?.length?<Box bgcolor={appTheme?.palette?.primary?.main} className="tasks-list-options">
            <div className="list-options-left">
                <Typography color={appTheme?.palette?.secondary?.sub}  className='list-option' component={'p'}>{numLeft} items left</Typography>
            </div>

            <div className="list-options-middle list-options-middle-desktop">
                <Typography onClick={(e)=> {handleActive(e); handleFilter(e);} } color={appTheme?.palette?.secondary?.filter} className={`list-filter-option ${active ==='All'?'active-item':''}`} component={'p'}>All</Typography>
                <Typography onClick={(e)=> {handleActive(e); handleFilter(e);} } color={appTheme?.palette?.secondary?.filter} className={`list-filter-option ${active ==='Active'?'active-item':''}`} component={'p'}>Active</Typography>
                <Typography onClick={(e)=> {handleActive(e); handleFilter(e);} } color={appTheme?.palette?.secondary?.filter} className={`list-filter-option ${active ==='Completed'?'active-item':''}`} component={'p'}>Completed</Typography>
            </div>

            <div className="list-options-right">
                <Typography onClick={handleClearCompleted} color={appTheme?.palette?.secondary?.sub} className='list-option' component={'p'}>Clear Completed</Typography>
            </div>
        </Box>:<p style={{color:"white", textAlign:"center"}}>~~~Add New Tasks~~~</p>}
        {tasks?.length?<Box bgcolor={appTheme?.palette?.primary?.main} className="list-options-middle list-options-middle-mobile">
            <Typography onClick={(e)=> {handleActive(e); handleFilter(e);} }  color={appTheme?.palette?.secondary?.filter} className={`list-filter-option ${active ==='All'?'active-item':''}`} component={'p'}>All</Typography>
            <Typography onClick={(e)=> {handleActive(e); handleFilter(e);} }  color={appTheme?.palette?.secondary?.filter} className={`list-filter-option ${active ==='Active'?'active-item':''}`} component={'p'}>Active</Typography>
            <Typography onClick={(e)=> {handleActive(e); handleFilter(e);} }  color={appTheme?.palette?.secondary?.filter} className={`list-filter-option ${active ==='Completed'?'active-item':''}`} component={'p'}>Completed</Typography>
        </Box>:<></>}
        
    </Container>
  )
}

export default TaskList