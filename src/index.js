import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RouterHistoryShift } from "./helpers/wrappers/rout_history_shift";
import { ShiftHistoryInStore } from "./helpers/components/shift-history-in-store";
import {App} from './App';


ReactDOM.render(
    <BrowserRouter>
        <RouterHistoryShift>
            <ShiftHistoryInStore/>
            <App/>
        </RouterHistoryShift>
    </BrowserRouter>
    , document.getElementById('root'));

