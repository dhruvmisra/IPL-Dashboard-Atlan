<template>
	<div id="matches">
		<h1>Matches</h1>
		<MatchesGrid :matches="matches" />
	</div>
</template>

<script>
import MatchesGrid from '@/components/Matches/MatchesGrid';

export default {
	props: {
		matches: Array
	},
	components: {
		MatchesGrid
	}
}
</script>

<style>

</style>