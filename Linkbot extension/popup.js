/* "options_page": "option.html",
  "manifest_version": 2, <- THIS COMMA
  "content_security_policy": "script-src 'self' https://cdn.firebase.com https://*.firebaseio.com; object-src 'self'"
}
*/
document.querySelector(".apply").addEventListener("click", () => {
  const et = document.querySelector(".selection");
  et2 = et[et.selectedIndex].text;
  et3 = et2.trim();
  chrome.storage.local.set({ Tmarkup: et2 });
  alert("Done! Reload the webpage to see changes")
});


//this var for storing pushed data from loop val

chrome.storage.local.get("brokenBlacklisted", e => {

  if (e.brokenBlacklisted == undefined || e.brokenBlacklisted.length == 0) {
    chrome.storage.local.set({ brokenBlacklisted: ["https://googleads.com"] });
  }
});
// chrome.storage.local.get("previousStatus", e => {
//   if (e.previousStatus !== undefined) {
//     for (i = 0; i < e.previousStatus.length; i++) {
//       let dom1 = document.createElement("span");
//       dom1.className = `status${i}`;
//       dom1.innerHTML = e.previousStatus[i];
//       document.querySelector("fieldset>.brokenData").append(dom1);

//     }
//     console.log(e.previousStatus);
//   }

// });
// chrome.storage.local.get("previousBroken", e => {
//   if (e.previousBroken !== undefined) {

//     for (i = 0; i < e.previousBroken.length; i++) {
//       let dom2 = document.createElement("span");
//       dom2.className = `URL${i}`;
//       dom2.innerHTML = e.previousBroken[i];
//       document.querySelector("fieldset>.brokenData").append(dom2);

//     }
//   }

// });

const myArray = [];
const blacklists = [];
const whitelists = [];
const toFetch = [];
const brokenStatus = [];
const brokenUrl = [];
document.querySelector(".brokenStatus").addEventListener("click", () => {
  if (document.querySelector(".allArea").value!=="") {
  document.querySelector("progress").style.display = "block";

  const x1 = document.querySelector(".allArea").value.match(/https?:\/\/..*|https?:\/\/www\...*/ig);
 


    for (i = 0; i < x1.length; i++) {
      whitelists.push(x1[i]);
    }
  
    chrome.storage.local.get("brokenBlacklisted", e => {
      if (e.brokenBlacklisted !== undefined) {
        for (i = 0; i < e.brokenBlacklisted.length; i++) {
          myArray.push(e.brokenBlacklisted[i]);
        }

      }
    
    // console.log(myArray);
    if (myArray.length !== 0) {
      for (j = 0; j < myArray.length; j++) {
        xx1 = myArray[j].replace(/https?:\/\/|https?:\/\/www\./g, "");
        // console.log(xx1);
        xx2 = xx1.trim();

        xx3 = new RegExp(xx2, "g");
        for (i = 0; i < x1.length; i++) {

          if (x1[i].match(xx2)) {
            blacklists.push(x1[i]);

          }

        }


      }
      for (i = 0; i < blacklists.length; i++) {
        whitelists[whitelists.indexOf(blacklists[i])] = null;

      }
      filtered = whitelists.filter(e => e !== null);
      for (i = 0; i < filtered.length; i++) {
        toFetch.push(filtered[i]);
      }

    }
    else {
      for (i = 0; i < whitelists.length; i++) {
        toFetch.push(whitelists[i]);
      }
    }
    if (toFetch.length !== 0) {
      for (i = 0; i < toFetch.length; i++) {
        fetch(toFetch[i]).then(e => {
          document.querySelector("progress").style.display = "none";
          document.querySelector(".brokenData>h1").style.display = "none";
          document.querySelector(".brokenData1").style.display = "block";
          console.log(e);
          if (e.status !== 200) {
            brokenStatus.push(e.status);
            brokenUrl.push(e.url);
            document.querySelector(".brokenData").innerHTML += `<span class="brokenSpan">URL : ${e.url}<br/>Status : ${e.status}<br/>Status Text : ${e.statusText}<br>Redirected : ${e.redirected}</span>`;
            chrome.storage.local.set({ previousBroken: brokenUrl });

          }
        }).catch(e => {
          console.log(e);
        });
        if (brokenStatus.length === 0) {
          document.querySelector("progress").style.display = "none";
          document.querySelector(".brokenData1").style.display = "block";
        }
        // for(i=0;i<brokenUrl.length;i++){
        //   console.log(brokenUrl[i])

        //   const mn = document.createElement("div");
        // mn.className = "mn";
        // mn.innerHTML=brokenUrl[i]+" <br>"
        // document.querySelector("html").append(mn);
        // const bdt = document.createElement("span");
        // bdt.className = "hib broken" + [i];
        // bdt.innerHTML = brokenStatus[i]+" : "+brokenUrl[i] + "<br>";
        // document.querySelector(".brokenData").append(bdt);


        // document.querySelector(".noBroken").style.display = "block";
        // const bdt1 = document.createElement("span");
        // bdt1.className = "storeBroken" + [call]; ppend(bdt1);

        // document.querySelector(".brokenData").innerHTML = document.querySelector(".mn").innerHTML;
        // chrome.storage.local.set({previousBroken:document.querySelector(".mn").innerText});
        //   }

        // }

        // 



        // console.log(brokenUrl);
        //   get1 = brokenUrl;
        //   get2 = brokenStatus;
        //   if(get1.length!==0){

        //   console.log(get1);
        //     chrome.storage.local.set({previousBroken:get1});
        //     chrome.storage.local.set({previousStatus:get2});
        //     chrome.storage.local.get("previousBroken",e=>{
        // console.log(e.previousBroken);
        //     });
      }


    }
    else {
      document.querySelector("progress").style.display = "none";
      document.querySelector(".brokenData1").style.display = "block";
    }



    // console.log(brokenUrl);


  });
  //after storage

  }
  else{
    alert("Links Not Found, Please Refresh the Webpage and try again");
  }

});


document.querySelector(".bdownload").addEventListener("click", () => {
  const file = "Broken-links-data.txt";
  blob = new Blob([document.querySelector(".brokenData").innerText], { type: "text/plain" });
  document.querySelector(".bdownload").href = URL.createObjectURL(blob);
  document.querySelector(".bdownload").download = file;
});





//function for links download
function d(c, fn, ct) {
  const dlink = document.createElement("a");
  file = new Blob([c], { type: ct });
  dlink.href = URL.createObjectURL(file);
  dlink.download = fn;
  dlink.click();
  URL.revokeObjectURL(dlink.href);
}



//this code is written for to check broken links

document.querySelector(".allArea").value.match(/..*/ig);



//this code is for domain detector
chrome.storage.local.get(["links1", "links2", "links3", "links4", "links5"], (getD) => {
  if (getD.links1 !== undefined) {
    const ct = document.createElement("td");
    ct.innerHTML = getD.links1.url;
    dt = document.createElement("td");
    dt.innerHTML = getD.links1.color;
    dt.style.color = getD.links1.color;
    et = document.createElement("td");
    et.innerHTML = getD.links1.bcolor;
    et.style.color = getD.links1.bcolor;
    ft = document.createElement("td");
    ft.innerHTML = getD.links1.checkbox;
    gt = document.createElement("td");
    gt.className = "links1D";
    gt.innerHTML = "Delete";
    document.querySelector(".links1").append(ct, dt, et, ft, gt);
    document.querySelector(".links1D").addEventListener("click", () => {
      chrome.storage.local.remove("links1");
      document.querySelector(".links1").remove();

    });
  }
  if (getD.links2 !== undefined) {
    const ct = document.createElement("td");
    ct.innerHTML = getD.links2.url;
    dt = document.createElement("td");
    dt.innerHTML = getD.links2.color;
    dt.style.color = getD.links2.color;
    et = document.createElement("td");
    et.innerHTML = getD.links2.bcolor;
    et.style.color = getD.links2.bcolor;
    ft = document.createElement("td");
    ft.innerHTML = getD.links2.checkbox;
    gt = document.createElement("td");
    gt.className = "links2D";
    gt.innerHTML = "Delete";
    document.querySelector(".links2").append(ct, dt, et, ft, gt);
    document.querySelector(".links2D").addEventListener("click", () => {
      chrome.storage.local.remove("links2");
      document.querySelector(".links2").remove();
    });
  }
  if (getD.links3 !== undefined) {
    const ct = document.createElement("td");
    ct.innerHTML = getD.links3.url;
    dt = document.createElement("td");
    dt.innerHTML = getD.links3.color;
    dt.style.color = getD.links3.color;
    et = document.createElement("td");
    et.innerHTML = getD.links3.bcolor;
    et.style.color = getD.links3.bcolor;
    ft = document.createElement("td");
    ft.innerHTML = getD.links3.checkbox;
    gt = document.createElement("td");
    gt.className = "links3D";
    gt.innerHTML = "Delete";
    document.querySelector(".links3").append(ct, dt, et, ft, gt);
    document.querySelector(".links3D").addEventListener("click", () => {
      chrome.storage.local.remove("links3");
      document.querySelector(".links3").remove();
    });
  }

  if (getD.links4 !== undefined) {
    const ct = document.createElement("td");
    ct.innerHTML = getD.links4.url;
    dt = document.createElement("td");
    dt.innerHTML = getD.links4.color;
    dt.style.color = getD.links4.color;
    et = document.createElement("td");
    et.innerHTML = getD.links4.bcolor;
    et.style.color = getD.links4.bcolor;
    ft = document.createElement("td");
    ft.innerHTML = getD.links4.checkbox;
    gt = document.createElement("td");
    gt.className = "links4D";
    gt.innerHTML = "Delete";
    document.querySelector(".links4").append(ct, dt, et, ft, gt);
    document.querySelector(".links4D").addEventListener("click", () => {
      chrome.storage.local.remove("links4");
      document.querySelector(".links4").remove();
    });
  }

  if (getD.links5 !== undefined) {
    const ct = document.createElement("td");
    ct.innerHTML = getD.links5.url;
    dt = document.createElement("td");
    dt.innerHTML = getD.links5.color;
    dt.style.color = getD.links5.color;
    et = document.createElement("td");
    et.innerHTML = getD.links5.bcolor;
    et.style.color = getD.links5.bcolor;
    ft = document.createElement("td");
    ft.innerHTML = getD.links5.checkbox;
    gt = document.createElement("td");
    gt.className = "links5D";
    gt.innerHTML = "Delete";
    document.querySelector(".links5").append(ct, dt, et, ft, gt);
    document.querySelector(".links5D").addEventListener("click", () => {
      chrome.storage.local.remove("links5");
      document.querySelector(".links5").remove();
    });
  }
});






