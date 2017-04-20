var body = document.body;
var numBlocks = 100;
var container = document.createElement('div');
container.className = "container";
body.appendChild(container);
var selectedBlock;


function drawTheBlocks(strIndx, endIndx) {
    for (var i = strIndx; i <= endIndx; i++) {
        var galItemDiv = document.createElement('div');
        galItemDiv.className = "galery-item";

        var att = document.createAttribute("tabindex");
        att.value = i;
        galItemDiv.setAttributeNode(att);

        container.appendChild(galItemDiv);

        var galItemContDiv = document.createElement('div');
        galItemContDiv.className = "galery-item-content";
        galItemContDiv.innerHTML = "<span>" + i + "</span>";
        galItemDiv.appendChild(galItemContDiv);
    }
    document.getElementsByClassName("galery-item")[0].focus();
}

drawTheBlocks(1, numBlocks);

container.addEventListener("click", function(event) {
    var target = event.target;

    while (target.className != 'container') {
        if (target.className === 'galery-item') {
            highlight(target);
            return;
        }
        target = target.parentNode;
    }
});

container.addEventListener("keyup", function(event) {
    var target = event.target;
    var targetCoords = target.getBoundingClientRect();
    var marging = getComputedStyle(event.target).marginTop;

    var targetCenter = {
        x: targetCoords.left + (targetCoords.right - targetCoords.left) / 2,
        y: targetCoords.top + (targetCoords.bottom - targetCoords.top) / 2
    };

    switch (event.keyCode) {
        case 37: // left
            target.previousElementSibling ? target.previousElementSibling.focus() : undefined;
            return false;
        case 38: // up
            var upperEl = document.elementFromPoint(targetCenter.x, targetCenter.y - (target.clientHeight + parseInt(marging, 10) * 2));
            upperEl ? upperEl.focus() : undefined;
            return false;
        case 39: // right
            target.nextElementSibling ? target.nextElementSibling.focus() : undefined;
            return false;
        case 40: // down
            var lowerEl = document.elementFromPoint(targetCenter.x, targetCenter.y + (target.clientHeight + parseInt(marging, 10) * 2));
            lowerEl ? lowerEl.focus() : undefined;
            return false;
        case 13: // enter
            target.click();
            return false;
    }
});

document.getElementsByTagName("button")[0].addEventListener("click", function(event) {
    numBlocks++;
    drawTheBlocks(numBlocks, numBlocks);
});


function highlight(element) {
    if (selectedBlock) {
        selectedBlock.classList.remove("highlited");
    }
    selectedBlock = element;
    selectedBlock.classList.add("highlited");
}
