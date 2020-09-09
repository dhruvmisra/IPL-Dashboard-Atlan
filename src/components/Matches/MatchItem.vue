<template>
	<div class="match-card">
		{{ match }}
	</div>
</template>

<script>
export default {
	props: {
		match: Object
	}
}
</script>

<style lang="scss">
.match-card {
	margin: 10px;
	padding: 25px;
	border-radius: $radius;
	background: white;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
	transition: $transition;
	&:hover {
		box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.10);
	}
}
</style>