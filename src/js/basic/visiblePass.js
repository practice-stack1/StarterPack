import { querySelectorAll } from "../tools/getDomElement.js"
export const visiblePass = (eyeSelector) => {
    const eyes = querySelectorAll(eyeSelector)

    eyes.forEach((eye) => {
        eye.addEventListener("click", eyeHandler(eye))
    })
    function eyeHandler(eye) {
        let togler = false
        return (e) => {
            eye.classList.toggle("_active")
            let wrap = eye.closest(".form__input-wrapper")
            let inputPass = wrap.querySelector("input")

            togler = !togler
            let type = togler ? "text" : "password"
            inputPass.setAttribute("type", type)
        }
    }
}
