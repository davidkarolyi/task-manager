export default class StorageManager{
    static reFreshStorge=   newState=>window.localStorage.setItem('Tasks',JSON.stringify(newState));
    static clearStorage=    ()=>window.localStorage.removeItem('Tasks');
    static isStorageExists= ()=>window.localStorage.getItem('Tasks') ? true:false;
    static readStorage=     ()=>{
        const storedState=JSON.parse(window.localStorage.getItem('Tasks'));
        return (StorageManager.regenerateIds(storedState));
    }

    //Assests of Main.js
    static regenerateIds(storedState){ 
        let uniqueIndexer=1;
        const keys=["itemsMo","itemsTu","itemsWe","itemsTh","itemsFr"];
        let result={itemsMo:[],itemsTu:[],itemsWe:[],itemsTh:[],itemsFr:[]};
        keys.forEach(key=>{
            storedState[key].forEach(task=>{
                result[key].push({id:uniqueIndexer,text:task.text});
                uniqueIndexer++;
            })
        })
        return {dayItems:result,maxId:uniqueIndexer};      
    }

}