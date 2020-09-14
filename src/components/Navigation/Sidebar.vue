<template>
	<div class="side-bar">
		<h5 class="heading">
			<img
				class="ipl-logo"
				src="@/assets/ipl-logo.png"
				alt="IPL logo"
				data-aos="fade-right"
				data-aos-duration="400"
				data-aos-easing="ease-out-quad"
			/>
			<br />
			<label
				data-aos="fade-right"
				data-aos-duration="400"
				data-aos-delay="100"
				data-aos-easing="ease-out-quad"
				>IPL Dashboard</label
			>
		</h5>
		<ul class="side-list">
			<router-link
				tag="li"
				class="side-item"
				:to="nav.path"
				v-for="(nav, i) in navs"
				:key="nav.name"
			>
				<img
					:src="getIcon(nav.icon)"
					data-aos="fade-right"
					data-aos-duration="400"
					:data-aos-delay="(i + 1) * 50"
				/>
				<label data-aos="fade-right" data-aos-duration="400" :data-aos-delay="(i + 1) * 50">{{
					nav.name
				}}</label>
			</router-link>
		</ul>
		<a
			href="https://github.com/dhruvmisra/IPL-Dashboard-Atlan"
			target="_blank"
			class="btn btn-dark btn-github"
			data-aos="fade-in"
			data-aos-duration="400"
			data-aos-delay="300"
			data-aos-anchor=".heading"
		>
			<img src="@/assets/icons/github-logo.svg" alt="Github logo" />
			<label>GitHub</label>
		</a>
	</div>
</template>

<script>
export default {
	data: () => ({
		navs: [
			{
				name: "Home",
				path: "/",
				icon: "home.svg",
			},
			{
				name: "Trivia",
				path: "/trivia",
				icon: "trivia.svg",
			},
			{
				name: "Matches",
				path: "/matches",
				icon: "matches.svg",
			},
		],
	}),
	methods: {
		getIcon(icon) {
			return require("@/assets/icons/" + icon);
		},
	},
};
</script>

<style lang="scss">
.side-bar {
	flex: 1;
	height: 100%;
	background: linear-gradient(
		180deg,
		desaturate(lighten($primary, 15%), 10%) 0%,
		saturate(darken($primary, 10%), 20%) 25%,
		saturate(darken($primary, 10%), 20%) 75%,
		$primary 100%
	);
	color: white;
	display: flex;
	flex-direction: column;
	padding: 20px 0;
	box-shadow: 5px 0 20px rgba(0, 0, 0, 0.3);
	z-index: 10;

	.heading {
		text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);

		label {
			font-family: 'Yatra One', cursive;
		}

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
				width: 25px;
				margin: 0 10px;
			}

			&.router-link-exact-active {
				position: relative;
				color: white;
				background: linear-gradient(
					90deg,
					desaturate(lighten($primary, 15%), 10%) 0%,
					$primary 100%
				);
				transform: scale(1.01);
				transform-origin: left;
				&::before {
					content: "";
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

	.btn-github {
		padding: 10px;
		margin: 0 20px;
		margin-top: auto;
		font-size: 0.9em;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(black, 0.2);
		border: none;
		&:hover {
			background: black;
		}

		img {
			width: 20px;
			margin: 0 10px;
		}
	}

	@media (max-width: 624px) {
		.heading {
			label {
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
				label {
					display: none;
				}
			}
		}
		.btn-github {
			margin: 0;
			margin-top: auto;

			img {
				margin: 0;
			}
			label {
				display: none;
			}
		}
	}
}
</style>
