import axios from "../Config/axiosconfig";
import { urlData } from "../Config/env";
function all() {
    return axios.get(`${urlData + 'travel'}`)
}
function save(travel) {
    return axios.post(`${urlData + 'travel'}`, travel)
}
function update(travel) {
    return axios.post(`${urlData + 'travel'}`, travel)

}
const TravelService = {
    all,
    save,
    update
}
export default TravelService;