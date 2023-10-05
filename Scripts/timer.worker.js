// Copyright (C)2023-present Xander Christopher. All rights reserved.

(function timerW() {
    let INterval, myTime;
    onmessage = (e) => {
        console.log("Message Recieved" + e.data);
        if (e.data[0] == "Start") {
            timer(e.data[1]);
        } else if (e.data == "Pause") {
            clearInterval(INterval);
        } else if (e.data == "Resume") {
            timer(myTime);
        } else if (e.data == "Reset") {
            clearInterval(INterval);
        }
    }
    function timer(time) {
        INterval = setInterval(() => {
            time--;
            myTime = time;
            (time < 0) ? myFun1() : displayTime(time);
        }, 1000);
    }
    function myFun1() {
        clearInterval(INterval);
        postMessage("Completed");
    }
    function displayTime(time) {
        postMessage(["Time", time]);
    }
})()