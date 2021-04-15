


window.onload = function defaultSettings() {
    chrome.storage.local.get("Tmarkup", e => {
        // console.log(e.Tmarkup)
        if (e.Tmarkup !== "Disable" && e.Tmarkup !== undefined) {
            const Tmark = document.querySelectorAll("a");

            for (data of Tmark) {
                if (data.rel !== "") {


                    data.innerHTML += `<b class="brokenBold"style="  margin:0px 3px;
                background-color: black;
                border: 2px solid white;
            border-radius: 5px;
            color:red;
                width: fit-content;">${data.rel}</b>`

                }
            }
        }
    });
    //broken links checker
    chrome.storage.local.get("previousBroken", (pb) => {
        if (pb.previousBroken !== undefined) {
            chrome.storage.sync.get("brokenStylesheet", (bsta) => {
                if (bsta.brokenStylesheet !== undefined) {
                    const barea = document.createElement("textarea");
                    barea.className = "linkToolBrokenData";
                    barea.style.display = "none";
                    document.querySelector("html").append(barea);
                    document.querySelector(".linkToolBrokenData").innerHTML = pb.previousBroken;
                    const pdt1 = pb.previousBroken;
                    // document.querySelector(".linkToolBrokenData").innerHTML.split(" ");
                    const dLinks = document.querySelectorAll("a");
                    for (items of dLinks) {
                        for (i = 0; i < pdt1.length; i++) {
                            if (items.href == pdt1[i] && bsta.brokenStylesheet.brokenColor !== "#000000" && bsta.brokenStylesheet.brokenBcolor !== "#000000") {


                                items.style.color = bsta.brokenStylesheet.brokenColor;
                                items.style.backgroundColor = bsta.brokenStylesheet.brokenBcolor;
                                items.innerHTML += "<b class='brokenBold' style='color:red'>Broken</b>";

                                //  sec =   confirm("You Clicked On Broken Link Do you want to continue");
                                //  if(sec!==true){
                                //      location.href="#";
                                //  }




                            }
                            if (items.href == pdt1[i] && bsta.brokenStylesheet.brokenCheckbox !== false) {
                                items.style.textDecoration = "line-through"
                                // items.style.color = bsta.brokenStylesheet.brokenColor;
                                // items.style.backgroundColor = bsta.brokenStylesheet.brokenBcolor;
                                // items.innerHTML += "<b class='brokenBold' style='color:red'>Broken</b>";
                            }
                        }
                    }
                }
            });
        }

    });
    //table color
    chrome.storage.sync.get(['alternateColor', 'alternateCheckbox', 'alternateBackground', 'authorColor', 'authorCheckbox', 'authorBackground', 'bookmarkColor', 'bookmarkCheckbox', 'bookmarkBackground', 'externalColor', 'externalCheckbox', 'externalBackground', 'helpColor', 'helpCheckbox', 'helpBackground', 'licenseColor', 'licenseCheckbox', 'licenseBackground', 'nextColor', 'nextCheckbox', 'nextBackground', 'nofollowColor', 'nofollowCheckbox', 'nofollowBackground', 'noreferrerColor', 'noreferrerCheckbox', 'noreferrerBackground', 'noopenerColor', 'noopenerCheckbox', 'noopenerBackground', 'prevColor', 'prevCheckbox', 'prevBackground', 'searchColor', 'searchCheckbox', 'searchBackground', 'sponsoredColor', 'sponsoredCheckbox', 'sponsoredBackground', 'tagColor', 'tagCheckbox', 'tagBackground', 'ugcColor', 'ugcCheckbox', 'ugcBackground', 'noneColor', 'noneCheckbox', 'noneBackground', 'allColor', 'allCheckbox', 'allBackground'], (alternateData) => {

        //Alternate
        //for color

        if (alternateData.alternateColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='alternate']").length; i++) {

                document.querySelectorAll("a[rel*='alternate']")[i].style.color = `${alternateData.alternateColor}`;

            }
        }

        //for checkbox

        if (alternateData.alternateCheckbox !== undefined && alternateData.alternateCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='alternate']").length; i++) {

                document.querySelectorAll("a[rel*='alternate']")[i].style.textDecoration = `line-through`;

            }
        }

        //for background  
        if (alternateData.alternateBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='alternate']").length; i++) {

                document.querySelectorAll("a[rel*='alternate']")[i].style.backgroundColor = `${alternateData.alternateBackground}`;

            }
        }


        //Author
        //for color

        if (alternateData.authorColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='author']").length; i++) {

                document.querySelectorAll("a[rel*='author']")[i].style.color = `${alternateData.authorColor}`;
            }
        }

        //for checkbox

        if (alternateData.authorCheckbox !== undefined && alternateData.authorCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='author']").length; i++) {

                document.querySelectorAll("a[rel*='author']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.authorBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='author']").length; i++) {

                document.querySelectorAll("a[rel*='author']")[i].style.backgroundColor = `${alternateData.authorBackground}`;

            }
        }



        //Bookmark
        //for color

        if (alternateData.bookmarkColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='bookmark']").length; i++) {

                document.querySelectorAll("a[rel*='bookmark']")[i].style.color = `${alternateData.bookmarkColor}`;
            }
        }

        //for checkbox

        if (alternateData.bookmarkCheckbox !== undefined && alternateData.bookmarkCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='bookmark']").length; i++) {

                document.querySelectorAll("a[rel*='bookmark']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.bookmarkBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='bookmark']").length; i++) {

                document.querySelectorAll("a[rel*='bookmark']")[i].style.backgroundColor = `${alternateData.bookmarkBackground}`;

            }
        }


        //External
        //for color

        if (alternateData.externalColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='external']").length; i++) {

                document.querySelectorAll("a[rel*='external']")[i].style.color = `${alternateData.externalColor}`;
            }
        }

        //for checkbox

        if (alternateData.externalCheckbox !== undefined && alternateData.externalCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='external']").length; i++) {

                document.querySelectorAll("a[rel*='external']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.externalBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='external']").length; i++) {

                document.querySelectorAll("a[rel*='external']")[i].style.backgroundColor = `${alternateData.externalBackground}`;

            }
        }

        //Help
        //for color

        if (alternateData.helpColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='help']").length; i++) {

                document.querySelectorAll("a[rel*='help']")[i].style.color = `${alternateData.helpColor}`;
            }
        }

        //for checkbox

        if (alternateData.helpCheckbox !== undefined && alternateData.helpCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='help']").length; i++) {

                document.querySelectorAll("a[rel*='help']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.helpBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='help']").length; i++) {

                document.querySelectorAll("a[rel*='help']")[i].style.backgroundColor = `${alternateData.helpBackground}`;

            }
        }

        //License
        //for color

        if (alternateData.licenseColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='license']").length; i++) {

                document.querySelectorAll("a[rel*='license']")[i].style.color = `${alternateData.licenseColor}`;
            }
        }

        //for checkbox

        if (alternateData.licenseCheckbox !== undefined && alternateData.licenseCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='license']").length; i++) {

                document.querySelectorAll("a[rel*='license']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.licenseBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='license']").length; i++) {

                document.querySelectorAll("a[rel*='license']")[i].style.backgroundColor = `${alternateData.licenseBackground}`;

            }
        }


        //Next
        //for color

        if (alternateData.nextColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='next']").length; i++) {

                document.querySelectorAll("a[rel*='next']")[i].style.color = `${alternateData.nextColor}`;
            }
        }

        //for checkbox

        if (alternateData.nextCheckbox !== undefined && alternateData.nextCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='next']").length; i++) {

                document.querySelectorAll("a[rel*='next']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.nextBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='next']").length; i++) {

                document.querySelectorAll("a[rel*='next']")[i].style.backgroundColor = `${alternateData.nextBackground}`;

            }
        }

        //Nofollow
        //for color

        if (alternateData.nofollowColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='nofollow']").length; i++) {

                document.querySelectorAll("a[rel*='nofollow']")[i].style.color = `${alternateData.nofollowColor}`;
            }
        }

        //for checkbox

        if (alternateData.nofollowCheckbox !== undefined && alternateData.nofollowCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='nofollow']").length; i++) {

                document.querySelectorAll("a[rel*='nofollow']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.nofollowBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='nofollow']").length; i++) {

                document.querySelectorAll("a[rel*='nofollow']")[i].style.backgroundColor = `${alternateData.nofollowBackground}`;

            }
        }


        //Noreferrer
        //for color

        if (alternateData.noreferrerColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='noreferrer']").length; i++) {

                document.querySelectorAll("a[rel*='noreferrer']")[i].style.color = `${alternateData.noreferrerColor}`;
            }
        }

        //for checkbox

        if (alternateData.noreferrerCheckbox !== undefined && alternateData.noreferrerCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='noreferrer']").length; i++) {

                document.querySelectorAll("a[rel*='noreferrer']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.noreferrerBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='noreferrer']").length; i++) {

                document.querySelectorAll("a[rel*='noreferrer']")[i].style.backgroundColor = `${alternateData.noreferrerBackground}`;

            }
        }

        //Noopener
        //for color

        if (alternateData.noopenerColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='noopener']").length; i++) {

                document.querySelectorAll("a[rel*='noopener']")[i].style.color = `${alternateData.noopenerColor}`;
            }
        }

        //for checkbox

        if (alternateData.noopenerCheckbox !== undefined && alternateData.noopenerCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='noopener']").length; i++) {

                document.querySelectorAll("a[rel*='noopener']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.noopenerBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='noopener']").length; i++) {

                document.querySelectorAll("a[rel*='noopener']")[i].style.backgroundColor = `${alternateData.noopenerBackground}`;

            }
        }


        //Prev
        //for color

        if (alternateData.prevColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='prev']").length; i++) {

                document.querySelectorAll("a[rel*='prev']")[i].style.color = `${alternateData.prevColor}`;
            }
        }

        //for checkbox

        if (alternateData.prevCheckbox !== undefined && alternateData.prevCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='prev']").length; i++) {

                document.querySelectorAll("a[rel*='prev']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.prevBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='prev']").length; i++) {

                document.querySelectorAll("a[rel*='prev']")[i].style.backgroundColor = `${alternateData.prevBackground}`;

            }
        }

        //Search
        //for color

        if (alternateData.searchColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='search']").length; i++) {

                document.querySelectorAll("a[rel*='search']")[i].style.color = `${alternateData.searchColor}`;
            }
        }

        //for checkbox

        if (alternateData.searchCheckbox !== undefined && alternateData.searchCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='search']").length; i++) {

                document.querySelectorAll("a[rel*='search']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.searchBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='search']").length; i++) {

                document.querySelectorAll("a[rel*='search']")[i].style.backgroundColor = `${alternateData.searchBackground}`;

            }
        }

        //Sponsored
        //for color

        if (alternateData.sponsoredColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='sponsored']").length; i++) {

                document.querySelectorAll("a[rel*='sponsored']")[i].style.color = `${alternateData.sponsoredColor}`;
            }
        }

        //for checkbox

        if (alternateData.sponsoredCheckbox !== undefined && alternateData.sponsoredCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='sponsored']").length; i++) {

                document.querySelectorAll("a[rel*='sponsored']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.sponsoredBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='sponsored']").length; i++) {

                document.querySelectorAll("a[rel*='sponsored']")[i].style.backgroundColor = `${alternateData.sponsoredBackground}`;

            }
        }


        //Tag
        //for color

        if (alternateData.tagColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='tag']").length; i++) {

                document.querySelectorAll("a[rel*='tag']")[i].style.color = `${alternateData.tagColor}`;
            }
        }

        //for checkbox

        if (alternateData.tagCheckbox !== undefined && alternateData.tagCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='tag']").length; i++) {

                document.querySelectorAll("a[rel*='tag']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.tagBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='tag']").length; i++) {

                document.querySelectorAll("a[rel*='tag']")[i].style.backgroundColor = `${alternateData.tagBackground}`;

            }
        }

        //UGC
        //for color

        if (alternateData.ugcColor !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='ugc']").length; i++) {

                document.querySelectorAll("a[rel*='ugc']")[i].style.color = `${alternateData.ugcColor}`;
            }
        }

        //for checkbox

        if (alternateData.ugcCheckbox !== undefined && alternateData.ugcCheckbox != false) {

            for (i = 0; i < document.querySelectorAll("a[rel*='ugc']").length; i++) {

                document.querySelectorAll("a[rel*='ugc']")[i].style.textDecoration = `line-through`;
            }
        }

        //for background  
        if (alternateData.ugcBackground !== undefined) {

            for (i = 0; i < document.querySelectorAll("a[rel*='ugc']").length; i++) {

                document.querySelectorAll("a[rel*='ugc']")[i].style.backgroundColor = `${alternateData.ugcBackground}`;

            }
        }

        //None

        let x = document.querySelectorAll("a");
        for (i = 0; i < x.length; i++) {
            y = document.querySelectorAll("a")[i].getAttribute('rel');
            if (y == null) {




                if (alternateData.noneColor !== undefined) {
                    document.querySelectorAll("a")[i].style.color = alternateData.noneColor;
                }

                //for checkbox

                if (alternateData.noneCheckbox !== undefined && alternateData.noneCheckbox != false) {



                    document.querySelectorAll("a")[i].style.textDecoration = `line-through`;

                }

                //for background  
                if (alternateData.noneBackground !== undefined) {


                    document.querySelectorAll("a")[i].style.backgroundColor = `${alternateData.noneBackground}`;


                }

            }

        }

        //All

        let xol = document.querySelectorAll("a");
        for (j = 0; j < xol.length; j++) {
            yol = document.querySelectorAll("a")[j];




            //for color

            if (alternateData.allColor !== undefined) {
                document.querySelectorAll("a")[j].style.color = alternateData.allColor;
            }

            //for checkbox

            if (alternateData.allCheckbox !== undefined && alternateData.allCheckbox != false) {



                document.querySelectorAll("a")[j].style.textDecoration = `line-through`;

            }

            //for background  
            if (alternateData.allBackground !== undefined) {


                document.querySelectorAll("a")[j].style.backgroundColor = `${alternateData.allBackground}`;


            }

        }






    });
}


