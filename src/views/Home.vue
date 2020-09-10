<template>
  <div class="home" ref="container">
    <h3>Home</h3>
  </div>
</template>

<script>
import Vue from 'vue';
import Chart from '@/components/Chart';
import variables from '@/styles/variables.scss';

export default {
	name: 'Home',
	props: {
		matches: Array
	},
	components: {
		Chart
	},
	data: () => ({
		chartData: {}
	}),
	mounted() {
		this.maxMarginOfVictories();
		this.wonTossWonMatch();
	},
	methods: {
		addChartToDOM(className, propsData) {
			let ComponentClass = Vue.extend(Chart);
			let instance = new ComponentClass({
				propsData: propsData
			});
			instance.$mount(); // pass nothing
			let element = instance.$el;
			element.classList.add(className);
			this.$refs.container.appendChild(element);
		},
		wonTossWonMatch() {
			let count = 0;
			for(let match of this.matches) {
				if(match.toss_winner == match.winner) {
					count++;
				}
			}
			console.log("wonTossWonMatch", count, this.matches.length-count);
				
			let chartData = {
				type: 'pie',
				data: {
					labels: ["Won match", "Lost match"],
					datasets: [{
						label: '',
						data: [count, this.matches.length-count],
						backgroundColor: [variables.primaryColor, variables.dangerColor]
					}]
				}
			}
			this.addChartToDOM("toss-win-chart", chartData);
		},
		maxMarginOfVictories() {
			let maxMargin = {}
			for(let match of this.matches) {
				if(!maxMargin.hasOwnProperty(match.season) && match.win_by_runs > 0) {
					maxMargin[match.season] = match.win_by_runs;
					continue;
				}
				if(maxMargin[match.season] < match.win_by_runs) {
					maxMargin[match.season] = match.win_by_runs;
				}
			}
			
			let chartData = {
				type: 'line',
				data: {
					labels: Object.keys(maxMargin),
					datasets: [{
						label: 'Runs',
						data: Object.values(maxMargin),
						fill: false,
            borderColor: variables.accentColor,
            backgroundColor: variables.accentColor,
            borderWidth: 1
					}]
				}
			}
			this.addChartToDOM("max-margin-chart", chartData);
		},
	}
}
</script>

<style lang="scss">
.max-margin-chart {
	height: 300px;
}
.toss-win-chart {
	height: 350px;
}
</style>