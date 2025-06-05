let latitude, longitude, destino;

$(document).ready(function (){
    alert("Permite tener acceso a tu hubicación")
    initGeolocation();
})

//Enviar coordenadas de navegación a la siguiente página por medio del boton navegar
$(function(){
    $("#navigate-button").click(function(){
        window.location.href = `ar_nav.html?source=${latitude};${longitude}&destino=${destino.lat};${destino.lng}`
    })
})

function initGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(muestralo)

    }else{
        alert("Lo sentimos, tu navegador no es compatible")
    }
}
function muestralo(position){
    console.log(position)
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    //inicializamos Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FseXBzc28wMSIsImEiOiJjbWFyZnBpa3QwYXg3MnJweXdvZHFlaGYzIn0.oI1ytE7WFodTW6X-Dl62Iw'

    var map = new mapboxgl.Map({
        container: 'map', //sección donde se muestra el mapa
        style: 'mapbox://styles/mapbox/streets-v12', // estilo del mapa
        center: [longitude, latitude], //coordenadas del centro del mapa
        zoom:16 //nivel de zoom inicial (min 0 max 22)
    });

    // Añadir control de Geolocalización el Usuario
    map.addControl(
        new mapboxgl.GeolocateControl({
           positionOptions:{
             enableHighAccuracy: true
            },
             trackUserLocation: true
        }),
    );

    // Añadir control de navegación de A a B
    map.addControl(
       new MapboxDirections ({
        accesToken: mapboxgl.accesToken,
        unit: 'metric',
        controls:{
            inputs: true,
            instructions: true,
            waypoints: true,
            geocoder: true
        }
    }),
    'top-left'
  );

    //función chismoso .on('click') para obtener lng y lat
    map.on('click', function(e){
        // function para cueando el evento se convierte en acción
        console.log(e)
        destino = e.lngLat
    })
}







