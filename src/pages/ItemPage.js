import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from './components/Header'
import CornerButton from './components/CornerButton'
import ConfirmPop from './components/ConfirmPop'
import { removeItem, addToItem, subtToItem } from '../features/storageSlice'

import backIcon from '../assets/art/back-ico.svg'
import editIcon from '../assets/art/edit-ico.svg'
import addIcon from '../assets/art/add-ico.svg'
import sbtIcon from '../assets/art/sbt-ico.svg'

const ItemPage = ({ id, name, category, flair, expires, amout, unit, bought }) => {

  let history = useHistory()
  const dispatch = useDispatch()

  const backToList = () => {
    history.push(`/frigg-oo/${category}`)
  }

  const handleCornerButton = () => {
    history.push(`/frigg-oo/${category}/${name.toLowerCase()}-${id}/edit`)
  }

  const handleRemove = () => {
    dispatch(removeItem(id))
    history.push(`/frigg-oo/${category}`)
  }

  const boughtDate = new Date(Date.parse(bought))
    .toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const expiresDate = new Date(Date.parse(expires))
    .toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })

  const [openConfirmPop, setOpenConfirmPop] = useState(false)

  const handleOpenConfirm = () => {
    setOpenConfirmPop(!openConfirmPop)
  }

  const [editAmout, setEditAmout] = useState('')
  const [editAmoutError, setEditAmoutError] = useState('')
  const [canEditAmout, setCanEditAmout] = useState(false)

  const handleEditAmoutChange = event => {
    setEditAmout(event.target.value)
    if (Number(event.target.value) < 0) {
      setEditAmoutError('Value too low')
      setCanEditAmout(false)
    } else if (!event.target.value) {
      setEditAmoutError('')
      setCanEditAmout(false)
    } else {
      setEditAmoutError('')
      setCanEditAmout(true)
    }
  }

  const handleEditAdd = () => {
    dispatch(addToItem({
      id: id,
      amout: editAmout
    }))
    console.log(editAmout)
  }

  const handleEditSubt  = () => {
    if(Number(editAmout) > Number(amout)) {
      setEditAmout(amout)
      dispatch(subtToItem({
        id: id,
        amout: amout
      }))
    } else {
      dispatch(subtToItem({
        id: id,
        amout: editAmout
      }))
    }
  }

  return (
    <>
      <Header
        navSrc={backIcon}
        navAlt="Back to list page"
        navFunc={backToList}
        title={name}
        flairColor={flair}
      />
      <main className="list-page">
        <p className="list-page__text">{`Bought on ${boughtDate}`}</p>
        <p className="list-page__text">{`Expires on ${expiresDate}`}</p>
        <p className="list-page__amout">{`${amout} ${unit}`}</p>
        <label
          className="list-page__text"
          htmlFor="editAmout"
        >
          Amout to add/subtract
        </label>
        <div className="list-page__edit-button__wrapper">
          <button
            className={`list-page__edit-button list-page__edit-button-${canEditAmout}`}
            disabled={!canEditAmout}
            onClick={handleEditAdd}
          >
            <img src={addIcon} alt="Add amout to stock" />
          </button>
          <input
            name="editAmout"
            className="list-page__field"
            placeholder="1"
            type="number"
            min="0" max={amout}
            onChange={handleEditAmoutChange}
            value={editAmout}
          />
          <button
            className={`list-page__edit-button list-page__edit-button-${canEditAmout}`}
            disabled={!canEditAmout}
            onClick={handleEditSubt}
          >
            <img src={sbtIcon} alt="Subtract amout from stock" />
          </button>
        </div>
        <div className="list-page__error-edit">{editAmoutError}</div>
        <button
          className="list-page__remove"
          onClick={handleOpenConfirm}
        >Remove item</button>
      </main>
      <ConfirmPop
        isOpen={openConfirmPop}
        cancelFunc={handleOpenConfirm}
        confirmFunc={handleRemove}
        text="remove item"
      />
      <CornerButton
        func={handleCornerButton}
        src={editIcon}
        alt="Edit item entry"
      />
    </>
  )
}

export default ItemPage