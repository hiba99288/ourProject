function closeModal(){
    document.querySelector('#map-data').innerHTML = '';
    document.querySelector('#map-data').style.display = 'none';
}


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

            function mapInfoCard(title, value, color) {
                return `
                    <div dir="rtl" class="map-info-card" style="background-color: ${color}">
                        <p>${title}</p><span style="color: ${color}">${value}</span>
                    </div>
                `
            }

            let popupContent = `
                <div dir="rtl" 
                    style="text-align: center; font-weight: bold;"
                >
                    <span id="close-modal" onClick="closeModal()">x</span>
                    <div style="text-align: center; margin: 3px auto; display: block; font-size: 23pt;">${x.areaname}</div>
                    ${mapInfoCard("عدد السكان",x.population,'purple')}<br/>
                    ${mapInfoCard("الإصابات الكلية",(x.casestotal  + x.recovered + x.deaths),'navy')}
                    ${mapInfoCard("الإصابات النشطة",x.population,'red')}
                    ${mapInfoCard("المتعافين",x.population,'green')}
                    ${mapInfoCard("الوفيات",x.population,'darkred')}
                </div>
            `;

            let thisMarker = L.marker([x.latitude,x.longitude]);
            // thisMarker.bindPopup(popupContent);
            // thisMarker.on('click', (e, popupContent)=>{
            //     e.preventDefault();
            //     document.querySelector('#map-data').innerHTML = popupContent;
            //     document.querySelector('#map-data').style.display = block;
            // });
            
            let thisCircle = L.circle([x.latitude, x.longitude], {
                color: x.color,
                fillColor: x.color,
                fillOpacity: 0.2,
                radius: x.radius
            });

            thisCircle.on('click', (e)=>{
                console.log(popupContent);
                document.querySelector('#map-data').innerHTML = popupContent;
                document.querySelector('#map-data').style.display = 'block';
            });

            // thisCircle.bindPopup(popupContent);
            
            
            // thisCircle.on('click', x => {
            //     document.getElementById('map-data').innerHTML = popupContent;
            // });

            // thisMarker.on('click', x => {
            //     document.getElementById('map-data').innerHTML = popupContent;
            // });

            AllMarkers.addLayer(thisMarker);
            AllCircles.addLayer(thisCircle);

        });


        // AllMarkers.addTo(map);
        AllCircles.addTo(map);

    // Layer Controller
        var baseMaps = {
            "Open Street Map": osm,
            "Open Topology Map": OpenTopoMap
        }

        var overlayMaps = {
            // "Markers": AllMarkers,
            "المناطق": AllCircles,
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
        // map.on("click", e=>{
        //     console.table(e.latlng);
        //     console.log(e);
        //     console.log(JSON.stringify(data));
        // });
}