'use client'
import axios from "axios"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { MuseosProps } from '@/types'
import NextAuthProvider from "../layout"

export default function Museo() {

    const [message, setMessage] = useState('')
    const [museos, setMuseos] = useState<MuseosProps[]>([])
    const params = useParams()
    const [messageEnviado, setMessageEnviado] = useState(false)

    useEffect(() => {
        console.log(params.slug)
        getInfoMuseo()
        getMessages()
        setMessageEnviado(false)
    }, [messageEnviado])

    const addMessage = async () => {
        try {
            await axios.post('http://localhost:3000/api/comments/add', {
                message: message,
                museoId: params.slug.toString()
            }).then((res) => {
                console.log(res.data)
                toast.success(res.data)
                setMessageEnviado(true)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const getMessages = async () => {
        try {
            await axios.post('/api/comments/get', {
                parametros: params.slug.toString()
            }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    /*
    const sendSlug = async () => {
        try {
            await axios.post(`/api/museos/getMuseo`, {
                parametros: params.slug.toString()
            }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    }
    */

    const getInfoMuseo = async () => {
        try {
            await axios.get(`/api/museos/getMuseo`).then((res) => {
                setMuseos(res.data)
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <section className="w-full h-screen flex justify-center items-center">
                {/*museos.map(({ id, name }) => (
                    <div key={id}>
                        <h1>{name}</h1>
                    </div>
                ))*/}
                <div className="bg-formBack w-96 h-96 flex justify-center items-center flex-col gap-4 rounded-lg">
                    <h1 className="text-3xl font-bold text-white">Holaaaaaa</h1>
                    <input className="bg-white border-black" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                    <button className="bg-dashBack w-28 h-8 rounded-lg font-bold" onClick={addMessage}>Add</button>
                </div>
            </section>
        </>
    )
}