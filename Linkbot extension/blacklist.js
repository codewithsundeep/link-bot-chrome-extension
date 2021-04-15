chrome.storage.local.get("brokenBlacklisted",e=>{
  
    if(e.brokenBlacklisted==undefined||e.brokenBlacklisted.length==0){
      chrome.storage.local.set({brokenBlacklisted:["https://googleads.com"]});
    }
  });

function main() {




    chrome.storage.local.get("brokenBlacklisted", data => {
        try {
            document.querySelector(".brokenButton").addEventListener("click", () => {

                //send url to storage
                const x = document.querySelector(".brokenUrl").value;
                if (x !== " " && x.match(/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i)) {
                    if (data.brokenBlacklisted !== undefined) {
                        const y = data.brokenBlacklisted;
                        const z = y.length;
                        const za = y[z] = x;
                        chrome.storage.local.set({ brokenBlacklisted: y });
                        location.reload();
                        console.log("success1")
                    }
                    else {
                        chrome.storage.local.set({ brokenBlacklisted: [x] });
                        location.reload();
                        console.log("success");
                    }
                }
                else {
                    alert("please enter a valid url");
                }

            });
            //close url sending


        } catch (error) {

        }
        if (data.brokenBlacklisted !== undefined) {
            for (var i = 0; i < data.brokenBlacklisted.length; i++) {
                const tr1 = document.createElement("tr");
                tr1.className = "tr" + [i];
                document.querySelector(".btable").append(tr1);

                const tr2 = document.createElement("td");
                tr2.className = "td" + [i];
                tr2.innerHTML = data.brokenBlacklisted[i];
                document.querySelector(`.tr${i}`).append(tr2);
                const btn1 = document.createElement("td");
                btn1.className = "span tdd"+[i];
                btn1.innerHTML = "Remove";
                document.querySelector(`.tr${i}`).append(btn1);
            


            }
         const dd1 =   document.querySelectorAll(".span");
         for(items of dd1){
             items.addEventListener("click",(e)=>{
                 const dd2 = e.target.className.match(/tdd[0-9]$/g);
                 dd3 = dd2[0].replace("tdd","");

                 const sdt1 = data.brokenBlacklisted;
                 sdt2 = sdt1[dd3]=null;
                 sdt3 = sdt1.filter(val=>val!==null);
                 chrome.storage.local.set({brokenBlacklisted:sdt3});
                    location.reload();
                
                
             });
         }
            
            // document.querySelector(".span").addEventListener("click",()=>{
            //   const span =  document.querySelectorAll(".span");
             
            //   for(items of span){
            //     vb = items.className.match(/tdd[0-9]$/g);
            //     vb2 = vb[0];
            //     vb1= 
            //     console.log(vb1);
            //   }
               
            // });
          
                
            
          
       

        }
        
    });
}
main();