const express = require('express')
const router = express()
const ArtistModel = require('../models/userdata')

// artistName: artistName, favSong: favSong, userNote: userNote,favImage: favImage

router.post("/addartist", async (req, res) => {
    const artist = new ArtistModel({
     artistName : req.body.artistName,
     favSong : req.body.artistName,
     userNote : req.body.artistName,
     favImage : req.body.artistName,
})
    

    try {
        await artist.save()
       }
       catch (err) {
        console.log(err)
       }


})

module.exports = router