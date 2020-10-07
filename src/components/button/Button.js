import React from "react"
import "../../styles/componentCustom/button.scss"
const Button = ({ children, ...props }) => {
    return <button {...props}>{children}</button>
}
export default Button;