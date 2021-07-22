const ConfirmPop = ({ isOpen, cancelFunc, confirmFunc, text }) => (
  <>
    <div
      className={`nav-module__darken nav-module__darken-${isOpen}`}
    />
    <div className={`confirm-page confirm-page-${isOpen}`}>
      <div className={`confirm-page__pop confirm-page__pop-${isOpen}`}>
        <p>{`Do you want to ${text}?`}</p>
        <div>
          <button
            className="confirm-page__pop__button confirm-page__pop__button-confirm"
            onClick={confirmFunc}
          >
            Yes
          </button>
          <button
            className="confirm-page__pop__button confirm-page__pop__button-cancel"
            onClick={cancelFunc}
          >
            No
          </button>
        </div>
      </div>
    </div>
  </>
)

export default ConfirmPop