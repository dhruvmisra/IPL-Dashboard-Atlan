<template>
	<div id="matches">
		<h3 class="text-primary">Matches</h3>
		<div class="form-group my-3">
			<label for="search" class="text-secondary">Search</label>
			<input
				class="form-control"
				type="text"
				name="search"
				id="search"
				v-model="searchText"
				placeholder="Search a team or a year"
			/>
		</div>
		<div class="form-group my-3">
			<div class="">
				<label for="sort" class="text-secondary">Sort By</label>
				<select class="form-select w-25" name="sort" id="sort" v-model="currentSorting">
					<option :value="sorting" v-for="sorting in sortings" :key="sorting.parameter">{{ sorting.parameter }}</option>
				</select>
			</div>
		</div>

		<MatchesGrid :matches="matches" :searchQuery="searchQuery" />
	
	</div>
</template>

<script>
import MatchesGrid from "@/components/Matches/MatchesGrid";

export default {
	props: {
		matches: Array,
	},
	components: {
		MatchesGrid,
	},
	data: () => ({
		debouncedInput: "",
		timeout: null,
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
	computed: {
		searchText: {
			get() {
				return this.debouncedInput;
			},
			set(val) {
				if (!!(this.timeout)) clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.debouncedInput = val;
				}, 300);
			}
		},
		searchQuery() {
			return this.searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
	},
	created() {
		this.currentSorting = this.sortings[0];
	}
};
</script>

<style lang="scss">

</style>
