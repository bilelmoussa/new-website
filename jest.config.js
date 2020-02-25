const dotenv = require('dotenv');
dotenv.config({path: './env/test.env'});
const tsPreset = require('ts-jest/jest-preset');
const mongoPreset = require('@shelf/jest-mongodb/jest-preset');

const jestOverwrites = {
  testMatch: ['**/src/**/?(*.)+(spec|test).ts?(x)'],
};

module.exports = {
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node', ...tsPreset, ...mongoPreset, ...jestOverwrites,
};
