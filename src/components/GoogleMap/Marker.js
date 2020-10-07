import React from "react"
import PropTypes from 'prop-types';

const Marker = ({ text, onClick }) => {
    return (<div className="pin bounce" onClick={onClick} >
        { text}
        <div className="pulse" />
    </div >)
}
Marker.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
};

Marker.defaultProps = {
    onClick: null,
};

export default Marker;