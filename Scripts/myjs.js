let opaThkDiv = document.getElementById("opaThkDiv");
let clrTogBut = document.getElementById("clrTogBut");
let opaThkDiv2 = $("#opaThkDiv");
let clrTogDiv2 = $("#clrTogDiv");
let clrTogDiv = document.getElementById("clrTogDiv");
let clrPallate = document.getElementById("clrPallate");
let currColor = "#000000";
let colorsPa;
let root_html = document.querySelector(":root");
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
        }
    }
})
document.getElementById("changeTheme").addEventListener("click",()=>{
    
})