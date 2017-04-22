var body = document.body;
var numBlocks = 98;
var container = document.createElement('div');
container.className = "container";
body.appendChild(container);
var selectedBlock;


function drawTheBlocks(strIndx, endIndx) {
    for (var i = strIndx; i <= endIndx; i++) {
        var galItemDiv = document.createElement('div');
        galItemDiv.className = "galery-item";

        var att = document.createAttribute("id");
        att.value = i;
        galItemDiv.setAttributeNode(att);

        container.appendChild(galItemDiv);

        var galItemContDiv = document.createElement('div');
        galItemContDiv.className = "galery-item-content";
        galItemContDiv.innerHTML = "<span>" + i + "</span>";
        galItemDiv.appendChild(galItemContDiv);
    }
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

body.addEventListener("keyup", function() {

    if (!selectedBlock) {
        // Find first one and highlite it
        highlight(document.getElementsByClassName("galery-item")[0]);
    }

    var selectedBlockWidth = selectedBlock.offsetWidth;
    var selectedBlockMarging = parseInt(getComputedStyle(selectedBlock).marginTop);
    var containerWidth = document.getElementsByClassName("container")[0].clientWidth;
    var numOfBlocksInRow = parseInt(containerWidth / (selectedBlockWidth + selectedBlockMarging * 2));
    var selectedBlockId = parseInt(selectedBlock.getAttribute("id"));

    switch (event.keyCode) {
        case 37: // left
            var leftElem = document.getElementById(selectedBlockId - 1);
            leftElem ? highlight(leftElem) : undefined;
            return false;
        case 38: // up
            var upperElem = document.getElementById(selectedBlockId - numOfBlocksInRow);
            upperElem ? highlight(upperElem) : undefined;
            return false;
        case 39: // right
            var rightElem = document.getElementById(selectedBlockId + 1);
            rightElem ? highlight(rightElem) : undefined;
            return false;
        case 40: // down
            var lowerElem = document.getElementById(selectedBlockId + numOfBlocksInRow);
            lowerElem ? highlight(lowerElem) : undefined;
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