/*
this code is written for save links data to storage
*/


//for all
const alls = document.createElement("div");
alls.className = "allLi";
document.querySelector("html").append(alls);
const allf = document.querySelectorAll("a");
for (lo = 0; lo < allf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `all${lo}`;
    fgh.innerHTML = document.querySelectorAll("a")[lo] + "<br>";
    document.querySelector(".allLi").append(fgh);
}

chrome.storage.local.set({ allUrls: document.querySelector(".allLi").innerText });
document.querySelector(".allLi").remove();


//for alternate
const alt = document.createElement("div");
alt.className = "altLi";
document.querySelector("html").append(alt);
const altf = document.querySelectorAll("a[rel*='alternate']");
for (lo = 0; lo < altf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `alternate${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='alternate']")[lo] + "<br>";
    document.querySelector(".altLi").append(fgh);
}

chrome.storage.local.set({ alternateUrls: document.querySelector(".altLi").innerText });
document.querySelector(".altLi").remove();

//for author
const aut = document.createElement("div");
aut.className = "autLi";
document.querySelector("html").append(aut);
const autf = document.querySelectorAll("a[rel*='author']");
for (lo = 0; lo < autf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `author${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='author']")[lo] + "<br>";
    document.querySelector(".autLi").append(fgh);
}

chrome.storage.local.set({ authorUrls: document.querySelector(".autLi").innerText });
document.querySelector(".autLi").remove();


