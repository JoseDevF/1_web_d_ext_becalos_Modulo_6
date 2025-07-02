import { useState, useEffect } from 'react';

export function useFetch(url) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    console.log("URL recibida", url)

    useEffect(() => {
        let active = true
        async function fetchData() {
            try {
                const response = await fetch(url)
                if (!response.ok) throw new Error(response.statusText)
                console.log("Respuesta", response)
                const json = await response.json()
                console.log("JSON Respuesta", json)
                if (active) setData(json)
            } catch (err) {
                if (active) setError(err)
            } finally {
                if (active) setLoading(false)
            }
        }
        fetchData()
        return () => { active = false }
    }, [url])

    return { data, loading, error }
}