//this is to store user data in storage
document.querySelector(".domainForm").addEventListener("submit", () => {
  const userDatas = document.querySelector(".domainDetectInput").value;
  // if (!userDatas.trim().match(/^http:\/\/..*\.\w+$|^http:\/\/www\...*\.\w+$|^https:\/\/..*\.\w+$|^https:\/\/www\...*\.\w+$/ig)) 
  if (!userDatas.trim().match(/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]\.\w+$/i)) {
    alert("please enter a valid url");

  }
  else {
    chrome.storage.local.get(["links1", "links2", "links3", "links4", "links5"], (l) => {
      const userData = document.querySelector(".domainDetectInput").value;
      userData1 = document.querySelector(".domdetcol").value;
      userData2 = document.querySelector(".domdetbcol").value;
      userData3 = document.querySelector(".domdetchk").checked;


      //links1
      if (l.links1 == undefined) {
        chrome.storage.local.set({ links1: { url: " " + userData, color: " " + userData1, bcolor: " " + userData2, checkbox: " " + userData3 } });
        location.href = "?domainidentifier";
      }

      //links2
      if (l.links2 == undefined && l.links1 !== undefined) {
        chrome.storage.local.set({ links2: { url: " " + userData, color: " " + userData1, bcolor: " " + userData2, checkbox: " " + userData3 } });
        location.href = "?domainidentifier";
      }
      //links3
      if (l.links3 == undefined && l.links1 !== undefined && l.links2 !== undefined) {
        chrome.storage.local.set({ links3: { url: " " + userData, color: " " + userData1, bcolor: " " + userData2, checkbox: " " + userData3 } });
        location.href = "?domainidentifier";
      }
      //links4
      if (l.links4 == undefined && l.links1 !== undefined && l.links2 !== undefined && l.links3 !== undefined) {
        chrome.storage.local.set({ links4: { url: " " + userData, color: " " + userData1, bcolor: " " + userData2, checkbox: " " + userData3 } });
        location.href = "?domainidentifier";
      }

      //links5
      if (l.links5 == undefined && l.links1 !== undefined && l.links2 !== undefined && l.links3 !== undefined && l.links4 !== undefined) {
        chrome.storage.local.set({ links5: { url: " " + userData, color: " " + userData1, bcolor: " " + userData2, checkbox: " " + userData3 } });
        location.href = "?domainidentifier";
      }

      //linksfull
      if (l.links1 !== undefined && l.links2 !== undefined && l.links3 !== undefined && l.links4 !== undefined && l.links5 !== undefined) {
        alert("Only 5 Domains are allowed");
      }


    });

  }

});

//this code is for stylying the page
// const firsta = document.querySelector(".home");
seconda = document.querySelector(".linkidentifier");
thirda = document.querySelector(".domainidentifier");
fourtha = document.querySelector(".deadlinks");
fiftha = document.querySelector(".downloadlinks");
sixtha = document.querySelector(".aboutdeveloper");

// afirst = document.querySelector(".homecontainer");
asecond = document.querySelector(".linkidentifiercontainer");
athird = document.querySelector(".domainidentifiercontainer");
afourth = document.querySelector(".deadlinkscontainer");
afifth = document.querySelector(".downloadlinkscontainer");
asixth = document.querySelector(".aboutdevelopercontainer");


// firsta.style.backgroundColor = "lightgrey";
seconda.style.backgroundColor = "lightgrey";
asecond.style.display = "block";
athird.style.display = "none";
afourth.style.display = "none";
afifth.style.display = "none";
asixth.style.display = "none";

// firsta.addEventListener("click", () => {
//   // firsta.style.backgroundColor = "lightgrey";
//   seconda.style.backgroundColor = "white";
//   thirda.style.backgroundColor = "white";
//   fourtha.style.backgroundColor = "white";
//   fiftha.style.backgroundColor = "white";
//   sixtha.style.backgroundColor = "white";
//   afirst.style.display = "block";
//   asecond.style.display = "none";
//   athird.style.display = "none";
//   afourth.style.display = "none";
//   afifth.style.display = "none";
//   asixth.style.display = "none";
//   location.href = "?home";

// });

seconda.addEventListener("click", () => {
  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "lightgrey";
  thirda.style.backgroundColor = "white";
  fourtha.style.backgroundColor = "white";
  fiftha.style.backgroundColor = "white";
  sixtha.style.backgroundColor = "white";

  // afirst.style.display = "none";
  asecond.style.display = "block";
  athird.style.display = "none";
  afourth.style.display = "none";
  afifth.style.display = "none";
  asixth.style.display = "none";
  location.href = "?linkidentifier";

});

thirda.addEventListener("click", () => {
  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "white";
  thirda.style.backgroundColor = "lightgrey";
  fourtha.style.backgroundColor = "white";
  fiftha.style.backgroundColor = "white";
  sixtha.style.backgroundColor = "white";

  // afirst.style.display = "none";
  asecond.style.display = "none";
  athird.style.display = "block";
  afourth.style.display = "none";
  afifth.style.display = "none";
  asixth.style.display = "none";
  location.href = "?domainidentifier";

});

fourtha.addEventListener("click", () => {
  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "white";
  thirda.style.backgroundColor = "white";
  fourtha.style.backgroundColor = "lightgrey";
  fiftha.style.backgroundColor = "white";
  sixtha.style.backgroundColor = "white";

  // afirst.style.display = "none";
  asecond.style.display = "none";
  athird.style.display = "none";
  afourth.style.display = "block";
  afifth.style.display = "none";
  asixth.style.display = "none";
  location.href = "?deadlinks";

});

fiftha.addEventListener("click", () => {
  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "white";
  thirda.style.backgroundColor = "white";
  fourtha.style.backgroundColor = "white";
  fiftha.style.backgroundColor = "lightgrey";
  sixtha.style.backgroundColor = "white";

  // afirst.style.display = "none";
  asecond.style.display = "none";
  athird.style.display = "none";
  afourth.style.display = "none";
  afifth.style.display = "block";
  asixth.style.display = "none";
  location.href = "?downloadlinks";

});

sixtha.addEventListener("click", () => {
  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "white";
  thirda.style.backgroundColor = "white";
  fourtha.style.backgroundColor = "white";
  fiftha.style.backgroundColor = "white";
  sixtha.style.backgroundColor = "lightgrey";

  // afirst.style.display = "none";
  asecond.style.display = "none";
  athird.style.display = "none";
  afourth.style.display = "none";
  afifth.style.display = "none";
  asixth.style.display = "block";
  location.href = "?aboutdeveloper";

});

// if (document.URL.match(/home/ig)) {
//   // firsta.style.backgroundColor = "lightgrey";
//   seconda.style.backgroundColor = "white";
//   thirda.style.backgroundColor = "white";
//   fourtha.style.backgroundColor = "white";
//   fiftha.style.backgroundColor = "white";
//   sixtha.style.backgroundColor = "white";
//   // afirst.style.display = "block";
//   asecond.style.display = "none";
//   athird.style.display = "none";
//   afourth.style.display = "none";
//   afifth.style.display = "none";
//   asixth.style.display = "none";

// }
if (document.URL.match(/linkidentifier/ig)) {

  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "lightgrey";
  thirda.style.backgroundColor = "white";
  fourtha.style.backgroundColor = "white";
  fiftha.style.backgroundColor = "white";
  sixtha.style.backgroundColor = "white";

  // afirst.style.display = "none";
  asecond.style.display = "block";
  athird.style.display = "none";
  afourth.style.display = "none";
  afifth.style.display = "none";
  asixth.style.display = "none";

}
if (document.URL.match(/domainidentifier/ig)) {

  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "white";
  thirda.style.backgroundColor = "lightgrey";
  fourtha.style.backgroundColor = "white";
  fiftha.style.backgroundColor = "white";
  sixtha.style.backgroundColor = "white";

  // afirst.style.display = "none";
  asecond.style.display = "none";
  athird.style.display = "block";
  afourth.style.display = "none";
  afifth.style.display = "none";
  asixth.style.display = "none";

}
if (document.URL.match(/deadlinks/ig)) {

  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "white";
  thirda.style.backgroundColor = "white";
  fourtha.style.backgroundColor = "lightgrey";
  fiftha.style.backgroundColor = "white";
  sixtha.style.backgroundColor = "white";

  // afirst.style.display = "none";
  asecond.style.display = "none";
  athird.style.display = "none";
  afourth.style.display = "block";
  afifth.style.display = "none";
  asixth.style.display = "none";

}
if (document.URL.match(/downloadlinks/ig)) {

  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "white";
  thirda.style.backgroundColor = "white";
  fourtha.style.backgroundColor = "white";
  fiftha.style.backgroundColor = "lightgrey";
  sixtha.style.backgroundColor = "white";

  // afirst.style.display = "none";
  asecond.style.display = "none";
  athird.style.display = "none";
  afourth.style.display = "none";
  afifth.style.display = "block";
  asixth.style.display = "none";

}
if (document.URL.match(/aboutdeveloper/ig)) {

  // firsta.style.backgroundColor = "white";
  seconda.style.backgroundColor = "white";
  thirda.style.backgroundColor = "white";
  fourtha.style.backgroundColor = "white";
  fiftha.style.backgroundColor = "white";
  sixtha.style.backgroundColor = "lightgrey";

  // afirst.style.display = "none";
  asecond.style.display = "none";
  athird.style.display = "none";
  afourth.style.display = "none";
  afifth.style.display = "none";
  asixth.style.display = "block";

}





//get links data in textarea


if (document.getElementsByTagName("textarea").value == " ") {
  document.getElementsByTagName("textarea").value = "links not found";
};


