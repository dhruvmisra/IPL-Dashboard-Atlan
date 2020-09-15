<template>
	<div id="home">
		<div class="header">
			<div class="row mx-0">
				<div class="ipl-logo">
					<img
						class="w-100 h-100"
						src="@/assets/ipl-logo.png"
						alt="IPL logo"
					/>
				</div>
				<div class="main-title" data-aos="zoom-out" data-aos-delay="500">
					<h1>INDIAN PREMIERE LEAGUE</h1>
					<p>Recapitulating 10 years of magic</p>
				</div>
				<div class="team-logos">
					<img 
						:src="getTeamLogo(teams[index])" 
						v-for="(index, i) in logosToShow"
						:key="index"
						:style="{ animationDelay: (i*100) + 'ms, ' + (500 + i*100) + 'ms' }"
					>
				</div>
			</div>
		</div>

		<div class="trivia-section">
			<div class="title-container">
				<h3 class="title">Random Trivia</h3>
				<small class="text-sm" style="color: grey">
					Here's a fun little trivia statistic for you. View more on the
					<router-link to="/trivia">Trivia</router-link>
					page.
				</small>
				<br>
				<button class="btn btn-primary btn-sm mt-3" @click="getRandomTrivia">New Trivia</button>
			</div>
			<TriviaSlide 
				class="random-trivia-slide"
				:trivia="randomTrivia"
				:key="randomTrivia.title"
			/>
		</div>
		<div class="match-section">
			<div class="random-match">
				<MatchItem 
					:match="randomMatch"
				/>
			</div>
			<div class="title-container">
				<h3 class="title">On this day... About {{ timeDifference.years }} years and {{ timeDifference.months }} months ago</h3>
				<small class="text-sm" style="color: grey">
					View all matches on the 
					<router-link to="/matches">Matches</router-link>
					page.
				</small>
			</div>
		</div>

	</div>
</template>

<script>
import TriviaSlide from '@/components/Trivia/TriviaSlide';
import MatchItem from '@/components/Matches/MatchItem';

export default {
	props: {
		matches: Array,
		teams: Array,
		triviaArray: Array
	},
	components: {
		TriviaSlide,
		MatchItem
	},
	data: () => ({
		logosToShow: [],
		randomTrivia: {},
		randomMatch: {},
		timeDifference: {
			months: 0, 
			years: 0
		},
		interval: null
	}),
	created() {
		// Random trivia and logos
		this.logosToShow = this.getRandomIndices(6);
		this.interval = setInterval(() => {
			this.logosToShow = this.getRandomIndices(6);
		}, 5000);

		this.getRandomTrivia();
		this.getRandomMatch();
	},
	methods: {
		getTeamLogo(teamName) {
			let fileName = teamName.split(' ').join('-') + '.png';
			if(fileName == "Rising-Pune-Supergiants.png") {
				fileName = "Rising-Pune-Supergiant.png";
			}
			return require('@/assets/logos/' + fileName);
		},
		getRandomIndices(count) {
			let indices = [];
			while(indices.length < count) {
				let i = Math.floor(Math.random()*this.teams.length);
				if(indices.indexOf(i) === -1) indices.push(i);
			}
			return indices;
		},
		getRandomTrivia() {
			this.randomTrivia = this.triviaArray[Math.floor(Math.random()*this.triviaArray.length)];
		},
		getRandomMatch() {
			let today = new Date();
			let date = today.getDate();
			let matchesWithSameDate = [];
			for(let match of this.matches) {
				if(new Date(match.date).getDate() == date) {
					matchesWithSameDate.push(match);
				}
			}
			this.randomMatch = matchesWithSameDate[Math.floor(Math.random()*matchesWithSameDate.length)];
			let yearDiff = today.getYear() - new Date(this.randomMatch.date).getYear();
			let monthDiff = today.getMonth() - new Date(this.randomMatch.date).getMonth();
			if(monthDiff < 0) {
				yearDiff--;
				monthDiff += 12;
			}
			this.timeDifference.years = yearDiff;
			this.timeDifference.months = monthDiff;
		}
	},
	beforeDestroy() {
		clearInterval(this.interval);
	}
}
</script>

