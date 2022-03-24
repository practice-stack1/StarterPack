import { querySelector } from "../tools/getDomElement.js"

const burger = (triggerSelector, overlaySelector, menuSelector) => {
    if (querySelector(triggerSelector) && querySelector(overlaySelector)) {
        const $trigger = querySelector(triggerSelector)
        const $overlay = querySelector(overlaySelector)
        const $body = document.body

        $trigger.addEventListener("click", openMenuHandler)
        $overlay.addEventListener("click", closeMenuHandler)
        window.addEventListener("resize", () => {
            removeActive()
        })

        function closeMenuHandler({ target }) {
            if (target.closest(".menu__item")) {
                removeActive()
            }
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
            $body.classList.remove("_fix")
            $trigger.classList.remove("_active")
            return
        }
    }
}

export default burger
