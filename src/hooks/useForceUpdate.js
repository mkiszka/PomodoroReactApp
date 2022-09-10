import { useState } from "react";

export function useForceUpdate() {
    const [, setForceCounter] = useState(1);
    const forceupdate = () => {
        setForceCounter((prv) => prv + 1);
    }
    return forceupdate
}