import { useParams } from 'next/navigation'
import React from 'react'
import jwt from 'jsonwebtoken'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import dir_url from '@/lib/url'

const Token = () => {
    
    const params = useParams()
    const token = params.slug.toString()

    const decoded = jwt.decode(token)

    const verifytoken = async() => {
      await axios.post(`${dir_url}/api/verification_email`, {
        token: decoded
      })
    }
    
  return (
    <div>Token</div>
  )
}

export default Token