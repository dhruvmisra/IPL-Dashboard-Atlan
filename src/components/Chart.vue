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
			},
			plugins: this.type != "line" ? [] : [{
				beforeRender: (c, options) => {
					var dataset = c.data.datasets[0];
					
					let gradientFill = c.ctx.createLinearGradient(0, 0, 0, c.height);
					gradientFill.addColorStop(0, dataset.backgroundColor + 'AA');
					gradientFill.addColorStop(1, dataset.backgroundColor + '00');

					var model = c.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].$filler.el._model;
					model.backgroundColor = gradientFill;
				}
			}]
		});
	},
	methods: {
		createChart(chartData) {
			const ctx = this.$refs.chart;
			this.chart = new Chart(ctx, {
				type: chartData.type,
				data: chartData.data,
				options: chartData.options,
				plugins: chartData.plugins
			});
		}
	},
	beforeDestroy() {
		if(this.chart) {
			this.chart.destroy();
		}
	}
}
</script>

<style lang="scss">
.chart-container {
	width: 100%;
	height: 80%;
	min-height: 200px;
	max-width: 800px;
}
canvas {
	width: 100%;
	height: 100%;
}
</style>