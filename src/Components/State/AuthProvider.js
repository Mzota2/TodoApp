import React from 'react';
import { todoContext } from './AuthContext';
import { createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import mobileLight from '../../images/bg-mobile-light.jpg';
import mobileDark from '../../images/bg-mobile-dark.jpg';

import desktopLight from '../../images/bg-desktop-light.jpg';
import desktopDark from '../../images/bg-desktop-dark.jpg';


function AuthProvider({children}) {
const [mode, setMode]  = React.useState('light');
const [tasks, setTasks] = React.useState([]);

const isMobile = useMediaQuery('max-width:375px');

  const theme = mode === 'light'?{
    primary:{
      main:'#ffff'
    },
    secondary:{
      main:'#00000',
      sub:'#B4B3B8',
      filter:'#8A8991',
      input:'#00000'
    },

    background:{
      main:'hsl(0, 0%, 98%)',
      image:isMobile?mobileLight:desktopLight
    }
  }:{
    primary:{
      main:'hsl(235, 24%, 19%)'
    },
    secondary:{
      main:'#CCCCCC',
      sub:'#57596E',
      filter:'hsl(234, 11%, 52%)',
      input:'#ffff'

    },

    background:{
      main:'hsl(235, 21%, 11%)',
      image:isMobile?mobileDark:desktopDark
    }
  }
  const appTheme = createTheme({
    palette:{
      mode:mode,
      ...theme}
    
  });

  function handleMode(mode){
    setMode(mode)
  }

  function handleTasks(work){
    setTasks(work)
  }

  React.useEffect(()=>{
    setTasks(JSON.parse(localStorage.getItem('todo-tasks')));
    console.log(tasks);
  }, [])

  return (
    <todoContext.Provider value={{appTheme, mode, setMode:handleMode, tasks, setTasks:handleTasks}}>
        {children}
    </todoContext.Provider>
  )
}

export default AuthProvider