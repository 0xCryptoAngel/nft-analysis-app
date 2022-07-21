import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "block" : "hidden";
  return (
    <div className={`bg-black bg-opacity-70 w-full h-full flex justify-center items-center fixed top-0 left-0 z-20 modal ${showHideClassName}`} >
      <section className=" bg-blue-810 z-50 rounded-xl pb-6 pt-4 px-4 relative">
        {children}
        <FontAwesomeIcon icon={faXmark} className="absolute top-3 right-3 hover:text-red-75" onClick={handleClose}/>
      </section>
    </div>
  );
};

export default Modal;