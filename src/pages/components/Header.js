const Header = ({iconSrc, navSrc, navAlt, navFunc, title, flairColor}) => {
  
  const icon = (iconSrc)
    ? <img
      src={iconSrc}
      alt=""
    /> 
    : <></>
  
  return (
    <header className="app-header" style={{background: flairColor || '#202020'}}>
      <button
        className="app-header__nav-button"
        onClick={navFunc}
      >
        <img src={navSrc} alt={navAlt} />
      </button>
      <div className="app-header__title-wrap">
        {icon}
        <h1>{title}</h1>
      </div>
    </header>
  )
}

export default Header