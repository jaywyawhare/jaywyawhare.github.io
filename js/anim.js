function animate(anim) {
    var i = 0;
    var animLength = anim.length;
    var animInterval = setInterval(function () {
        if (i < animLength) {
            if (anim[i].clear) {
                document.getElementById("output").innerHTML = "";
            }
            if (anim[i].type === "typedText") {
                document.getElementById("output").innerHTML = anim[i].prefix + anim[i].content;
                var typed = new Typed("#output", {
                    strings: [anim[i].content],
                    typeSpeed: anim[i].delay,
                    onComplete: function () {
                        i++;
                    }
                });
            } else if (anim[i].type === "basicText") {
                document.getElementById("output").innerHTML = anim[i].content;
                i++;
            }
        } else {
            clearInterval(animInterval);
        }
    }, anim[i].delay);
}