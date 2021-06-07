import axios from "axios";

const session = async(data, cb)=>{
    const response = await axios("api/users/session", {
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
    
}

export default session
