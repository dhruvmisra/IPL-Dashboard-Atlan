<template>
	<transition-group tag="div" class="matches-grid" name="grid" mode="out-in">
		<MatchItem 
			:match="match" 
			v-for="match in matchesToRender" 
			:key="match.id" 
			v-show="matchesSearch(match)"
		/>
	</transition-group>
</template>

<script>
import MatchItem from './MatchItem';

export default {
	props: {
		matches: Array,
		searchQuery: String
	},
	components: {
		MatchItem
	},
	data: () => ({
		renderedCount: 10,
		incrementable: true
	}),
	computed: {
		matchesToRender() {
			return this.matches.slice(0, this.renderedCount);
		}
	},
	watch: {
		searchQuery: function(newVal, oldVal) {
			if(newVal == "") {
				this.renderedCount = 10;
			} else {
				this.renderedCount = this.matches.length;
			}
		}
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
					}, 100);
				}
			}
		},
		matchesSearch(match) {
			let regex = new RegExp(this.searchQuery, "i");
			if(regex.test(match.team1) || regex.test(match.team2) || regex.test(match.season) || regex.test(match.result)) {
				return true;
			}
			return false;
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
.grid-enter-active, .grid-leave-active {
	transition: transform 500ms ease-out, opacity 200ms ease-out;
}
.grid-leave-active {
	position: absolute;
}
.grid-enter, .grid-leave-to {
	opacity: 0;
}

</style>