//for bookmark
const bok = document.createElement("div");
bok.className = "bokLi";
document.querySelector("html").append(bok);
const bokf = document.querySelectorAll("a[rel*='bookmark']");
for (lo = 0; lo < bokf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `bookmark${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='bookmark']")[lo] + "<br>";
    document.querySelector(".bokLi").append(fgh);
}

chrome.storage.local.set({ bookmarkUrls: document.querySelector(".bokLi").innerText });
document.querySelector(".bokLi").remove();


//for external
const exts = document.createElement("div");
exts.className = "extLi";
document.querySelector("html").append(exts);
const extf = document.querySelectorAll("a[rel*='external']");
for (lo = 0; lo < extf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `external${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='external']")[lo] + "<br>";
    document.querySelector(".extLi").append(fgh);
}

chrome.storage.local.set({ externalUrls: document.querySelector(".extLi").innerText });
document.querySelector(".extLi").remove();


//for help
const hlp = document.createElement("div");
hlp.className = "hlpLi";
document.querySelector("html").append(hlp);
const hlpf = document.querySelectorAll("a[rel*='help']");
for (lo = 0; lo < hlpf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `help${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='help']")[lo] + "<br>";
    document.querySelector(".hlpLi").append(fgh);
}

chrome.storage.local.set({ helpUrls: document.querySelector(".hlpLi").innerText });
document.querySelector(".hlpLi").remove();

//for license
const lcs = document.createElement("div");
lcs.className = "lcsLi";
document.querySelector("html").append(lcs);
const lcsf = document.querySelectorAll("a[rel*='license']");
for (lo = 0; lo < lcsf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `license${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='license']")[lo] + "<br>";
    document.querySelector(".lcsLi").append(fgh);
}

