import {useState, useEffect } from "react";
import axios from "axios";
import react from 'react'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpireIn] = useState()


    useEffect(() => {
        axios.post("http://localhost:3000/app/login", {
            code,
        })
        .then(res => {
            console.log(res.data)
        })
    },[code])
}