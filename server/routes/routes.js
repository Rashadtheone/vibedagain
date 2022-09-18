const express = require('express')
const router = express()
const ArtistModel = require('../models/userdata')
const SpotifyWebApi = require('spotify-web-api-node')

// artistName: artistName, favSong: favSong, userNote: userNote,favImage: favImage

router.post("/addartist", async (req, res) => {
    const artist = new ArtistModel({
     artistName : req.body.artistName,
     favSong : req.body.favSong,
     userNote : req.body.userNote,
     favImage : req.body.favImage,
})
    

    try {
        await artist.save()
       }
       catch (err) {
        console.log(err)
       }


})

router.get("/read", async (req, res) => {
    ArtistModel.find({}, (err, result) => {
        if (err){
            res.send(err)
        }
        res.send(result)
    })
})

router.put("/update", async (req, res) => {
    const newArtistName = req.body.newartistName
    const newFavSong = req.body.newfavSong
    const newUserNote= req.body.newuserNote
    const newFavImage = req.body.newfavImage

    const id = req.body.id

    try {
        await ArtistModel.findById(id, (err, updateArtist) => {
            updateArtist.artistName = newArtistName
            updateArtist.favSong = newFavSong
            updateArtist.userNote = newUserNote
            updateArtist.favImage = newFavImage 

            updateArtist.save()
            res.send("update")
            
        })
    } catch(err) {
        console.log(err)
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await ArtistModel.findByIdAndRemove(id).exec()

    res.send(id)
})

// spotify routes

router.post("/login", async (req, res) => {
    const code = req.body.code


    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/app',
        clientId: 'f94ee5b50ba246238a83b82cf28fddb5',
        clientSecret: '86097337f93e4bee874243a33760fa8d',

    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresin: data.body.expires_in,
        })
    }) 
    try {
        await SpotifyWebApi.save()
       }
       catch (err) {
        console.log(err)
       }
    
})

module.exports = router