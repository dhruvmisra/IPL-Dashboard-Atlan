<template>
  <div id="app">
		<Sidebar />
    <div class="main-content">
			<transition name="fade" mode="out-in">
    		<router-view :matches="matches" :key="$route.name" />
			</transition>
    </div>
  </div>
</template>

<script>
import MatchesCSV from 'raw-loader!../public/matches.csv';
import Sidebar from '@/components/Navigation/Sidebar';

export default {
	components: {
		Sidebar
	},
	data: () => ({
		matches: [],
		selected: ""
	}),
	created() {
		let records = MatchesCSV.split('\n');
		records = records.slice(0, records.length-1); // removing last empty record
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
				if(keys[j] == "season" || keys[j] == "win_by_runs" || keys[j] == "win_by_wickets") {
					match[keys[j]] = parseInt(fields[j]);
				} else {
					match[keys[j]] = fields[j];
				}
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

.main-content {
	height: 100%;
	overflow: auto;
	background: $light;
	color: black;
	flex: 5;
	width: 100%;
	padding: 20px;
}
.fade-enter-active, .fade-leave-active {
	transition: all 150ms ease-out;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
	transform: translateX(-20px);
}
</style>
