import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import ListPage from './pages/ListPage'
import ItemPage from './pages/ItemPage'
import NavModule from './pages/components/NavModule'
import FormPage from './pages/FormPage'
import CATEGORIES from './features/categories'
import ALL_CATEGORY from './features/allCategory'

import './assets/css/stylesheet.css'

const App = () => {

  const [isNavOpen, setIsNavOpen] = useState(false)

  const openNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const items = useSelector(state => state.storage)

  return (
    <Router> 
      <NavModule isOpen={isNavOpen} func={openNav} />
      <Switch>
          <Route exact path={`/frigg-oo/${ALL_CATEGORY.id}`}>
            <ListPage
              navFunc={openNav}
              title={ALL_CATEGORY.name}
              titleSrc={ALL_CATEGORY.src}
            />
          </Route>
        {CATEGORIES.map(element => (
          <Route
            exact path={`/frigg-oo/${element.id}`}
            key={element.id}
          >
            <ListPage
              navFunc={openNav}
              title={element.name}
              titleSrc={element.src}
              id={element.id}
            />
          </Route>
        ))}
        <Route exact path="/frigg-oo/add-item">
          <FormPage
            title="Add new item"
            confirmText="confirm"
          />
        </Route>
        {items.map(item => (
          <Route 
            exact path={`/frigg-oo/${item.category}/${item.name.toLowerCase()}-${item.id}`}
            key={item.id}
          >
            <ItemPage
              id={item.id}
              name={item.name}
              category={item.category}
              flair={item.flair}
              bought={item.bought}
              expires={item.expires}
              amout={item.amout}
              unit={item.unit}
            />
          </Route>
        ))}
        {items.map(item => (
          <Route 
          exact path={`/frigg-oo/${item.category}/${item.name.toLowerCase()}-${item.id}/edit`}
          key={`${item.id}/edit`}
        >
          <FormPage
            title="Edit item"
            editName={item.name}
            editAmout={item.amout}
            editBought={item.bought}
            editCategory={item.category}
            editExpires={item.expires}
            editFlair={item.flair}
            editUnit={item.unit}
            editID={item.id}
            confirmText="confirm"
          />
        </Route>
        ))}
      </Switch>
    </Router>
  )
}

export default App