import React from 'react'
import { DrawingManager, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { apiKey } from "../../../../apikey";

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

//TODO: Take position of fetched items[0].
const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = () =>{ 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['drawing'],
  })

  
  

  const [map, setMap] = React.useState(null)
  const [polygon, setPolygon] = React.useState<google.maps.Polygon>();

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
    const _polygon: google.maps.Polygon = new google.maps.Polygon({
      paths: [
        new google.maps.LatLng(0, 0),
      ],
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    });

    setPolygon(_polygon);

    
  }, [])

  function drawLine(e: google.maps.MapMouseEvent)
  {
    
    polygon!.getPaths().push(new google.maps.MVCArray([e.latLng!]))
    //polygon.getPaths().insertAt(0, new google.maps.MVCArray([e.latLng!]));
    polygon!.setMap(map)
    //console.log(polygon!.getPaths().getAt(polygon!.length-1));
  }

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControlOptions:{
            position: google.maps.ControlPosition.LEFT_BOTTOM
          },
        }}
        onClick={(e) => {drawLine(e)}}
        
      >
        { <DrawingManager/> }
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)