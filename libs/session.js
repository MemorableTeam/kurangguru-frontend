import axios from "axios";

const session = async(data, cb, route)=>{
    const response = await axios(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if(response.status == 200){
        cb.replace('/')
    }else{
        alert('error')
    }
}

const privatePage = async()=>{
    const response = await axios("api/users/getSession", {
        headers : { "Content-Type": "application/json" }
    })
    if(response.status == 200){
        console.log(response.data);
        return response;
    }else{
        console.log(error);
    }
}

export {session, privatePage}
