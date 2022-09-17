const mongoose = require("mongoose")

const UserDataSchema = new mongoose.Schema ({
    artistName: {
        type: String,
        required: true,
    },
    favSong: {
        type: String,
        required: true,
    },
    userNote: {
        type: String,
        required: true,
    },
    favImage: {
        type: String,
        required: true,
    }
})

const Artist = mongoose.model("Artist", UserDataSchema)
module.exports = Artist