import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {App} from './App';



const GenderContext = React.createContext(0);


ReactDOM.render(
    <BrowserRouter>
        <GenderContext.Provider value = {+localStorage.getItem('sex')}>
            <App/>
        </GenderContext.Provider>
    </BrowserRouter>
    , document.getElementById('root'));

