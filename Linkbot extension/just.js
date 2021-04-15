let valArray = [];

chrome.storage.local.get("brokenBlacklisted", (info) => {




  document.querySelector(".brokenStatus").addEventListener("click", () => {
    try {

      const getAllAreaData = document.querySelector(".allArea").value.match(/..*/ig);
      console.log(getAllAreaData);



      getAllAreaData1 = getAllAreaData.length;
      for (call = 0; call < getAllAreaData1; call++) {






       

          if (getAllAreaData[call].match(/http:\/\/|https:\/\//ig)) {

            for (val = 0; val < info.brokenBlacklisted.length; val++) {
              if (info.brokenBlacklisted[val] !== undefined) {
                const vrp = info.brokenBlacklisted[val].replace(/https?:\/\/|www\./g, " ");
                vrp1 = vrp.trim();
                const regex = new RegExp(vrp1, "gi");
              }

              if (getAllAreaData[call].match(regex)) {

                valArray.push(getAllAreaData[call]);



              }

            }

            for (va = 0; va < valArray.length; va++) {
              async function checkBroken() {

              if (getAllAreaData[call] !== valArray[va] || valArray[va] == undefined) {
               
                  try {
                  const aw = await fetch(getAllAreaData[call]);
                  document.querySelector("progress").style.display = "none";
                  document.querySelector(".brokenData1").style.display = "block";
                  console.log(va)
                  if (aw.status !== 200) {
                    console.log(aw.status)

                    aw2 = aw.status + " : " + aw.url + "<br>";
                    aw3 = aw.url;
                    const mn = document.createElement("div");
                    mn.className = "mn";
                    document.querySelector("html").append(mn);
                    const bdt = document.createElement("span");
                    bdt.className = "hib broken" + [call];
                    bdt.innerHTML = aw2 + "<br>";
                    document.querySelector(".brokenData").append(bdt);
                    document.querySelector(".noBroken").style.display = "none";
                    const bdt1 = document.createElement("span");
                    bdt1.className = "storeBroken" + [call]; ppend(bdt1);

                    document.querySelector(".brokenData").innerHTML = document.querySelector(".mn").innerHTML;
                  }
                  checkBroken();
                }catch (e) {
                  console.log(e);
                }

                  chrome.storage.local.set({ previousBroken: document.querySelector(".mn").innerText });

                  bdt1.innerHTML = aw3 + " ";
                  document.querySelector(".mn").a

                }
              }


            

          } 


        }
     

      }

      //download broken data
    

    } catch (e) {
      console.log(e);

    }

  });
});