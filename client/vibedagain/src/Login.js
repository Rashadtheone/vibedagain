import React from "react"

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize?client_id=f94ee5b50ba246238a83b82cf28fddb5&response_type=code&redirect_uri=http://localhost:3000/app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    return (

        <div className="spotisection">
           <a href={SPOTIFY_AUTH_URL}><button>Spotify Login</button></a>
            </div>
    )
}