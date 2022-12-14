import { connection, headerAuth } from "../config.js";

const filterProducts = async (productToSearch)=>{
    var url = connection + 'picking/getFilterProductsByIdDonation/' + localStorage.getItem('idDonation') + '/' + localStorage.getItem('user') + '/' + productToSearch;
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        seeData(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

var pictureTaked = '';

function seeData(data){
    document.getElementById('containerProducts').innerHTML = '';
    if(data.data.length == 0){
        toastr.success('No tienes productos', '', toastr.options);
    }else{
        const estatus = [];
        var cont = 0;
        for(const product in data.data){
            cont++;
            if(data.data[product].estatus == 0){
                estatus.push('pickProduct' + data.data[product].id);
            }
            document.getElementById('containerProducts').innerHTML += 
            '<div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">'+
                '<div class="product-item">'+
                    '<div class="text-center p-4">'+
                        '<div class="row">'+
                            '<div class="col-9">'+
                                '<svg class="position-absolute start-0 top-0">'+
                                    '<defs>'+
                                        '<linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">'+
                                            '<stop offset="0%" stop-color="#3CB815" /><stop offset="100%" stop-color="#F65005" />'+
                                        '</linearGradient>'+
                                        '<linearGradient id="lineGradient">'+
                                            '<stop offset="0%" stop-color="#F65005" /><stop offset="100%" stop-color="#3CB815" />'+
                                        '</linearGradient>'+
                                        '<path id="todo__line" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z"></path>'+
                                        '<path id="todo__box" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"></path>'+
                                        '<path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5"></path>'+
                                        '<circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>'+
                                    '</defs>'+
                                '</svg>'+
                                '<div>'+
                                    '<label class="todo">'+
                                        '<input class="todo__state pickProduct" id="pickProduct'+ data.data[product].id +'" type="checkbox" />'+
                                        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon">'+
                                            '<use xlink:href="#todo__line" class="todo__line"></use>'+
                                            '<use xlink:href="#todo__box" class="todo__box"></use>'+
                                            '<use xlink:href="#todo__check" class="todo__check"></use>'+
                                            '<use xlink:href="#todo__circle" class="todo__circle"></use>'+
                                        '</svg>'+
                                        '<div class="todo__text"><a class="d-block h5 mb-2">' + data.data[product].producto + '</a></div>'+
                                    '</label>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-3">'+
                                '<p><a class="btn" href="#collapse'+ data.data[product].id +'" data-bs-toggle="collapse" aria-expanded="true" aria-controls="collapse1"><i class="fa fa-comments" style="color: #F65005;"></i></a></p>'+
                            '</div>'+
                        '</div>'+
                        '<div id="collapse'+ data.data[product].id +'" class="collapse">'+
                            '<div class="form-floating">'+
                                '<textarea class="form-control" placeholder="Leave a message here" id="message'+ data.data[product].id +'" style="height: 75px"></textarea>'+
                                '<label for="message'+ data.data[product].id +'">Observaciones</label>'+
                            '</div>'+
                            '<br>'+
                            '<div class="row">'+
                                '<div class="col">'+
                                    '<a class="btn btn-primary addObservation" id="addObservation'+ data.data[product].id +'">Agregar</a>'+
                                '</div>'+
                                '<div class="col">'+
                                    '<a class="bg-white rounded-circle ms-3 file" id="file'+ cont +'" style="color: #F65005" ;>'+
                                    '<i class="fa fa-camera"></i></a></label>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-12 text-center">'+
                                    '<video id="video' + cont + '" class="img-thumbnail" autoplay style="height: 250; width: 90%;"></video>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-12 d-grid gap-2">'+
                                    '<button id="btnTakePhoto' + cont + '" class="btn btn-primary btnTakePhoto">Capturar</button>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-12">'+
                                    '<img id="photo' + cont + '" src="" class="img-thumbnail" alt="">'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-12">'+
                            '<div class="d-flex border-top">'+
                                '<small class="w-50 text-center border-end py-2">'+
                                    '<a class="text-body">'+
                                        '<i class="fa fa-apple-alt text-primary me-2"></i>' + data.data[product].categoria + ' '+
                                    '</a>'+
                                '</small>'+
                                '<small class="w-50 text-center py-2">'+
                                    '<a class="text-body"><i class="fa fa-box text-primary me-2"></i>Cantidad: ' + data.data[product].cantidad + '</a>'+
                                '</small>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div></br>';
        }
        
        for(const est in estatus){
            document.querySelector('#'+estatus[est]).checked = true;
        }

        for(var i = 1; i != cont; i++){
            const camera = new Camera(document.getElementById('video' + i));
            document.getElementById('file' + i).addEventListener('click', () => {
                pictureTaked = '';
                camera.power();
            });
            document.getElementById('btnTakePhoto' + i).addEventListener('click', () => {
                let picture = camera.takePhoto();
                console.log(picture);
                camera.off();
                document.getElementById('photo' + i).setAttribute('src', picture)
                updatePicture(picture);
            });
        }

        const addObservations = document.querySelectorAll('.addObservation');
        addObservations.forEach(observation => {
            observation.addEventListener('click', () => {
                addObservation(observation.id.replace('addObservation',''));
            });
        });

        const pickProducts = document.querySelectorAll('.pickProduct');
        pickProducts.forEach(pickProduct => {
            pickProduct.addEventListener('click', ()=> {
                updatePicking(pickProduct.id.replace('pickProduct',''));
            });
        });
    }
}

// base64 to blob
function toBlob(base64) {
    const bin = atob(base64.replace(/^.*,/, ""));
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    return new Blob([buffer.buffer], {
      type: "image/png",
    });
  }

function addObservation(id_recolectado){
    var pictureBlob = toBlob(pictureTaked);
    console.log(pictureBlob);
    const dataToSend = {
        observacion: document.getElementById('message' + id_recolectado).value,
        fecha: new Date(),
        recolectado_id : id_recolectado,
        evidencia: pictureBlob
    };
    var header = headerAuth;
    header.append('Content-Type', 'multipart/form-data');
    var url = connection + 'observation/create';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: header
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.data.estatus == 1){
            toastr.error('Observación no registrada', '', toastr.options);
        }else{
            toastr.success('Observación registrada!', '', toastr.options);
            //getProducts();
        }
    })
    .catch((error) => {
        toastr.error('La observación no se ha registrado', '', toastr.options);
        console.error('Error:', error);
    });
    pictureTaked = '';
}

function updatePicture(picture){
    pictureTaked = picture;
}

function updatePicking(id){
    var url = connection + 'picking/updateStatus/' + id;
    fetch(url, {
        method: 'PUT',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.data.estatus == 1){
            toastr.error('Producto no recolectado', '', toastr.options);
        }else{
            toastr.success('Producto recolectado!', '', toastr.options);
            getProducts();
        }
    })
    .catch((error) => {
        toastr.error('El producto no se pudo recolectar', '', toastr.options);
        console.error('Error:', error);
    });
}

const getProducts = async ()=>{
    var url = connection + 'picking/getProductsByIdDonation/' + localStorage.getItem('idDonation') + '/' + localStorage.getItem('user');
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        seeData(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export { getProducts, filterProducts };