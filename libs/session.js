import axios from "axios";

const session = async (data, cb, route, cb2) => {
    const response = await axios(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data)
    });
    if (response.status === 200) {
        cb2(false)
        console.log(JSON.stringify(data))
        cb.replace('/')
    } else {
        cb2(false)
        alert('error')
    }
}
const userLogout = async (url,cb) => {
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
        cb.replace('/login')
    }
}
export { session, userLogout }
