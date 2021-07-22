import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'

import Header from './components/Header'
import ConfirmPop from './components/ConfirmPop'
import CATEGORIES from '../features/categories'
import { createItem, editItem } from '../features/storageSlice'

import backIcon from '../assets/art/back-ico.svg'

const FormPage = (
  { title,
    editName,
    editCategory,
    editBought,
    editExpires,
    editAmout,
    editUnit,
    editFlair,
    editID,
    confirmText
  }) => {

  let history = useHistory()
  const dispatch = useDispatch()

  const backToList = () => {
    history.push(`/frigg-oo/`)
  }

  const [openConfirmPop, setOpenConfirmPop] = useState(false)

  const handleOpenConfirm = () => {
    setOpenConfirmPop(!openConfirmPop)
  }

  const validate = values => {
    const errors = {}

    if (!values.itemName) {
      errors.itemName = 'Required'
    } else if (values.itemName.length > 15) {
      errors.itemName = 'Must be 15 characters or less'
    }

    if (!values.category) {
      errors.category = 'Required'
    }

    if (!values.amout) {
      errors.amout = 'Required'
    } else if (values.amout > 40000) {
      errors.amout = 'I believe it\'s too much'
    } else if (values.amout < 0) {
      errors.amout = 'I don\'t think it is possible'
    }

    if (!values.unit) {
      errors.unit = 'Required';
    }

    return errors
  }

  const today = new Date()
  const month = ((today.getMonth() + 1) < 10) ? `0${today.getMonth() + 1}` : today.getMonth()
  const formattedToday = `${today.getFullYear()}-${month}-${today.getDate()}`

  const defaultRed = (editFlair)
    ? editFlair.match(/rgb\([0-9]+/)[0].slice(4)
    : 32
  const defaultGreen = (editFlair)
    ? editFlair.match(/,[0-9]+,/)[0].slice(1).slice(0, -1)
    : 32
  const defaultBlue = (editFlair)
    ? editFlair.match(/,[0-9]+\)/)[0].slice(1).slice(0, -1)
    : 32

  const formik = useFormik({
    initialValues: {
      itemName: editName || '',
      category: editCategory || '',
      boughtDate: editBought || formattedToday,
      expiresDate: editExpires || formattedToday,
      amout: editAmout || '',
      unit: editUnit || '',
      redColor: defaultRed,
      greenColor: defaultGreen,
      blueColor: defaultBlue
    },
    validate,
    onSubmit: values => {
      handleOpenConfirm()
    }
  })

  const handleSubmitForm = () => {
    const values = formik.values
    if (!editID) {
      dispatch(createItem({
        name: values.itemName,
        category: values.category,
        bought: values.boughtDate,
        expires: values.expiresDate,
        amout: values.amout,
        unit: values.unit,
        flair: `rgb(${values.redColor},${values.greenColor},${values.blueColor})`
      }))
      history.push(`/frigg-oo/`)
    } else {
      dispatch(editItem({
        id: editID,
        name: values.itemName,
        category: values.category,
        bought: values.boughtDate,
        expires: values.expiresDate,
        amout: values.amout,
        unit: values.unit,
        flair: `rgb(${values.redColor},${values.greenColor},${values.blueColor})`
      }))
      history.push(`/frigg-oo/`)
    }
  }

  const handleColorSliderChange = event => {
    const max = event.target.max
    const val = event.target.value

    event.target.style.backgroundSize = val * 100 / max + '% 100%'
  }

  const redSlider = useRef(null)
  const greenSlider = useRef(null)
  const blueSlider = useRef(null)

  useEffect(() => {
    redSlider.current.style.backgroundSize = defaultRed * 100 / 255 + '% 100%'
    greenSlider.current.style.backgroundSize = defaultGreen * 100 / 255 + '% 100%'
    blueSlider.current.style.backgroundSize = defaultBlue * 100 / 255 + '% 100%'
  }, [defaultRed, defaultGreen, defaultBlue])

  return (
    <>
      <Header
        navSrc={backIcon}
        navAlt="Back to list page"
        navFunc={backToList}
        title={title}
        flairColor={`rgb(${formik.values.redColor},${formik.values.greenColor},${formik.values.blueColor})`}
      />
      <main className="list-page">
        <form className="list-page__form" onSubmit={formik.handleSubmit}>
          <label htmlFor="itemName">Name:</label>
          <input
            name="itemName"
            type="text"
            placeholder="My name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.itemName}
          />
          {formik.touched.itemName && formik.errors.itemName ? (
            <p className="list-page__error">{formik.errors.itemName}</p>
          ) : null}
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option disabled={true} value="" hidden={true}>Category</option>
            {CATEGORIES.map(element => (
              <option value={element.id} key={element.id}>{element.name}</option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <p className="list-page__error">{formik.errors.category}</p>
          ) : null}
          <label htmlFor="boughtDate">Bought:</label>
          <input
            name="boughtDate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.boughtDate}
          />
          <label htmlFor="expiresDate">Expires:</label>
          <input
            name="expiresDate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.expiresDate}
          />
          <div className="list-page__form__amout">
            <div className="list-page__form__amout__field">
              <label htmlFor="amout">Amout:</label>
              <input
                name="amout"
                type="number"
                placeholder="100"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amout}
                min="0"
              />
              {formik.touched.amout && formik.errors.amout ? (
                <p className="list-page__error">{formik.errors.amout}</p>
              ) : null}
            </div>
            <div className="list-page__form__unit__field">
              <label htmlFor="unit">Unit:</label>
              <select
                name="unit"
                type="text"
                placeholder="g"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.unit}
              >
                <option disabled={true} value="" hidden={true}>unit</option>
                <option value="pcs.">pcs.</option>
                <option value="doses">doses</option>
                <option value="ml">ml</option>
                <option value="cl">cl</option>
                <option value="l">l</option>
                <option value="fl. oz.">fl. oz.</option>
                <option value="gal.">gal.</option>
                <option value="g">g</option>
                <option value="dag">dag</option>
                <option value="kg">kg</option>
                <option value="oz.">oz.</option>
                <option value="lb.">lb.</option>
              </select>
              {formik.touched.unit && formik.errors.unit ? (
                <p className="list-page__error">{formik.errors.unit}</p>
              ) : null}
            </div>
          </div>
          <p className="list-page__form__title">Flair color:</p>
          <fieldset className="list-page__form__colors">
            <input
              type="range"
              name="redColor"
              min="0" max="255"
              step="0"
              onChange={event => { formik.handleChange(event); handleColorSliderChange(event) }}
              onBlur={formik.handleBlur}
              value={formik.values.redColor}
              id="range-red-color"
              ref={redSlider}
            />
            <input
              type="range"
              name="greenColor"
              min="0" max="255"
              step="0"
              onChange={event => { formik.handleChange(event); handleColorSliderChange(event) }}
              onBlur={formik.handleBlur}
              value={formik.values.greenColor}
              id="range-green-color"
              ref={greenSlider}
            />
            <input
              type="range"
              name="blueColor"
              min="0" max="255"
              step="0"
              onChange={event => { formik.handleChange(event); handleColorSliderChange(event) }}
              onBlur={formik.handleBlur}
              value={formik.values.blueColor}
              id="range-blue-color"
              ref={blueSlider}
            />
          </fieldset>
          <button
            type="submit"
            disabled={!(formik.isValid && (formik.dirty || (editID)))}
            className={`confirm-disabled-${!(formik.isValid && (formik.dirty || (editID)))}`}
          >
            Confirm
          </button>
        </form>
      </main>
      <ConfirmPop
        isOpen={openConfirmPop}
        cancelFunc={handleOpenConfirm}
        confirmFunc={handleSubmitForm}
        text={confirmText}
      />
    </>
  )
}

export default FormPage