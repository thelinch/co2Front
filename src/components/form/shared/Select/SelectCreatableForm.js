import React, { useEffect } from "react"
import CreatableSelect from "react-select/creatable"
import {
    useState
} from "react"
const createOption = (label) => {
    return {
        label,
        value: `${label} ${Math.random()}`
    }
}
const components = {
    DropdownIndicator: null,
};


const SelectCreatableForm = ({
    menuIsOpen,
    placeholder,
    isMulti,
    field,
    form,
    options,
    isLoading
}) => {
    /* 
    useEffect(() => {
        setValue(field.value)

    }, [field.value]) */
    const [value, setValue] = useState(field.value || [])
    const [inputValue, setInputValue] = useState('')
    useEffect(() => {
        setValue(field.value)
    }, [field.value])
    const handleInputChange = (inputValue) => {
        setInputValue(inputValue)
    }
    const handleKeyDown = (event) => {
        if (!inputValue) return
        const optionCreated = createOption(inputValue)
        switch (event.key) {
            case "Enter":
            case "Tab":
                setInputValue('')
                setValue([...value, optionCreated])
                form.setFieldValue(field.name, [...value, optionCreated])
                event.preventDefault();
                break;
        }
    }
    const handleChange = (value) => {
        form.setFieldValue(field.name, value != null ? value : [])
        setValue(value != null ? value : [])
    }
    return (< CreatableSelect isMulti={
        isMulti
    }
        onChange={
            handleChange
        }
        inputValue={
            inputValue
        }
        components={
            components
        }
        onKeyDown={
            handleKeyDown
        }
        onInputChange={

            handleInputChange
        }
        options={options}
        isLoading={isLoading}
        placeholder={
            placeholder
        }
        value={
            value
        }
        menuIsOpen={
            menuIsOpen
        }

    />)
}
export default SelectCreatableForm;
