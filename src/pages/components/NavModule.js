import { Link } from 'react-router-dom'

import CATEGORIES from '../../features/categories'
import ALL_CATEGORY from '../../features/allCategory'

import menuIcon from '../../assets/art/menu-ico.svg'
import logoIcon from '../../assets/art/logo-ico.svg'

const NavModule = ({ isOpen, func }) => (
  <>
    <div
      className={`nav-module__darken nav-module__darken-${isOpen}`}
      onClick={func}
    />
    <div className={`nav-module nav-module-${isOpen}`}>
      <div className="nav-module__head">
        <button
          className="app-header__nav-button"
          onClick={func}>
          <img src={menuIcon} alt="Close menu" />
        </button>
        <div className="app-header__title-wrap">
          <img src={logoIcon} alt="" />
          <p className="nav-module__head__title">frigg-oo</p>
        </div>
      </div>
      <nav className="nav-module__list">
        <h2>Categories</h2>
        <Link to={`/frigg-oo/${ALL_CATEGORY.id}`} onClick={func}>
          <div className="nav-module__list__item">
            <img src={ALL_CATEGORY.src} alt="" />
            <p>{ALL_CATEGORY.name}</p>
          </div>
        </Link>
        {CATEGORIES.map(element => (
          <Link to={`/frigg-oo/${element.id}`} onClick={func} key={`li-${element.id}`}>
            <div className="nav-module__list__item">
              <img src={element.src} alt="" />
              <p>{element.name}</p>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  </>
)

export default NavModule