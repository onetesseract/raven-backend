const express = require('express')
const app = express()
const port = 2718
const redis = require("redis");
const client = redis.createClient();
var routes = new Map();
var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          console.log(dir);
          
          if (!--pending) done(null, results);
        }
      });
    });
  });
};