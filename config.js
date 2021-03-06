"use strict";

const fs = require("fs");
const path = require("path");
const config_directory = process.cwd().concat("/config");
const config_file = config_directory.concat("/default.json");
const read_config_file = fs.readFileSync(config_file, { encoding: "utf-8" });

if (!fs.existsSync(config_directory))
  throw new Error("config directory does not exist");

if (!fs.existsSync(config_file))
  throw new Error("a default.json file doesnt exist in the config folder");

const config = function () {};

config.prototype.get = function (arg) {
  // Make default.json object files immutable and also parse it from string to Object
  let parsed_config_file = Object.freeze(JSON.parse(read_config_file));

  let arg_is_an_object = arg.split(".").length > 1;
  if (arg_is_an_object) {
    let arg_array = arg.split(".");
    let new_argument = arg_array[arg_array.length - 1];
    let res;
    Object.keys(parsed_config_file).map((key, index) => {
      if (parsed_config_file[key].hasOwnProperty(new_argument)) {
        res = parsed_config_file[key][new_argument];
      }
    });
    return res;
  }

  if (!arg_is_an_object) {
    // Filter through all the objects in the default.json file and get the value of arg(argument)
    let arg_value = Object.keys(parsed_config_file)
      .filter((item) => item == arg)
      .toString();

    // check arg(argument) validity
    if (arg_value == "")
      return arg.concat(" doesnt exist in the config/default.json file");

    return parsed_config_file[arg_value];
  }
};

module.exports = new config();