chrome.storage.local.get(["allUrls", "alternateUrls", "authorUrls", "bookmarkUrls", "externalUrls", "helpUrls", "licenseUrls", "nextUrls", "nofollowUrls", "noreferrerUrls", "noopenerUrls", "prevUrls", "searchUrls", "sponsoredUrls", "tagUrls", "ugcUrls", "noneUrls", "firstMatchedLinks", "secondMatchedLinks", "thirdMatchedLinks", "fourthMatchedLinks", "fifthMatchedLinks"], (r) => {
  document.querySelector(".allArea").value = r.allUrls;
  document.querySelector(".alternateArea").value = r.alternateUrls;
  document.querySelector(".authorArea").value = r.authorUrls;
  document.querySelector(".bookmarkArea").value = r.bookmarkUrls;
  document.querySelector(".externalArea").value = r.externalUrls;
  document.querySelector(".helpArea").value = r.helpUrls;
  document.querySelector(".licenseArea").value = r.licenseUrls;
  document.querySelector(".nextArea").value = r.nextUrls;
  document.querySelector(".nofollowArea").value = r.nofollowUrls;
  document.querySelector(".noreferrerArea").value = r.noreferrerUrls;
  document.querySelector(".noopenerArea").value = r.noopenerUrls;
  document.querySelector(".prevArea").value = r.prevUrls;
  document.querySelector(".searchArea").value = r.searchUrls;
  document.querySelector(".sponsoredArea").value = r.sponsoredUrls;
  document.querySelector(".tagArea").value = r.tagUrls;
  document.querySelector(".ugcArea").value = r.ugcUrls;
  document.querySelector(".noneArea").value = r.noneUrls;
  try {
    document.querySelector(".firstArea").value = r.firstMatchedLinks;
    document.querySelector(".secondArea").value = r.secondMatchedLinks;
    document.querySelector(".thirdArea").value = r.thirdMatchedLinks;
    document.querySelector(".fourthArea").value = r.fourthMatchedLinks;
    document.querySelector(".fifthArea").value = r.fifthMatchedLinks;
  } catch (error) {
    console.log("" + error);
  }
});



//default settings

const errorStatusText = "<span style='color:red;'>Failed</span>";
successStatusText = "<span style='color:green;'>Success</span>";

window.onload = function defaultSettings() {
  chrome.storage.sync.get(['alternateColor', 'alternateCheckbox', 'alternateBackground', 'authorColor', 'authorCheckbox', 'authorBackground', 'bookmarkColor', 'bookmarkCheckbox', 'bookmarkBackground', 'externalColor', 'externalCheckbox', 'externalBackground', 'helpColor', 'helpCheckbox', 'helpBackground', 'licenseColor', 'licenseCheckbox', 'licenseBackground', 'nextColor', 'nextCheckbox', 'nextBackground', 'nofollowColor', 'nofollowCheckbox', 'nofollowBackground', 'noreferrerColor', 'noreferrerCheckbox', 'noreferrerBackground', 'noopenerColor', 'noopenerCheckbox', 'noopenerBackground', 'prevColor', 'prevCheckbox', 'prevBackground', 'searchColor', 'searchCheckbox', 'searchBackground', 'sponsoredColor', 'sponsoredCheckbox', 'sponsoredBackground', 'tagColor', 'tagCheckbox', 'tagBackground', 'ugcColor', 'ugcCheckbox', 'ugcBackground', 'noneColor', 'noneCheckbox', 'noneBackground', 'allColor', 'allCheckbox', 'allBackground'], (alternateData) => {

    //Alternate
    /* 
    
    classes :
    1 alternateColor
    2 alternateCurrentColor
    3 alternateCheckbox
    4 alternateCurrentCheck
    5 alternateBackground
    6 alternateCurrentBackground
    7 alternateSubmit
    8 alternateDefault
    9 alternateStatus
    
    */
    document.querySelector(".alternateCurrentColor").style.backgroundColor = alternateData.alternateColor;
    document.querySelector(".alternateCurrentColor").innerHTML = alternateData.alternateColor;
    document.querySelector(".alternateCurrentCheck").innerHTML = alternateData.alternateCheckbox;
    document.querySelector(".alternateCurrentBackground").innerHTML = alternateData.alternateBackground;
    document.querySelector(".alternateCurrentBackground").style.backgroundColor = alternateData.alternateBackground;

    //Author
    /*
    classes :
    1 authorColor
    2 authorCurrentColor
    3 authorCheckbox
    4 authorCurrentCheck
    5 authorBackground
    6 authorCurrentBackground
    7 authorSubmit
    8 authorDefault
    9 authorStatus
    
    */

    document.querySelector(".authorCurrentColor").style.backgroundColor = alternateData.authorColor;
    document.querySelector(".authorCurrentColor").innerHTML = alternateData.authorColor;
    document.querySelector(".authorCurrentCheck").innerHTML = alternateData.authorCheckbox;
    document.querySelector(".authorCurrentBackground").innerHTML = alternateData.authorBackground;
    document.querySelector(".authorCurrentBackground").style.backgroundColor = alternateData.authorBackground;

    //Bookmark
    /*
    classes :
    1 bookmarkColor
    2 bookmarkCurrentColor
    3 bookmarkCheckbox
    4 bookmarkCurrentCheck
    5 bookmarkBackground
    6 bookmarkCurrentBackground
    7 bookmarkSubmit
    8 bookmarkDefault
    9 bookmarkStatus
    
    */

    document.querySelector(".bookmarkCurrentColor").style.backgroundColor = alternateData.bookmarkColor;
    document.querySelector(".bookmarkCurrentColor").innerHTML = alternateData.bookmarkColor;
    document.querySelector(".bookmarkCurrentCheck").innerHTML = alternateData.bookmarkCheckbox;
    document.querySelector(".bookmarkCurrentBackground").innerHTML = alternateData.bookmarkBackground;
    document.querySelector(".bookmarkCurrentBackground").style.backgroundColor = alternateData.bookmarkBackground;

    //External
    /*
    classes :
    1 externalColor
    2 externalCurrentColor
    3 externalCheckbox
    4 externalCurrentCheck
    5 externalBackground
    6 externalCurrentBackground
    7 externalSubmit
    8 externalDefault
    9 externalStatus
    
    */
    document.querySelector(".externalCurrentColor").style.backgroundColor = alternateData.externalColor;
    document.querySelector(".externalCurrentColor").innerHTML = alternateData.externalColor;
    document.querySelector(".externalCurrentCheck").innerHTML = alternateData.externalCheckbox;
    document.querySelector(".externalCurrentBackground").innerHTML = alternateData.externalBackground;
    document.querySelector(".externalCurrentBackground").style.backgroundColor = alternateData.externalBackground;

    //Help
    /*
    classes :
    1 helpColor
    2 helpCurrentColor
    3 helpCheckbox
    4 helpCurrentCheck
    5 helpBackground
    6 helpCurrentBackground
    7 helpSubmit
    8 helpDefault
    9 helpStatus
    
    */

    document.querySelector(".helpCurrentColor").style.backgroundColor = alternateData.helpColor;
    document.querySelector(".helpCurrentColor").innerHTML = alternateData.helpColor;
    document.querySelector(".helpCurrentCheck").innerHTML = alternateData.helpCheckbox;
    document.querySelector(".helpCurrentBackground").innerHTML = alternateData.helpBackground;
    document.querySelector(".helpCurrentBackground").style.backgroundColor = alternateData.helpBackground;


    //License
    /*
    classes :
    1 licenseColor
    2 licenseCurrentColor
    3 licenseCheckbox
    4 licenseCurrentCheck
    5 licenseBackground
    6 licenseCurrentBackground
    7 licenseSubmit
    8 licenseDefault
    9 licenseStatus
    
    */

    document.querySelector(".licenseCurrentColor").style.backgroundColor = alternateData.licenseColor;
    document.querySelector(".licenseCurrentColor").innerHTML = alternateData.licenseColor;
    document.querySelector(".licenseCurrentCheck").innerHTML = alternateData.licenseCheckbox;
    document.querySelector(".licenseCurrentBackground").innerHTML = alternateData.licenseBackground;
    document.querySelector(".licenseCurrentBackground").style.backgroundColor = alternateData.licenseBackground;

    //Next
    /*
    classes :
    1 nextColor
    2 nextCurrentColor
    3 nextCheckbox
    4 nextCurrentCheck
    5 nextBackground
    6 nextCurrentBackground
    7 nextSubmit
    8 nextDefault
    9 nextStatus
    
    */

    document.querySelector(".nextCurrentColor").style.backgroundColor = alternateData.nextColor;
    document.querySelector(".nextCurrentColor").innerHTML = alternateData.nextColor;
    document.querySelector(".nextCurrentCheck").innerHTML = alternateData.nextCheckbox;
    document.querySelector(".nextCurrentBackground").innerHTML = alternateData.nextBackground;
    document.querySelector(".nextCurrentBackground").style.backgroundColor = alternateData.nextBackground;

    //Nofollow
    /*
    classes :
    1 nofollowColor
    2 nofollowCurrentColor
    3 nofollowCheckbox
    4 nofollowCurrentCheck
    5 nofollowBackground
    6 nofollowCurrentBackground
    7 nofollowSubmit
    8 nofollowDefault
    9 nofollowStatus
    
    */

    document.querySelector(".nofollowCurrentColor").style.backgroundColor = alternateData.nofollowColor;
    document.querySelector(".nofollowCurrentColor").innerHTML = alternateData.nofollowColor;
    document.querySelector(".nofollowCurrentCheck").innerHTML = alternateData.nofollowCheckbox;
    document.querySelector(".nofollowCurrentBackground").innerHTML = alternateData.nofollowBackground;
    document.querySelector(".nofollowCurrentBackground").style.backgroundColor = alternateData.nofollowBackground;

    //Noreferrer
    /*
    classes :
    1 noreferrerColor
    2 noreferrerCurrentColor
    3 noreferrerCheckbox
    4 noreferrerCurrentCheck
    5 noreferrerBackground
    6 noreferrerCurrentBackground
    7 noreferrerSubmit
    8 noreferrerDefault
    9 noreferrerStatus
    
    */


    document.querySelector(".noreferrerCurrentColor").style.backgroundColor = alternateData.noreferrerColor;
    document.querySelector(".noreferrerCurrentColor").innerHTML = alternateData.noreferrerColor;
    document.querySelector(".noreferrerCurrentCheck").innerHTML = alternateData.noreferrerCheckbox;
    document.querySelector(".noreferrerCurrentBackground").innerHTML = alternateData.noreferrerBackground;
    document.querySelector(".noreferrerCurrentBackground").style.backgroundColor = alternateData.noreferrerBackground;

    //Noopener
    /*
    classes :
    1 noopenerColor
    2 noopenerCurrentColor
    3 noopenerCheckbox
    4 noopenerCurrentCheck
    5 noopenerBackground
    6 noopenerCurrentBackground
    7 noopenerSubmit
    8 noopenerDefault
    9 noopenerStatus
    
    */

    document.querySelector(".noopenerCurrentColor").style.backgroundColor = alternateData.noopenerColor;
    document.querySelector(".noopenerCurrentColor").innerHTML = alternateData.noopenerColor;
    document.querySelector(".noopenerCurrentCheck").innerHTML = alternateData.noopenerCheckbox;
    document.querySelector(".noopenerCurrentBackground").innerHTML = alternateData.noopenerBackground;
    document.querySelector(".noopenerCurrentBackground").style.backgroundColor = alternateData.noopenerBackground;


    //Prev
    /*
    classes :
    1 prevColor
    2 prevCurrentColor
    3 prevCheckbox
    4 prevCurrentCheck
    5 prevBackground
    6 prevCurrentBackground
    7 prevSubmit
    8 prevDefault
    9 prevStatus
    
    */

    document.querySelector(".prevCurrentColor").style.backgroundColor = alternateData.prevColor;
    document.querySelector(".prevCurrentColor").innerHTML = alternateData.prevColor;
    document.querySelector(".prevCurrentCheck").innerHTML = alternateData.prevCheckbox;
    document.querySelector(".prevCurrentBackground").innerHTML = alternateData.prevBackground;
    document.querySelector(".prevCurrentBackground").style.backgroundColor = alternateData.prevBackground;

    //Search
    /*
    classes :
    1 searchColor
    2 searchCurrentColor
    3 searchCheckbox
    4 searchCurrentCheck
    5 searchBackground
    6 searchCurrentBackground
    7 searchSubmit
    8 searchDefault
    9 searchStatus
    
    */

    document.querySelector(".searchCurrentColor").style.backgroundColor = alternateData.searchColor;
    document.querySelector(".searchCurrentColor").innerHTML = alternateData.searchColor;
    document.querySelector(".searchCurrentCheck").innerHTML = alternateData.searchCheckbox;
    document.querySelector(".searchCurrentBackground").innerHTML = alternateData.searchBackground;
    document.querySelector(".searchCurrentBackground").style.backgroundColor = alternateData.searchBackground;

    //Sponsored
    /*
    classes :
    1 sponsoredColor
    2 sponsoredCurrentColor
    3 sponsoredCheckbox
    4 sponsoredCurrentCheck
    5 sponsoredBackground
    6 sponsoredCurrentBackground
    7 sponsoredSubmit
    8 sponsoredDefault
    9 sponsoredStatus
    
    */

    document.querySelector(".sponsoredCurrentColor").style.backgroundColor = alternateData.sponsoredColor;
    document.querySelector(".sponsoredCurrentColor").innerHTML = alternateData.sponsoredColor;
    document.querySelector(".sponsoredCurrentCheck").innerHTML = alternateData.sponsoredCheckbox;
    document.querySelector(".sponsoredCurrentBackground").innerHTML = alternateData.sponsoredBackground;
    document.querySelector(".sponsoredCurrentBackground").style.backgroundColor = alternateData.sponsoredBackground;



    //Tag
    /*
    classes :
    1 tagColor
    2 tagCurrentColor
    3 tagCheckbox
    4 tagCurrentCheck
    5 tagBackground
    6 tagCurrentBackground
    7 tagSubmit
    8 tagDefault
    9 tagStatus
    
    */

    document.querySelector(".tagCurrentColor").style.backgroundColor = alternateData.tagColor;
    document.querySelector(".tagCurrentColor").innerHTML = alternateData.tagColor;
    document.querySelector(".tagCurrentCheck").innerHTML = alternateData.tagCheckbox;
    document.querySelector(".tagCurrentBackground").innerHTML = alternateData.tagBackground;
    document.querySelector(".tagCurrentBackground").style.backgroundColor = alternateData.tagBackground;



    //Ugc
    /*
    classes :
    1 ugcColor
    2 ugcCurrentColor
    3 ugcCheckbox
    4 ugcCurrentCheck
    5 ugcBackground
    6 ugcCurrentBackground
    7 ugcSubmit
    8 ugcDefault
    9 ugcStatus
    
    */

    document.querySelector(".ugcCurrentColor").style.backgroundColor = alternateData.ugcColor;
    document.querySelector(".ugcCurrentColor").innerHTML = alternateData.ugcColor;
    document.querySelector(".ugcCurrentCheck").innerHTML = alternateData.ugcCheckbox;
    document.querySelector(".ugcCurrentBackground").innerHTML = alternateData.ugcBackground;
    document.querySelector(".ugcCurrentBackground").style.backgroundColor = alternateData.ugcBackground;

    //None
    /*
    classes :
    1 noneColor
    2 noneCurrentColor
    3 noneCheckbox
    4 noneCurrentCheck
    5 noneBackground
    6 noneCurrentBackground
    7 noneSubmit
    8 noneDefault
    9 noneStatus
    
    */

    document.querySelector(".noneCurrentColor").style.backgroundColor = alternateData.noneColor;
    document.querySelector(".noneCurrentColor").innerHTML = alternateData.noneColor;
    document.querySelector(".noneCurrentCheck").innerHTML = alternateData.noneCheckbox;
    document.querySelector(".noneCurrentBackground").innerHTML = alternateData.noneBackground;
    document.querySelector(".noneCurrentBackground").style.backgroundColor = alternateData.noneBackground;

    //All
    /*
    classes :
    1 allColor
    2 allCurrentColor
    3 allCheckbox
    4 allCurrentCheck
    5 allBackground
    6 allCurrentBackground
    7 allSubmit
    8 allDefault
    9 allStatus
    
    */

    document.querySelector(".allCurrentColor").style.backgroundColor = alternateData.allColor;
    document.querySelector(".allCurrentColor").innerHTML = alternateData.allColor;
    document.querySelector(".allCurrentCheck").innerHTML = alternateData.allCheckbox;
    document.querySelector(".allCurrentBackground").innerHTML = alternateData.allBackground;
    document.querySelector(".allCurrentBackground").style.backgroundColor = alternateData.allBackground;


  });//close chrome sync storage




}//close defaultSettings()








