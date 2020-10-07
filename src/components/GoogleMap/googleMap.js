import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';


const GoogleMap = ({ children, ...props }) => {


    return <GoogleMapReact bootstrapURLKeys={{
        key: "AIzaSyAgFAF9Tn1Kejy1maws475_rzbnNz0VBR4",
        libraries: ['places', 'geometry'],
    }} {...props}
    >
        {children}
    </GoogleMapReact>

}


GoogleMap.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

GoogleMap.defaultProps = {
    children: null
}
export default GoogleMap;