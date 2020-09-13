<template>
	<div class="autocomplete">
		<input 
			class="form-control" 
			type="text" 
			name="search" 
			id="search" 
			autocomplete="off"
			v-model="search" 
			:placeholder="placeholder"
			@input="onChange"
			@keydown.down="onArrowDown"
			@keydown.up="onArrowUp"
			@keydown.enter="onEnter"
		/>
		<div class="clear-text" v-if="search != ''" @click="search = ''"></div>
		<ul class="autocomplete-results" v-show="isOpen">
			<li 
				class="autocomplete-result" 
				:class="{ 'active': i === arrowCounter }"
				v-for="(result, i) in results"
				@click="setResult(result)"
      	:key="i"
			>{{ result }}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			default: [],
		},
		placeholder: {
			type: String,
			default: "Search"
		}
	},
	data() {
		return {
			search: "",
			results: [],
			isOpen: false,
			arrowCounter: -1
		};
	},
	methods: {
		onChange() {
			this.isOpen = true;
			this.filterResults();
		},
		filterResults() {
			this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
		},
		setResult(result) {
			this.search = result;
			this.isOpen = false;
			this.arrowCounter = -1;
			this.$emit('textChanged', this.search);
		},
		onArrowDown() {
			if (this.arrowCounter < this.results.length) {
				this.arrowCounter = this.arrowCounter + 1;
			}
		},
		onArrowUp() {
			if (this.arrowCounter > 0) {
				this.arrowCounter = this.arrowCounter - 1;
			}
		},
		onEnter() {
			if(this.arrowCounter == -1) {
				this.isOpen = false;
				this.$emit('textChanged', this.search);
			} else {
				this.setResult(this.results[this.arrowCounter]);
			}
		},
		handleClickOutside(evt) {
			if (!this.$el.contains(evt.target)) {
				this.isOpen = false;
				this.arrowCounter = -1;
				this.$emit('textChanged', this.search);
			}
		}
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside)
	},
	destroyed() {
		document.removeEventListener('click', this.handleClickOutside)
	}
};
</script>

<style lang="scss">
.autocomplete {
	position: relative;
	
	input {
		padding-right: 30px;
	}

	.clear-text {
		position: absolute;
		top: 2px;
		right: 10px;
		width: 15px;
		height: 15px;
		margin: 10px 0;
		background-image: url(../../assets/icons/clear.svg);
		background-position: center;
		background-repeat: no-repeat;
		cursor: pointer;
	}

	.autocomplete-results {
		position: absolute;
		width: 100%;
		height: fit-content;
		padding: 0;
		margin: 0;
		border: 1px solid #eeeeee;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
		overflow: auto;
		z-index: 10;

		.autocomplete-result {
			list-style: none;
			text-align: left;
			padding: 8px 10px;
			background: white;
			color: $secondary;
			font-size: 0.9em;
			cursor: pointer;

			&:hover, &.active {
				background-color: lighten($secondary, 20%);
				color: white;
			}
		}
	}
}
</style>
