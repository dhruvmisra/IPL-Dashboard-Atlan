<template>
  <div id="app">
		<Sidebar />
    <div ref="mainContent" class="main-content">
			<transition name="fade" mode="out-in">
				<router-view :matches="matches" :teams="teams" :triviaArray="triviaArray" :key="$route.name" />
			</transition>
    </div>
  </div>
</template>

<script>
import MatchesCSV from 'raw-loader!../public/matches.csv';
import Sidebar from '@/components/Navigation/Sidebar';
import { computeAllTrivia } from '@/components/Trivia/trivia.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
	components: {
		Sidebar
	},
	data: () => ({
		matches: [],
		teams: [],
		triviaArray: [],
		selected: ""
	}),
	watch: {
		'$route.name': function(newVal, oldVal) {
			this.$refs.mainContent.scrollTo(0, 0);
		}
	},
	created() {
		AOS.init({
			once: true
		});

		let records = MatchesCSV.split('\n');
		records = records.slice(0, records.length-1); // removing last empty record

		let teams = {};
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
				} else if(keys[j] == "date") {
					let date = fields[j].split('/');
					if(date[2].length == 2) {
						date[2] = "20" + date[2];
					}
					date = date.map(d => parseInt(d));
					match[keys[j]] = new Date(date[2], date[1]-1, date[0]).getTime();
				} else if(keys[j] == "venue") {
					if(fields[j][0] == '\"') {
						match[keys[j]] = fields[j].substr(1);
					} else {
						match[keys[j]] = fields[j];
					}
				} else {
					match[keys[j]] = fields[j];
				}

				// To create teams array
				if(keys[j] == "team1" || keys[j] == "team1") {
					teams[match[keys[j]]] = null;
				}
			}
			this.matches.push(match);
		}
		this.teams = Object.keys(teams);

		// Computing trivia
		this.triviaArray = computeAllTrivia(this.matches, this.teams);
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
	padding: 25px;
}
.fade-enter-active, .fade-leave-active {
	transition: all 150ms ease-out;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
	transform: translateX(-20px);
}
</style>
