import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import UserService from "../../../service/UserService"
import DriverTypeService from "../../../service/DriverTypeService"
import SelectField from "../shared/Select/SelectField"

import { uuid } from 'uuidv4';
import TravelService from "../../../service/TravelService"
import CheckBoxCustom from "../shared/CheckBox/CheckBox"
import SelectCreatableForm from "../shared/Select/SelectCreatableForm"

const validateSchema = Yup.object().shape({
    driverTypeId: Yup.string().required("required"),
    outward: Yup.bool().required("required"),
    quantityKilometers: Yup.number().typeError("only numbers").required("required"),
    users: Yup.array(),
    pointStart: Yup.string().required("requerido"),
    pointEnd: Yup.string().required("required")
})
const TravelForm = ({ travelSelect, handleSubmitSuccess }) => {
    const [dataUsers, setDataUsers] = useState({ loading: true, users: [] })
    const [dataDriverType, setDataDriverType] = useState({ loading: true, driversType: [] })
    const travelSelectMap = travelSelect ? { id: travelSelect.id, driverTypeId: travelSelect.driverType.id, pointStart: travelSelect.points[0].name, pointEnd: travelSelect.points[1].name, users: travelSelect.users, quantityKilometers: travelSelect.quantityKilometers } : { id: 0, quantityKilometers: "", driverTypeId: "", users: [], pointStart: "", pointEnd: "", outward: false }
    useEffect(() => {
        getDataUser();
        getDataDriverType()
    }, [])
    const getDataUser = async () => {
        const userMap = (await UserService.all()).data
        setDataUsers({ loading: false, users: userMap.map((user) => ({ value: user.id, label: user.name })) })
    }
    const getDataDriverType = async () => {
        const driverTypeMap = (await DriverTypeService.all()).data
        setDataDriverType({ loading: false, driversType: driverTypeMap.map((driver) => ({ value: driver.id, label: driver.name })) })
    }
    const onSubmit = async (values) => {
        let dataValues = { ...values, points: [{ type: "start", name: values.pointStart, lat: 0.0, lng: 0.0 }, { type: "end", name: values.pointEnd, lat: 0.0, lng: 0.0 }], users: values.users.map((user) => ({ id: user.value })) }
        if (travelSelectMap.id == 0) {
            dataValues.id = uuid();
            TravelService.save({ ...dataValues })
        } else {
            dataValues.id = travelSelectMap.id;
            TravelService.update({ ...dataValues })
        }
        handleSubmitSuccess(dataValues)
    }

    return (<Formik initialValues={travelSelectMap} validationSchema={validateSchema} enableReinitialize={true} onSubmit={onSubmit} mapPropsToValues={() => {
        return travelSelectMap
    }
    }>
        {
            ({ values, handleChange, errors, touched, isSubmitting, setFieldValue, setErrors, validateField, resetForm }) => (
                <Form className="form">
                    <div className="row">
                        <div className="col s12 m12">
                            <div className="form-group mb-3">
                                <label className="wSemiBold" htmlFor="pointStart">Punto Inicial *</label>
                                <Field name="pointStart" type="text" className={`field  form-control ${errors.name && touched.name ? "is-invalid" : ""}`} />
                                <ErrorMessage name="pointStart" component="div" className="form-group-error" />
                            </div>
                        </div>
                        <div className="col s12 m12">
                            <div className="form-group mb-3">
                                <label className="wSemiBold" htmlFor="pointEnd">Punto Final*</label>
                                <Field name="pointEnd" type="text" className={`field  form-control ${errors.name && touched.name ? "is-invalid" : ""}`} />
                                <ErrorMessage name="pointEnd" component="div" className="form-group-error" />
                            </div>
                        </div>
                        <div className="col s12">
                            <div className="form-group mb-3">
                                <label className="wSemiBold" htmlFor="price">Quantity kilometers</label>
                                <Field name="quantityKilometers" type="text" placeholder="kilometers" className={`field form-control ${errors.price && touched.price ? "is-invalid" : ""}`} />
                                <ErrorMessage name="quantityKilometers" component="div" className="form-group-error" />
                            </div>
                        </div>

                        <div className="col m5">
                            <div className="form-group mb-3">
                                <label className="wSemiBold" htmlFor="price">Tipo de vehiculo*</label>
                                <Field name="driverTypeId" component={SelectField} options={dataDriverType.driversType} isLoading={dataDriverType.loading} placeholder="driver" className={`field form-control ${errors.price && touched.price ? "is-invalid" : ""}`} />

                                <ErrorMessage name="driverTypeId" component="div" className="form-group-error" />
                            </div>
                        </div>
                        <div className="col m5">
                            <div className="form-group mb-3">
                                <label className="wSemiBold" htmlFor="users">Usuarios*</label>
                                <Field name="users" component={SelectCreatableForm} options={dataUsers.users} isLoading={dataUsers.loading} isMulti={true} placeholder="users" className={`field form-control ${errors.price && touched.price ? "is-invalid" : ""}`} />

                                <ErrorMessage name="users" component="div" className="form-group-error" />
                            </div>
                        </div>
                        <div className="col m5">
                            <div className="form-group mb-3">
                                <label className="wSemiBold" htmlFor="outward">Solo ida?*</label>
                                <Field name="outward" component={CheckBoxCustom} className={`field form-control ${errors.price && touched.price ? "is-invalid" : ""}`} />

                                <ErrorMessage name="outward" component="div" className="form-group-error" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 d-flex justify-content-end" style={{ padding: ".5rem", borderTop: "1px solid #eee" }}>
                        <button
                            className="btn btn-save wBold"
                            type="submit"
                        >
                            {
                                values.id == 0 ? "Guardar" : "Editar"
                            }
                        </button>
                    </div>
                </Form>
            )
        }
    </Formik >)

}

export default TravelForm;