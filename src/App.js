import { Box , Container, Typography} from '@mui/material';
import {createTheme} from '@mui/material/styles'
import React from 'react';
import { useTodoContext } from './Components/State/AuthContext';
import Header from './Components/Header/Header';
import CreateTask from './Components/CreateTask/CreateTask';
import TaskList from './Components/TaskList/TaskList';
function App() {
  const {appTheme, tasks} = useTodoContext();
  

  return (
    <div className=''>
      <Box className="todo-top">
        <div className="app-background-image-container">
          <img className='app-background-image' src={appTheme?.palette?.background?.image} alt="background" />
        </div>
        
      </Box>
      <Box bgcolor={appTheme?.palette?.background?.main} className="todo-bottom"></Box>
      <div className="container">
        <Box className="todo-main-container">
          
          <Header/>
          <CreateTask/>
          <TaskList/>

        {tasks?.length? <Typography className='bottom-text' variant='p' component={'p'}>Drag and drop to reoder list</Typography>:<></>}

        </Box>
      </div>
      
      
    </div>
  );
}

export default App;
