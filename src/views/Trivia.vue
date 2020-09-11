<template>
  <div class="trivia" ref="container">
    <h3>Trivia</h3>
		<small class="text-sm" style="color: grey">Check out all the crazy trivia stats from 10 years of IPL</small>
		<TriviaSlide 
			v-for="(trivia, i) in triviaArray" 
			:key="trivia.title"
			:trivia="trivia"
			:index="i+1"
		>
		</TriviaSlide>
  </div>
</template>

<script>
import Vue from 'vue';
import TriviaSlide from '@/components/Trivia/TriviaSlide';
import variables from '@/styles/variables.scss';

export default {
	name: 'Trivia',
	props: {
		matches: Array
	},
	components: {
		TriviaSlide
	},
	data: () => ({
		triviaArray: []
	}),
	mounted() {
		this.maxMarginOfVictories();
		this.wonTossWonMatch();
		this.mostTimesPOTM();
		this.winsAccordingToTossDecision();
	},
	methods: {
		wonTossWonMatch() {
			let count = 0;
			for(let match of this.matches) {
				if(match.toss_winner == match.winner) {
					count++;
				}
			}
				
			let trivia = {};
			trivia.title = "Outcome after winning toss";
			trivia.chartData = {
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
			this.triviaArray.push(trivia);
		},
		maxMarginOfVictories() {
			let maxMargin = {};
			for(let match of this.matches) {
				if(!maxMargin.hasOwnProperty(match.season) && match.win_by_runs > 0) {
					maxMargin[match.season] = match.win_by_runs;
					continue;
				}
				if(maxMargin[match.season] < match.win_by_runs) {
					maxMargin[match.season] = match.win_by_runs;
				}
			}
			
			let trivia = {};
			trivia.title = "Maximum margins of victory";
			trivia.chartData = {
				type: 'line',
				data: {
					labels: Object.keys(maxMargin),
					datasets: [{
						label: 'Runs',
						data: Object.values(maxMargin),
            borderColor: variables.accentColor,
            backgroundColor: variables.accentColor,
            borderWidth: 1
					}]
				}
			}
			this.triviaArray.push(trivia);
		},
		mostTimesPOTM() {
			let POTMCount = {};
			let mostTimesPOTM = {
				player: "",
				count: 0
			};
			for(let match of this.matches) {
				if(!POTMCount.hasOwnProperty(match.player_of_match)) {
					POTMCount[match.player_of_match] = 1;
					continue;
				}
				POTMCount[match.player_of_match]++;
				if(POTMCount[match.player_of_match] > mostTimesPOTM.count) {
					mostTimesPOTM = {
						player: match.player_of_match,
						count: POTMCount[match.player_of_match]
					}
				}
			}
			console.log("mostTimesPOTM", POTMCount, mostTimesPOTM);
		},
		winsAccordingToTossDecision() {
			let tossDecision = {
				bat: {
					wins: 0,
					losses: 0
				},
				field: {
					wins: 0,
					losses: 0
				},
			}
			for(let match of this.matches) {
				if(match.toss_winner == match.winner) {
					tossDecision[match.toss_decision].wins++;
				} else {
					tossDecision[match.toss_decision].losses++;
				}
			}
			console.log("winsAccordingToTossDecision", tossDecision);
		},

	}
}
</script>

<style lang="scss">
// .max-margin-chart {
// 	height: 300px;
// }
// .toss-win-chart {
// 	height: 350px;
// 	width: 300px;
// }
</style>