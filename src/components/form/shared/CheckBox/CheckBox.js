import { FormControlLabel } from "@material-ui/core";
import React, { useState } from "react"


const CheckBox = ({ field, form, ...props }) => {
    const [checked, setChecked] = useState(field.value)
    const onChange = (e) => {
        e.persist();
        setChecked(!checked)
        form.setFieldValue(field.name, e.target.checked)
    }
    return (<input type="checkbox" {...props} onChange={onChange} checked={checked} />);
}

export default CheckBox;