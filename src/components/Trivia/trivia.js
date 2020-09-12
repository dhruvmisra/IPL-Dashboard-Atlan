import variables from '@/styles/variables.scss';

export const computeAllTrivia = (matches, teams) => {
	/*------------ INITIALIZE VARIABLES ----------------- */
	// 1. maxMarginOfVictories
	let maxMargin = {
		runs: {},
		wickets: {}
	};
	// 2. wonTossWonMatch
	let wonMatchCount = 0;
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
	// 3. mostTimesMOTMTrivia
	let MOTMCount = {};
	let mostTimesMOTM = {
		player: "",
		count: 0
	};
	// 4. mostPlayedInVenueTrivia
	let venueCount = {};
	let mostPlayedInVenue = {
		venue: "",
		count: 0
	};
	// 5. teamsPerformance
	let performance = {};

	
	/*------------ MAIN LOOP ----------------- */
	for(let match of matches) {
		// 1. maxMarginOfVictories
		if(!maxMargin.runs.hasOwnProperty(match.season) && match.win_by_runs > 0) {
			maxMargin.runs[match.season] = match.win_by_runs;
			continue;
		}
		if(!maxMargin.wickets.hasOwnProperty(match.season) && match.win_by_wickets > 0) {
			maxMargin.wickets[match.season] = match.win_by_wickets;
			continue;
		}
		if(maxMargin.runs[match.season] < match.win_by_runs) {
			maxMargin.runs[match.season] = match.win_by_runs;
		}
		if(maxMargin.wickets[match.season] < match.win_by_wickets) {
			maxMargin.wickets[match.season] = match.win_by_wickets;
		}

		// 2. wonTossWonMatch
		if(match.toss_winner == match.winner) {
			wonMatchCount++;
			tossDecision[match.toss_decision].wins++;
		} else {
			tossDecision[match.toss_decision].losses++;
		}

		// 3. mostTimesMOTMTrivia
		if(!MOTMCount.hasOwnProperty(match.player_of_match)) {
			MOTMCount[match.player_of_match] = 1;
			continue;
		}
		MOTMCount[match.player_of_match]++;
		if(MOTMCount[match.player_of_match] > mostTimesMOTM.count) {
			mostTimesMOTM = {
				player: match.player_of_match,
				count: MOTMCount[match.player_of_match]
			}
		}

		// 4. mostPlayedInVenueTrivia
		if(!venueCount.hasOwnProperty(match.venue)) {
			venueCount[match.venue] = 1;
			continue;
		}
		venueCount[match.venue]++;
		if(venueCount[match.venue] > mostPlayedInVenue.count) {
			mostPlayedInVenue = {
				player: match.venue,
				count: venueCount[match.venue]
			}
		}

		// 5. teamsPerformance
		if(!performance.hasOwnProperty(match.season)) {
			performance[match.season] = {
				total: 0,
				teams: {}
			}
			for(let team of teams) {
				performance[match.season].teams[team] = 0;
			}
		}
		performance[match.season].total++;
		if(match.result == 'normal') {
			if(match.team1 == match.winner) {
				performance[match.season].teams[match.team1]++;
			} else {
				performance[match.season].teams[match.team2]++;
			}
		}
	}

	/*------------ CONSTRUCTING TRIVIA ARRAY ----------------- */
	let triviaArray = [];
	triviaArray.push(maxMarginOfVictories(maxMargin));
	triviaArray.push(wonTossWonMatch(wonMatchCount, tossDecision, matches.length));
	triviaArray.push(mostTimesMOTMTrivia(MOTMCount, mostTimesMOTM));
	triviaArray.push(mostPlayedInVenueTrivia(venueCount, mostPlayedInVenue));
	triviaArray.push(teamsPerformance(performance, teams));

	return triviaArray;
}

const maxMarginOfVictories = (maxMargin) => {
	let trivia = {
		title: "Maximum Margins of Victory",
		info: `<p class="text-secondary my-5">The margin of victory has in-general been increasing over the year with the margin staying around 140 runs.
			Margin for wickets stays pretty consistent at 10 as well with the exclusion of 2014.</p>`,
		charts: []
	};
	trivia.charts.push({
		type: 'line',
		data: {
			labels: Object.keys(maxMargin.runs),
			datasets: [{
				label: 'Runs',
				data: Object.values(maxMargin.runs),
				borderColor: variables.accentColor,
				backgroundColor: variables.accentColor,
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Year'
					}
				}]
			}
		},
		customClass: 'split-chart'
	});
	trivia.charts.push({
		type: 'line',
		data: {
			labels: Object.keys(maxMargin.wickets),
			datasets: [{
				label: 'Wickets',
				data: Object.values(maxMargin.wickets),
				borderColor: variables.primaryColor,
				backgroundColor: variables.primaryColor,
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						precision:0
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Year'
					}
				}]
			}
		},
		customClass: 'split-chart'
	});

	return trivia;
}

