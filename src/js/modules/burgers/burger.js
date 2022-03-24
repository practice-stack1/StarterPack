import { querySelector, querySelectorAll } from "../tools/getDomElement.js"

const burger = (triggerSelector, overlaySelector, menuSelector) => {
    if (querySelector(triggerSelector) && querySelector(overlaySelector)) {
        const $triggers = querySelectorAll(triggerSelector)
        const $overlay = querySelector(overlaySelector)
        const $body = document.body

        $triggers.forEach((trigger) =>
            trigger.addEventListener("click", openMenuHandler)
        )
        $overlay.addEventListener("click", closeMenuHandler)

        function closeMenuHandler({ target }) {
            if (
                target.closest(overlaySelector) &&
                !target.closest(menuSelector)
            ) {
                removeActive()
            }
        }
        function openMenuHandler(e) {
            if (e.target.closest(triggerSelector)) {
                this.classList.toggle("_active")
                $overlay.classList.toggle("_active")
                $body.classList.toggle("_fix")
            }
        }
        function removeActive() {
            $overlay.classList.remove("_active")
            $trigger.classList.remove("_active")
            return
        }
    }
}

export default burger