chrome.storage.local.set({ licenseUrls: document.querySelector(".lcsLi").innerText });
document.querySelector(".lcsLi").remove();

//for next
const nxt = document.createElement("div");
nxt.className = "nxtLi";
document.querySelector("html").append(nxt);
const nxtf = document.querySelectorAll("a[rel*='next']");
for (lo = 0; lo < nxtf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `next${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='next']")[lo] + "<br>";
    document.querySelector(".nxtLi").append(fgh);
}

chrome.storage.local.set({ nextUrls: document.querySelector(".nxtLi").innerText });
document.querySelector(".nxtLi").remove();

//for nofollow
const nfw = document.createElement("div");
nfw.className = "nfwLi";
document.querySelector("html").append(nfw);
const nfwf = document.querySelectorAll("a[rel*='nofollow']");
for (lo = 0; lo < nfwf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `nofollow${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='nofollow']")[lo] + "<br>";
    document.querySelector(".nfwLi").append(fgh);
}

chrome.storage.local.set({ nofollowUrls: document.querySelector(".nfwLi").innerText });
document.querySelector(".nfwLi").remove();

//for norefeerrer
const nrf = document.createElement("div");
nrf.className = "nrfLi";
document.querySelector("html").append(nrf);
const nrff = document.querySelectorAll("a[rel*='noreferrer']");
for (lo = 0; lo < nrff.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `noreferrer${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='noreferrer']")[lo] + "<br>";
    document.querySelector(".nrfLi").append(fgh);
}

chrome.storage.local.set({ noreferrerUrls: document.querySelector(".nrfLi").innerText });
document.querySelector(".nrfLi").remove();

//for noopener
const npr = document.createElement("div");
npr.className = "nprLi";
document.querySelector("html").append(npr);
const nprf = document.querySelectorAll("a[rel*='noopener']");
for (lo = 0; lo < nprf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `noopener${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='noopener']")[lo] + "<br>";
    document.querySelector(".nprLi").append(fgh);
}