//Alternate
/*
classes :
1 alternateColor
2 alternateCurrentColor
3 alternateCheckbox
4 alternateCurrentCheck
5 alternateBackground
6 alternateCurrentBackground
7 alternateSubmit
8 alternateDefault
9 alternateStatus

*/


//eventlisteners
document.querySelector(".alternateSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".alternateColor").value;
  checkbox = document.querySelector(".alternateCheckbox").checked;
  background = document.querySelector(".alternateBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ alternateColor: color });
    document.querySelector(".alternateStatus").innerHTML = "Color: " + successStatusText;





  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ alternateCheckbox: checkbox });
    document.querySelector(".alternateStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ alternateCheckbox: checkbox });
    document.querySelector(".alternateStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ alternateBackground: background })
    document.querySelector(".alternateStatus").innerHTML = "Background: " + successStatusText;



  }

  chrome.storage.sync.get(['alternateColor', 'alternateCheckbox', 'alternateBackground'], (firstData) => {
    document.querySelector(".alternateCurrentColor").style.backgroundColor = firstData.alternateColor;
    document.querySelector(".alternateCurrentColor").innerHTML = firstData.alternateColor;
    document.querySelector(".alternateCurrentCheck").innerHTML = firstData.alternateCheckbox;
    document.querySelector(".alternateCurrentBackground").style.backgroundColor = firstData.alternateBackground;
    document.querySelector(".alternateCurrentBackground").innerHTML = firstData.alternateBackground;
  });




});
document.querySelector(".alternateDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['alternateColor', 'alternateCheckbox', 'alternateBackground']);
  document.querySelector(".alternateStatus").innerHTML = "Default : " + successStatusText;
  chrome.storage.sync.get(['alternateColor', 'alternateCheckbox', 'alternateBackground'], (firstData) => {
    document.querySelector(".alternateCurrentColor").style.backgroundColor = "white";
    document.querySelector(".alternateCurrentColor").innerHTML = firstData.alternateColor;
    document.querySelector(".alternateCurrentCheck").innerHTML = firstData.alternateCheckbox;
    document.querySelector(".alternateCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".alternateCurrentBackground").innerHTML = firstData.alternateBackground;
  });



});

//Author
/*
classes :
1 authorColor
2 authorCurrentColor
3 authorCheckbox
4 authorCurrentCheck
5 authorBackground
6 authorCurrentBackground
7 authorSubmit
8 authorDefault
9 authorStatus

*/

//eventlisteners
document.querySelector(".authorSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".authorColor").value;
  checkbox = document.querySelector(".authorCheckbox").checked;
  background = document.querySelector(".authorBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ authorColor: color })
    document.querySelector(".authorStatus").innerHTML = "Color: " + successStatusText;



  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ authorCheckbox: checkbox });
    document.querySelector(".authorStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ authorCheckbox: checkbox });
    document.querySelector(".authorStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ authorBackground: background })
    document.querySelector(".authorStatus").innerHTML = "Background: " + successStatusText;



  }

  chrome.storage.sync.get(['authorColor', 'authorCheckbox', 'authorBackground'], (firstData) => {
    document.querySelector(".authorCurrentColor").style.backgroundColor = firstData.authorColor;
    document.querySelector(".authorCurrentColor").innerHTML = firstData.authorColor;
    document.querySelector(".authorCurrentCheck").innerHTML = firstData.authorCheckbox;
    document.querySelector(".authorCurrentBackground").style.backgroundColor = firstData.authorBackground;
    document.querySelector(".authorCurrentBackground").innerHTML = firstData.authorBackground;
  });






});
document.querySelector(".authorDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['authorColor', 'authorCheckbox', 'authorBackground']);
  document.querySelector(".authorStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['authorColor', 'authorCheckbox', 'authorBackground'], (firstData) => {
    document.querySelector(".authorCurrentColor").style.backgroundColor =
      "white";
    document.querySelector(".authorCurrentColor").innerHTML = firstData.authorColor;
    document.querySelector(".authorCurrentCheck").innerHTML = firstData.authorCheckbox;
    document.querySelector(".authorCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".authorCurrentBackground").innerHTML = firstData.authorBackground;
  });

});


//Bookmark
/*
classes :
1 bookmarkColor
2 bookmarkCurrentColor
3 bookmarkCheckbox
4 bookmarkCurrentCheck
5 bookmarkBackground
6 bookmarkCurrentBackground
7 bookmarkSubmit
8 bookmarkDefault
9 bookmarkStatus

*/


