import { createPortal } from "react-dom"
import { useRef, forwardRef, useImperativeHandle } from "react"
import Button from "./Button";

const Modal = forwardRef(function({children, buttonCaption}, ref) { //utilizzo children per usare lo stesso modale per differenti scopi
    const dialog = useRef();

    //riceve ref e una funzione che ritorna un oggetto in cui sono definiti i vari metodi
    useImperativeHandle(ref , () => {
        return{
            open() {
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right"> 
                <Button>{buttonCaption}</Button> {/* il button submit di un form dialog chiude un <dialog> aperto con showModal */}
            </form>
        </dialog>,
        document.querySelector('#modal-root')
    )
}
)

export default Modal