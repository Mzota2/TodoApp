import { createContext, useContext } from "react";

export const todoContext = createContext({
    appTheme:{},
    mode:'light',
    setMode:()=>{
        
    },

    tasks:[],
    setTasks:()=>{}
});

export const useTodoContext = ()=> useContext(todoContext);
