const stl1 = document.querySelectorAll("span");
try {
    for(classes of stl1){
        
     if( classes.className.match(/..*Status/g)){
    
         classes.parentElement.style=`background-color: teal;
         color: white;`;
        // console.log(classes);
     };
       
      
    }
} catch (error) {
    console.log(error);
}
try {
  let stl2 =  document.querySelectorAll(".linkidentifiercontainer>table>tbody>tr");
  for(node of stl2){
    node.firstElementChild.style=`background-color: teal;
    color: white;`;
  }
  

    
} catch (error) {
    console.log(error);
}

const stl3 = document.querySelectorAll("div");
try {
    for(divs of stl3){
        
     if( divs.className.match(/..*container/g)){
    
         divs.style.height="100vh";
       
        // console.log(classes);
     };
       
      
    }
} catch (error) {
    console.log(error);
}