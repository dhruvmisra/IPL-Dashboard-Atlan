<template>
  <div id="app">
    <div class="side-bar">
      <h5 class="my-4">IPL Dashboard</h5>
      <ul class="side-list">
        <router-link tag="li" class="side-item" :class="{ selected: selected == 'Home' }" to="/">Home</router-link>
        <router-link tag="li" class="side-item" :class="{ selected: selected == 'Matches' }" to="/matches">Matches</router-link>
      </ul>
    </div>
    <div class="main-content">
    	<router-view :matches="matches" />
    </div>
  </div>
</template>

<script>
import MatchesCSV from 'raw-loader!../public/matches.csv';

export default {
	data: () => ({
		matches: [],
		selected: ""
	}),
	watch: {
		"$route.name": function( newVal, oldVal) {
			this.selected = newVal;
		}
	},
	created() {
		this.selected = this.$route.name;

		let records = MatchesCSV.split('\n');
		let schema = {};
		for(let i in records) {
			let fields = records[i].split(',');
			if(i == 0) {
				for(let field of fields) {
					schema[field] = null;
				}
				continue;
			}
			let match = JSON.parse(JSON.stringify(schema));
			let keys = Object.keys(match);
			for(let j in keys) {
				match[keys[j]] = fields[j];
			}
			this.matches.push(match);
		}
	}
}
</script>

<style lang="scss">
@import '@/styles/app.scss';

#app {
  height: 100vh;
	display: flex;
}

.side-bar {
	flex: 1;
	height: 100%;
	// background: rgb(219, 99, 0);
	background: linear-gradient(180deg, #4650E3 0%, #0711A6 25%, #0711A6 75%, #1F29B6 100%);
	color: white;
	display: flex;
	flex-direction: column;
	padding: 20px 0;
	text-align: center;
	box-shadow: 5px 0 20px rgba(0, 0, 0, 0.3);
	z-index: 10;

	.side-list {
		list-style: none;
		padding: 0;
		margin-top: 30px;

		.side-item {
			padding: 20px 0;
			color: rgba(255, 255, 255, 0.5);
			cursor: pointer;

			&.selected {
				position: relative;
				color: white;
				background: linear-gradient(90deg, #4650E3 0%, #1F29B6 100%);
				transform: scale(1.01);
				transform-origin: left;
				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 5px;
					background: orange;
				}
			}
		}
	}
}
.main-content {
	height: 100%;
	overflow: auto;
	background: $light;
	color: black;
	flex: 4;
	width: 100%;
	padding: 20px;
}
</style>