const wonTossWonMatch = (wonMatchCount, tossDecision, matchesLength) => {				
	let trivia = {
		title: "Outcome after Winning Toss",
		info: `<p class="text-secondary my-5">Overall the outcome of both winning and losing the toss is pretty close.
			Although there have been more wins when the toss winner decided to field, than when they decided to bat.</p>`,
		charts: []
	};
	trivia.charts.push({
		type: 'pie',
		data: {
			labels: ["Won match", "Lost match"],
			datasets: [{
				label: '',
				data: [wonMatchCount, matchesLength-wonMatchCount],
				backgroundColor: [variables.primaryColor, variables.dangerColor]
			}]
		},
		customClass: ['toss-outcome', 'large']
	});
	trivia.charts.push({
		type: 'doughnut',
		data: {
			labels: ["Won", "Lost"],
			datasets: [{
				label: '',
				data: [tossDecision.bat.wins, tossDecision.bat.losses],
				backgroundColor: [variables.infoColor, variables.dangerColor]
			}]
		},
		options: {
			title: {
				display: true,
				text: "Decided to bat"
			}
		},
		customClass: ['toss-outcome', 'small']
	});
	trivia.charts.push({
		type: 'doughnut',
		data: {
			labels: ["Won", "Lost"],
			datasets: [{
				label: '',
				data: [tossDecision.field.wins, tossDecision.field.losses],
				backgroundColor: [variables.infoColor, variables.dangerColor]
			}]
		},
		options: {
			title: {
				display: true,
				text: "Decided to field"
			}
		},
		customClass: ['toss-outcome', 'small']
	});

	return trivia;
}

const mostTimesMOTMTrivia = (MOTMCount, mostTimesMOTM) => {
	for(let key in MOTMCount) {
		if(MOTMCount[key] <= 6) {
			delete MOTMCount[key];
		}
	}
	
	let trivia = {
		title: "Man of the Match Awards",
		info: `<div class="info-item centered accent">Player with most Man of the Match awards: <span style="font-weight: 600">${mostTimesMOTM.player} (${mostTimesMOTM.count})</span></div>`,
		charts: []
	};
	trivia.charts.push({
		type: 'bar',
		data: {
			labels: Object.keys(MOTMCount),
			datasets: [{
				label: 'MOTM wins',
				data: Object.values(MOTMCount),
				backgroundColor: variables.successColor,
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Player'
					}
				}]
			}
		}
	});
	
	return trivia;
}

const mostPlayedInVenueTrivia = (venueCount, mostPlayedInVenue) => {
	for(let key in venueCount) {
		if(venueCount[key] <= 8) {
			delete venueCount[key];
		}
	}
	
	let trivia = {
		title: "Most Played-In Venues",
		info: `<div class="info-item centered accent">The most played-in venue: 
			<span style="font-weight: 600">${mostPlayedInVenue.player} (${mostPlayedInVenue.count})</span></div>	
		`,
		charts: []
	};
	trivia.charts.push({
		type: 'bar',
		data: {
			labels: Object.keys(venueCount),
			datasets: [{
				label: 'No. of times played-in',
				data: Object.values(venueCount),
				backgroundColor: variables.dangerColor,
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Venue'
					},
					ticks: {
						callback: function(value) {
							return value.substr(0, 12) + "...";
						},
					}
				}]
			}
		}
	});
	
	
	return trivia;
}

const teamsPerformance = (performance, teams) => {
	let trivia = {
		title: "Team Performance over the Years",
		info: ``,
		charts: []
	};

	let entries = Object.entries(performance);
	let colorIndex = 0;
	let colors = [variables.primaryColor, variables.accentColor, variables.dangerColor, variables.successColor, variables.infoColor];
	
	for(let team of teams) {
		let color = colors[colorIndex++];
		colorIndex %= colors.length;

		trivia.charts.push({
			type: 'line',
			data: {
				labels: Object.keys(performance),
				datasets: [{
					label: 'Matches won',
					data: entries.map(entry => Math.round(entry[1].teams[team]/entry[1].total*100)),
					borderColor: color,
					backgroundColor: color,
					borderWidth: 1
				}]
			},
			options: {
				title: {
					display: true,
					fontColor: color,
					padding: 5,
					text: team
				},
				tooltips: {
					callbacks: {
						label: function(tooltipItems, data) {
							return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + '%';
						}
					}
				},
				scales: {
					yAxes: [{
						ticks: {
							callback: function(label, index, labels) {
								return label + '%';
							}
						}
					}]
				}
			},
			customClass: 'team-performance'
		});
	}
	
	return trivia;
}
