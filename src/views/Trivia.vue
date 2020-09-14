<template>
  <div class="trivia" ref="container">
    <h2 class="title">Trivia</h2>
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
import TriviaSlide from '@/components/Trivia/TriviaSlide';

export default {
	name: 'Trivia',
	props: {
		matches: Array,
		teams: Array,
		triviaArray: Array
	},
	components: {
		TriviaSlide
	}
}
</script>

<style lang="scss">
.split-chart {
	width: 50%;
}
.toss-outcome {
	&.large {
		width: 60%;
	}
	&.small {
		width: 15%;
	}
}
.team-performance {
	width: 30%;
	margin: 10px;
	min-height: 250px;
}
@media (max-width: 900px) {
	.team-performance {
		width: 50%;
	}
}
@media (max-width: 624px) {
	.split-chart {
		width: 100%;
	}
	.toss-outcome {
		&.large {
			width: 100%;
		}
		&.small {
			width: 50%;
			margin: 10px 0;
		}
	}
	.team-performance {
		width: 100%;
	}
}
</style>