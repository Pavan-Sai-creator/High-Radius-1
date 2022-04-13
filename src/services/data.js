import axios from "axios"

export const getData = async ()=> {
    let response = await axios.get("http://localhost:8080/backend2/DataLoading");
    return response.data.actors;
}