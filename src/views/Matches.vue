<template>
	<div id="matches">
		<h3>Matches</h3>
		<button class="btn btn-secondary btn-sm btn-back" v-if="openId != -1" @click="openId = -1">
			<img src="@/assets/icons/back.svg" alt="back button">
		</button>
		<div class="filters row my-2 align-items-center" v-else>
			<AutocompleteSearch
				class="team-search my-2"
				:items="teams"
				placeholder="Search teams"
				@textChanged="teamQuery = $event"
			/>
			<div class="form-group sort my-2">
				<span>Sort by:</span>	
				<select class="form-select" name="sort" id="sort" v-model="currentSorting">
					<option :value="sorting" v-for="sorting in sortings" :key="sorting.parameter">
						{{sorting.parameter}}
					</option>
				</select>
			</div>
			<div class="form-group type my-2">
				<span>Match type:</span>	
				<select class="form-select" name="sort" id="sort" v-model="matchType">
					<option value="all">All</option>
					<option value="normal">Normal</option>
					<option value="tie">Tie</option>
				</select>
			</div>
		</div>

		<MatchesGrid
			:matches="matches"
			:teamQuery="teamQuery"
			:sorting="currentSorting"
			:openId="openId"
			@openMatchDetails="openMatchDetails"
		/>
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
		AutocompleteSearch,
	},
	data: () => ({
		teams: [],
		teamQuery: "",
		matchType: "all",
		currentSorting: null,
		sortings: [
			{
				parameter: "Season",
				order: "DSC",
			},
			{
				parameter: "City",
				order: "ASC",
			},
		],
		openId: -1,
	}),
	created() {
		this.currentSorting = this.sortings[0];

		let teams = {};
		for (let match of this.matches) {
			teams[match.team1] = null;
			teams[match.team2] = null;
		}
		this.teams = Object.keys(teams);
	},
	methods: {
		openMatchDetails(id) {
			this.openId = id;
		}
	}
};
</script>

<style lang="scss">
.btn-back {
	width: 30px;
	height: 30px;
	border-radius: 50%;
}
.filters {
	.form-group {
		span {
			font-size: 0.9em;
			width: fit-content;
		}
	}
	.form-select {
		width: fit-content !important;
	}
	.team-search {
		width: 100%;
		max-width: 300px;
	}
	.sort, .type {
		width: fit-content;
		display: flex;
		align-items: center;
		span {
			padding: 0 5px;
		}
	}
}
</style>
