var handRotation = 0;
asyncRotate();

function createBoxes(color1 = "", color2 = "") {
    var num = document.getElementById("numinput").value;
    var lparent = document.getElementById("lcontainer");
    var rparent = document.getElementById("rcontainer");
    document.body.appendChild(document.getElementById("plus1"));
    document.body.appendChild(document.getElementById("plus2"));
    document.body.appendChild(document.getElementById("hand"));
    document.getElementById("hand").style.display = "none";
    lparent.innerHTML = "";
    rparent.innerHTML = "";
    var col = "l";
    var percent = 100 / num;
    for(var x = 0; x < num; x++) {
        var column = document.createElement("div");
        column.className = "color-column";
        column.style.height = percent + "%";
        column.style.width = percent + "%";
        lparent.appendChild(column);
        for(var y = 0; y < num; y++) {
            var box = document.createElement("div");
            box.className = col + "color " + "color-item";
            box.style.height = percent + "%";
            column.appendChild(box);
            if(col == "l") {
                col = "r";
            } else {
                col = "l";
            }
        }
        if(num % 2 == 0) {
            if(col == "l") {
                col = "r";
            } else {
                col = "l";
            }
        }
    }
    var col = "r";
    for(var x = 0; x < num; x++) {
        var column = document.createElement("div");
        column.style.height = percent + "%";
        column.style.width = percent + "%";
        rparent.appendChild(column);
        for(var y = 0; y < num; y++) {
            var box = document.createElement("div");
            box.className = col + "color " + "color-item";
            box.style.height = percent + "%";
            column.appendChild(box);
            if(col == "l") {
                col = "r";
            } else {
                col = "l";
            }
        }
        if(num % 2 == 0) {
            if(col == "l") {
                col = "r";
            } else {
                col = "l";
            }
        }
    }
    var center = Math.trunc(num / 2);
    document.getElementById("plus1").style.display = "inline";
    document.getElementById("plus2").style.display = "inline";
    lparent.childNodes[center].childNodes[center].appendChild(document.getElementById("plus1"));
    rparent.childNodes[center].childNodes[center].appendChild(document.getElementById("plus2"));
    if(color1 == "") {
        color1 = processColor(document.getElementById("colorinput1").value);
    }
    if(color2 == "") {
        color2 = processColor(document.getElementById("colorinput2").value);
    }
    var elements1 = document.querySelectorAll('.lcolor');
    for(var i = 0; i < elements1.length; i++) {
        elements1[i].style = "background-color:#" + color1 + ";";
    }
    var elements2 = document.querySelectorAll('.rcolor');
    for(var i = 0; i < elements2.length; i++) {
        elements2[i].style = "background-color:#" + color2 + ";";
    }
    var inst = document.getElementById("lowerInstructions");
    inst.innerHTML = "Cross your eyes to merge the colors (try to line up the crosses). Scroll back up if you want to choose new colors.";
    jumpToBoxes();
}
function loadPreset(name) {
    switch(name) {
        case "RG":
            createBoxes("FF0000", "00FF00");
            break;
        case "YB":
            createBoxes("FFFF00", "0000FF");
            break;
        case "StB":
            setChimera("Stygian", "0000FF");
            break;
        case "SlR":
            setChimera("Luminous", "FF0000");
            break;
        case "HbO":
            setChimera("Hyperbolic", "F85700", "00D7FF");
            break;
        default:
            break;
    }
}

function setChimera(type, color = "", contrast = "") {
    var lparent = document.getElementById("lcontainer");
    var rparent = document.getElementById("rcontainer");
    if(color == "") {
        color = processColor(document.getElementById("colorinput3").value);
    }
    if(contrast == "") {
        contrast = processColor(document.getElementById("colorinput4").value);
    }
    document.body.appendChild(document.getElementById("plus1"));
    document.body.appendChild(document.getElementById("plus2"));
    document.body.appendChild(document.getElementById("hand"));
    document.getElementById("plus1").style.display = "none";
    document.getElementById("plus2").style.display = "none";
    lparent.innerHTML = "";
    rparent.innerHTML = "";
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.style.backgroundColor = invertColor(color, false);
    lparent.style.backgroundColor = "#bbbbbb"
    lparent.appendChild(dot);
    document.getElementById("hand").style.display = "inline";
    dot.appendChild(document.getElementById("hand"));
    switch(type) {
        case "Stygian":
            rparent.style.backgroundColor = "#000000";
            break;
        case "Luminous":
            rparent.style.backgroundColor = "#FFFFFF";
            break;
        case "Hyperbolic":
            rparent.style.backgroundColor = "#" + color;
            dot.style.backgroundColor = "#" + contrast;
            break;
        default:
            break;
    }
    var inst = document.getElementById("lowerInstructions");
    inst.innerHTML = "Look at the center of the circle (left) for 20-60 seconds. Then look at the solid square (right) and the afterimage of the circle should appear to be ";
    switch(type) {
        case "Stygian":
            inst.innerHTML += "darker than the surrounding black but still have saturation.";
            break;
        case "Luminous":
            inst.innerHTML += "lighter than the surrounding white but still have saturation.";
            break;
        case "Hyperbolic":
            inst.innerHTML += "more saturated than the surrounding color, which already has 100% saturation.";
            break;
        default:
            break;
    }
    inst.innerHTML += " The arrow makes a full rotation every 60s."
    jumpToBoxes();
    handRotation = 0;
}
function tick() {
    return new Promise(resolve => {
        setTimeout(() => {
            var hand = document.getElementById("hand");
            hand.style.transform = "rotate(" + handRotation + "deg)";
            resolve();
        }, 500);
    });
}

async function asyncRotate() {
    handRotation += 3;
    await tick();
    asyncRotate();
}

function processColor(hex) {
    hex = hex.trim();
    if(hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if(hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return hex;
}
function invertColor(hex, bw) {
    if(hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if(hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if(hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if(bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function jumpToBoxes() {
    window.location = ("" + window.location).replace(/#[A-Za-z0-9_]*$/, '') + "#boxes"
}