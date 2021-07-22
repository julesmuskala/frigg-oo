const CornerButton = ({ func, src, alt }) => {
  return (
    <button
      className="corner-button"
      onClick={func}
    >
      <img src={src} alt={alt} />
    </button>
  )
}

export default CornerButton