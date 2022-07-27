import { useCallback } from "react";
import update from 'immutability-helper';

function useDND(elements,setElements) {
    const findElement = useCallback(
        (uid) => {
            const element = elements.filter(
                (element) => {
                    return `${element.uid}` === uid;
                }
            )[0]
            return {
                element,
                index: elements.indexOf(element),
            }
        },
        [elements],
    )
    const handleMoveElement = useCallback(
        (uid, atUid) => {

            const { element, index } = findElement(uid)
            const { /*element: atElement,*/ index: atIndex } = findElement(atUid)
            setElements(
                update(elements, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, element],
                    ],
                }),
            )
        },
        [findElement, elements, setElements],
    )

    return [handleMoveElement,findElement]
}

export { useDND };