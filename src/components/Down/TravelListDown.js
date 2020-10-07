import React from "react"
import PropTypes from "prop-types"
import Skeleton from 'react-loading-skeleton';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import "../../styles/componentCustom/travel.scss"
import { Tooltip } from "@material-ui/core";
const TravelListDown = ({ isLoading, travels, handleEdit, ...props }) => {
    const notData = <strong>No hay datos</strong>
    const travelSkelton = [1, 2, 3, 4].map((value) => (
        <div className="card  travel col s12 m4" >
            <div className="card-title d-flex justify-contend-between travel-title" key={value}>
                <div className="travel-title__users d-flex" >
                    {
                        [1, 2, 3, 4].map((user) => (
                            <div className="user" key={user}>
                                <Skeleton width="40px" height="40px" circle />
                            </div>
                        ))
                    }
                </div>
                <div className="travel-title__icon" >
                    <Skeleton width="20px" height="20px" />

                </div>
            </div>
            <div className="card-content travel-content" >
                <div className="travel-content__position  d-flex aling-items-center ">
                    <i className="material-icons" style={{ color: "red" }}>place</i>
                    <strong>
                        <Skeleton width="60px" height="20px" />

                    </strong>
                    <span>-</span>
                    <Skeleton width="60px" height="20px" />
                    <strong></strong>
                </div>
                <Skeleton width="30px" height="30px" className="right" circle />
            </div>
        </div>
    ))
    const travelMap = travels.map((travel) => (
        <div className="card  travel col s12 m4" key={travel.id}>
            <div className="card-title d-flex justify-contend-between travel-title">
                <div className="travel-title__users" >

                    <AvatarGroup max={4}>
                        {
                            travel.users.map((user) => (
                                <Tooltip title={user.name}>
                                    <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
                                </Tooltip>
                            ))
                        }
                    </AvatarGroup>


                </div>
                <div className="travel-title__icon" >
                    <Tooltip title={travel.driverType.name}>
                        <i className="material-icons">{travel.driverType.icon}</i>
                    </Tooltip>
                </div>
            </div>
            <div className="card-content travel-content">
                <div className="travel-content__position justify-contend-center d-flex aling-items-center ">
                    <i className="material-icons" style={{ color: "red" }}>place</i>
                    <strong>{travel.points[0].name}</strong>
                    <span>-</span>
                    <strong>{travel.points[1].name}</strong>
                </div>

            </div>
            <div className="travel-calcCo2  right">{travel.calcCo2}</div>
        </div>
    ))
    return isLoading ? travelSkelton : travels.length > 0 ? travelMap : notData;
}
TravelListDown.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    handleEdit: PropTypes.func.isRequired,
    travels: PropTypes.array.isRequired
}
TravelListDown.defaultProps = {
    isLoading: true,
    travels: []
}

export default TravelListDown;

