<template>
	<transition-group tag="div" class="matches-grid" name="grid" mode="in-out">
		<!-- <div class="matches-grid"> -->
			<MatchItem 
				:match="match" 
				v-for="match in matchesToRender" 
				:key="match.id"
			/>
		<!-- </div> -->
	</transition-group>
</template>

<script>
import MatchItem from './MatchItem';

export default {
	props: {
		matches: Array,
		teamQuery: String
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
			let sliced = this.matches.slice(0, this.renderedCount);
			let teamFiltered = sliced.filter(match => match.team1.toLowerCase().indexOf(this.teamQuery.toLowerCase()) > -1 || match.team2.toLowerCase().indexOf(this.teamQuery.toLowerCase()) > -1);
			// let sorted = 
			return teamFiltered;
		}
	},
	watch: {
		teamQuery: function(newVal, oldVal) {
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
			let regex = new RegExp(this.teamQuery, "i");
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
}
.grid-enter-active, .grid-leave-active {
	transition: all 500ms ease-in-out;
}
.grid-leave-active {
	position: absolute;
	display: none;
}
.grid-move {
	transition: transform 500ms;
}
.grid-enter, .grid-leave-to {
	opacity: 0;
	transform: translateY(10px);
}

</style>