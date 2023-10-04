// Copyright (C)2023-present Xander Christopher.
// All Rights Reserves.
// See LICENSE before using this Code.

let opaThkDiv = document.getElementById("opaThkDiv");
let clrTogBut = document.getElementById("clrTogBut");
let opaThkDiv2 = $("#opaThkDiv");
let clrTogDiv2 = $("#clrTogDiv");
let clrTogDiv = document.getElementById("clrTogDiv");
let clrPallate = document.getElementById("clrPallate");
let currColor = "#000000";
let colorsPa;
let root_html = document.querySelector(":root");
let themeDiv = document.getElementById("themeDiv");
let timDv = document.getElementById("tiMDv");
// if (('serviceWorker' in navigator)) {
//     navigator.serviceWorker.register('../PDFViewer/sw.js')
//     .then(function (registration) {
//         console.log('SW registered! Scope is:', registration.scope);
//     })
//     .catch((err) => {
//         console.log("Error occured in registering the Service Worker.", err);
//     })
// }else{
//     console.log("Service Worker not supported");
// }
let styLE4 = document.createElement("link");
styLE4.rel = 'stylesheet';
styLE4.type = 'text/css';
if (localStorage.getItem("theme") == "dark") {
    styLE4.setAttribute("id", "darkCSS");
    styLE4.setAttribute("href", "Styles/darkTheme.css");
    document.head.appendChild(styLE4);
    document.querySelector("#darkTheme").checked = true;
} else if (localStorage.getItem("theme") == "light") {
    document.querySelector("#lightTheme").checked = true;
} else {
    styLE4.setAttribute("id", "sysCSS");
    styLE4.setAttribute("href", "Styles/sysTheme.css");
    document.head.appendChild(styLE4);
    document.querySelector("#systemTheme").checked = true;
}
if ('windowControlsOverlay' in navigator) {
    navigator.windowControlsOverlay.addEventListener('geometrychange', () => {
        if (navigator.windowControlsOverlay.visible) {
            document.querySelector("#toolbarContainer").classList.add("toolbarContainer");
            document.querySelector("#mainContainer > div.toolbar > div.mainToolbar").classList.add("toolbarContainer");
            document.querySelector("#scaleSelect").style.background = "#393939";
            document.querySelector("#toolbarViewer").classList.add("pdRt0");
            root_html.style.setProperty("--viewer-top", "30px");
        } else {
            document.querySelector("#toolbarContainer").classList.remove("toolbarContainer");
            document.querySelector("#mainContainer > div.toolbar > div.mainToolbar").classList.remove("toolbarContainer");
            document.querySelector("#scaleSelect").style.background = "auto";
            document.querySelector("#toolbarViewer").classList.remove("pdRt0");
            root_html.style.setProperty("--viewer-top", "45px");
        }
    });
}
document.getElementById("editPDFCon").addEventListener("click", () => {
    $("#editorToolContainer").fadeToggle(150);
    $("#editorToolContainer").css.display = "flex";
})
document.getElementById("opaThkTogDiv").addEventListener("click", () => {
    if (opaThkDiv.classList.contains("hidden")) {
        opaThkDiv.classList.remove("hidden");
        if (clrTogDiv.classList.contains("hidden")) {
            opaThkDiv2.fadeIn(150);
        } else {
            clrTogDiv.classList.add("hidden");
            opaThkDiv2.fadeIn(0);
            clrTogDiv2.fadeOut(0);
        }
    } else {
        opaThkDiv2.fadeOut(150);
        setTimeout(() => { opaThkDiv.classList.add("hidden") }, 150);
    }
})
clrTogBut.addEventListener("click", () => {
    if (clrTogDiv.classList.contains("hidden")) {
        clrTogDiv.classList.remove("hidden");
        if (opaThkDiv.classList.contains("hidden")) {
            clrTogDiv2.fadeIn(150);
        } else {
            opaThkDiv.classList.add("hidden");
            clrTogDiv2.fadeIn(0);
            opaThkDiv2.fadeOut(0);
        }
    } else {
        clrTogDiv2.fadeOut(150);
        setTimeout(() => { clrTogDiv.classList.add("hidden") }, 150);
    }
})
function triggerInput(element, vlue) {
    element.value = vlue;
    var event = new Event('input', {
        "bubbles": true,
        "cancelable": true
    });
    root_html.style.setProperty("--ink-color", vlue);
    element.dispatchEvent(event);
}
fetch("../PDFViewer/Others/colors.json").then(
    (response) => response.json()
        .then(
            (json) => {
                colorsPa = json;
            }
        )
        .then(
            () => {
                for (let i = 0; i < 24; i++) {
                    let elem = document.createElement("label");
                    let elem2 = document.createElement("input");
                    let clrkd = "a" + (i + 1);
                    elem.classList.add("colorItem");
                    elem2.classList.add("colorItemInp");
                    if (colorsPa[clrkd]["value"] == currColor) {
                        elem2.classList.add("colorItemInpSlc");
                    }
                    elem2.type = "radio";
                    elem2.name = "color-swatch";
                    elem2.value = colorsPa[clrkd]["value"];
                    elem2.id = colorsPa[clrkd]["value"];
                    elem2.style.backgroundColor = colorsPa[clrkd]["value"];
                    elem.title = colorsPa[clrkd]["name"];
                    elem.setAttribute("for", colorsPa[clrkd]["value"]);
                    elem.setAttribute("aria-label", colorsPa[clrkd]["name"]);
                    elem.appendChild(elem2);
                    clrPallate.appendChild(elem);
                }
            }
        )
        .then(
            () => {
                document.querySelectorAll(".colorItem").forEach((item) => {
                    item.addEventListener("click", (event) => {
                        if (event.target.classList.contains("colorItemInp")) {
                            let colorVal = event.target.getAttribute("value");
                            triggerInput(document.querySelector("#editorInkColor"), colorVal);
                        }
                    })
                })
            }
        )
)
let colorChooseDv = document.getElementById("clrChooseDv");
const Bg = new Alwan("#clrChooseBtn", {
    color: 'black',
    toggle: false,
    popover: false,
    target: colorChooseDv,
    theme: 'dark',
    format: 'hex',
    opacity: false,
    preview: false,
    copy: false,
    preset: false
});
let clrChooseBtn = document.querySelector("#clrChooseBtn");
clrChooseBtn.style.display = "initial";
clrChooseBtn.addEventListener("click", () => {
    if (colorChooseDv.classList.contains("hidden")) {
        colorChooseDv.classList.remove("hidden");
        document.querySelector("#clrTogDiv > div.clrPallate").classList.add("hidden");
        clrChooseBtn.classList.add("btnSlcTd");
        document.querySelector("#clrTogDiv > div.opaClrDv2 > button.choosePlt").classList.remove("btnSlcTd");
    }
})
document.querySelector("#clrTogDiv > div.opaClrDv2 > button.choosePlt.btnSlcTd").addEventListener("click", () => {
    if (document.querySelector("#clrTogDiv > div.clrPallate").classList.contains("hidden")) {
        colorChooseDv.classList.add("hidden");
        document.querySelector("#clrTogDiv > div.clrPallate").classList.remove("hidden");
        clrChooseBtn.classList.remove("btnSlcTd");
        document.querySelector("#clrTogDiv > div.opaClrDv2 > button.choosePlt").classList.add("btnSlcTd");
    }
})
Bg.on("color", (ev) => {
    triggerInput(document.querySelector("#editorInkColor"), ev.hex);
})
document.getElementById("AppName").addEventListener("click", () => {
    closeIntro();
})
document.getElementById("DevIntroClose").addEventListener("click", () => {
    closeIntro();
})
function closeIntro() {
    let dialog = document.getElementById("DevIntro");
    if (dialog.classList.contains("hidden")) {
        dialog.classList.remove("hidden");
    } else {
        dialog.classList.add("hidden");
    }
}
document.querySelector("#viewerContainer").addEventListener('click', () => {
    let targets = document.getElementsByClassName("hidden");
    for (let i = 0; i < targets.length; i++) {
        if (targets[i].id != "clrTogDiv") {
            clrTogDiv.classList.add("hidden");
        } else if (targets[i].id != "opaThkDiv") {
            opaThkDiv.classList.add("hidden");
        } else if (targets[i].id != "themeDiv") {
            themeDiv.classList.add("hidden");
        }
    }
})
document.getElementById("changeTheme").addEventListener("click", () => {
    themeDiv.classList.toggle("hidden");
})
document.getElementById("TimerBtn").addEventListener("click", () => {
    timDv.classList.toggle("hidden");
})
const timerWorker = new Worker('Scripts/timer.worker.js');
timerWorker.onmessage = (e) => {
    if (e.data == "Completed") {
        console.log("Timer Completed");
        pauseBtn.classList.add("hidden");
        startBtn.classList.remove("hidden");
    }
    if (e.data[0] == "Time") {
        displayTime(e.data[1]);
    }
}
function postM(msg) {
    timerWorker.postMessage(msg);
    console.log("Message Posted");
}
function myFun1() {
    console.log("nkcd");
    clearInterval(INterval);
    postM("Comp");
}
let hrsSho = document.getElementById("hrsSho");
let minSho = document.getElementById("minSho");
let secSho = document.getElementById("secSho");
let shoTmi = document.getElementById("shoTmI");
let inpTmi = document.getElementById("inpTmI");
let startBtn = document.getElementById("strtBtn");
let pauseBtn = document.getElementById("pausBtn");
let resumeBtn = document.getElementById("resmBtn");
let resetBtn = document.getElementById("rstBtn");
startBtn.addEventListener("click", () => {
    let givenTime = getTime();
    console.log(givenTime);
    setTime(givenTime);
    displayTime(givenTime);
    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
})
pauseBtn.addEventListener("click", () => {
    postM("Pause");
    pauseBtn.classList.add("hidden");
    resumeBtn.classList.remove("hidden");
})
resumeBtn.addEventListener("click", () => {
    postM("Resume");
    resumeBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
})
function convertTime(hrs, min, sec) {
    return hrs * 3600 + min * 60 + sec;
}
function getTime() {
    let time = 60;
    return time;
}
function setTime(time) {
    console.log("Hre");
    timerWorker.postMessage(["Start", time]);
}
function displayTime(time) {
    console.log("nfkjd");
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    (hours < 10) ? hours = '0' + hours : hours = hours;
    (minutes < 10) ? minutes = '0' + minutes : minutes = minutes;
    (seconds < 10) ? seconds = '0' + seconds : seconds = seconds;
    inpTmi.classList.add("hidden");
    shoTmi.classList.remove("hidden");
    hrsSho.innerHTML = hours;
    minSho.innerHTML = minutes;
    secSho.innerHTML = seconds;
}
let lightThemeIn = document.querySelector("#lightTheme");
let darkThemeIn = document.querySelector("#darkTheme");
let sysThemeIn = document.querySelector("#systemTheme");
let darkCSS = document.querySelector("#darkCSS");
let sysCSS = document.querySelector("#sysCSS");
document.querySelectorAll(".lightTheme").forEach((item) => {
    item.addEventListener("click", () => {
        localStorage.setItem("theme", "light");
        if (darkCSS != null) {
            darkCSS.disabled = true;
        }
        if(sysCSS != null){
            sysCSS.disabled = true;
        }
        lightThemeIn.checked = true;
        darkThemeIn.checked = false;
        sysThemeIn.checked = false;
    })
})
document.querySelectorAll(".darkTheme").forEach((item) => {
    item.addEventListener("click", () => {
        localStorage.setItem("theme", "dark");
        if (darkCSS != null) {
            darkCSS.disabled = false;
        } else {
            let styLE5 = document.createElement("link");
            styLE5.rel = 'stylesheet';
            styLE5.type = 'text/css';
            styLE5.setAttribute("id", "darkCSS");
            styLE5.setAttribute("href", "Styles/darkTheme.css");
            document.head.appendChild(styLE5);
        }
        if(sysCSS != null){
            sysCSS.disabled = true;
        }
        lightThemeIn.checked = false;
        darkThemeIn.checked = true;
        sysThemeIn.checked = false;
    })
})
document.querySelectorAll(".systemTheme").forEach((item) => {
    item.addEventListener("click", () => {
        localStorage.setItem("theme", "system");
        if (darkCSS != null) {
            darkCSS.disabled = true;
        }
        if(sysCSS != null){
            sysCSS.disabled = false;
        }else{
            let styLE5 = document.createElement("link");
            styLE5.rel = 'stylesheet';
            styLE5.type = 'text/css';
            styLE5.setAttribute("id", "darkCSS");
            styLE5.setAttribute("href", "Styles/sysTheme.css");
            document.head.appendChild(styLE5);
        }
        lightThemeIn.checked = false;
        darkThemeIn.checked = false;
        sysThemeIn.checked = true;
    })
})