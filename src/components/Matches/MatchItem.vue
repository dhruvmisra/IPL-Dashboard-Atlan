<template>
	<div class="match-card" :title="JSON.stringify(match)">
		<div class="season-text">{{ match.season }}</div>
		<div class="teams">
			<div class="team-container">
				<img class="team-logo" :src="getTeamLogo(match.team1)" :alt="match.team1">
				<p class="team-name" :class="{ winner: match.result != 'tie' && match.team1 == match.winner }">{{ match.team1 }}</p>
			</div>
			<span class="vs-text">VS</span>
			<div class="team-container">
				<img class="team-logo" :src="getTeamLogo(match.team2)" :alt="match.team2">
				<p class="team-name" :class="{ winner: match.result != 'tie' && match.team2 == match.winner }">{{ match.team2 }}</p>
			</div>
		</div>
		<div class="info-container">
			<div v-if="match.result == 'normal'">
				<div class="info-item success" v-if="match.win_by_runs > 0">{{ match.winner }} won by {{ match.win_by_runs }} runs</div>
				<div class="info-item success" v-else-if="match.win_by_wickets > 0">{{ match.winner }} won by {{ match.win_by_wickets }} wickets</div>
			</div>
			<div v-else>
				<div class="info-item accent">Match was a Tie</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		match: Object
	},
	methods: {
		getTeamLogo(teamName) {
			let fileName = teamName.split(' ').join('-') + '.png';
			if(fileName == "Rising-Pune-Supergiants.png") {
				fileName = "Rising-Pune-Supergiant.png";
			}
			return require('@/assets/logos/' + fileName);
		}
	}
}
</script>

<style lang="scss">
.match-card {
	width: 100%;
	max-width: 350px;
	position: relative;
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
		top: -0.3em;
		left: 5px;
		font-size: 5em;
		font-weight: bold;
		opacity: 0.1;
		z-index: 1;
		background: -webkit-linear-gradient($secondary, #eee);
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
	
		.info-item {
			width: fit-content;
			text-align: center;
			margin: 10px auto;
			padding: 5px 10px;
			border-radius: $radius;
			font-size: 0.8em;

			&.primary {
				color: $primary;
				background: rgba($primary, 0.1);
			}
			&.accent {
				color: $accent;
				background: rgba($accent, 0.1);
			}
			&.success {
				color: $success;
				background: rgba($success, 0.1);
			}
			&.danger {
				color: $danger;
				background: rgba($danger, 0.1);
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
	}
}
</style>