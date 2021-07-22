import { Link } from 'react-router-dom'

const ListItem = ({ title, expDate, flair, amout, unit, category, id }) => {
  
  const expiresDate = new Date(Date.parse(expDate)).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit' })
  
  const expStatus = ((Date.parse(expDate) - new Date()) < 259200)
    ? 'list-page__item__desc__alert-true'
    : 'list-page__item__desc__alert-false'

  return (
    <Link to={`/frigg-oo/${category}/${title.toLowerCase()}-${id}`}>
      <section className="list-page__item">
        <div className="list-page__item__desc">
          <div className="list-page__item__desc__line" style={{ background: flair || '#383838' }} />
          <h2>{title}</h2>
          <p className={expStatus}>{`EXP: ${expiresDate}`}</p>
        </div>
        <p className="list-page__item__amout">{`${amout} ${unit}`}</p>
      </section>
    </Link>
  )
}

export default ListItem