//eventlisteners
document.querySelector(".bookmarkSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".bookmarkColor").value;
  checkbox = document.querySelector(".bookmarkCheckbox").checked;
  background = document.querySelector(".bookmarkBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ bookmarkColor: color })
    document.querySelector(".bookmarkStatus").innerHTML = "Color: " + successStatusText;



  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ bookmarkCheckbox: checkbox });
    document.querySelector(".bookmarkStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ bookmarkCheckbox: checkbox });
    document.querySelector(".bookmarkStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ bookmarkBackground: background })
    document.querySelector(".bookmarkStatus").innerHTML = "Background: " + successStatusText;



  }

  chrome.storage.sync.get(['bookmarkColor', 'bookmarkCheckbox', 'bookmarkBackground'], (firstData) => {
    document.querySelector(".bookmarkCurrentColor").style.backgroundColor = firstData.bookmarkColor;
    document.querySelector(".bookmarkCurrentColor").innerHTML = firstData.bookmarkColor;
    document.querySelector(".bookmarkCurrentCheck").innerHTML = firstData.bookmarkCheckbox;
    document.querySelector(".bookmarkCurrentBackground").style.backgroundColor = firstData.bookmarkBackground;
    document.querySelector(".bookmarkCurrentBackground").innerHTML = firstData.bookmarkBackground;
  });




});
document.querySelector(".bookmarkDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['bookmarkColor', 'bookmarkCheckbox', 'bookmarkBackground']);
  document.querySelector(".bookmarkStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['bookmarkColor', 'bookmarkCheckbox', 'bookmarkBackground'], (firstData) => {
    document.querySelector(".bookmarkCurrentColor").style.backgroundColor = "white";
    document.querySelector(".bookmarkCurrentColor").innerHTML = firstData.bookmarkColor;
    document.querySelector(".bookmarkCurrentCheck").innerHTML = firstData.bookmarkCheckbox;
    document.querySelector(".bookmarkCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".bookmarkCurrentBackground").innerHTML = firstData.bookmarkBackground;
  });

});


//External
/*
classes :
1 externalColor
2 externalCurrentColor
3 externalCheckbox
4 externalCurrentCheck
5 externalBackground
6 externalCurrentBackground
7 externalSubmit
8 externalDefault
9 externalStatus

*/


//eventlisteners
document.querySelector(".externalSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".externalColor").value;
  checkbox = document.querySelector(".externalCheckbox").checked;
  background = document.querySelector(".externalBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ externalColor: color })
    document.querySelector(".externalStatus").innerHTML = "Color: " + successStatusText;



  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ externalCheckbox: checkbox });
    document.querySelector(".externalStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ externalCheckbox: checkbox });
    document.querySelector(".externalStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ externalBackground: background })
    document.querySelector(".externalStatus").innerHTML = "Background: " + successStatusText;



  }

  chrome.storage.sync.get(['externalColor', 'externalCheckbox', 'externalBackground'], (firstData) => {
    document.querySelector(".externalCurrentColor").style.backgroundColor = firstData.externalColor;
    document.querySelector(".externalCurrentColor").innerHTML = firstData.externalColor;
    document.querySelector(".externalCurrentCheck").innerHTML = firstData.externalCheckbox;
    document.querySelector(".externalCurrentBackground").style.backgroundColor = firstData.externalBackground;
    document.querySelector(".externalCurrentBackground").innerHTML = firstData.externalBackground;
  });




});
document.querySelector(".externalDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['externalColor', 'externalCheckbox', 'externalBackground']);
  document.querySelector(".externalStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['externalColor', 'externalCheckbox', 'externalBackground'], (firstData) => {
    document.querySelector(".externalCurrentColor").style.backgroundColor = "white";
    document.querySelector(".externalCurrentColor").innerHTML = firstData.externalColor;
    document.querySelector(".externalCurrentCheck").innerHTML = firstData.externalCheckbox;
    document.querySelector(".externalCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".externalCurrentBackground").innerHTML = firstData.externalBackground;
  });

});

//Help
/*
classes :
1 helpColor
2 helpCurrentColor
3 helpCheckbox
4 helpCurrentCheck
5 helpBackground
6 helpCurrentBackground
7 helpSubmit
8 helpDefault
9 helpStatus

*/


//eventlisteners
document.querySelector(".helpSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".helpColor").value;
  checkbox = document.querySelector(".helpCheckbox").checked;
  background = document.querySelector(".helpBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ helpColor: color })
    document.querySelector(".helpStatus").innerHTML = "Color: " + successStatusText;



  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ helpCheckbox: checkbox });
    document.querySelector(".helpStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ helpCheckbox: checkbox });
    document.querySelector(".helpStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ helpBackground: background })
    document.querySelector(".helpStatus").innerHTML = "Background: " + successStatusText;



  }

  chrome.storage.sync.get(['helpColor', 'helpCheckbox', 'helpBackground'], (firstData) => {
    document.querySelector(".helpCurrentColor").style.backgroundColor = firstData.helpColor;
    document.querySelector(".helpCurrentColor").innerHTML = firstData.helpColor;
    document.querySelector(".helpCurrentCheck").innerHTML = firstData.helpCheckbox;
    document.querySelector(".helpCurrentBackground").style.backgroundColor = firstData.helpBackground;
    document.querySelector(".helpCurrentBackground").innerHTML = firstData.helpBackground;
  });




});
document.querySelector(".helpDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['helpColor', 'helpCheckbox', 'helpBackground']);
  document.querySelector(".helpStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['helpColor', 'helpCheckbox', 'helpBackground'], (firstData) => {
    document.querySelector(".helpCurrentColor").style.backgroundColor = "white";
    document.querySelector(".helpCurrentColor").innerHTML = firstData.helpColor;
    document.querySelector(".helpCurrentCheck").innerHTML = firstData.helpCheckbox;
    document.querySelector(".helpCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".helpCurrentBackground").innerHTML = firstData.helpBackground;
  });

});

//License
/*
classes :
1 licenseColor
2 licenseCurrentColor
3 licenseCheckbox
4 licenseCurrentCheck
5 licenseBackground
6 licenseCurrentBackground
7 licenseSubmit
8 licenseDefault
9 licenseStatus

*/


