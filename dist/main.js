/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/gameboard.js":
/*!*************************************!*\
  !*** ./src/components/gameboard.js ***!
  \*************************************/
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
/* harmony import */ var _components_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameboard */ "./src/components/gameboard.js");


const pBoard = document.querySelector('.pBoard')
;(0,_components_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(pBoard)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7VUN2RGY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055RDs7QUFFekQ7QUFDQSxrRUFBb0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUJvYXJkQ29tcG9uZW50KHBhcmVudENvbnRhaW5lcikge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlWUhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgeUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHlIZWFkZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRZSGVhZGVyJylcbiAgICAgICAgY29uc3QgbGV0dGVycyA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSiddXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3hIZWFkZXInKVxuICAgICAgICAgICAgYm94LmlubmVyVGV4dCA9IGxldHRlcnNbeV0gXG4gICAgICAgICAgICB5SGVhZGVyLmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHlIZWFkZXJcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVYSGVhZGVyKCkge1xuICAgICAgICBjb25zdCB4SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgeEhlYWRlci5jbGFzc0xpc3QuYWRkKCdib2FyZFhIZWFkZXInKVxuXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3hIZWFkZXInKVxuICAgICAgICAgICAgYm94LmlubmVyVGV4dCA9IHggKyAxIC8vIG9mZnNldCBmb3IgemVybyBpbmRleGluZ1xuICAgICAgICAgICAgeEhlYWRlci5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4SGVhZGVyXG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRvcC1sZXZlbCBjb250YWluZXJzXG4gICAgY29uc3QgY2hpbGRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNoaWxkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkQ29udGFpbmVyJylcblxuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZEdyaWQnKVxuXG4gICAgLy8gY3JlYXRlIGJvYXJkIGdyaWRzXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTsgeCsrKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdyb3cnKVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSA5OyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94JylcbiAgICAgICAgICAgIGJveC5kYXRhc2V0LnggPSB4XG4gICAgICAgICAgICBib3guZGF0YXNldC55ID0geVxuICAgICAgICAgICAgcm93LmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgYm9hcmQuYXBwZW5kKHJvdylcbiAgICB9XG5cblxuICAgIC8vIGFwcGVuZCB0byBjb250YWluZXJzXG4gICAgY2hpbGRDb250YWluZXIuYXBwZW5kKGNyZWF0ZVhIZWFkZXIoKSwgY3JlYXRlWUhlYWRlcigpLCBib2FyZClcbiAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kKGNoaWxkQ29udGFpbmVyKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCb2FyZENvbXBvbmVudCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNyZWF0ZUJvYXJkQ29tcG9uZW50IGZyb20gXCIuL2NvbXBvbmVudHMvZ2FtZWJvYXJkXCJcblxuY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBCb2FyZCcpXG5jcmVhdGVCb2FyZENvbXBvbmVudChwQm9hcmQpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=