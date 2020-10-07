import React, { useEffect, useState } from "react"
import Button from "../../components/button/button"
import TravelListDown from "../../components/Down/TravelListDown"
import TravelService from "../../service/TravelService"

const TravelPage = (props) => {
    const [dataTravels, setDataTravels] = useState({ isLoading: true, travels: [] })
    const [travelSelect, setTravelSelect] = useState(null)
    useEffect(() => {
        getDataTravels();
    }, [])
    const getDataTravels = async () => {
        const travels = (await TravelService.all()).data
        setDataTravels({ isLoading: false, travels })

    }
    const handleEditTravel = (travel) => {
        setTravelSelect(travel)
    }
    return <div className="row">
        <div className="col s12">
            <a className="right btn indigo darken-3 modal-trigger" href="#modal1">new Travel</a>
        </div>
        <div className="container row">
            <TravelListDown travels={dataTravels.travels} handleEdit={handleEditTravel} isLoading={dataTravels.isLoading} />
        </div>
        <div id="modal1" className="modal">
            <div className="modal-content">

            </div>
            <div className="modal-footer">
                <button className="modal-close waves-effect waves-green btn-flat" formTarget="" >Saved</button>
            </div>
        </div>
    </div>
}
export default TravelPage;