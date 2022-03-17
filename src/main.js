import { changeView } from "./view-controler/index.js"

const init = () => {
    changeView(window.location.hash)
    window.addEventListener("hashchange", () => changeView(window.location.hash))
    console.log(window.location.hash);
}

window.addEventListener('load', init); 

