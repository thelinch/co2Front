import axios from "../Config/axiosconfig";
import { urlData } from "../Config/env";
function all() {
    return axios.get(`${urlData + 'driver-type'}`)
}

const DriverTypeService = {
    all
}
export default DriverTypeService;