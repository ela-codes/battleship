import createBoardComponent from "./components/gameboardUI"

const pBoard = document.querySelector('.pBoard')
createBoardComponent(pBoard)


// DRAG N DROP

// Drag and Drop Handler Functions
function dragStartHandler(event) {
    console.log("dragging", event.target.id, "...")
    event.dataTransfer.setData("text", `${event.target.id},${event.target.dataset.length}`)
    
}

function dragOverHandler(event) {
    event.preventDefault()
}

function dropHandler(event) {

    function populateNextBox(boxElement, repeat) {
        if (repeat === 0) return;
        
        boxElement.classList.add(shipName)
        boxElement.style.backgroundColor = "#afaeae"
        repeat --
        populateNextBox(boxElement.nextSibling, repeat)
    }

    function removeFromShipyard(shipName) {
        const ship = document.querySelector(`#${shipName}`)
        ship.style.display = 'none'
    }

    event.preventDefault()
    let [shipName, shipLength] = event.dataTransfer.getData("text").split(',')

    
    const yIndex = Number(event.target.dataset.y)
    shipLength = Number(shipLength)

    if (yIndex + (shipLength - 1) <= 9) {
        event.target.classList.add(shipName)
        event.target.style.backgroundColor = "#afaeae"

        populateNextBox(event.target, shipLength)
        event.target.classList.remove("hovered")
        removeFromShipyard(shipName)
    }
    
}

function dragEnterHandler(event) {
    event.target.classList.add("hovered")
}

function dragLeaveHandler(event) {
    event.target.classList.remove("hovered")
}

function dragEnter(event) {
    if (!event.target.classList.contains("dropped")) {
        event.target.classList.add("hover")
    }
}

// Identify draggable ships
const ships = document.querySelectorAll('.ship') 
const boxes = document.querySelectorAll('.box')


ships.forEach(ship => {
    ship.addEventListener("dragstart", event => dragStartHandler(event))

    // ship.addEventListener("drag", event => draggingHandler(event))
    // ship.addEventListener("dragend", event => dragEndHandler(event))
})

boxes.forEach(box => {
    box.addEventListener("dragenter", event => dragEnterHandler(event))
    box.addEventListener("dragover", event => dragOverHandler(event))
    box.addEventListener("dragleave", event => dragLeaveHandler(event))
    box.addEventListener("drop", event => dropHandler(event))
})

