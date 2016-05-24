var mongoose = require('mongoose');

var seriesSchema = new mongoose.Schema({
  series_id: { type: Number, unique: true },
	season: String,
	season_name: String,
	season_shortname: String,
	halftime_length: Number,
	players_field: Number,
	players_ot_bench: Number
}, { timestamps: true });

var Series = mongoose.model('Series', seriesSchema);

module.exports = Series;