//eventlisteners
document.querySelector(".licenseSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".licenseColor").value;
  checkbox = document.querySelector(".licenseCheckbox").checked;
  background = document.querySelector(".licenseBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ licenseColor: color })
    document.querySelector(".licenseStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ licenseCheckbox: checkbox });
    document.querySelector(".licenseStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ licenseCheckbox: checkbox });
    document.querySelector(".licenseStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ licenseBackground: background })
    document.querySelector(".licenseStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['licenseColor', 'licenseCheckbox', 'licenseBackground'], (firstData) => {
    document.querySelector(".licenseCurrentColor").style.backgroundColor = firstData.licenseColor;
    document.querySelector(".licenseCurrentColor").innerHTML = firstData.licenseColor;
    document.querySelector(".licenseCurrentCheck").innerHTML = firstData.licenseCheckbox;
    document.querySelector(".licenseCurrentBackground").style.backgroundColor = firstData.licenseBackground;
    document.querySelector(".licenseCurrentBackground").innerHTML = firstData.licenseBackground;
  });


});
document.querySelector(".licenseDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['licenseColor', 'licenseCheckbox', 'licenseBackground']);
  document.querySelector(".licenseStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['licenseColor', 'licenseCheckbox', 'licenseBackground'], (firstData) => {
    document.querySelector(".licenseCurrentColor").style.backgroundColor = "white";
    document.querySelector(".licenseCurrentColor").innerHTML = firstData.licenseColor;
    document.querySelector(".licenseCurrentCheck").innerHTML = firstData.licenseCheckbox;
    document.querySelector(".licenseCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".licenseCurrentBackground").innerHTML = firstData.licenseBackground;
  });

});

//Next
/*
classes :
1 nextColor
2 nextCurrentColor
3 nextCheckbox
4 nextCurrentCheck
5 nextBackground
6 nextCurrentBackground
7 nextSubmit
8 nextDefault
9 nextStatus

*/

//eventlisteners
document.querySelector(".nextSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".nextColor").value;
  checkbox = document.querySelector(".nextCheckbox").checked;
  background = document.querySelector(".nextBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ nextColor: color })
    document.querySelector(".nextStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ nextCheckbox: checkbox });
    document.querySelector(".nextStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ nextCheckbox: checkbox });
    document.querySelector(".nextStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ nextBackground: background })
    document.querySelector(".nextStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['nextColor', 'nextCheckbox', 'nextBackground'], (firstData) => {
    document.querySelector(".nextCurrentColor").style.backgroundColor = firstData.nextColor;
    document.querySelector(".nextCurrentColor").innerHTML = firstData.nextColor;
    document.querySelector(".nextCurrentCheck").innerHTML = firstData.nextCheckbox;
    document.querySelector(".nextCurrentBackground").style.backgroundColor = firstData.nextBackground;
    document.querySelector(".nextCurrentBackground").innerHTML = firstData.nextBackground;
  });

});
document.querySelector(".nextDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['nextColor', 'nextCheckbox', 'nextBackground']);
  document.querySelector(".nextStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['nextColor', 'nextCheckbox', 'nextBackground'], (firstData) => {
    document.querySelector(".nextCurrentColor").style.backgroundColor = "white";
    document.querySelector(".nextCurrentColor").innerHTML = firstData.nextColor;
    document.querySelector(".nextCurrentCheck").innerHTML = firstData.nextCheckbox;
    document.querySelector(".nextCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".nextCurrentBackground").innerHTML = firstData.nextBackground;
  });

});

//Nofollow
/*
classes :
1 nofollowColor
2 nofollowCurrentColor
3 nofollowCheckbox
4 nofollowCurrentCheck
5 nofollowBackground
6 nofollowCurrentBackground
7 nofollowSubmit
8 nofollowDefault
9 nofollowStatus

*/

//eventlisteners
document.querySelector(".nofollowSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".nofollowColor").value;
  checkbox = document.querySelector(".nofollowCheckbox").checked;
  background = document.querySelector(".nofollowBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ nofollowColor: color })
    document.querySelector(".nofollowStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ nofollowCheckbox: checkbox });
    document.querySelector(".nofollowStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ nofollowCheckbox: checkbox });
    document.querySelector(".nofollowStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ nofollowBackground: background })
    document.querySelector(".nofollowStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['nofollowColor', 'nofollowCheckbox', 'nofollowBackground'], (firstData) => {
    document.querySelector(".nofollowCurrentColor").style.backgroundColor = firstData.nofollowColor;
    document.querySelector(".nofollowCurrentColor").innerHTML = firstData.nofollowColor;
    document.querySelector(".nofollowCurrentCheck").innerHTML = firstData.nofollowCheckbox;
    document.querySelector(".nofollowCurrentBackground").style.backgroundColor = firstData.nofollowBackground;
    document.querySelector(".nofollowCurrentBackground").innerHTML = firstData.nofollowBackground;
  });

});
document.querySelector(".nofollowDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['nofollowColor', 'nofollowCheckbox', 'nofollowBackground']);
  document.querySelector(".nofollowStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['nofollowColor', 'nofollowCheckbox', 'nofollowBackground'], (firstData) => {
    document.querySelector(".nofollowCurrentColor").style.backgroundColor = "white";
    document.querySelector(".nofollowCurrentColor").innerHTML = firstData.nofollowColor;
    document.querySelector(".nofollowCurrentCheck").innerHTML = firstData.nofollowCheckbox;
    document.querySelector(".nofollowCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".nofollowCurrentBackground").innerHTML = firstData.nofollowBackground;
  });

});

//Noreferrer
/*
classes :
1 noreferrerColor
2 noreferrerCurrentColor
3 noreferrerCheckbox
4 noreferrerCurrentCheck
5 noreferrerBackground
6 noreferrerCurrentBackground
7 noreferrerSubmit
8 noreferrerDefault
9 noreferrerStatus

*/

//eventlisteners
document.querySelector(".noreferrerSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".noreferrerColor").value;
  checkbox = document.querySelector(".noreferrerCheckbox").checked;
  background = document.querySelector(".noreferrerBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ noreferrerColor: color })
    document.querySelector(".noreferrerStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ noreferrerCheckbox: checkbox });
    document.querySelector(".noreferrerStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ noreferrerCheckbox: checkbox });
    document.querySelector(".noreferrerStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ noreferrerBackground: background })
    document.querySelector(".noreferrerStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['noreferrerColor', 'noreferrerCheckbox', 'noreferrerBackground'], (firstData) => {
    document.querySelector(".noreferrerCurrentColor").style.backgroundColor = firstData.noreferrerColor;
    document.querySelector(".noreferrerCurrentColor").innerHTML = firstData.noreferrerColor;
    document.querySelector(".noreferrerCurrentCheck").innerHTML = firstData.noreferrerCheckbox;
    document.querySelector(".noreferrerCurrentBackground").style.backgroundColor = firstData.noreferrerBackground;
    document.querySelector(".noreferrerCurrentBackground").innerHTML = firstData.noreferrerBackground;
  });

});
document.querySelector(".noreferrerDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['noreferrerColor', 'noreferrerCheckbox', 'noreferrerBackground']);
  document.querySelector(".noreferrerStatus").innerHTML = "Default : " + successStatusText;


  chrome.storage.sync.get(['noreferrerColor', 'noreferrerCheckbox', 'noreferrerBackground'], (firstData) => {
    document.querySelector(".noreferrerCurrentColor").style.backgroundColor = "white";
    document.querySelector(".noreferrerCurrentColor").innerHTML = firstData.noreferrerColor;
    document.querySelector(".noreferrerCurrentCheck").innerHTML = firstData.noreferrerCheckbox;
    document.querySelector(".noreferrerCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".noreferrerCurrentBackground").innerHTML = firstData.noreferrerBackground;
  });

});

//Noopener
/*
classes :
1 noopenerColor
2 noopenerCurrentColor
3 noopenerCheckbox
4 noopenerCurrentCheck
5 noopenerBackground
6 noopenerCurrentBackground
7 noopenerSubmit
8 noopenerDefault
9 noopenerStatus

*/

//eventlisteners
document.querySelector(".noopenerSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".noopenerColor").value;
  checkbox = document.querySelector(".noopenerCheckbox").checked;
  background = document.querySelector(".noopenerBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ noopenerColor: color })
    document.querySelector(".noopenerStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ noopenerCheckbox: checkbox });
    document.querySelector(".noopenerStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ noopenerCheckbox: checkbox });
    document.querySelector(".noopenerStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ noopenerBackground: background })
    document.querySelector(".noopenerStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['noopenerColor', 'noopenerCheckbox', 'noopenerBackground'], (firstData) => {
    document.querySelector(".noopenerCurrentColor").style.backgroundColor = firstData.noopenerColor;
    document.querySelector(".noopenerCurrentColor").innerHTML = firstData.noopenerColor;
    document.querySelector(".noopenerCurrentCheck").innerHTML = firstData.noopenerCheckbox;
    document.querySelector(".noopenerCurrentBackground").style.backgroundColor = firstData.noopenerBackground;
    document.querySelector(".noopenerCurrentBackground").innerHTML = firstData.noopenerBackground;
  });

});
document.querySelector(".noopenerDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['noopenerColor', 'noopenerCheckbox', 'noopenerBackground']);
  document.querySelector(".noopenerStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['noopenerColor', 'noopenerCheckbox', 'noopenerBackground'], (firstData) => {
    document.querySelector(".noopenerCurrentColor").style.backgroundColor = "white";
    document.querySelector(".noopenerCurrentColor").innerHTML = firstData.noopenerColor;
    document.querySelector(".noopenerCurrentCheck").innerHTML = firstData.noopenerCheckbox;
    document.querySelector(".noopenerCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".noopenerCurrentBackground").innerHTML = firstData.noopenerBackground;
  });

});

//Prev
/*
classes :
1 prevColor
2 prevCurrentColor
3 prevCheckbox
4 prevCurrentCheck
5 prevBackground
6 prevCurrentBackground
7 prevSubmit
8 prevDefault
9 prevStatus

*/

//eventlisteners
document.querySelector(".prevSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".prevColor").value;
  checkbox = document.querySelector(".prevCheckbox").checked;
  background = document.querySelector(".prevBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ prevColor: color })
    document.querySelector(".prevStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ prevCheckbox: checkbox });
    document.querySelector(".prevStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ prevCheckbox: checkbox });
    document.querySelector(".prevStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ prevBackground: background })
    document.querySelector(".prevStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['prevColor', 'prevCheckbox', 'prevBackground'], (firstData) => {
    document.querySelector(".prevCurrentColor").style.backgroundColor = firstData.prevColor;
    document.querySelector(".prevCurrentColor").innerHTML = firstData.prevColor;
    document.querySelector(".prevCurrentCheck").innerHTML = firstData.prevCheckbox;
    document.querySelector(".prevCurrentBackground").style.backgroundColor = firstData.prevBackground;
    document.querySelector(".prevCurrentBackground").innerHTML = firstData.prevBackground;
  });

});
document.querySelector(".prevDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['prevColor', 'prevCheckbox', 'prevBackground']);
  document.querySelector(".prevStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['prevColor', 'prevCheckbox', 'prevBackground'], (firstData) => {
    document.querySelector(".prevCurrentColor").style.backgroundColor = "white";
    document.querySelector(".prevCurrentColor").innerHTML = firstData.prevColor;
    document.querySelector(".prevCurrentCheck").innerHTML = firstData.prevCheckbox;
    document.querySelector(".prevCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".prevCurrentBackground").innerHTML = firstData.prevBackground;
  });

});

//Search
/*
classes :
1 searchColor
2 searchCurrentColor
3 searchCheckbox
4 searchCurrentCheck
5 searchBackground
6 searchCurrentBackground
7 searchSubmit
8 searchDefault
9 searchStatus

*/

//eventlisteners
document.querySelector(".searchSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".searchColor").value;
  checkbox = document.querySelector(".searchCheckbox").checked;
  background = document.querySelector(".searchBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ searchColor: color })
    document.querySelector(".searchStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ searchCheckbox: checkbox });
    document.querySelector(".searchStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ searchCheckbox: checkbox });
    document.querySelector(".searchStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ searchBackground: background })
    document.querySelector(".searchStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['searchColor', 'searchCheckbox', 'searchBackground'], (firstData) => {
    document.querySelector(".searchCurrentColor").style.backgroundColor = firstData.searchColor;
    document.querySelector(".searchCurrentColor").innerHTML = firstData.searchColor;
    document.querySelector(".searchCurrentCheck").innerHTML = firstData.searchCheckbox;
    document.querySelector(".searchCurrentBackground").style.backgroundColor = firstData.searchBackground;
    document.querySelector(".searchCurrentBackground").innerHTML = firstData.searchBackground;
  });

});
document.querySelector(".searchDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['searchColor', 'searchCheckbox', 'searchBackground']);
  document.querySelector(".searchStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['searchColor', 'searchCheckbox', 'searchBackground'], (firstData) => {
    document.querySelector(".searchCurrentColor").style.backgroundColor = "white";
    document.querySelector(".searchCurrentColor").innerHTML = firstData.searchColor;
    document.querySelector(".searchCurrentCheck").innerHTML = firstData.searchCheckbox;
    document.querySelector(".searchCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".searchCurrentBackground").innerHTML = firstData.searchBackground;
  });

});


//Sponsored
/*
classes :
1 sponsoredColor
2 sponsoredCurrentColor
3 sponsoredCheckbox
4 sponsoredCurrentCheck
5 sponsoredBackground
6 sponsoredCurrentBackground
7 sponsoredSubmit
8 sponsoredDefault
9 sponsoredStatus

*/

//eventlisteners
document.querySelector(".sponsoredSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".sponsoredColor").value;
  checkbox = document.querySelector(".sponsoredCheckbox").checked;
  background = document.querySelector(".sponsoredBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ sponsoredColor: color })
    document.querySelector(".sponsoredStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ sponsoredCheckbox: checkbox });
    document.querySelector(".sponsoredStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ sponsoredCheckbox: checkbox });
    document.querySelector(".sponsoredStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ sponsoredBackground: background })
    document.querySelector(".sponsoredStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['sponsoredColor', 'sponsoredCheckbox', 'sponsoredBackground'], (firstData) => {
    document.querySelector(".sponsoredCurrentColor").style.backgroundColor = firstData.sponsoredColor;
    document.querySelector(".sponsoredCurrentColor").innerHTML = firstData.sponsoredColor;
    document.querySelector(".sponsoredCurrentCheck").innerHTML = firstData.sponsoredCheckbox;
    document.querySelector(".sponsoredCurrentBackground").style.backgroundColor = firstData.sponsoredBackground;
    document.querySelector(".sponsoredCurrentBackground").innerHTML = firstData.sponsoredBackground;
  });

});
document.querySelector(".sponsoredDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['sponsoredColor', 'sponsoredCheckbox', 'sponsoredBackground']);
  document.querySelector(".sponsoredStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['sponsoredColor', 'sponsoredCheckbox', 'sponsoredBackground'], (firstData) => {
    document.querySelector(".sponsoredCurrentColor").style.backgroundColor = "white";
    document.querySelector(".sponsoredCurrentColor").innerHTML = firstData.sponsoredColor;
    document.querySelector(".sponsoredCurrentCheck").innerHTML = firstData.sponsoredCheckbox;
    document.querySelector(".sponsoredCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".sponsoredCurrentBackground").innerHTML = firstData.sponsoredBackground;
  });

});


//Tag
/*
classes :
1 tagColor
2 tagCurrentColor
3 tagCheckbox
4 tagCurrentCheck
5 tagBackground
6 tagCurrentBackground
7 tagSubmit
8 tagDefault
9 tagStatus

*/

//eventlisteners
document.querySelector(".tagSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".tagColor").value;
  checkbox = document.querySelector(".tagCheckbox").checked;
  background = document.querySelector(".tagBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ tagColor: color })
    document.querySelector(".tagStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ tagCheckbox: checkbox });
    document.querySelector(".tagStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ tagCheckbox: checkbox });
    document.querySelector(".tagStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ tagBackground: background })
    document.querySelector(".tagStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['tagColor', 'tagCheckbox', 'tagBackground'], (firstData) => {
    document.querySelector(".tagCurrentColor").style.backgroundColor = firstData.tagColor;
    document.querySelector(".tagCurrentColor").innerHTML = firstData.tagColor;
    document.querySelector(".tagCurrentCheck").innerHTML = firstData.tagCheckbox;
    document.querySelector(".tagCurrentBackground").style.backgroundColor = firstData.tagBackground;
    document.querySelector(".tagCurrentBackground").innerHTML = firstData.tagBackground;
  });

});
document.querySelector(".tagDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['tagColor', 'tagCheckbox', 'tagBackground']);
  document.querySelector(".tagStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['tagColor', 'tagCheckbox', 'tagBackground'], (firstData) => {
    document.querySelector(".tagCurrentColor").style.backgroundColor = "white";
    document.querySelector(".tagCurrentColor").innerHTML = firstData.tagColor;
    document.querySelector(".tagCurrentCheck").innerHTML = firstData.tagCheckbox;
    document.querySelector(".tagCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".tagCurrentBackground").innerHTML = firstData.tagBackground;
  });

});



//UGC
/*
classes :
1 ugcColor
2 ugcCurrentColor
3 ugcCheckbox
4 ugcCurrentCheck
5 ugcBackground
6 ugcCurrentBackground
7 ugcSubmit
8 ugcDefault
9 ugcStatus

*/

//eventlisteners
document.querySelector(".ugcSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".ugcColor").value;
  checkbox = document.querySelector(".ugcCheckbox").checked;
  background = document.querySelector(".ugcBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ ugcColor: color })
    document.querySelector(".ugcStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ ugcCheckbox: checkbox });
    document.querySelector(".ugcStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ ugcCheckbox: checkbox });
    document.querySelector(".ugcStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ ugcBackground: background })
    document.querySelector(".ugcStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['ugcColor', 'ugcCheckbox', 'ugcBackground'], (firstData) => {
    document.querySelector(".ugcCurrentColor").style.backgroundColor = firstData.ugcColor;
    document.querySelector(".ugcCurrentColor").innerHTML = firstData.ugcColor;
    document.querySelector(".ugcCurrentCheck").innerHTML = firstData.ugcCheckbox;
    document.querySelector(".ugcCurrentBackground").style.backgroundColor = firstData.ugcBackground;
    document.querySelector(".ugcCurrentBackground").innerHTML = firstData.ugcBackground;
  });

});
document.querySelector(".ugcDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['ugcColor', 'ugcCheckbox', 'ugcBackground']);
  document.querySelector(".ugcStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['ugcColor', 'ugcCheckbox', 'ugcBackground'], (firstData) => {
    document.querySelector(".ugcCurrentColor").style.backgroundColor = "white";
    document.querySelector(".ugcCurrentColor").innerHTML = firstData.ugcColor;
    document.querySelector(".ugcCurrentCheck").innerHTML = firstData.ugcCheckbox;
    document.querySelector(".ugcCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".ugcCurrentBackground").innerHTML = firstData.ugcBackground;
  });

});


//None
/*
classes :
1 noneColor
2 noneCurrentColor
3 noneCheckbox
4 noneCurrentCheck
5 noneBackground
6 noneCurrentBackground
7 noneSubmit
8 noneDefault
9 noneStatus

*/

//eventlisteners
document.querySelector(".noneSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".noneColor").value;
  checkbox = document.querySelector(".noneCheckbox").checked;
  background = document.querySelector(".noneBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ noneColor: color })
    document.querySelector(".noneStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ noneCheckbox: checkbox });
    document.querySelector(".noneStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ noneCheckbox: checkbox });
    document.querySelector(".noneStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ noneBackground: background })
    document.querySelector(".noneStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['noneColor', 'noneCheckbox', 'noneBackground'], (firstData) => {
    document.querySelector(".noneCurrentColor").style.backgroundColor = firstData.noneColor;
    document.querySelector(".noneCurrentColor").innerHTML = firstData.noneColor;
    document.querySelector(".noneCurrentCheck").innerHTML = firstData.noneCheckbox;
    document.querySelector(".noneCurrentBackground").style.backgroundColor = firstData.noneBackground;
    document.querySelector(".noneCurrentBackground").innerHTML = firstData.noneBackground;
  });

});
document.querySelector(".noneDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['noneColor', 'noneCheckbox', 'noneBackground']);
  document.querySelector(".noneStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['noneColor', 'noneCheckbox', 'noneBackground'], (firstData) => {
    document.querySelector(".noneCurrentColor").style.backgroundColor = "white";
    document.querySelector(".noneCurrentColor").innerHTML = firstData.noneColor;
    document.querySelector(".noneCurrentCheck").innerHTML = firstData.noneCheckbox;
    document.querySelector(".noneCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".noneCurrentBackground").innerHTML = firstData.noneBackground;
  });

});

//All
/*
classes :
1 allColor
2 allCurrentColor
3 allCheckbox
4 allCurrentCheck
5 allBackground
6 allCurrentBackground
7 allSubmit
8 allDefault
9 allStatus

*/

//eventlisteners
document.querySelector(".allSubmit").addEventListener("click", () => {

  //variables
  const color = document.querySelector(".allColor").value;
  checkbox = document.querySelector(".allCheckbox").checked;
  background = document.querySelector(".allBackground").value;


  //send the variables to storage

  if (color !== "#000000") {
    chrome.storage.sync.set({ allColor: color })
    document.querySelector(".allStatus").innerHTML = "Color: " + successStatusText;

  }
  if (checkbox !== false) {
    chrome.storage.sync.set({ allCheckbox: checkbox });
    document.querySelector(".allStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (checkbox == false) {
    chrome.storage.sync.set({ allCheckbox: checkbox });
    document.querySelector(".allStatus").innerHTML = "Checkbox: " + successStatusText;
  }
  if (background !== "#000000") {
    chrome.storage.sync.set({ allBackground: background })
    document.querySelector(".allStatus").innerHTML = "Background: " + successStatusText;

  }

  chrome.storage.sync.get(['allColor', 'allCheckbox', 'allBackground'], (firstData) => {
    document.querySelector(".allCurrentColor").style.backgroundColor = firstData.allColor;
    document.querySelector(".allCurrentColor").innerHTML = firstData.allColor;
    document.querySelector(".allCurrentCheck").innerHTML = firstData.allCheckbox;
    document.querySelector(".allCurrentBackground").style.backgroundColor = firstData.allBackground;
    document.querySelector(".allCurrentBackground").innerHTML = firstData.allBackground;
  });

});
document.querySelector(".allDefault").addEventListener("click", () => {

  chrome.storage.sync.remove(['allColor', 'allCheckbox', 'allBackground']);
  document.querySelector(".allStatus").innerHTML = "Default : " + successStatusText;

  chrome.storage.sync.get(['allColor', 'allCheckbox', 'allBackground'], (firstData) => {
    document.querySelector(".allCurrentColor").style.backgroundColor = "white";
    document.querySelector(".allCurrentColor").innerHTML = firstData.allColor;
    document.querySelector(".allCurrentCheck").innerHTML = firstData.allCheckbox;
    document.querySelector(".allCurrentBackground").style.backgroundColor = "white";
    document.querySelector(".allCurrentBackground").innerHTML = firstData.allBackground;
  });

});




//close explore functions
//start a eventlistener for set all as default setting

document.querySelector(".resetAllData").addEventListener("click", () => {
  let checking = confirm("Are you sure to set all your settings as default");
  if (checking == true) {

    chrome.storage.sync.remove(['alternateColor', 'alternateCheckbox', 'alternateBackground', 'authorColor', 'authorCheckbox', 'authorBackground', 'bookmarkColor', 'bookmarkCheckbox', 'bookmarkBackground', 'externalColor', 'externalCheckbox', 'externalBackground', 'helpColor', 'helpCheckbox', 'helpBackground', 'licenseColor', 'licenseCheckbox', 'licenseBackground', 'nextColor', 'nextCheckbox', 'nextBackground', 'nofollowColor', 'nofollowCheckbox', 'nofollowBackground', 'noreferrerColor', 'noreferrerCheckbox', 'noreferrerBackground', 'noopenerColor', 'noopenerCheckbox', 'noopenerBackground', 'prevColor', 'prevCheckbox', 'prevBackground', 'searchColor', 'searchCheckbox', 'searchBackground', 'sponsoredColor', 'sponsoredCheckbox', 'sponsoredBackground', 'tagColor', 'tagCheckbox', 'tagBackground', 'ugcColor', 'ugcCheckbox', 'ugcBackground', 'noneColor', 'noneCheckbox', 'noneBackground', 'allColor', 'allCheckbox', 'allBackground']);
    alert("setting has been changed successfully.");
    window.location.reload();
  }





});

//total functional work finished 

//this code is for if domain match then create text area

chrome.storage.local.get(["firstMatchedLinks", "secondMatchedLinks", "thirdMatchedLinks", "fourthMatchedLinks", "fifthMatchedLinks",], (p) => {

  //first match domain
  if (p.firstMatchedLinks !== undefined) {
    chrome.storage.local.get("links1", (w) => {
      if (w.links1 !== undefined) {
        const fset = document.createElement("fieldset");
        fset.className = "fset1";
        document.querySelector(".linksArea").append(fset);
        const lgnd = document.createElement("legend");
        lgnd.innerHTML = w.links1.url;
        document.querySelector(".fset1").append(lgnd);
        const ctarea = document.createElement("textarea");
        ctarea.className = "firstArea";
        ctarea.value = p.firstMatchedLinks;
        ctarea.setAttribute("readonly", "true");
        document.querySelector(".fset1").append(ctarea);
        const br = document.createElement("br");
        document.querySelector(".fset1").append(br);
        const btnarea = document.createElement("button");
        btnarea.className = "firstDownload";
        btnarea.innerHTML = "Save";

        document.querySelector(".fset1").append(btnarea);
        document.querySelector(".second").append(fset);
        //for first matched domain
        document.querySelector(".firstDownload").addEventListener("click", () => {
          const dl = document.querySelector(".firstArea").value;
          d(dl, "matched-domain-links1.txt", "text/plain");

        });
      }

    });

  }

  //second match
  if (p.secondMatchedLinks !== undefined) {
    chrome.storage.local.get("links2", (w) => {
      if (w.links2 !== undefined) {
        const fset1 = document.createElement("fieldset");
        fset1.className = "fset2";
        document.querySelector(".linksArea").append(fset1);
        const lgnd1 = document.createElement("legend");
        lgnd1.innerHTML = w.links2.url;
        document.querySelector(".fset2").append(lgnd1);
        const ctarea1 = document.createElement("textarea");
        ctarea1.className = "secondArea";
        ctarea1.value = p.secondMatchedLinks;
        ctarea1.setAttribute("readonly", "true");
        document.querySelector(".fset2").append(ctarea1);
        const br1 = document.createElement("br");
        document.querySelector(".fset2").append(br1);
        const btnarea1 = document.createElement("button");
        btnarea1.className = "secondDownload";
        btnarea1.innerHTML = "Save";

        document.querySelector(".fset2").append(btnarea1);
        document.querySelector(".second").append(fset1);

        //for second matched domain
        document.querySelector(".secondDownload").addEventListener("click", () => {
          const dl = document.querySelector(".secondArea").value;
          d(dl, "matched-domain-links2.txt", "text/plain");
        });
      }
    });
  }


  //third match
  if (p.thirdMatchedLinks !== undefined) {

    chrome.storage.local.get("links3", (w) => {
      if (w.links3 !== undefined) {
        const fset2 = document.createElement("fieldset");
        fset2.className = "fset3";
        document.querySelector(".linksArea").append(fset2);
        const lgnd2 = document.createElement("legend");
        lgnd2.innerHTML = w.links3.url;
        document.querySelector(".fset3").append(lgnd2);
        const ctarea2 = document.createElement("textarea");
        ctarea2.className = "thirdArea";
        ctarea2.value = p.thirdMatchedLinks;
        ctarea2.setAttribute("readonly", "true");
        document.querySelector(".fset3").append(ctarea2);
        const br2 = document.createElement("br");
        document.querySelector(".fset3").append(br2);
        const btnarea2 = document.createElement("button");
        btnarea2.className = "thirdDownload";
        btnarea2.innerHTML = "Save";

        document.querySelector(".fset3").append(btnarea2);
        document.querySelector(".second").append(fset2);

        //for third matched domain
        document.querySelector(".thirdDownload").addEventListener("click", () => {
          const dl = document.querySelector(".thirdArea").value;
          d(dl, "matched-domain-links3.txt", "text/plain");
        });
      }
    });
  }


  //fourth match
  if (p.fourthMatchedLinks !== undefined) {
    chrome.storage.local.get("links4", (w) => {
      if (w.links4 !== undefined) {
        const fset3 = document.createElement("fieldset");
        fset3.className = "fset4";
        document.querySelector(".linksArea").append(fset3);
        const lgnd3 = document.createElement("legend");
        lgnd3.innerHTML = w.links4.url;
        document.querySelector(".fset4").append(lgnd3);
        const ctarea3 = document.createElement("textarea");
        ctarea3.className = "fourthArea";
        ctarea3.value = p.fourthMatchedLinks;
        ctarea3.setAttribute("readonly", "true");
        document.querySelector(".fset4").append(ctarea3);
        const br3 = document.createElement("br");
        document.querySelector(".fset4").append(br3);
        const btnarea3 = document.createElement("button");
        btnarea3.className = "fourthDownload";
        btnarea3.innerHTML = "Save";

        document.querySelector(".fset4").append(btnarea3);
        document.querySelector(".second").append(fset3);
        //for fourth matched domain
        document.querySelector(".fourthDownload").addEventListener("click", () => {
          const dl = document.querySelector(".fourthArea").value;
          d(dl, "matched-domain-links4.txt", "text/plain");
        });
      }
    });
  }

  //fifth match
  if (p.fifthMatchedLinks !== undefined) {
    chrome.storage.local.get("links5", (w) => {
      if (w.links5 !== undefined) {
        const fset4 = document.createElement("fieldset");
        fset4.className = "fset5";
        document.querySelector(".linksArea").append(fset4);
        const lgnd4 = document.createElement("legend");
        lgnd4.innerHTML = w.links5.url;
        document.querySelector(".fset5").append(lgnd4);
        const ctarea4 = document.createElement("textarea");
        ctarea4.className = "fifthArea";
        ctarea4.value = p.fifthMatchedLinks;
        ctarea4.setAttribute("readonly", "true");
        document.querySelector(".fset5").append(ctarea4);
        const br4 = document.createElement("br");
        document.querySelector(".fset5").append(br4);
        const btnarea4 = document.createElement("button");
        btnarea4.className = "fifthDownload";
        btnarea4.innerHTML = "Save";

        document.querySelector(".fset5").append(btnarea4);
        document.querySelector(".second").append(fset4);
        //for fifth matched domain
        document.querySelector(".fifthDownload").addEventListener("click", () => {
          const dl = document.querySelector(".fifthArea").value;
          d(dl, "matched-domain-links5.txt", "text/plain");
        });
      }
    });
  }














});

//this code is to download links by clicking the button



//for all
document.querySelector(".allDownload").addEventListener("click", () => {
  const dl = document.querySelector(".allArea").value;
  d(dl, "all-links-data.txt", "text/plain");
});

//for alternate
document.querySelector(".alternateDownload").addEventListener("click", () => {
  const dl = document.querySelector(".alternateArea").value;
  d(dl, "alternate-links-data.txt", "text/plain");
});


//for author
document.querySelector(".authorDownload").addEventListener("click", () => {
  const dl = document.querySelector(".authorArea").value;
  d(dl, "author-links-data.txt", "text/plain");
});


//for bookmark
document.querySelector(".bookmarkDownload").addEventListener("click", () => {
  const dl = document.querySelector(".bookmarkArea").value;
  d(dl, "bookmark-links-data.txt", "text/plain");
});


//for external
document.querySelector(".externalDownload").addEventListener("click", () => {
  const dl = document.querySelector(".externalArea").value;
  d(dl, "external-links-data.txt", "text/plain");
});


//for help
document.querySelector(".helpDownload").addEventListener("click", () => {
  const dl = document.querySelector(".helpArea").value;
  d(dl, "help-links-data.txt", "text/plain");
});

//for license
document.querySelector(".licenseDownload").addEventListener("click", () => {
  const dl = document.querySelector(".licenseArea").value;
  d(dl, "license-links-data.txt", "text/plain");
});

//for next
document.querySelector(".nextDownload").addEventListener("click", () => {
  const dl = document.querySelector(".nextArea").value;
  d(dl, "next-links-data.txt", "text/plain");
});


//for nofollow
document.querySelector(".nofollowDownload").addEventListener("click", () => {
  const dl = document.querySelector(".nofollowArea").value;
  d(dl, "nofollow-links-data.txt", "text/plain");
});

//for noreferrer
document.querySelector(".noreferrerDownload").addEventListener("click", () => {
  const dl = document.querySelector(".noreferrerArea").value;
  d(dl, "noreferrer-links-data.txt", "text/plain");
});

//for noopener
document.querySelector(".noopenerDownload").addEventListener("click", () => {
  const dl = document.querySelector(".noopenerArea").value;
  d(dl, "noopener-links-data.txt", "text/plain");
});

//for prev
document.querySelector(".prevDownload").addEventListener("click", () => {
  const dl = document.querySelector(".prevArea").value;
  d(dl, "prev-links-data.txt", "text/plain");
});

//for search
document.querySelector(".searchDownload").addEventListener("click", () => {
  const dl = document.querySelector(".searchArea").value;
  d(dl, "search-links-data.txt", "text/plain");
});

//for sponsored
document.querySelector(".sponsoredDownload").addEventListener("click", () => {
  const dl = document.querySelector(".sponsoredArea").value;
  d(dl, "sponsored-links-data.txt", "text/plain");
});

//for tag
document.querySelector(".tagDownload").addEventListener("click", () => {
  const dl = document.querySelector(".tagArea").value;
  d(dl, "tag-links-data.txt", "text/plain");
});

//for ugc
document.querySelector(".ugcDownload").addEventListener("click", () => {
  const dl = document.querySelector(".ugcArea").value;
  d(dl, "ugc-links-data.txt", "text/plain");
});

//for none
document.querySelector(".noneDownload").addEventListener("click", () => {
  const dl = document.querySelector(".noneArea").value;
  d(dl, "none-links-data.txt", "text/plain");
});



//download function ended

//store broken links stylesheet

document.querySelector(".brokenSubmit").addEventListener("click", () => {
  const brokenColor = document.querySelector(".brokenColor").value;
  brokenBcolor = document.querySelector(".brokenBcolor").value;
  brokenCheckbox = document.querySelector(".brokenCheckbox").checked;
  chrome.storage.sync.set({ brokenStylesheet: { brokenColor: brokenColor, brokenBcolor: brokenBcolor, brokenCheckbox: brokenCheckbox } });
  location.reload();
});

chrome.storage.sync.get("brokenStylesheet", (bst) => {
  if (bst.brokenStylesheet !== undefined) {
    document.querySelector(".brokenTableColor").innerHTML = bst.brokenStylesheet.brokenColor;
    document.querySelector(".brokenTableColor").style.backgroundColor = bst.brokenStylesheet.brokenColor;
    document.querySelector(".brokenTableBcolor").innerHTML = bst.brokenStylesheet.brokenBcolor;
    document.querySelector(".brokenTableBcolor").style.backgroundColor = bst.brokenStylesheet.brokenBcolor;
    document.querySelector(".brokenTableCheckbox").innerHTML = bst.brokenStylesheet.brokenCheckbox;
    document.querySelector(".prevBstyle").hidden = false;

  }
  document.querySelector(".remove").addEventListener("click", () => {
    chrome.storage.sync.remove("brokenStylesheet");
    location.reload();
  });

});





// class broken{
//   constructor(){
//     //to get all area data
//     this.access=()=>{
//      return document.querySelector(".allArea").value.match(/https?:\/\/|www\...*/ig);

//     }
//     this.brokenArray=[];
//     //To access Blacklisted
//     this.local=()=>{
//       chrome.storage.local.get("brokenBlacklisted",i=>{
//         const x = i.brokenBlacklisted;
//         for(items of x){

//         }
//       });
//     }
//   }
// }
// const baccess= new broken();
// acx = baccess.access();
// console.log(acx);










