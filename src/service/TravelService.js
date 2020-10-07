import axios from "../Config/axiosconfig";
import { urlData } from "../Config/env";
function all() {
    return axios.get(`${urlData + 'travel'}`)
}

const TravelService = {
    all
}
export default TravelService;