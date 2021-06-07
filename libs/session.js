import axios from "axios";

const session = async(data, cb, route)=>{
    const response = await axios(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data)
    });
    if(response.status === 200){
        console.log(JSON.stringify(data))
        cb.replace('/')
    }else{
        alert('error')
    }
}

/* const fasilitatorPage = async(cb)=>{
    const response = await axios("api/users/getSession", {
        headers : { "Content-Type": "application/json" }
    })
    console.log(response)
    if(response.status == 200){
        if(response.data.role === 'fasilitator'){
            return response.data;
        }else{
            console.log('anda bukan fasilitator')
            cb.replace('/login')
        }
    }else{
        console.log('error get session')
    }
}
const userPage = async(cb)=>{
    const response = await axios("api/users/getSession", {
        headers : { "Content-Type": "application/json" }
    })
    if(response.status == 200){
        if(response.data.user.role === 'user'){
            const id = response.data.user.user_id
            console.log(id);
            return id;
        }else{
            console.log('anda bukan user')
            cb.replace('/login')
        }
    }else{
        console.log('error get session')
    }
} */

export {session}
