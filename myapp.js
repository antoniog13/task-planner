document.querySelector('#showFormButton').addEventListener('click', function (){
  let formClass = document.querySelector('form');
  if(formClass.className == "hide"){
    formClass.className = "";
  } else {
    formClass.className = "hide"
  }
    

  //use this when they submit the form/ create a new tasl
  //formclass.classList = "hide";
})

document.querySelector('#buttonAdd').addEventListener('click', function(){
  const formName = document.querySelector('#enterName').value;
  const inputAssignedTo = document.querySelector('#assignTo').value;
  const inputDescription = document.querySelector('#describeTask').value;
  const inputDate = document.querySelector('#enterDate').value;
  const inputStatus = document.querySelector('#statusInput').value;
  console.log(myTaskManager.allTasks);

  
  let allChecksPassed = validateForm(formName, inputAssignedTo, inputDescription, inputDate, inputStatus);
  if(allChecksPassed == true){
    createTaskObject(formName, inputAssignedTo, inputDescription, inputDate, inputStatus);
    let taskIndex = myTaskManager.allTasks.length-1;
    
    //test
    console.log(myTaskManager.allTasks[taskIndex]);
    myTaskManager.addTask(myTaskManager.allTasks[taskIndex])
}
})


document.addEventListener('click', function(event){
    const isButton = (event.target.nodeName == 'BUTTON');
    if(isButton) {
        const element = event.target;
        myTaskManager.deleteTask(element);
    }  

})

function createTaskObject(formName, inputAssignedTo, inputDescription, inputDate, inputStatus){

    let taskID = 0;
    if(myTaskManager.allTasks.length < 1) {
        taskID = 1;
    } else {
        taskID = (myTaskManager.allTasks.length + 1)
    }

    myTaskManager.allTasks.push({
       "Name": formName,
       "AssignedTo": inputAssignedTo,
       "Description": inputDescription,
       "Due Date": inputDate,
       "Status": inputStatus,
       "ID": taskID
       
    })

    console.log(myTaskManager.allTasks);

}


function validateForm(formName, inputAssignedTo, inputDescription, inputDate, inputStatus) {
    //return of this is the answer to 'is the info valid format?'
    let isAllValid = false;

    if((formName.length >= 3) && (inputAssignedTo.length >= 3) && (inputDescription.length >=10) && (inputDate) && (inputStatus != 'Choose...')){
        isAllValid =true;
    }

    return isAllValid;  
}





//     localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
//     return myTaskManager.allTasks ;
// }



class TaskManager {
    constructor(name){
        this.allTasks = [];
        this.name = name;
    }

    getAllTasks(){
        console.log(this.allTasks);


    }


    addTask(taskObj){



        let cardHTML =   `<div class="col-md-4" taskID="${taskObj.ID}">
                        <div class="card cardStyle">
                            <div class="card-header">
                                Task
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Name: ${taskObj.Name} </li>
                                <li class="list-group-item">Assigned To: ${taskObj.AssignedTo} </li>
                                <li class="list-group-item">Due Date: ${taskObj.Date} </li>
                                <li class="list-group-item">Description : ${taskObj.Descripion} </li>
                                <li class="list-group-item">Status: ${taskObj.Status} </li>
                            </ul>
                            <button type="button" class="btn btn-dark" job="delete" deleteID="${taskObj.ID}">Delete</button>
                        </div>
                    </div>`

        let cardsHTMLrow = document.querySelector('#cardsArea');
        cardsHTMLrow.innerHTML += cardHTML;



        let listHTML = ` <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" taskID="${taskObj.ID}">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Assigned To: ${taskObj.AssignedTo} </h5>
                            <small>Due Date: ${taskObj.Date} </small>
                        </div>
                        <small>Status: ${taskObj.Status}</small>
                        </a>`

        let listHTMLrow = document.querySelector('#listTasks');
        listHTMLrow.innerHTML += listHTML;          

    }

    deleteTask(element){
            
    //this removes the item from the array perm

    let thistaskID  = this.updateArray(element);


    //removes card 
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)

    //removes task
    let elementsA = document.querySelectorAll('a');
    for(let i=0; i < elementsA.length; i++){
        element = elementsA[i];
        if(element.attributes.taskID.value == thistaskID){
            element.parentNode.removeChild(element);
        }
    }

    }

    

    updateArray(element){
        let thistaskID = element.parentNode.parentNode.attributes.taskID.value;
        for(let i=0; i < this.allTasks.length; i++){
            if(this.allTasks[i].ID == thistaskID){
                this.allTasks.splice(i,1);
                localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
            }
        }
        return thistaskID;
    }

    updateTask(){

    }
}



let myTaskManager = new TaskManager("TaskyMcTask");


//this gets the data back from local storage
let dataReturned = localStorage.getItem("taskArray");

if(dataReturned){
    myTaskManager.allTasks = JSON.parse(dataReturned);
    populatePage(myTaskManager.allTasks)
} else {
    myTaskManager.allTasks = [];
}


function populatePage(array){
    for(let i=0; i < array.length; i++){
        myTaskManager.addTask(array[i]);
    }
}

