var Series = require('../models/Series');

/**
 * GET create serie
 * This will render new serie form.
 */
exports.getCreateSeries = function(req, res) {
  console.log("GETCreateSERIES")
  res.render("./series/series_new", {});
};

/**
 * POST /create
 * Create a new series.
 */


exports.postCreateSeries = function(req, res, next) {
  console.log("POSTseriesCreate req.body.series_id: ", req.body.series_id)
/*  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
*/

//  var errors = req.validationErrors();
  var errors = false;

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/series');
  }

  var series = new Series({
    series_id : req.body.series_id || '',
    season_name : req.body.season_name || '',
    season_shortname : req.body.season_shortname || '',
    season : req.body.season || '',
    players_field : req.body.players_field || '',
    players_ot_bench : req.body.players_ot_bench || '',
    halftime_length : req.body.halftime_length || '',
  });

  console.log("NEW ", series.season);
  Series.findOne({ series_id: req.body.series_id }, function(err, existingSeries) {
    if (existingSeries) {
      req.flash('errors', { msg: 'Series with this id already exists.' });
      return res.redirect('/series');
    }
    series.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'New Series information created.' });
      res.redirect('/series');
    });
  });
};


/**
 * GET all /series
 * List all series information.
 */
exports.getSeries = function(req, res) {
  console.log("GETSERIES")
  req.toastr.success('toast')
  Series.find(function(err, series) {
    if (err) return next(err);
      res.render("./series/series", {
        "series": series
      });
  });
};

/**
 * GET one (1) /series/:id
 * Show one serie information form for update.
 */
exports.getOneSerie = function(req, res) {
  console.log("getOneSerie req.params.id: ", req.params.id)
  Series.findOne({ _id: req.params.id }, function(err, serie) {
    if (err) return next(err);
      res.render("./series/series_edit", {
        "serie": serie
      });
  });
};
/**
 * POST /series/series
 * Update serie information.
 */

exports.postUpdateSeries = function(req, res, next) {
  //req.assert('email', 'Please enter a valid email address.').isEmail();
  //req.sanitize('email').normalizeEmail({ remove_dots: false });

  //var errors = req.validationErrors();
  var errors = false;

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/series');
  }
  console.log("POSTUPDATE req.body.series_id: ", req.body.series_id)
  Series.findOne({ series_id: req.body.series_id }, function(err, series) {
    if (err) {
      return next(err);
    }

    console.log("series_id: ", series.series_id, "::", series._id)

    series.season_name = req.body.season_name || '';
    series.season_shortname = req.body.season_shortname || '';
    series.season = req.body.season || '';
    series.players_field = req.body.players_field || '';
    series.players_ot_bench = req.body.players_ot_bench || '';
    series.halftime_length = req.body.halftime_length || '';
    console.log("UPD ", series.season);

    series.save(function(err) {
      console.log("save ", series.season);
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/series');
        } else {
          return next(err);
        }
      }
      req.flash('success', { msg: 'Series information updated.' });
      res.redirect('/series');
    });
  });
};


/**
 * POST /series/delete
 * Delete series information.
 */

exports.postDeleteSeries = function(req, res, next) {
  console.log("postDeleteSeries req.params.id: ", req.params.id)
  Series.remove({ _id: req.params.id }, function(err) {
    if (err) {
      return next(err);
    }
    req.flash('info', { msg: 'Serie has been deleted.' });
    res.redirect('/series');
  });
};
