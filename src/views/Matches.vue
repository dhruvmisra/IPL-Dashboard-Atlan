<template>
	<div id="matches">
		<h2 class="title">Matches</h2>
		<small class="text-sm" style="color: grey">Library of all the matches from 2008 to 2017. Click on a card to view more information.</small>
		<div class="btn-back" v-if="openId != -1" @click="closeMatchDetails"></div>
		<div class="filters row mx-0 my-2 align-items-center" v-else>
			<AutocompleteSearch
				class="team-search my-2 mr-1"
				:items="teams"
				placeholder="Search teams"
				@textChanged="teamQuery = $event"
			/>
			<div class="form-group sort my-2 mr-1">
				<span>Sort by:</span>	
				<select class="form-select" name="sort" id="sort" v-model="selectedSorting">
					<option :value="parameter" v-for="parameter in sortings" :key="parameter">
						{{parameter}}
					</option>
				</select>
				<div class="order-by asc" :class="{ 'dsc': ordering == 'DSC' }" @click="ordering = ordering == 'ASC' ? 'DSC' : 'ASC'"></div>
			</div>
			<div class="form-group type my-2">
				<span>Match type:</span>	
				<select class="form-select" name="sort" id="sort" v-model="matchType">
					<option value="all">All</option>
					<option value="normal">Normal</option>
					<option value="tie">Tie</option>
					<option value="no result">No Result</option>
				</select>
			</div>
		</div>

		<MatchesGrid
			:matches="matches"
			:teamQuery="teamQuery"
			:matchType="matchType"
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
		sortings: [
			"Season",
			"City"
		],
		selectedSorting: "Season",
		ordering: "ASC",
		openId: -1,
	}),
	computed: {
		currentSorting() {
			return {
				parameter: this.selectedSorting,
				order: this.ordering
			}
		}
	},
	watch: {
		'$route.query.id': function(newVal, oldVal) {
			if(newVal) {
				this.openId = parseInt(newVal);
			} else {
				this.openId = -1;
			}
		}
	},
	created() {
		if(this.$route.query.id) {
			let id = parseInt(this.$route.query.id);
			if(id >= 0 && id < this.matches.length) {
				this.openId = id;
			} else {
				this.$router.replace({ path: '/matches' })
			}
		}

		let teams = {};
		for (let match of this.matches) {
			teams[match.team1] = null;
			teams[match.team2] = null;
		}
		this.teams = Object.keys(teams);
	},
	methods: {
		openMatchDetails(id) {
			this.$router.push({ path: "/matches", query: { id: id } })
		},
		closeMatchDetails() {
			this.$router.push({ path: "/matches" });
		},
		resetFilters() {
			this.teamQuery = "";
			this.selectedSorting = "Season";
			this.ordering = "ASC";
			this.matchType = "all";
		}
	}
};
</script>

<style lang="scss">
.btn-back {
	width: 25px;
	height: 25px;
	margin: 10px 0;
	background-image: url(../assets/icons/left-arrow.svg);
	background-position: center;
	background-repeat: no-repeat;
	cursor: pointer;
}
.filters {

	&.row > * {
		padding-left: 0;
		padding-right: 0;
	}
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
	.order-by {
		width: 20px;
		height: 20px;
		margin: 10px;
		background-image: url(../assets/icons/left-arrow.svg);
		filter: invert(53%) sepia(100%) saturate(579%) hue-rotate(0deg) brightness(106%) contrast(106%);
		background-position: center;
		background-repeat: no-repeat;
		transition: transform 300ms ease-in-out;

		&.asc {
			transform: rotate(90deg);
		}
		&.dsc {
			transform: rotate(270deg);
		}
	}
}
</style>