chrome.storage.local.set({ noopenerUrls: document.querySelector(".nprLi").innerText });
document.querySelector(".nprLi").remove();

//for prev
const prv = document.createElement("div");
prv.className = "prvLi";
document.querySelector("html").append(prv);
const prvf = document.querySelectorAll("a[rel*='prev']");
for (lo = 0; lo < prvf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `prev${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='prev']")[lo] + "<br>";
    document.querySelector(".prvLi").append(fgh);
}

chrome.storage.local.set({ prevUrls: document.querySelector(".prvLi").innerText });
document.querySelector(".prvLi").remove();


//for search
const srh = document.createElement("div");
srh.className = "srhLi";
document.querySelector("html").append(srh);
const srhf = document.querySelectorAll("a[rel*='search']");
for (lo = 0; lo < srhf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `search${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='search']")[lo] + "<br>";
    document.querySelector(".srhLi").append(fgh);
}

chrome.storage.local.set({ searchUrls: document.querySelector(".srhLi").innerText });
document.querySelector(".srhLi").remove();

//for sponsored
const spn = document.createElement("div");
spn.className = "spnLi";
document.querySelector("html").append(spn);
const spnf = document.querySelectorAll("a[rel*='sponsored']");
for (lo = 0; lo < spnf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `sponsored${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='sponsored']")[lo] + "<br>";
    document.querySelector(".spnLi").append(fgh);
}

chrome.storage.local.set({ sponsoredUrls: document.querySelector(".spnLi").innerText });
document.querySelector(".spnLi").remove();

//for tag
const tag = document.createElement("div");
tag.className = "tagLi";
document.querySelector("html").append(tag);
const tagf = document.querySelectorAll("a[rel*='tag']");
for (lo = 0; lo < tagf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `tag${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='tag']")[lo] + "<br>";
    document.querySelector(".tagLi").append(fgh);
}

