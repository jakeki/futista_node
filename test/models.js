var chai = require('chai');
var should = chai.should();
var User = require('../models/User');
var Series = require('../models/Series');

describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('should not create a user with the unique email', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find user by email', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      user.email.should.equal('test@gmail.com');
      done();
    });
  });

  it('should delete a user', function(done) {
    User.remove({ email: 'test@gmail.com' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});

/*
  Series model tests
*/
describe('Series Model', function() {
  it('should create a new series', function(done) {
    var series = new Series({
      series_id : '99999',
      season_name : 'TEST season name',
      season_shortname : 'TEST shortname',
      season : 'TEST season',
      players_field : '11',
      players_ot_bench : '11',
      halftime_length : '45'
    });
    series.save(function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('should not create a series with the same id', function(done) {
    var series = new Series({
      series_id : '99999',
      season_name : 'TEST season name',
      season_shortname : 'TEST shortname',
      season : 'TEST season',
      players_field : '11',
      players_ot_bench : '11',
      halftime_length : '45'
    });
    series.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find series by id', function(done) {
    Series.findOne({ id: '99999' }, function(err, user) {
      if (err) return done(err);
      series.id.should.equal('99999');
      done();
    });
  });

  it('should delete a series', function(done) {
    User.remove({ series_id: '99999' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});
