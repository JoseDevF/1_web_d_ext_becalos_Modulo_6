import { useState, useCallback } from "react";

export function ComponenteParent() {
    const [count, setCount] = useState(0);

    let variable = 0;

    const handleClick = useCallback(() => {
        setCount(c => c + 1)
    }, [])

    return (
        <div className="p-4">
            <p className="mb-2">Count: {count}</p>
            <button onClick={handleClick}>Click me!</button>
        </div>
    )
}