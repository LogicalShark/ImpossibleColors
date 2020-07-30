function CreateBoxes() {
    var num = document.getElementById("numinput").value;
    var lparent = document.getElementById("lcontainer");
    var rparent = document.getElementById("rcontainer");
    document.body.appendChild(document.getElementById("plus1"));
    document.body.appendChild(document.getElementById("plus2"));
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
    SetColors();
}

function SetColors() {
    var color1 = processColor(document.getElementById("colorinput1").value);
    var color2 = processColor(document.getElementById("colorinput2").value);
    var elements1 = document.querySelectorAll('.lcolor');
    for(var i = 0; i < elements1.length; i++) {
        elements1[i].style = "background-color:#" + color1 + ";";
    }
    var elements2 = document.querySelectorAll('.rcolor');
    for(var i = 0; i < elements2.length; i++) {
        elements2[i].style = "background-color:#" + color2 + ";";
    }
}

function SelectStygian() {
    SetChimera("Stygian");
}
function SelectLuminous() {
    SetChimera("Luminous");
}
function SelectHyperbolic() {
    SetChimera("Hyperbolic");
}
function SetChimera(type) {
    var lparent = document.getElementById("lcontainer");
    var rparent = document.getElementById("rcontainer");
    var color = processColor(document.getElementById("colorinput3").value);
    document.body.appendChild(document.getElementById("plus1"));
    document.body.appendChild(document.getElementById("plus2"));
    document.getElementById("plus1").style.display = "none";
    document.getElementById("plus2").style.display = "none";
    lparent.innerHTML = "";
    rparent.innerHTML = "";
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.style.backgroundColor = invertColor(color, false);
    lparent.style.backgroundColor = "#bbbbbb"
    lparent.appendChild(dot);
    switch(type) {
        case "Stygian":
            rparent.style.backgroundColor = "#000000";
            break;
        case "Luminous":
            rparent.style.backgroundColor = "#FFFFFF";
            break;
        case "Hyperbolic":
            rparent.style.backgroundColor = "#" + color;
            break;
        default:
            break;
    }
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