chrome.storage.local.set({ tagUrls: document.querySelector(".tagLi").innerText });
document.querySelector(".tagLi").remove();

//for ugc
const ugc = document.createElement("div");
ugc.className = "ugcLi";
document.querySelector("html").append(ugc);
const ugcf = document.querySelectorAll("a[rel*='ugc']");
for (lo = 0; lo < ugcf.length; lo++) {
    fgh = document.createElement("span");
    fgh.className = `ugc${lo}`;
    fgh.innerHTML = document.querySelectorAll("a[rel*='ugc']")[lo] + "<br>";
    document.querySelector(".ugcLi").append(fgh);
}

chrome.storage.local.set({ ugcUrls: document.querySelector(".ugcLi").innerText });
document.querySelector(".ugcLi").remove();

//for none


const nnu = document.createElement("div");
nnu.className = "nLi";
document.querySelector("html").append(nnu);
const nnn = document.querySelectorAll("a");
for (lo = 0; lo < nnn.length; lo++) {
    nnnl = document.querySelectorAll("a")[lo].getAttribute('rel');
    if (nnnl == null) {
        fgh = document.createElement("span");
        fgh.className = `none${lo}`;
        fgh.innerHTML = document.querySelectorAll("a")[lo] + "<br>";
        document.querySelector(".nLi").append(fgh);
    }
}
chrome.storage.local.set({ noneUrls: document.querySelector(".nLi").innerText });
document.querySelector(".nLi").remove();

//this code is written for spam links detection

