import Portal from "./Portal";

function OverAllInspirationQuote({ author, text, className, renderQuote, }) {

    return (<>
        <Portal>
            { renderQuote(author, text, className) }
        </Portal>
    </>
    )

}

export default OverAllInspirationQuote;