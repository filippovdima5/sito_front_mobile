import {createEvent, createStore} from "effector";

// stores:
export const userInfo = createStore({
   sex_id: 1
});


export const $sexId  = userInfo.map(({sex_id}) => (sex_id));

// events:
export const setSexId = createEvent();


// on:
userInfo.on(setSexId, (state, payload) => ({...state, sex_id: payload}));