const homjaiga = document.querySelectorAll("a");
chrome.storage.local.get(["links1", "links2", "links3", "links4", "links5"], (u) => {
    if (u.links1 !== undefined) {
        try {
            areplace = u.links1.url.replace(/(http:\/\/|https:\/\/|www\.)/ig, "");
            method = areplace.trim();
        }
        catch (e) {
            console.log("links is not matching");
        }
    }
    if (u.links2 !== undefined) {
        try {
            breplace = u.links2.url.replace(/(https:\/\/|http:\/\/|www\.)/ig, "");
            method1 = breplace.trim();

        } catch (e) {
            console.log("links is not matching");
        }
    }
    if (u.links3 !== undefined) {
        try {
            creplace = u.links3.url.replace(/(https:\/\/|http:\/\/|www\.)/ig, "");
            method2 = creplace.trim();
        } catch (e) {
            console.log("links is not matching");
        }
    }
    if (u.links4 !== undefined) {
        try {
            dreplace = u.links4.url.replace(/(https:\/\/|http:\/\/|www\.)/ig, "");
            method3 = dreplace.trim();
        } catch (e) {
            console.log("links not matching");
        }
    }
    if (u.links5 !== undefined) {
        try {
            ereplace = u.links5.url.replace(/(https:\/\/|http:\/\/|www\.)/ig, "");
            method4 = ereplace.trim();
        } catch (e) {
            console.log("links not matching");
        }
    }





    const forMatched = document.createElement("div");
    forMatched.className = "formatcheddiv";
    document.querySelector("html").append(forMatched);


    for (hi = 0; hi < homjaiga.length; hi++) {
        try {
            aregx = new RegExp(method, 'ig');
            bregx = new RegExp(method1, 'ig');
            cregx = new RegExp(method2, 'ig');
            dregx = new RegExp(method3, 'ig');
            eregx = new RegExp(method4, 'ig');
        } catch (e) {
            e = "links not found";
        }

        function prom1() {
            return new Promise((resolve, reject) => {
                //for links1
                if (document.querySelectorAll("a")[hi].href.match(aregx)) {
                    gh = document.querySelectorAll("a")[hi].href;



                    document.querySelectorAll("a")[hi].style.color = u.links1.color;
                    document.querySelectorAll("a")[hi].style.backgroundColor = u.links1.bcolor;
                    if (u.links1.checkbox !== "false") {
                        document.querySelectorAll("a")[hi].style.textDecoration = "line-through";
                    }
                    resolve(gh);
                }
                else {
                    reject(chrome.storage.local.remove("firstMatchedLinks"));
                }


            });
        }
        prom1().then((o) => {

            let forMatched = document.createElement("div");
            forMatched.className = "formatcheddiv1";
            document.querySelector("html").append(forMatched);

            spanarea = document.createElement("span");
            spanarea.className = `linksformatched${hi}`;
            spanarea.innerHTML = o + "<br>";
            document.querySelector(".formatcheddiv1").append(spanarea);
            chrome.storage.local.set({ firstMatchedLinks: document.querySelector(".formatcheddiv1").innerText }, () => {
                document.querySelector(".formatcheddiv1").remove();
            });
        }).catch((e) => {
            a = "dont display errors";

        });















        function prom2() {
            return new Promise((resolve, reject) => {


                //for links 2

                if (document.querySelectorAll("a")[hi].href.match(bregx)) {
                    gh = document.querySelectorAll("a")[hi].href;



                    document.querySelectorAll("a")[hi].style.color = u.links2.color;
                    document.querySelectorAll("a")[hi].style.backgroundColor = u.links2.bcolor;
                    if (u.links2.checkbox !== "false") {
                        document.querySelectorAll("a")[hi].style.textDecoration = "line-through";
                    }
                    resolve(gh);
                }
                else {

                    reject(chrome.storage.local.remove("secondMatchedLinks"));
                }

            });
        }
        prom2().then((i) => {

            let forMatched1 = document.createElement("div");
            forMatched1.className = "formatcheddiv2";
            document.querySelector("html").append(forMatched1);

            spanarea = document.createElement("span");
            spanarea.className = `linksformatched${hi}`;
            spanarea.innerHTML = i + "<br>";
            document.querySelector(".formatcheddiv2").append(spanarea);
            chrome.storage.local.set({ secondMatchedLinks: document.querySelector(".formatcheddiv2").innerText }, () => {
                document.querySelector(".formatcheddiv2").remove();
            });
        }).catch(() => {

            a = "dont display errors";

        });
        function prom3() {
            return new Promise((resolve, reject) => {

                if (document.querySelectorAll("a")[hi].href.match(cregx)) {
                    gh = document.querySelectorAll("a")[hi].href;
                    document.querySelectorAll("a")[hi].style.color = u.links3.color;
                    document.querySelectorAll("a")[hi].style.backgroundColor = u.links3.bcolor;
                    if (u.links3.checkbox !== "false") {
                        document.querySelectorAll("a")[hi].style.textDecoration = "line-through";
                    }
                    resolve(gh);
                }
                else {
                    reject(chrome.storage.local.remove("thirdMatchedLinks"));
                }

            });
        }
        prom3().then((a) => {
            let forMatched2 = document.createElement("div");
            forMatched2.className = "formatcheddiv3";
            document.querySelector("html").append(forMatched2);

            spanarea = document.createElement("span");
            spanarea.className = `linksformatched${hi}`;
            spanarea.innerHTML = a + "<br>";
            document.querySelector(".formatcheddiv3").append(spanarea);
            chrome.storage.local.set({ thirdMatchedLinks: document.querySelector(".formatcheddiv3").innerText }, () => {
                document.querySelector(".formatcheddiv3").remove();
            });

        }).catch(() => {

            a = "dont display errors";
        });



        function prom4() {
            return new Promise((resolve, reject) => {
                //for links4

                if (document.querySelectorAll("a")[hi].href.match(dregx)) {
                    gh = document.querySelectorAll("a")[hi].href;
                    document.querySelectorAll("a")[hi].style.color = u.links4.color;
                    document.querySelectorAll("a")[hi].style.backgroundColor = u.links4.bcolor;
                    if (u.links4.checkbox !== "false") {
                        document.querySelectorAll("a")[hi].style.textDecoration = "line-through";
                    }
                    resolve(gh);
                }
                else {
                    reject(chrome.storage.local.remove("fourthMatchedLinks"));
                }

            });
        }
        prom4().then((k) => {

            let forMatched3 = document.createElement("div");
            forMatched3.className = "formatcheddiv4";
            document.querySelector("html").append(forMatched3);

            spanarea = document.createElement("span");
            spanarea.className = `linksformatched${hi}`;
            spanarea.innerHTML = k + "<br>";
            document.querySelector(".formatcheddiv4").append(spanarea);
            chrome.storage.local.set({ fourthMatchedLinks: document.querySelector(".formatcheddiv4").innerText }, () => {
                document.querySelector(".formatcheddiv4").remove();
            });

        }).catch(() => {

            a = "dont display errors";
        });


        function prom5() {
            return new Promise((resolve, reject) => {
                //for links5

                if (document.querySelectorAll("a")[hi].href.match(eregx)) {
                    gh = document.querySelectorAll("a")[hi].href;
                    document.querySelectorAll("a")[hi].style.color = u.links5.color;
                    document.querySelectorAll("a")[hi].style.backgroundColor = u.links5.bcolor;
                    if (u.links5.checkbox !== "false") {
                        document.querySelectorAll("a")[hi].style.textDecoration = "line-through";
                    }
                    resolve(gh);
                }
                else {
                    reject(chrome.storage.local.remove("fifthMatchedLinks"));
                }

            });
        }
        prom5().then(o => {
            let forMatched4 = document.createElement("div");
            forMatched4.className = "formatcheddiv5";
            document.querySelector("html").append(forMatched4);

            spanarea = document.createElement("span");
            spanarea.className = `linksformatched${hi}`;
            spanarea.innerHTML = o + "<br>";
            document.querySelector(".formatcheddiv5").append(spanarea);
            chrome.storage.local.set({ fifthMatchedLinks: document.querySelector(".formatcheddiv5").innerText }, () => {
                document.querySelector(".formatcheddiv5").remove();
            });

        }).catch(() => {

            a = "dont display errors";
        });








    }
});






