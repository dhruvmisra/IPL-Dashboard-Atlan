const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/variables.scss";`
      }
    }
  }
};