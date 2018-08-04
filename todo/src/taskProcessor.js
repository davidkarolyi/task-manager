//a pure function
//accepts activeDays and dayItems
//returns an array of tasks to show in taskContainer
export default function(activeDays,dayItems){
    let activeDayTasks=[];
    const section=(a1,a2)=>{
       
        let alreadyExists=[];
        let resultUnfiltered=[...a1,...a2];
        let result=resultUnfiltered.filter(taskObject=>{
            const toAdd=alreadyExists.includes(taskObject.text)? null:taskObject;
            alreadyExists.push(taskObject.text);
            return toAdd===null? false:true;
        })
        
        return result;
    }
    activeDays.forEach(activeDay => {
        switch (activeDay) {
            case "mo":activeDayTasks.push(dayItems.itemsMo); break;
            case "tu":activeDayTasks.push(dayItems.itemsTu); break;
            case "we":activeDayTasks.push(dayItems.itemsWe); break;
            case "th":activeDayTasks.push(dayItems.itemsTh); break;
            case "fr":activeDayTasks.push(dayItems.itemsFr); break;
            default:break;
        }
    });

    if (activeDayTasks.length===0){
        return [];
    }else{
        let itemsToShow=activeDayTasks[0];
        for (let i = 1; i < activeDayTasks.length; i++) {
            itemsToShow=section(itemsToShow,activeDayTasks[i])
        }
        return itemsToShow;
    }

    

}