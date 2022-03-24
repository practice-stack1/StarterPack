import { querySelector, querySelectorAll } from "../tools/getDomElement.js"

const modal = (trigger, overlay, modal, close) => {
    // const $triggers = querySelectorAll(trigger)
    const $overlay = querySelector(overlay)
    const $body = document.body

    // $triggers.forEach((trigger) => {
    //     trigger.addEventListener("click", openModal)
    // })
    $overlay.addEventListener("click", closeModal)

    addGlobalEvent(trigger, openModal)

    function openModal() {
        $overlay.classList.add("_active")
        $body.classList.add("_fix")
    }
    function closeModal({ target }) {
        if (target.closest(close)) {
            removeActive()
        }

        if (target.closest(overlay) && !target.closest(modal)) {
            console.log(target)
            removeActive()
        }
    }
    function addGlobalEvent(selector, cb) {
        $("body").on("click", selector, cb)
    }

    function removeActive() {
        $overlay.classList.remove("_active")
        setTimeout(() => {
            document.body.classList.remove("_success")
        }, 1000)
        $body.classList.remove("_fix")
        return
    }
}

export default modal
