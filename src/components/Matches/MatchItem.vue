<template>
	<div class="match-card" :class="{ opened: opened }" @click="onClick">
		<div class="season-text">{{ match.season }}</div>
		<div class="teams">
			<div class="team-container">
				<img class="team-logo" :src="getTeamLogo(match.team1)" :alt="match.team1">
				<p class="team-name" :class="{ winner: match.result != 'no result' && match.team1 == match.winner }">{{ match.team1 }}</p>
			</div>
			<span class="vs-text">VS</span>
			<div class="team-container">
				<img class="team-logo" :src="getTeamLogo(match.team2)" :alt="match.team2">
				<p class="team-name" :class="{ winner: match.result != 'no result' && match.team2 == match.winner }">{{ match.team2 }}</p>
			</div>
		</div>
		<div class="info-container">
			<div class="info-item info centered" v-if="match.dl_applied > 0">DLS applied</div>
			<div v-if="match.result == 'normal'">
				<div class="info-item success centered" v-if="match.win_by_runs > 0">{{ match.winner }} won by {{ match.win_by_runs }} runs</div>
				<div class="info-item success centered" v-else-if="match.win_by_wickets > 0">{{ match.winner }} won by {{ match.win_by_wickets }} wickets</div>
			</div>
			<div v-else-if="match.result == 'tie'">
				<div class="info-item accent centered">Match was a Tie</div>
				<div class="info-item success centered">{{ match.winner }} won in super over</div>
			</div>
			<div v-else>
				<div class="info-item dark centered">Match had no result</div>
			</div>
			<div class="row" :class="{ 'mx-0': opened }">
				<div class="date">
					<img src="@/assets/icons/calendar.svg">
					<span>{{ getFormattedDate(match.date) }}</span>
				</div>
				<div class="location">
					<img src="@/assets/icons/location.svg">
					<span>{{ match.city }}</span>
				</div>
			</div>
			<div v-if="opened">
				<table class="table table-striped">
					<tbody>
						<tr>
							<th>Match of the Match</th>
							<td>{{ match.player_of_match != "" ? match.player_of_match : "N/A" }}</td>
						</tr>
						<tr>
							<th>Umpire 1</th>
							<td>{{ match.umpire1 != "" ? match.umpire1 : "N/A" }}</td>
						</tr>
						<tr>
							<th>Umpire 2</th>
							<td>{{ match.umpire2 != "" ? match.umpire2 : "N/A" }}</td>
						</tr>
						<tr>
							<th>Toss Winner</th>
							<td>{{ match.toss_winner }} ({{ match.toss_decision }})</td>
						</tr>
						<tr>
							<th>Venue</th>
							<td>{{ match.venue != "" ? match.venue : "N/A" }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		match: Object,
		opened: Boolean
	},
	methods: {
		getTeamLogo(teamName) {
			let fileName = teamName.split(' ').join('-') + '.png';
			if(fileName == "Rising-Pune-Supergiants.png") {
				fileName = "Rising-Pune-Supergiant.png";
			}
			return require('@/assets/logos/' + fileName);
		},
		onClick(event) {
			if(this.opened) return;
			this.$emit('matchClicked', parseInt(this.match.id));
		},
		getFormattedDate(timestamp) {
			return new Date(timestamp).toDateString().split(' ').slice(1).join(' ');
		}
	}
}
</script>

<style lang="scss">
.match-card {
	width: 100%;
	max-width: 380px;
	position: relative;
	display: flex;
	flex-direction: column;
	margin: 10px;
	padding: 20px;
	border-radius: $radius;
	background: white;
	box-shadow: 0px 2px 10px rgba($primary, 0.1);
	transition: all 200ms ease-out;
	&:hover {
		box-shadow: 0px 2px 20px rgba($primary, 0.15);
	}

	.season-text {
		position: absolute;
		top: -0.25em;
		left: 10px;
		font-size: 5em;
		font-weight: bold;
		opacity: 0.1;
		z-index: 1;
		background: -webkit-linear-gradient($secondary, #f0f0f0);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		user-select: none;
	}

	.teams {
		width: 100%;
		position: relative;
		z-index: 2;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		.vs-text {
			width: fit-content;
			font-weight: bold;
			font-size: 0.8em;
			text-align: center;
			margin: 10px 0;
			color: rgb(211, 211, 211);
		}

		.team-container {
			width: 45%;
			min-width: 100px;
			text-align: center;

			.team-logo {
				width: 80%;
				max-width: 90px;
				display: block;
				margin: 10px auto;
			}
			.team-name {
				color: $secondary;
				font-size: 0.9em;
				margin: 0;

				&.winner {
					font-weight: 500;
				}
			}
		}
	}

	.info-container {
		margin-top: auto;
		font-size: 0.8em;

		.location, .date {
			width: fit-content;

			img {
				width: 15px;
				margin: 0 8px;
				opacity: 0.5;
			}
			span {
				color: lighten($secondary, 10%);
			}
		}
		.location {
			margin-left: auto;
		}
	}
	
	
	&.opened {
		max-width: none;

		.teams {
			.vs-text {
				font-size: 1.1em;
			}
			.team-container {
				.team-logo {
					max-width: 150px;
				}
				.team-name {
					font-size: 1.1em;
				}
			}
		}
		.info-container {
			font-size: 1em;
			.info-item {
				margin: 20px initial;
			}
			.table {
				width: 100%;
				max-width: 500px;
				margin: 30px auto;
				text-align: center;
				font-size: 0.9em;
				vertical-align: middle;

				th {
					color: $secondary;
					font-weight: 600;
				}
				td {
					width: 50%;
				}

				&.table-striped > tbody > tr:nth-child(odd) > td,
				&.table-striped > tbody > tr:nth-child(odd) > th {
					background-color: $light;
				}
			}
		}
	}

	@media (max-width: 420px) {
		.season-text {
			font-size: 4em;
		}
		.teams {
			.vs-text {
				width: 100%;
			}
			.team-container {
				width: 100%;
			}
		}
		.info-container {
			.location, .date {
				width: 100%;
				text-align: center;
				margin: 3px auto;
			}
		}
	}
}
</style>