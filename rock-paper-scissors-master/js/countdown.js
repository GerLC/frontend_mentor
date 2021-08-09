function countdown( parent, callback ){
  
    function count(){
  
      if( paragraph ){
        
        paragraph.remove();
  
      }
  
      if( texts.length === 0 ){
        
        clearInterval( interval );
        callback();
        return;
  
      }
    
      let text = texts.shift();
    
      paragraph = document.createElement("p");
      paragraph.textContent = text;
      paragraph.className = text + " count";
  
      parent.appendChild( paragraph );
  
    }
    

    let texts = ['rock', 'paper', 'scissor'];
    
    let paragraph = null;
    
    let interval = setInterval( count, 1000 );
  
  }
  

//   countdown( document.getElementById("countdown"), function(){
    
//     // document.getElementById("countdown").remove();
//     document.getElementById("countdown").innerHTML =' a'
    
//   });

