import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RouterHistoryShift } from "./helpers/wrappers/rout_history_shift";
import {App} from './App';


ReactDOM.render(
    <BrowserRouter>
        <RouterHistoryShift>
            <App/>
        </RouterHistoryShift>
    </BrowserRouter>
    , document.getElementById('root'));

