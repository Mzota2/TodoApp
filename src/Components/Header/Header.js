import React from 'react'
import './Header.css';
import { Typography } from '@mui/material';
import {DarkMode, LightMode} from '@mui/icons-material'
import { useTodoContext } from '../State/AuthContext';

function Header() {
    const {mode, appTheme, setMode} = useTodoContext();
     
    function handleToggleMode(){
      setMode(prev =>{
        if(prev ==='light'){
          return 'dark';
        }
        else{
          return 'light';
        }
      })
    }
  return (
    <header className='app-header'> 
        <Typography className='app-logo' component={'h1'} variant='h1'>TODO</Typography>
        
        <div onClick={handleToggleMode} className="mode-icon-container">
          {mode === 'light'? <DarkMode className='mode-icon'/>:<LightMode className='mode-icon'/>}
        </div>
        
        
    </header>
  )
}

export default Header