<style lang="scss">
.header {
	position: relative;
	z-index: 2;
	height: fit-content;
	width: calc(100% + 50px);
	transform: translate(-25px, -25px);
	background: url('../assets/fans.png'), linear-gradient(135deg, $accent, lighten($accent, 15%));
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;

	.main-title {
		position: absolute;
		top: 0; bottom: 0; left: 0; right: 0;
		margin: auto;
		width: 50%;
		height: fit-content;
		text-align: center;
		font-family: 'Yatra One', cursive;

		h1 {
			font-size: 2.6em;
			font-weight: bold;
			text-shadow: 0 8px 15px rgba($light, 0.2);
			background: -webkit-linear-gradient($primary, darken($primary, 10%));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		p {
			font-size: 1.1em;
			color: darken($accent, 20%);
			// font-style: italic;
			margin: 0;
			margin-top: 20px;
		}
	}

	.ipl-logo {
		position: relative;
		width: 100%;
		max-width: 350px;
		margin-bottom: -10%;
		padding-top: 20px;
		animation: logo 2000ms ease-in-out forwards;
		z-index: 2;
	}
	@keyframes logo {
		0% {
			opacity: 0;
			transform: scale(0.9);
			filter: drop-shadow(0 0 0px rgba($primary, 0.3));
		}
		50% {
			opacity: 1;
			transform: scale(0.9);
			filter: drop-shadow(0 0 0px rgba($primary, 0.3));
		}
		100% {
			opacity: 1;
			transform: scale(1);
			filter: drop-shadow(0 20px 20px rgba($primary, 0.3));
		}
	}

	.team-logos {
		img {
			position: absolute;
			top: 0;
			right: 0;
			width: calc(30px + 3vw);
			max-width: 100px;
			opacity: 0;
			filter: drop-shadow(0 30px 10px rgba(black, 0.2));
			animation: slide-up 500ms forwards 0s, hover 2s ease-in-out infinite 500ms;
		}
		img:nth-child(1) {
			top: 5%;
			right: 3%;
		}
		img:nth-child(2) {
			top: 30%;
			right: 10%;
		}
		img:nth-child(3) {
			top: 50%;
			right: 2%;
		}
		img:nth-child(4) {
			top: 65%;
			right: 15%;
		}
		img:nth-child(5) {
			top: 85%;
			right: 25%;
		}
		img:nth-child(6) {
			top: 80%;
			right: 5%;
		}
		@keyframes hover {
			0%, 100% {
				transform: translateY(0);
			}
			50% {
				transform: translateY(8px);
			}
		}
		@keyframes slide-up {
			0% {
				opacity: 0;
				transform: translateY(20px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}
}
.trivia-section {
	display: flex;
	flex-wrap: wrap;

	.title-container {
		width: 25%;
		margin-top: 10em;
		padding-right: 15px;
	}

	.random-trivia-slide {
		position: relative;
		width: 75%;
		margin-left: auto;
		max-height: 550px;
		overflow: auto;
	}
}
.match-section {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin: 30px 0;


	.title-container {
		width: 50%;
		padding: 30px;
		padding-left: 15px;
	}

	.random-match {
		position: relative;
		width: 50%;
		padding: 30px 0;
		perspective: 1000px;

		.match-card {
			transform: rotateY(30deg);
			box-shadow: 10px 50px 80px -30px rgba(black, 0.3);
			margin: 0 auto;
			&:hover {
				transform: rotateY(20deg);
			}
		}
	}
}
@media (max-width: 850px) {
	.header {
		.main-title {
			bottom: 0;
			left: 0;
			margin: 0;
			top: auto;
			right: auto;
	
			h1 {
				font-size: 6vw;
			}
			p {
				margin-top: 5px;
				font-size: 3vw;
			}
		}
	}
	.trivia-section {
		.title-container {
			margin-top: 40px;
			width: 100%;
		}
		.random-trivia-slide {
			width: 100%;
		}
	}
	.match-section {
		.title-container {
			order: 1;
			width: 100%;
			padding: 0;
		}

		.random-match {
			order: 2;
			width: 100%;

			.match-card {
				transform: rotateY(0deg);
				&:hover {
					transform: rotateY(0deg);
				}
			}
		}
	}
}
</style>