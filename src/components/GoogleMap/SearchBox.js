import React from "react"
import Geocode from "../../../Config/GeoCodeConfig"



class SearchBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectDirection: ""
        }

    }
    componentDidMount({ map, mapApi } = this.props) {
        this.searchBox = new mapApi.places.SearchBox(this.searchInput)

        this.searchBox.addListener("places_changed", this.onPlacesChanged)
    }
    async componentDidUpdate(previusProps) {
        if (previusProps.currentPosition != this.props.currentPosition) {
            const { results } = await Geocode.fromLatLng(this.props.currentPosition.lat, this.props.currentPosition.lng);
            this.setState({ selectDirection: results[0].formatted_address })
        }
        /* 
        results[0].geometry.location */
    }
    onPlacesChanged = ({ map, addPlace } = this.props) => {
        const selected = this.searchBox.getPlaces();
        const { 0: place } = selected
        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport)
        } else {
            map.setCenter(place.geometry.location)
            map.setZoom(17)
        }
        this.setState({ selectDirection: selected[0].formatted_address })
        addPlace(selected)
        this.searchInput.blur();
    }
    clearSearchBox = () => {
        this.searchInput.value = ""
    }

    render() {
        const { selectDirection } = this.state
        return (<div id="location-search-bar-card" className="card">
            <div className="card-body">
                <p id="title-label" className="search-title"> Ubicación en el mapa </p>
                <input id="my-pac-input" ref={(ref) => {
                    this.searchInput = ref;
                }} onFocus={this.clearSearchBox} type="text" className="controls form-control rNoEmpty" type="text" placeholder="Ingresa tu ubicación" />
                <div className="error hide">Este campo es requerido.</div>
                <br />
                <div id="selected-location-wrapper">
                    <p className="search-title"> Dirección seleccionada </p>
                    <div className="gray-container" id="address-wrapper">
                        <p id="selected-location">
                            {selectDirection}
                        </p>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default SearchBox;