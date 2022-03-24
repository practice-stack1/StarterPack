import { querySelector, querySelectorAll } from "../tools/getDomElement.js"

const modal = (triggerSelector, modalSelector, overlaySelector) => {
    const $triggers = querySelectorAll(triggerSelector)
    const $overlay = querySelector(overlaySelector)
    const $close = querySelectorAll("[data-close]")
    const $body = document.body

    setHandlers($triggers, openModal)
    setHandlers($close, closeModal)

    function setHandlers(arr, cb) {
        arr.forEach((item) => {
            item.addEventListener("click", cb)
        })
    }
    function closeModal({ target }) {
        if (target.closest(".modal__close")) {
            removeActiveClasses()
            document.body.style.marginRight = `0px`
        } else if (
            target.closest("[data-close]") &&
            !target.closest(modalSelector)
        ) {
            removeActiveClasses()
            document.body.style.marginRight = `0px`
        }
    }
    function openModal({ target }) {
        if (target.closest(triggerSelector)) {
            $body.classList.add("_visible")
            $overlay.classList.add("_active")
            calcScroll()
        }
    }
    function removeActiveClasses() {
        $overlay.classList.remove("_active")
        $body.classList.remove("_visible", "_finally")
    }
    function calcScroll() {
        let div = document.createElement("div")

        div.style.width = "50px"
        div.style.height = "50px"
        div.style.overflowY = "scroll"
        div.style.visibility = "hidden"

        document.body.appendChild(div)
        let scrollWidth = div.offsetWidth - div.clientWidth
        div.remove()
        document.body.style.marginRight = `${scrollWidth}px`

        return scrollWidth
    }
}

export default modal
