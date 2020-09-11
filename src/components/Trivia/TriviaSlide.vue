<template>
	<div class="trivia-slide">
		<div class="index">{{ '#'+index }}</div>
		<h4 class="heading">{{ trivia.title }}</h4>
		<Chart v-if="trivia.chartData" :type="trivia.chartData.type" :data="trivia.chartData.data" :options="trivia.chartData.options" />
		<slot></slot>
	</div>
</template>

<script>
import Chart from '@/components/Chart';

export default {
	props: {
		trivia: Object,
		index: Number
	},
	components: {
		Chart
	}
}
</script>

<style lang="scss">
.trivia-slide {
	position: relative;
	width: 100%;
	padding: 20px 30px;
	margin: 20px 0;
	background: white;
	border-radius: $radius;
	box-shadow: $shadow;
	
	.heading {
		margin: 20px 0;
		color: $secondary;
	}

	.index {
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
}
</style>