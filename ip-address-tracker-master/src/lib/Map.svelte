<script>
  import { onMount } from 'svelte';

  onMount(async () => {

    const leaflet = await import('leaflet');

    const apiKey = 'at_I2SYGMKgH1cM4rXERLAFZ0uI1lEqY';
    const bypassCorsUrl = 'https://justcors.com/l_w7mn5wogy9/';
    const apiUrl = 'https://geo.ipify.org/api/v2/country,city';

    // elements to update
    let ip = document.getElementById('ip');
    let city = document.getElementById('city');
    let timeZone = document.getElementById('timeZone');
    let isp = document.getElementById('isp');

    // form elements 
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    var icon = leaflet.icon({
        iconUrl: '/icon-location.svg',
        iconSize:     [46, 56], // size of the icon
        iconAnchor:   [23, 56], // point of the icon which will correspond to marker's location
    });

    const map = leaflet.map('map', {
      center: [0,0],
      zoom: 0,
      zoomControl: false,
      layers: [
        leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    }).setView([51.5, -0.09], 13);

    const setMapView = (map, lat, lng) => {
      map.setView([lat, lng]);
    }

    const updateMarker = (marker = [51.5, -0.09]) => {
      map.setView(marker, 13);
      leaflet.marker(marker, {
        icon: icon,
      }).addTo(map);
    }

    const headers = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    const getIpDetails = (defaultIp) => {
      if (defaultIp == undefined) {
        var ipUrl = `${bypassCorsUrl}${apiUrl}?apiKey=${apiKey}`;
      } else {
        var ipUrl = `${bypassCorsUrl}${apiUrl}?apiKey=${apiKey}&ipAddress=${defaultIp}`;
      }

      fetch(ipUrl, headers)
        .then(results => results.json())
        .then(data => {
          ip.textContent = data.ip;
          city.textContent = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
          timeZone.textContent = data.location.timezone;
          isp.textContent = data.isp;

          updateMarker([data.location.lat, data.location.lng]);
        })
        .catch(error => {
          alert("Unable to get IP details");
        });
    }

    const setInitialMarker = () => {
      const ipUrl = `${bypassCorsUrl}${apiUrl}?apiKey=${apiKey}`;

      fetch(ipUrl, headers)
        .then(results => results.json())
        .then(data => {
          ip.textContent = data.ip;
          city.textContent = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
          timeZone.textContent = data.location.timezone;
          isp.textContent = data.isp;

          updateMarker([data.location.lat, data.location.lng]);
        });
    }

    document.addEventListener('load', setInitialMarker());

    searchBtn.addEventListener('click', e => {
      e.preventDefault();

      if (searchInput.value !== '' && searchInput.value !== null) {
        getIpDetails(searchInput.value);
        return;
      }

      alert("Please enter a valid IP address");
    })
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />

  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
</svelte:head>

<div id="map" class="map"></div>

<style>
  @import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';

  .map {
    height: calc(100vh - 300px);
  }

  @media (min-width: 992px) {
    .map {
      height: calc(100vh - 280px);
    }
  }
</style>
