import axios from "../Config/axiosconfig";
import { urlData } from "../Config/env";
function all() {
    return axios.get(`${urlData + 'user'}`)
}

const UserService = {
    all
}
export default UserService;