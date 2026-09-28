// let nama_Wilayah = "Kota Yogyakarta";

// console.log(nama_Wilayah);



// let bilangan_1 = "10";
// let bilangan_2 = 5;

// let hasil_penjumlahan = bilangan_1 * bilangan_2;
// console.log(bilangan_1 + " + " + bilangan_2 + " = " + hasil_penjumlahan);

// let wilayahDIY = ["Kabupaten Bantul", "Kabupaten Gunungkidul", "Kabupaten Kulon Progo", "Kabupaten Sleman", "Kota Yogyakarta"];
// console.log(wilayahDIY[4]);

// let kotakamu = {
//     nama: "Kota Yogyakarta",
//     wilayah: "DIY",
//     jumlahPenduduk: 400000,
//     luasWilayah: 32.5,
// };

// console.log(kotakamu);
// console.log(kotakamu["luasWilayah"]);
// console.log(kotakamu.nama);

// function myFunction() {
//     console.log("Ini adalah fungsi pertama saya");
//     console.log("Ini adalah fungsi kedua saya");
//     console.log("oke....");
//     alert("Halo,....Look at me, I'm a function");
// };


// function callMyName(name,usia) {
//     console.log("Hello, " + name);
//     console.log("Usia saya " + usia + " tahun");
// };
// callMyName("Elsa", 21);

// let tombolPeta = document.getElementById("btn-peta");
// tombolPeta.addEventListener("click", myFunction);

console.log("WebGIS Kependudukan DIY");

let namaWilayah = "Bantul";
let jumlahPenduduk = 1000000;
console.log("namaWIlayah");
console.log("Jumlah penduduk");

let WilayahDIY = ["Kabupaten Bantul", "Kabupaten Gunungkidul", "Kabupaten Kulon Progo", "Kabupaten Sleman", "Kota Yogyakarta"];
console.log(WilayahDIY);

let dataBantul = {
    nama: "Kabupaten Bantul",
    jumlahPenduduk: 1000000,
    luasWilayah: 506.85,
};
console.log(dataBantul);
console.log(dataBantul.nama);

function tampilkanDataWilayah(wilayah) {
    console.log("Selamat Datang di WebGIS Kependudukan DIY");
}
tampilkanDataWilayah();

let tombolPeta = document.getElementById("btn-peta");
tombolPeta.addEventListener("click", function () {
    let status = document.getElementById("status");
    status.textContent = "Tombol Peta telah diklik!";
    status.style.color = "green";
    status.style.backgroundColor = "lightgray";
});


let map = L.map("map").setView([-7.7956, 110.3695], 10);
let geojsonData = null;
let wilayahLayer = null;
let selectedLayer = null;

let OpenTopoMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.opentopomap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
let OpenStreetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



fetch("data/diy-demografi.geojson")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        geojsonData = data;
        wilayahLayer = L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: feature.properties.stroke,
                    fillColor: feature.properties.fill,
                    weight: 1,
                    fillOpacity: 0.8,
                    opacity: 1
                };
            },
            onEachFeature: function (feature, layer) {
                let Informasi = `
                <h1>Informasi Wilayah</h1>
               <div class="popup-content">

        <div
            class="popup-header"
            style="border-left-color: ${feature.properties.fill};"
        >
            <h3>${feature.properties.nama}</h3>
            <span>Informasi Wilayah</span>
        </div>

        <div class="popup-item">
            <span class="popup-label">Jumlah Penduduk</span>
            <strong>${feature.properties.jumlah_penduduk} jiwa</strong>
        </div>

        <div class="popup-item">
            <span class="popup-label">Luas Wilayah</span>
            <strong>${feature.properties.luas_wilayah_km2} km²</strong>
        </div>

        <div class="popup-item">
            <span class="popup-label">Kepadatan Penduduk</span>
            <strong>${feature.properties.kepadatan} jiwa/km²</strong>
        </div>

    </div>
            `;
                layer.bindPopup(Informasi);
            }
            ,
        }).addTo(map);

        geojsonData.features.forEach(function (feature) {
            let option = document.createElement("option");
            option.value = feature.properties.nama;
            option.textContent = feature.properties.nama;
            wilayahSelect.appendChild(option);
        });
        wilayahSelect.addEventListener("change", function () {
            let selectedNama = wilayahSelect.value;

            let selectedFeature = geojsonData.features.find(function (feature) {
                return feature.properties.nama === selectedNama
            });
            if (selectedLayer) {
                map.removeLayer(selectedLayer);
            }

            selectedLayer = L.geoJSON(selectedFeature, {
                style: function (feature) {
                    return {
                        color: feature.properties.stoker,
                        fillColor: feature.properties.fill,
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.8

                    };
                },
                onEachFeature: function (feature, layer) {
                    let Informasi = `
                <h1>Informasi Wilayah</h1>
               <div class="popup-content">

        <div
            class="popup-header"
            style="border-left-color: ${feature.properties.fill};"
        >
            <h3>${feature.properties.nama}</h3>
            <span>Informasi Wilayah</span>
        </div>

        <div class="popup-item">
            <span class="popup-label">Jumlah Penduduk</span>
            <strong>${feature.properties.jumlah_penduduk} jiwa</strong>
        </div>

        <div class="popup-item">
            <span class="popup-label">Luas Wilayah</span>
            <strong>${feature.properties.luas_wilayah_km2} km²</strong>
        </div>

        <div class="popup-item">
            <span class="popup-label">Kepadatan Penduduk</span>
            <strong>${feature.properties.kepadatan} jiwa/km²</strong>
        </div>

    </div>
            `;
                    layer.bindPopup(Informasi);
                }
            }).addTo(map);
            map.fitBounds(selectedLayer.getBounds());

            console.log(selectedFeature);
        });

        let baseMaps = {
            "OpenTopoMap": OpenTopoMap,
            "OpenStreetMap": OpenStreetMap,
        };
        let overlayMaps = {
            "Wilayah DIY": wilayahLayer,
        };
        L.control.layers(baseMaps, overlayMaps,
            {
                position: "topright",
                autoZIndex: true
            }
        ).addTo(map);
    });

let mapPlaceholder = document.getElementById("map-placeholder");
let wilayahSelect = document.getElementById("wilayah-select");

