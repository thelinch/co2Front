import axios from "axios"
/* const CancelToken = axios.CancelToken;
let cancel;
axios.interceptors.request.use((config) => {
    if (cancel) {
        cancel();
    }
    config.cancelToken = new CancelToken(function executor(c) {
        cancel = c;
    })
    return config;
}) */
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error) {
        console.log(error.response.data.message)
        let errors = error.response.data.error;
        let message = '';
        if (typeof errors === 'string') {
            message = errors;
            message = message.replace('"', '').replace('"', '');
        } else {
            message = '<ul>';
            $.each(errors, function (key, value) {
                message += '<li class="swal-li">' + value[0] + '</li>';
            });
            message += '</ul>';
        }
        Swal.fire({
            width: '380px',
            showConfirm: true,
            icon: 'error',
            title: '¡Ocurrio un error!',
            html: error.response.data.status + ' - ' + message,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Cerrar',
            allowEscapeKey: false,
            allowOutsideClick: false,
        });

    }
    return Promise.reject(error)
})
export default axios
