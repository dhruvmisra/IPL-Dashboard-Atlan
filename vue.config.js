module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/variables.scss";`
      }
    }
	},
	publicPath: process.env.NODE_ENV === 'production'
		? '/IPL-Dashboard-Atlan/'
		: '/'
};