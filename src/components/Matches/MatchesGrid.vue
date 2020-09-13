<template>
	<transition-group tag="div" class="matches-grid" name="grid" mode="in-out">
		<MatchItem 
			:match="match" 
			v-for="match in matchesToRender" 
			:key="match.id"
			:opened="openId == parseInt(match.id)"
			@matchClicked="matchClicked"
		/>
	</transition-group>
</template>

<script>
import MatchItem from './MatchItem';

export default {
	props: {
		matches: Array,
		teamQuery: String,
		matchType: String,
		sorting: Object,
		openId: Number
	},
	components: {
		MatchItem
	},
	data: () => ({
		renderedCount: 30,
		incrementable: true
	}),
	computed: {
		matchesToRender() {
			if(this.openId != -1) {
				return [this.matches.find(match => match.id == this.openId)];
			}

			let filtered = this.matches.filter(match => {
				let includeItem = (match.team1.toLowerCase().indexOf(this.teamQuery.toLowerCase()) != -1 
				|| match.team2.toLowerCase().indexOf(this.teamQuery.toLowerCase()) != -1);
				
				if(!includeItem) return false;

				switch(this.matchType) {
					case "all":
						includeItem = true;
						break;
					default:
						includeItem = (match.result == this.matchType);
				}
				return includeItem;
			});
			let sorted;
			switch(this.sorting.parameter) {
				case "Season":
					sorted = filtered.sort((a, b) => this.sorting.order == "ASC" ? a.season - b.season : b.season - a.season);
					break;
				case "City":
					sorted = filtered.sort((a, b) => this.sorting.order == "ASC" ? a.city.localeCompare(b.city) : b.city.localeCompare(a.city));
					break;
			}
			let sliced = sorted.slice(0, this.renderedCount);
			return sliced;
		}
	},
	watch: {
		teamQuery: function(newVal, oldVal) {
			if(newVal == "") {
				this.renderedCount = 30;
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
					this.renderedCount += 20;
					this.incrementable = false;
					setTimeout(() => {
						this.incrementable = true;
					}, 100);
				}
			}
		},
		matchClicked(index) {
			this.$emit('openMatchDetails', index);
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