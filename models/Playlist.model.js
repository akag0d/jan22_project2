const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    title: String,
    artist: String,
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Playlist'}]
},
{
    timestamps: true
})
const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;