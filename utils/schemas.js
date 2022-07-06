const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL);

const GuildSchema = new mongoose.Schema({
    dbType: { type: String, default: 'guild' },
    guildID: { type: String },
    prefix: { type: String, default: process.env.PREFIX },
    afkList: { type: Array, default: [] }
});

const UserSchema = new mongoose.Schema({
    dbType: { type: String, default: 'user' },
    userID: { type: String },
    color: { type: String, default: process.env.COLOR },
    date: { type: Date, default: Date.now() }
});

module.exports = {
    user: mongoose.model('user', UserSchema),
    guild: mongoose.model('guild', GuildSchema)
}