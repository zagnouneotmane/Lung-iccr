const path = require('path');

module.exports = {
  entry: './script.js', // Replace with the entry file of your project
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
