<template>
	<div ref="matchesGrid" class="matches-grid">
		<MatchItem :match="match" v-for="match in matchesToRender" :key="match.id" />
	</div>
</template>

<script>
import MatchItem from './MatchItem';

export default {
	data: () => ({
		renderedCount: 10,
		incrementable: true
	}),
	computed: {
		matchesToRender() {
			return this.matches.slice(0, this.renderedCount);
		}
	},
	props: {
		matches: Array
	},
	components: {
		MatchItem
	},
	mounted() {
		document.querySelector('.main-content').addEventListener('scroll', this.onScroll);
	},
	methods: {
		onScroll(event) {
			let el = document.querySelector('.main-content');
			if(el.scrollTop >= el.scrollHeight-760) {
				if(this.incrementable) {
					this.renderedCount += 10;
					this.incrementable = false;
					setTimeout(() => {
						this.incrementable = true;
					}, 1000);
				}
			}
		}
	},
	beforeDestroy() {
		document.querySelector('.main-content').removeEventListener('scroll', this.onScroll);
	}
}
</script>

<style lang="scss">
.matches-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	// padding: 20px;
}
</style>