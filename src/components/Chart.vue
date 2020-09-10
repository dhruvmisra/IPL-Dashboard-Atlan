<template>
	<div class="chart-container">
		<canvas ref="chart"></canvas>
	</div>
</template>

<script>
import Chart from 'chart.js';

export default {
	props: {
		type: String,
		data: Object,
		options: Object
	},
	data: () => ({
		chart: null,
		sampleData: {
			labels: [],
			datasets: [{
				label: 'Votes',
				data: [],
				backgroundColor: [],
				hoverBackgroundColor: []
			}]
		},
		defaultOptions: {
			responsive: true,
			maintainAspectRatio: false
		}
	}),
	mounted() {
		this.createChart({
			type: this.type,
			data: this.data,
			options: {
				...this.defaultOptions,
				...this.options
			}
		});
	},
	methods: {
		createChart(chartData) {
			const ctx = this.$refs.chart;
			this.chart = new Chart(ctx, {
				type: chartData.type,
				data: chartData.data,
				options: chartData.options,
			});
		}
	}
}
</script>

<style lang="scss">
canvas {
	width: 100%;
	height: 100%;
}
</style>