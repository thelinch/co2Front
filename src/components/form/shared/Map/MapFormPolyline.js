import React from "react"
import SearchBox from "../../../GoogleMap/SearchBox";
import GoogleMap from "../../../GoogleMap/googleMap";
import Marker from "../../../GoogleMap/Marker";
import Geocode from "../../../../../Config/GeoCodeConfig"
import { Info } from 'google-map-react';

class MapFormPolyline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            draggable: false,
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            places: [],
            points: []
        }



    }
    apiHasLoaded = (map, maps) => {
        this.setState({ mapApiLoaded: true, mapApi: maps, mapInstance: map })
    }
    addPlace = async (place) => {
        const { lat, lng } = (await Geocode.fromAddress(place[0].formatted_address)).results[0].geometry.location
        const { points } = this.state
        points.push({ lat, lng, name: place[0].formatted_address })
        this.props.form.setFieldValue(this.props.field.name, points);
        this.setState({ points: points })
    }


    componentDidUpdate(prevProps) {
        if (prevProps.field.value != this.props.field.value) {
            this.setState({ points: this.props.field.value })
        }
    }
    onMarkerDown = (childKey, childProps, mouse) => {
        const { lat, lng } = mouse
        console.log("child", childKey, "childPopr", childProps)
        this.setState({ draggable: false })
    }
    onMarkerUp = () => {
        this.setState({ draggable: true })
    }
    onMarkerMove = (childKey, childProps, mouse) => {
        const { lat, lng } = mouse;
        this.setState({ currentPosition: { lat, lng } })
        this.props.form.setFieldValue(this.props.field.name, { lat, lng });

    }

    render() {
        const { places, mapApiLoaded, mapInstance, mapApi, currentPosition, draggable, points } = this.state
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
                    {
                        points.map((point) => (
                            <Marker lat={point.lat} lng={point.lng} key="qsqs-11" />
                        ))
                    }
                </GoogleMap>
            </>
        )
    }



}

export default MapFormPolyline;