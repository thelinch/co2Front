import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
        }
    }
    componentDidMount() {
        /*    if (this.props.field.value) {
               const { options, field } = this.props;
               console.log("select", this.findOption(options, field.value))
   
               this.setState({
                   selectedOption: this.findOption(options, field.value)
               });
           } */
        const { options, field } = this.props;
        this.setState({
            selectedOption: this.findOption(options, field.value)
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.field.value != this.props.field.value || prevProps.options.length != this.props.options.length) {
            const { options, field } = this.props;
            this.setState({
                selectedOption: this.findOption(options, field.value)
            });

        }
    }
    findOption = (options, value) => {
        let option = options.find(option => option.value === value);
        return option ? option : '';
    }
    handleChange = (selected) => {
        console.log("selet", selected)
        const value = selected ? this.props.isMulti ? selected : selected.value : '';
        this.setState({
            selectedOption: selected,
        }, () => this.props.form.setFieldValue(this.props.field.name, value))
    };

    render() {
        // console.log(this.props)
        const { field, form, options, isDisabled, isClearable, placeholder, isLoading, isMulti } = this.props;
        const { selectedOption } = this.state;
        return (
            <Select
                name={field.name}
                value={selectedOption}
                onChange={this.handleChange}
                isMulti={isMulti}
                onBlur={field.onBlur}
                options={options}
                clearable={false}
                isDisabled={isDisabled}
                isClearable={isClearable}
                isLoading={isLoading}
                className="react-select"
                placeholder={placeholder}
                classNamePrefix="react-select"
                noOptionsMessage={() => "No hay resultados"}
            />
        );
    }
}
SelectField.propTypes = {

    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        label: PropTypes.string,
    })),
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    isClearable: PropTypes.bool,
    isLoading: PropTypes.bool,
    isMulti: PropTypes.bool.isRequired
}

SelectField.defaultProps = {
    options: [],
    placeholder: '',
    isDisabled: false,
    isClearable: true,
    isLoading: true,
    isMulti: false
}

export default SelectField;