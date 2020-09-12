<template>
	<div class="side-bar">
		<h5 class="heading">
			<img class="ipl-logo" src="@/assets/ipl-logo.png" alt="IPL logo">
			<br>
			<span>IPL Dashboard</span>
		</h5>
		<ul class="side-list">
			<router-link 
				tag="li" 
				class="side-item" 
				:class="{ selected: selected == nav.name }" 
				:to="nav.path"
				v-for="nav in navs"
				:key="nav.name"
			><img :src="getIcon(nav.icon)"> <span>{{ nav.name }}</span></router-link>
		</ul>
	</div>
</template>

<script>
export default {
	data: () => ({
		selected: "",
		navs: [
			{
				name: "Trivia",
				path: "/",
				icon: "trivia.svg"
			},
			{
				name: "Matches",
				path: "/matches",
				icon: "matches.svg"
			},
		]
	}),
	watch: {
		"$route.name": function( newVal, oldVal) {
			this.selected = newVal;
		}
	},
	created() {
		this.selected = this.$route.name;
	},
	methods: {
		getIcon(icon) {
			return require('@/assets/icons/' + icon);
		}
	}
}
</script>

<style lang="scss">
.side-bar {
	flex: 1;	
	height: 100%;
	// background: linear-gradient(180deg, #4650E3 0%, #0711A6 25%, #0711A6 75%, #1F29B6 100%);
	background: linear-gradient(180deg, desaturate(lighten($primary, 15%), 10%) 0%, saturate(darken($primary, 10%), 20%) 25%, saturate(darken($primary, 10%), 20%) 75%, $primary 100%);
	color: white;
	display: flex;
	flex-direction: column;
	padding: 20px 0;
	// text-align: center;
	box-shadow: 5px 0 20px rgba(0, 0, 0, 0.3);
	z-index: 10;

	.heading {
		text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);

		.ipl-logo {
			width: 70px;
			margin-bottom: 10px;
			filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
		}
	}

	.side-list {
		list-style: none;
		padding: 0;
		margin-top: 30px;

		.side-item {
			display: flex;
			align-items: center;
			padding: 20px;
			color: rgba(255, 255, 255, 0.5);
			cursor: pointer;

			img {
				width:25px;
				margin: 0 10px;
			}

			&.selected {
				position: relative;
				color: white;
				background: linear-gradient(90deg, desaturate(lighten($primary, 15%), 10%) 0%, $primary 100%);
				transform: scale(1.01);
				transform-origin: left;
				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 5px;
					background: $accent;
				}
			}
		}
	}

	@media (max-width: 624px) {
		.heading {
			span {
				display: none;
			}
			.ipl-logo {
				width: 50px;
			}
		}
		.side-list {
			.side-item {
				justify-content: center;
				padding: 20px 10px;
				img {
					margin: 0;
				}
				span {
					display: none;
				}
			}
		}
	}
}
</style>