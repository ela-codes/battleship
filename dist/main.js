/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/gameboardUI.js":
/*!***************************************!*\
  !*** ./src/components/gameboardUI.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createBoardComponent);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameboardUI */ "./src/components/gameboardUI.js");


const pBoard = document.querySelector('.pBoard')
;(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__["default"])(pBoard)


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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7VUN2RGY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ04yRDs7QUFFM0Q7QUFDQSxvRUFBb0I7OztBQUdwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZ0JBQWdCLEdBQUcsNEJBQTRCO0FBQ3pGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsU0FBUztBQUN6RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmRVSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVCb2FyZENvbXBvbmVudChwYXJlbnRDb250YWluZXIpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVlIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB5SGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkWUhlYWRlcicpXG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSA5OyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94SGVhZGVyJylcbiAgICAgICAgICAgIGJveC5pbm5lclRleHQgPSBsZXR0ZXJzW3ldIFxuICAgICAgICAgICAgeUhlYWRlci5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5SGVhZGVyXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlWEhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgeEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHhIZWFkZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRYSGVhZGVyJylcblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94SGVhZGVyJylcbiAgICAgICAgICAgIGJveC5pbm5lclRleHQgPSB4ICsgMSAvLyBvZmZzZXQgZm9yIHplcm8gaW5kZXhpbmdcbiAgICAgICAgICAgIHhIZWFkZXIuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geEhlYWRlclxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0b3AtbGV2ZWwgY29udGFpbmVyc1xuICAgIGNvbnN0IGNoaWxkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjaGlsZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdib2FyZENvbnRhaW5lcicpXG5cbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmRHcmlkJylcblxuICAgIC8vIGNyZWF0ZSBib2FyZCBncmlkc1xuICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93JylcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcpXG4gICAgICAgICAgICBib3guZGF0YXNldC54ID0geFxuICAgICAgICAgICAgYm94LmRhdGFzZXQueSA9IHlcbiAgICAgICAgICAgIHJvdy5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIGJvYXJkLmFwcGVuZChyb3cpXG4gICAgfVxuXG5cbiAgICAvLyBhcHBlbmQgdG8gY29udGFpbmVyc1xuICAgIGNoaWxkQ29udGFpbmVyLmFwcGVuZChjcmVhdGVYSGVhZGVyKCksIGNyZWF0ZVlIZWFkZXIoKSwgYm9hcmQpXG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZChjaGlsZENvbnRhaW5lcilcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQm9hcmRDb21wb25lbnQiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVCb2FyZENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRzL2dhbWVib2FyZFVJXCJcblxuY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBCb2FyZCcpXG5jcmVhdGVCb2FyZENvbXBvbmVudChwQm9hcmQpXG5cblxuLy8gRFJBRyBOIERST1BcblxuLy8gRHJhZyBhbmQgRHJvcCBIYW5kbGVyIEZ1bmN0aW9uc1xuZnVuY3Rpb24gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwiZHJhZ2dpbmdcIiwgZXZlbnQudGFyZ2V0LmlkLCBcIi4uLlwiKVxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBgJHtldmVudC50YXJnZXQuaWR9LCR7ZXZlbnQudGFyZ2V0LmRhdGFzZXQubGVuZ3RofWApXG4gICAgXG59XG5cbmZ1bmN0aW9uIGRyYWdPdmVySGFuZGxlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbn1cblxuZnVuY3Rpb24gZHJvcEhhbmRsZXIoZXZlbnQpIHtcblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlTmV4dEJveChib3hFbGVtZW50LCByZXBlYXQpIHtcbiAgICAgICAgaWYgKHJlcGVhdCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgYm94RWxlbWVudC5jbGFzc0xpc3QuYWRkKHNoaXBOYW1lKVxuICAgICAgICBib3hFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2FmYWVhZVwiXG4gICAgICAgIHJlcGVhdCAtLVxuICAgICAgICBwb3B1bGF0ZU5leHRCb3goYm94RWxlbWVudC5uZXh0U2libGluZywgcmVwZWF0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUZyb21TaGlweWFyZChzaGlwTmFtZSkge1xuICAgICAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2hpcE5hbWV9YClcbiAgICAgICAgc2hpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGxldCBbc2hpcE5hbWUsIHNoaXBMZW5ndGhdID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpLnNwbGl0KCcsJylcblxuICAgIFxuICAgIGNvbnN0IHlJbmRleCA9IE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC55KVxuICAgIHNoaXBMZW5ndGggPSBOdW1iZXIoc2hpcExlbmd0aClcblxuICAgIGlmICh5SW5kZXggKyAoc2hpcExlbmd0aCAtIDEpIDw9IDkpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoc2hpcE5hbWUpXG4gICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNhZmFlYWVcIlxuXG4gICAgICAgIHBvcHVsYXRlTmV4dEJveChldmVudC50YXJnZXQsIHNoaXBMZW5ndGgpXG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKVxuICAgICAgICByZW1vdmVGcm9tU2hpcHlhcmQoc2hpcE5hbWUpXG4gICAgfVxuICAgIFxufVxuXG5mdW5jdGlvbiBkcmFnRW50ZXJIYW5kbGVyKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpXG59XG5cbmZ1bmN0aW9uIGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIilcbn1cblxuZnVuY3Rpb24gZHJhZ0VudGVyKGV2ZW50KSB7XG4gICAgaWYgKCFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHBlZFwiKSkge1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpXG4gICAgfVxufVxuXG4vLyBJZGVudGlmeSBkcmFnZ2FibGUgc2hpcHNcbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKSBcbmNvbnN0IGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJveCcpXG5cblxuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZXZlbnQgPT4gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkpXG5cbiAgICAvLyBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnXCIsIGV2ZW50ID0+IGRyYWdnaW5nSGFuZGxlcihldmVudCkpXG4gICAgLy8gc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBldmVudCA9PiBkcmFnRW5kSGFuZGxlcihldmVudCkpXG59KVxuXG5ib3hlcy5mb3JFYWNoKGJveCA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZXZlbnQgPT4gZHJhZ0VudGVySGFuZGxlcihldmVudCkpXG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBldmVudCA9PiBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpKVxuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIGV2ZW50ID0+IGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpKVxuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBldmVudCA9PiBkcm9wSGFuZGxlcihldmVudCkpXG59KVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=