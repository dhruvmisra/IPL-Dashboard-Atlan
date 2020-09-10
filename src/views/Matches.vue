<template>
	<div id="matches">
		<h3>Matches</h3>
		<AutocompleteSearch class="my-4" :items="teams" placeholder="Search teams" @textChanged="teamQuery = $event" />
		<!-- <div class="form-group my-3">
			<div class="">
				<label for="sort" class="text-secondary">Sort By</label>
				<select class="form-select w-25" name="sort" id="sort" v-model="currentSorting">
					<option :value="sorting" v-for="sorting in sortings" :key="sorting.parameter">{{ sorting.parameter }}</option>
				</select>
			</div>
		</div> -->

		<MatchesGrid :matches="matches" :teamQuery="teamQuery" />

	</div>
</template>

<script>
import MatchesGrid from "@/components/Matches/MatchesGrid";
import AutocompleteSearch from "@/components/Matches/AutocompleteSearch";

export default {
	props: {
		matches: Array,
	},
	components: {
		MatchesGrid,
		AutocompleteSearch
	},
	data: () => ({
		teams: [],
		teamQuery: "",
		currentSorting: null,
		sortings: [
			{
				parameter: "Season",
				order: "D"
			},
			{
				parameter: "City",
				order: "A"
			},
		]
	}),
	created() {
		this.currentSorting = this.sortings[0];

		let teams = {};
		for(let match of this.matches) {
			teams[match.team1] = null;
			teams[match.team2] = null;
		}
		this.teams = Object.keys(teams);
	}
};
</script>

<style lang="scss">

</style>
