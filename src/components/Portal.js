import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';


function Portal(props) {
    const [container] = useState(() => { document.createElement('div') });
    useEffect(() => {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        }
    }, [container])

    return (
        ReactDOM.createPortal(props.children, container)
    )
}

export default Portal
