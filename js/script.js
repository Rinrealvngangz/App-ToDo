//varible
const inputval=document.getElementById("add-note");
const add = document.getElementById("icon-add");
const list=document.getElementById("list");
const reload=document.querySelector("#clear");
//global varible
let LIST;
let id ;
let data = localStorage.getItem("TODO");


/**
 * kiem tra data if data thi chuyen doi du lieu vao JSON 
 * LIST is array
 * else data empty LIST[],id=0;
 */

if(data){
   LIST = JSON.parse(data);
    id=LIST.length;
   localList(LIST);
 }
 else{  
   LIST=[];
   id=0;
}
//local UI view
 function localList(array){
      array.forEach((item)=>{
             addnote(item.name,item.id,item.trash);
   });
 }

 reload.addEventListener('click',()=>{
   localStorage.clear();
    location.reload();
    
 })

//function add-todo
function addnote(Do,id,trash){
   if(trash){return;};
const markup =`<li class="noidung"> 
<p class="text" job="Do">${Do} <i class="fas fa-trash icon" job="delete" class="del" id="${id}"></i></p>
`;

   list.insertAdjacentHTML("beforeend",markup);

}
//function remove
function removeElement(el){ 
   /**lấy thành phần ông nội của 
     cha el đc chọn và xóa thành phần cha 
     */
     el.parentNode.parentNode.removeChild(el.parentNode); 
     // update obj sau khi xóa 
     LIST[el.id].trash=true; 
}
  //function toDo Something 
function toDo(todo){
   if(todo){
      addnote(todo,id,false);
      LIST.push({
         name:todo,
         id:id,
         trash:false
      });   
    
   };
   inputval.value="";
   
//them tat ca item vao trong localStorage,add tat ca item vao trong array 
  localStorage.setItem("TODO",JSON.stringify(LIST));

     id++;
}
// sử lý  click button
 add.addEventListener('click',input=>{
      input = inputval.value;
      toDo(input);

 })
 // sử lý key press enter
document.addEventListener('keyup',(event)=>{
   let input =inputval.value;  
    if(event.keyCode=="13"){
      toDo(input);
    }
})
  

//xóa element khi click icon-trash
list.addEventListener('click',(event)=>{
   const element=event.target; //lấy element của sự kiện mà chúng ta chọn  
    const elementTrash= element.attributes.job.value;// lấy thuộc tính có giá trị "delete"
    if(elementTrash=="delete"){
        // nếu là value có job ="delete" thì gọi function remove sau đó chuyền vào element đc chọn
       removeElement(element);
  }
  
//them tat ca item vao trong localStorage,add tat ca item vao trong array 
     localStorage.setItem("TODO",JSON.stringify(LIST));

  return;
})
