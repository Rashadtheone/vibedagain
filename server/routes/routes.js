const express = require('express')
const router = express()
const ArtistModel = require('../models/userdata')

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


module.exports = router