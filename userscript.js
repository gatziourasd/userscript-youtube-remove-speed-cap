// ==UserScript==
// @name         Youtube2x
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       gatziourasd
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("%cYoutube 2x", "font-weight: 700; font-family: 'Poppins'; color: green; padding: 5px;");

    let videoElm = document.getElementsByTagName("video")[0];
    if(!videoElm){console.log("Youtube 2x: 'No Video Element found!'"); return}

    let playbackRate = parseFloat(localStorage.getItem('youtbe2x-playbackrate')) ?? 1.0;
    videoElm.playbackRate = playbackRate;


    document.body.onkeydown = (e) => {
        if(e.key === ";"){
            changePlaybackRate(-0.25)
        }else if(e.key === ":"){
            changePlaybackRate(0.25)
        }
    }

    function changePlaybackRate(delta = 0.25){
        playbackRate += delta;
        playbackRate = playbackRate < 0.25 ? 0.25 : playbackRate;
        let playbackElm = document.querySelector("#movie_player > div:nth-child(9) > div.ytp-bezel-text-wrapper > div");
        playbackElm.innerText = playbackRate;
        videoElm.playbackRate = playbackRate;
        localStorage.setItem("youtbe2x-playbackrate", playbackRate)
    }

    videoElm.onratechange = () =>{
        if(videoElm.playbackRate !== playbackRate){
            videoElm.playbackRate = playbackRate;
        }
    }

})();
