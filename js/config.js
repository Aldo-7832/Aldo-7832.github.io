const connection = 'http://127.0.0.1:8000/api/'; //API

//const connection = 'http://192.168.146.36//api/'; //API
//header.append('Access-Control-Allow-Origin', '*')

const app = 'http://127.0.0.1:5500/'; //Front Route

const header = new Headers();
header.append('Content-Type','application/json');
header.append('Accept','application/json');

const headerAuth = new Headers();
headerAuth.append('Content-Type','application/json');
headerAuth.append('Accept','application/json');
headerAuth.append('Authorization','Bearer ' + localStorage.getItem('sinara'));

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export {connection, header, headerAuth, app}
