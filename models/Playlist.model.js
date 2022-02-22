const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    href: String,
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    tracks: [/* { type: Schema.Types.ObjectId, ref: 'Playlist'} */]
},
{
    timestamps: true
})
const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;