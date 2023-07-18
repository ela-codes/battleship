function createBoardComponent(parentContainer) {

    function createYHeader() {
        const yHeader = document.createElement('div')
        yHeader.classList.add('boardYHeader')
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        for (let y = 0; y <= 9; y++) {
            const box = document.createElement('div')
            box.classList.add('boxHeader')
            box.innerText = letters[y] 
            yHeader.append(box)
        }
        return yHeader
    }

    function createXHeader() {
        const xHeader = document.createElement('div')
        xHeader.classList.add('boardXHeader')

        for (let x = 0; x <= 9; x++) {
            const box = document.createElement('div')
            box.classList.add('boxHeader')
            box.innerText = x + 1 // offset for zero indexing
            xHeader.append(box)
        }
        return xHeader
    }

    // create top-level containers
    const childContainer = document.createElement('div')
    childContainer.classList.add('boardContainer')

    const board = document.createElement('div')
    board.classList.add('boardGrid')

    // create board grids
    for (let x = 0; x <= 9; x++) {
        const row = document.createElement('div')
        row.classList.add('row')
        for (let y = 0; y <= 9; y++) {
            const box = document.createElement('div')
            box.classList.add('box')
            box.dataset.x = x
            box.dataset.y = y
            row.append(box)
        }
        board.append(row)
    }


    // append to containers
    childContainer.append(createXHeader(), createYHeader(), board)
    parentContainer.append(childContainer)
}

function buildMainScreen() {
    function showMainScreen() {
        const introScreen = document.querySelector('.intro')
        introScreen.style.display = 'none'
    
        const mainScreen = document.querySelector('.main')
        mainScreen.style.display = 'grid'
        mainScreen.style["grid-template-columns"] = "1fr 1fr"
        mainScreen.style["grid-template-rows"] = "min-content 1fr"
        
        const pBoard = document.querySelector('.intro .pBoard')
    
        const playerSide = document.querySelector('.playerSide')
        playerSide.insertBefore(pBoard, playerSide.childNodes[5])

    }

    function createBotBoardUI() {
        const botBoard = document.querySelector('.bBoard')
        createBoardComponent(botBoard)
    }
    
    function updateBoardSizes() {
        const boxSize = document.querySelector(':root')
        boxSize.style.setProperty('--boxSize', '50px')
    }

    createBotBoardUI()
    showMainScreen()
    updateBoardSizes()
}

function createPlayerBoardUI() {
    const pBoard = document.querySelector('.pBoard')
    createBoardComponent(pBoard)
}


export { createBoardComponent, buildMainScreen, createPlayerBoardUI }