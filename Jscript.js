const input= document.getElementById('myInput');
const addBtn= document.getElementById('Add-btn');
const list = document.getElementById('myURL');

// try to load saved todos from localStroage(if any)
const saved=localStorage.getItem('todos')
const todos = saved? JSON.parse(saved) :[];


function saveTodos(){
    //save current todos arry to localstorage
    localStorage.setItem('todos',JSON.stringify(todos));
}
// create a dom node for a todo object and append it to tthe list

function createdNode(todo,index){
  const li=document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type='checkbox';
  checkbox.checked= !!todo.completed;
  checkbox.addEventListener("change",()=>{
    // ToDo:visual feedback: strike-throuth when completed 
saveTodos();
  })
  //text of the todo
  const textSpan=document.createElement("span")
  textSpan.textContent= todo.text;
  textSpan.style.margin ='0 8px'
  if(todo.completed){
    textSpan.style.textDecoration='line-through';
  }
    //Add dblclickk event listener to edit
    textSpan.addEventListener('dblclick',()=>{
        const newText = prompt("Edit todo", todo.text);
        if(newText!== null){
            todo.text=newText.trim()
            textSpan.textContent=todo.text;
            saveTodos(); 
        }
    })
  
  // Delete Todo button
  const delbtn= document.createElement('button');
  delbtn.textContent='delete';
  delbtn.addEventListener('click',()=>{
    todos.splice(index,1);
    render();
    saveTodos();
  })

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.append(delbtn)
  return li;
}
//rander the wholw todo list from todos aray
function render(){
    list.innerHTML='';

    //recreate each item
    todos.forEach((todo, index) => {
        const node=createdNode(todo,index);
        console.log(node);
        list.appendChild(node,todo);
    });
}
function addTodo(){
    const text= input.value.trim();
    if(!text){
        return
    }
    //push a new todo object
    todos.push({text,completed:false});
    input.value='';
    render()
    saveTodos();
}
addBtn.addEventListener("click",addTodo);
render();