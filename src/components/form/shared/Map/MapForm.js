import React, { useEffect, useState } from "react"
import GoogleMapReact from 'google-map-react';
import SearchBox from "../../../GoogleMap/SearchBox";
import GoogleMap from "../../../GoogleMap/googleMap";
import isEmpty from "lodash/isEmpty"
import Marker from "../../../GoogleMap/Marker";
import Geocode from "../../../../../Config/GeoCodeConfig"
class MapForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            draggable: false,
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            places: [],
            currentPosition: { lat: 0, lng: 0 }
        }



    }
    apiHasLoaded = (map, maps) => {
        this.setState({ mapApiLoaded: true, mapApi: maps, mapInstance: map })
    }
    addPlace = async (place) => {
        const { lat, lng } = (await Geocode.fromAddress(place[0].formatted_address)).results[0].geometry.location
        this.props.form.setFieldValue(this.props.field.name, { lat, lng });
        this.setState({ places: place })
    }

    componentDidMount() {
        this.getCurrentPosition();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.field.value != this.props.field.value) {
            this.setState({ currentPosition: this.props.field.value })
        }
    }
    onMarkerDown = (childKey, childProps, mouse) => {
        const { lat, lng } = mouse
        this.setState({ currentPosition: { lat, lng }, draggable: false })
    }
    onMarkerUp = () => {
        this.setState({ draggable: true })
    }
    onMarkerMove = (childKey, childProps, mouse) => {
        const { lat, lng } = mouse;
        this.setState({ currentPosition: { lat, lng } })
        this.props.form.setFieldValue(this.props.field.name, { lat, lng });

    }
    getCurrentPosition = () => {
        if (!this.props.field.value) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords
                this.setState({ currentPosition: { lat: latitude, lng: longitude } })
            })
        }
    }
    render() {
        const { places, mapApiLoaded, mapInstance, mapApi, currentPosition, draggable } = this.state
        return (
            <>
                {mapApiLoaded && <SearchBox map={mapInstance} currentPosition={currentPosition} mapApi={mapApi} addPlace={this.addPlace} />}
                <GoogleMap defaultZoom={10} center={currentPosition}
                    yesIWantToUseGoogleMapApiInternals
                    draggable={draggable}
                    onGoogleApiLoaded={({ map, maps }) => {
                        this.apiHasLoaded(map, maps)
                    }}
                    onChildMouseDown={this.onMarkerDown}
                    onChildMouseMove={this.onMarkerMove}
                    onChildMouseUp={this.onMarkerUp}
                >
                    <Marker lat={currentPosition.lat} lng={currentPosition.lng} key="qsqs-11" />
                    {/*    {!isEmpty(places) && places.map((place) => (<Marker
                        key={place.id}
                        text={place.name}
                        lat={place.lat)}
                        lng={place.lng)}
                    />))
                    } */}
                </GoogleMap>
            </>
        )
    }



}

export default MapForm;