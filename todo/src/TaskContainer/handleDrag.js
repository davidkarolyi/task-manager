export default class HandleDrag{
    console
    //Entry point
    static needToAnimate (children,draggedText){
        return Number(draggedText)==='' || children.length===1 ? [] : this._animationProcessor(children,draggedText);     
    }
    //Entry point
    static _animationProcessor(children,draggedText){//PRIVATE
        const modify=15;//document.getElementById(String(children[0].id)).getBoundingClientRect().height/2;
        let draggedChild=children.filter(child=>draggedText===child.text); //This is an object
        if(draggedChild.length===0){
           
            draggedChild=[''];
        }
        let itemToAnimate=[];
        // let maxY=Infinity;
        children.forEach(child => {
            if(child.y+modify>draggedChild[0].y && draggedChild[0].text!==child.text /* && child.y<maxY */){
                // maxY=child.y;
                itemToAnimate.push(child.text);
            }
        });
        return itemToAnimate;
    }

    static _preSort(children){//PRIVATE
        let yValues=children.map(child=>child.y);
        yValues.sort((a,b)=>a-b);
        let result=[];
        yValues.forEach(y=>{
            children.forEach(child=>{
                if(y===child.y){
                    result.push(child.text);
                }
            })
        })
        return result;
    }
    static Sort(children,listOfItems){////NEED TO REPAIR
        
        const sortedList=this._preSort(children)//[...new Set(this._preSort(children))];
       
        let result=[];
        sortedList.forEach(text=>{
            listOfItems.forEach(item=>{
                if(text===item.text){
                    result.push(item);
                }
            })
        })
        return result;
    }
    static sortApp(activeDays,currentState,orderedItems){
        if (activeDays.length!==1){
            return currentState;
        }
        const dictionary={"mo":"itemsMo",
                          "tu":"itemsTu",
                          "we":"itemsWe",
                          "th":"itemsTh",
                          "fr":"itemsFr"};
        const days=["mo","tu","we","th","fr"];
        let result={itemsMo:[],itemsTu:[],itemsWe:[],itemsTh:[],itemsFr:[]};
       days.forEach(dayName=>{
            if(activeDays.includes(dayName)){
                //NEED TO CHANGE
                const textInOrdered=currentState[dictionary[dayName]].map(task=>task.text);
                const tasksInBoth=[...new Set(orderedItems.filter(item=>textInOrdered.includes(item.text)))];
                
                let orderCounter=0;
                let newDay=[];
                currentState[dictionary[dayName]].forEach(taskObj=>{
                    tasksInBoth.forEach(taskInBoth=>{
                        if (taskInBoth.text===taskObj.text){
                            let toPush=currentState[dictionary[dayName]].filter(task=>task.text===tasksInBoth[orderCounter].text);
                            newDay.push(toPush[0]);
                            orderCounter++;
                        }    
                    })
                    
                })
                result[dictionary[dayName]]=newDay;
            }else{
                result[dictionary[dayName]]=currentState[dictionary[dayName]];
            }
       })
    //    result=this.newId(result);
    //valamiért 2-szer rakja bele
       return result;
    }
    static newId(state){
        let uniqueIndexer=1;
        const keys=["itemsMo","itemsTu","itemsWe","itemsTh","itemsFr"];
        let result={itemsMo:[],itemsTu:[],itemsWe:[],itemsTh:[],itemsFr:[]};
        state=this.collisionDetection(state,keys);
        keys.forEach(key=>{
            state[key].forEach(task=>{
                result[key].push({id:uniqueIndexer,text:task.text});
                uniqueIndexer++;
            })
        })
        return result;
    }
    static collisionDetection(state,keys){
        let result={itemsMo:[],itemsTu:[],itemsWe:[],itemsTh:[],itemsFr:[]};
        keys.forEach(key=>{
            const textValues=state[key].map(task=>task.text);
            if(this.hasDuplicates(textValues)){
                const texts=[...new Set(textValues)];
                const newDay=texts.map(text=>({id:0,text:text}));
                result[key]=newDay;
            }else{
                result[key]=state[key]
            }
        })
        return result;
    }
    static hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
}