var element;
var counter = 0;

window.allowDrop = function(ev) {
    ev.preventDefault();
    if (ev.target.getAttribute("draggable") == "true") {
        ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
    } else {
        ev.dataTransfer.dropEffect = "all"; // drop it like it's hot
    }
};

window.drag = function(ev) {
    element = ev.toElement;
    test = tackingTop(element);
    if (test) {
        ev.dataTransfer.setData("id", ev.target.id);
    }

};

window.drop = function(ev) {
    var test = testingChild(ev);
    if (test[0]) {
        ev.preventDefault();
        var id = ev.dataTransfer.getData("id");
        var dragged = document.getElementById(id);
        ev.target.insertBefore(dragged, ev.target.childNodes[0]);
        counterPush();
    }
    testingParent();
};

function testingChild(ev) {
    parent = ev.srcElement;
    if (parent.childElementCount > 0) {
        idParent = Number(parent.children[0].id.slice(1));
        idChild = Number(element.id.slice(1));
        if (idParent <= idChild) {
            return [false, parent];
        } else {
            return [true, parent];
        }
    } else {
        return [true, parent];
    }
}

function testingParent() {
    if (document.getElementById('r2').children.length > 4 || document.getElementById("r2").children.length > 4) {
        document.getElementsByTagName("h1")[0].innerHTML = "You win! Your score is = " + counter;
    }
}

function tackingTop(element) {
    parent = element.parentElement;
    for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i].id.slice(1) < element.id.slice(1) ) {
            return false;
        }
    }
    return true;
}

function counterPush() {
    counter += 1;
    document.getElementsByTagName("h1")[0].innerHTML = counter;
}
