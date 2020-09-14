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
		: '/',
	pwa: {
		name: 'IPL Dashboard',
		themeColor: '#1F29B6'
	}
};