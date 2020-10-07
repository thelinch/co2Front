import React, { useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
const SimpleSelect = ({ options, isDisabled, placeholder = "seleccionar", isLoading, value, handleChange, ...props }) => {
    const [optionSelect, setOptionSelect] = useState(value ? value : "")
    const handleChangeComponent = (e) => {
        setOptionSelect(e)
        handleChange(e)
    }

    return <Select value={optionSelect} defaultValue={options[0]} isLoading={isLoading} isDisabled={isDisabled} classNamePrefix="react-select" {...props} onChange={handleChangeComponent} options={options} placeholder={placeholder} isClearable={false} noOptionsMessage={() => "No hay resultados"} />
}
SimpleSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        label: PropTypes.string
    })),
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool
}
SimpleSelect.defaultProps = {
    options: [],
    isLoading: true,
    placeholder: "Seleccionar",
    isDisabled: false,
    value: []
}

export default SimpleSelect
