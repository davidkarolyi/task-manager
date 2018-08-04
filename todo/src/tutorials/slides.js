import GIF0 from './selectDays.gif';
import GIF1 from './addTask.gif';
import GIF2 from './sortItems.gif';
import GIF3 from './deleteItems.gif';
import React from 'react';
class Slide{
    static slide_0=(onClick)=>{
        return(
            <div id="tutorial">    
                <a className="1nextButton" id="nextButton" onClick={onClick} >Got it,show next</a>
                <div id="explainingText">
                    <h1>Select Days</h1>
                    <p>
                        You can select days, if you simply <span style={{color:"green",fontWeight:"bold"}}>click on them, click again to deselect.</span>
                    </p>
                </div>
                <img id="gif" src={GIF0} alt="Illustration" width="600px"/>
            </div>
        )    
    }

    static slide_1=(onClick)=>{
        return(
            <div id="tutorial">    
                <a className="2nextButton" onClick={onClick} id="nextButton">Got it,show next</a>
                <div id="explainingText">
                    <h1>Adding Tasks</h1>
                    <p>
                        If you selected at least 1 day, you can add tasks to them.<br/>
                        Type something in the textfield and <span style={{color:"green",fontWeight:"bold"}}>hit ENTER or press the + BUTTON</span><br/>
                        You can add a task to multiple days at the same time.
                    </p>
                </div>
                <img id="gif" src={GIF1} alt="Illustration" width="600px"/>
            </div>
        )    
    }

    static slide_2=(onClick)=>{
        return(
            <div id="tutorial">    
                <a className="3nextButton" onClick={onClick} id="nextButton">Got it,show next</a>
                <div id="explainingText">
                    <h1>Sort Items</h1>
                    <p>
                        If you selected only 1 day, you can change the order of the tasks,<br/>
                        by <span style={{color:"green",fontWeight:"bold"}}>dragging</span> a task and changing it's position
                    </p>
                </div>
                <img id="gif" src={GIF2} alt="Illustration" width="600px"/>
            </div>
        )    
    }

    static slide_3=(onClick)=>{
        return(
            <div id="tutorial">    
                <a className="4nextButton" onClick={onClick} id="nextButton">Let's plan my week</a>
                <div id="explainingText">
                    <h1>Delete Items</h1>
                    <p>You can delete tasks, if you<span style={{color:"green",fontWeight:"bold"}}> double click</span> on them.<br/>
                    You can delete a task from multiple days at the same time.
                    </p>
                </div>
                <img id="gif" src={GIF3} alt="Illustration" width="600px"/>
            </div>
        )    
    }
}

export default Slide;