import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import Header from './components/Header'
import ListItem from './components/ListItem'
import CornerButton from './components/CornerButton'

import menuIcon from '../assets/art/menu-ico.svg'
import addIcon from '../assets/art/add-ico.svg'

const ListPage = ({ navFunc, title, titleSrc, id }) => {

  const items = useSelector(state => state.storage)

  const renderedItems =
    items.filter(item => ((id === item.category) || !(id)))
      .map(item => (
        <ListItem
          title={item.name}
          expDate={item.expires}
          flair={item.flair}
          amout={item.amout}
          unit={item.unit}
          category={item.category}
          id={item.id}
          key={item.id}
        />
      ))

  let history = useHistory()

  const handleCornerButton = () => {
    history.push('/frigg-oo/add-item')
  }

  return (
    <>
      <Header
        iconSrc={titleSrc}
        navSrc={menuIcon}
        navAlt="Open menu"
        navFunc={navFunc}
        title={title}
      />
      <main className="list-page">
        {renderedItems}
      </main>
      <CornerButton
       func={handleCornerButton}
       src={addIcon}
       alt="Add new item"
      />
    </>
  )
}


export default ListPage