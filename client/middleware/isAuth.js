import Cookies from "js-cookie";

export default function ({ store }) {
    store.app.router.beforeEach((to, from, next) => {
        if (Cookies.get("userData")) {
            next()
        } else next(false)
    })
}