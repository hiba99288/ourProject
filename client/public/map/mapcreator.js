// mapCreator function, called after data is ready
function mapCreator(data){

    var AllMarkers = L.layerGroup();
    var AllCircles = L.layerGroup();

    var map = L.map('map').setView([mapConfig.lat, mapConfig.long], mapConfig.zoom);

    // Define tile map proviers

        // OpenStreetMap tile source
        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: mapConfig.maxZoom,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
            // crossOrigin: True
        });

        // Open Topology Map
        var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: mapConfig.maxZoom,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });

    // Adding the tile to map element
        osm.addTo(map);
        // OpenTopoMap.addTo(map);

    // Create markers & circles
        data.map( x => {

            let popupContent = `
                <div dir="rtl" style="text-align: center; font-weight: bold;">
                    <h3 style="text-align: center; margin: 0 auto;">${x.areaname}</h3>
                    <p>عدد السكان: ${x.population}</p>
                    <p style="color: darkblue;">الإصابات الكلية: ${x.casestotal  + x.recovered + x.deaths}<p>
                    <p style="color: red;">الإصابات النشطة: ${x.casestotal}<p>
                    <p style="color: green;">التعافي: ${x.recovered}<p>
                    <p style="color: darkred;">الوفيات: ${x.deaths}<p>
                </div>
            `;

            let thisMarker = L.marker([x.latitude,x.longitude]);
            thisMarker.bindPopup(popupContent);
            
            let thisCircle = L.circle([x.latitude, x.longitude], {
                color: x.color,
                fillColor: x.color,
                fillOpacity: 0.2,
                radius: x.radius
            });

            thisCircle.bindPopup(popupContent);

            AllMarkers.addLayer(thisMarker);
            AllCircles.addLayer(thisCircle);

        });


        AllMarkers.addTo(map);
        AllCircles.addTo(map);

    // Layer Controller
        var baseMaps = {
            "OSM": osm,
            "Open Topology Map": OpenTopoMap
        }

        var overlayMaps = {
            "Markers": AllMarkers,
            "Circles": AllCircles,
        };
        
        L.control.layers(baseMaps, overlayMaps).addTo(map);
        // map.removeLayer(hebronMarker);

    // Scale & WaterMark 
        L.control.scale({
            metric: true,
            imperial: false,
            position: 'bottomleft'
        }).addTo(map);

        L.Control.Watermark = L.Control.extend({
            onAdd: function(map){
                var img = L.DomUtil.create('img');
                img.src = 'logo.png';
                img.style.width = '75px';
                return img;
            },
            // onRemove: function(map){}
        });

        L.control.watermark = function(opts){
            return new L.Control.Watermark(opts);
        }

        L.control.watermark({position: 'bottomleft'}).addTo(map);

    // Events
        map.on("click", e=>{
            console.table(e.latlng);
            console.log(e);
            console.log(JSON.stringify(data));
        });
}