import { querySelector } from "../tools/getDomElement.js"

const fix = (header) => {
    const $header = querySelector(header)
    let lastScrollPos = 0
    window.addEventListener("scroll", scrollinHeader)
    window.addEventListener("resize", scrollinHeader)

    function scrollinHeader() {
        const height = $header.offsetHeight
        let currentScrollPos = window.pageYOffset
        menuPosition(currentScrollPos)
        if (window.scrollY > height) {
            $header.classList.add("_fix")
        } else {
            $header.classList.remove("_fix")
        }
    }
    function menuPosition(cur) {
        if (cur > lastScrollPos) {
            $header.classList.remove("_up")
        } else {
            $header.classList.add("_up")
        }
        lastScrollPos = cur
    }
}

export default fix
