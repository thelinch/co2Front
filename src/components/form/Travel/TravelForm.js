import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import AditionalService from "../../services/AditionalService"
import * as Yup from "yup"
import MapFormPolyline from "../shared/Map/MapFormPolyline"
import UserService from "../../../service/UserService"
import DriverTypeService from "../../../service/DriverTypeService"
const validateSchema = Yup.object().shape({
    driverTypeId: Yup.string().required("required"),
    outward: Yup.bool().required("required"),
    quantityKilometers: Yup.number().typeError("only numbers").required("required"),
    users: Yup.array(),
    points: Yup.array().of(Yup.object().shape({
        lat: Yup.number().required("required"),
        lng: Yup.number().required("required"),
        name: Yup.string().required("requerido"),
        type: Yup.string()
    }))
})
const TravelForm = ({ travelSelect, commerceId, handleSubmitSuccess }) => {
    const [dataUsers, setDataUsers] = useState({ loading: true, users: [] })
    const [dataDriverType, setDataDriverType] = useState({ loading: true, driversType: [] })
    const travelSelectMap = travelSelect ? { id: travelSelect.id, name: travelSelect.name, price: travelSelect.price } : { id: 0, name: "", price: "" }
    useEffect(() => {
        getDataUser();
    }, [])
    const getDataUser = async () => {
        const userMap = (await UserService.all()).data
        setDataUsers({ loading: false, users: userMap.map((user) => ({ value: user.id, label: user.name })) })
    }
    getDataDriverType = async () => {
        const driverTypeMap = (await DriverTypeService.all()).data
        setDataDriverType({ loading: false, driversType: driverTypeMap.map((driver) => ({ value: driver.id, label: driver.name })) })
    }
    const onSubmit = async (values) => {

        handleSubmitSuccess()
    }

    return (<Formik initialValues={travelSelectMap} validationSchema={validateSchema} enableReinitialize={true} onSubmit={onSubmit} mapPropsToValues={() => {
        return travelSelectMap
    }
    }>
        {
            ({ values, handleChange, errors, touched, isSubmitting, setFieldValue, setErrors, validateField, resetForm }) => (
                <Form className="form">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <label className="wSemiBold" htmlFor="name">Point start and end*</label>
                                <Field name="pints" component={MapFormPolyline} className={`field  form-control ${errors.name && touched.name ? "is-invalid" : ""}`} />
                                <ErrorMessage name="points" component="div" className="form-group-error" />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group mb-3">
                                <label className="wSemiBold" htmlFor="price">Precio*</label>
                                <Field type="text" name="price" placeholder="Ingrese el precio" className={`field form-control ${errors.price && touched.price ? "is-invalid" : ""}`} />
                                {/* <Field type="text" component={InputCustomWithRegex} placeholder="Ingrese el precio" className={`field form-control ${errors.price && touched.price ? "is-invalid" : ""}`} message="el valor debe ser numerico" regex={patternOnlyNumberAndTwoDigits} name="price" /> */}

                                <ErrorMessage name="price" component="div" className="form-group-error" />
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