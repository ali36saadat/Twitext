//IMPORTS
import handleLocation from "./router.js"

//Navbar Logic Function
const navExport = function () {
   const footer = document.querySelector(".footer")

   footer.addEventListener("click", function (e) {
      e.preventDefault()
      const btn = e.target.closest(".footer__icon")

      if (!btn) return

      const path = btn.getAttribute("value")

      handleLocation(path)
   })
}

export default navExport
