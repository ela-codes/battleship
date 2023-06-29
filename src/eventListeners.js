// DRAG N DROP
function applyDragDrop(board) {

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
            
            boxElement.classList.add(shipName, "dropped")
            board.positionShips(boxElement.dataset.x, boxElement.dataset.y, shipName)
            repeat --
            populateNextBox(boxElement.nextSibling, repeat)
        }

        function removeFromShipyard(shipName) {
            const ship = document.querySelector(`#${shipName}`)
            ship.classList.remove("rotatable")
            ship.style.display = 'none'
        }

        // controller
        event.preventDefault()
        let [shipName, shipLength] = event.dataTransfer.getData("text").split(',')

        // allow the drop if empty box & ship is within board boundaries
        if (!isOccupiedBox(event)) {
            const yIndex = Number(event.target.dataset.y)
            shipLength = Number(shipLength)

            if (yIndex + (shipLength - 1) <= 9) {
                event.target.classList.add(shipName, "dropped")

                populateNextBox(event.target, shipLength)
                event.target.classList.remove("hovered")
                removeFromShipyard(shipName)
            }
        }
        console.log(board.getBoard())
    }

    function isOccupiedBox(event) {
        return event.target.classList.contains("dropped")
    }

    function dragLeaveHandler(event) {
        event.target.classList.remove("hovered")
    }

    function dragEnterHandler(event) {
        if (!isOccupiedBox(event)) {
            event.target.classList.add("hovered")
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

}

function allowRotate() {
    const rotatableShips = document.querySelectorAll('.rotatable')

    rotatableShips.forEach(ship => {
        ship.addEventListener("mouseover", () => {
            ship.addEventListener("wheel", event => rotateShip(event))
        })
    })


    function rotateShip(event) {

        function getShipSize() {
            // should replace this with player gameboard ship object!!!!!!!!
            switch (event.target.id) {
                case "carrier":
                    return 5
                case "battleship":
                    return 4
                case "cruiser": 
                    return 3
                case "submarine":
                    return 3
                case "destroyer":
                    return 2
            }
        }

        const size = getShipSize()

        if (event.target.classList.contains("rotated")) {
            event.target.style.width = `calc(var(--shipBoxSize) * ${size})`
            event.target.style.height = "var(--shipBoxSize)"

        } else {
            event.target.style.width = "var(--shipBoxSize)"
            event.target.style.height = `calc(var(--shipBoxSize) * ${size})`
            event.target.classList.remove("rotated")
        }
    }
}


export { applyDragDrop, allowRotate }