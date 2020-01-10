import {openedFilter} from "../filterListStore";
import {maxItemsInFilter} from "./Filter";


const listData = openedFilter.map((({listData}) => {
    if (listData.length > maxItemsInFilter) return listData.slice(0, maxItemsInFilter);
    else return listData
}));

listData.watch(state => {console.log(state)})