var vm = new Vue({
	el: '#app',
	data() {
		return {
			slides: [],
			slidePosition: 0,
			interval: 5000,
			intervalTimer: 0,
			bgs: { M: '#d4962b', K: '#688259', H: '#356076', T: '#58585b' },
			init: false,
			moderne: [],
			klassisk: [],
			herskapelig: [],
			tidlos: [],
			hytter: []
		};
	},
	mounted() {
		window.addEventListener('keydown', event => {
			if (['ArrowRight', 'ArrowUp', 'd'].includes(event.key)) {
				this.increment();
				this.play();
			} else if (['ArrowLeft', 'ArrowDown', 'a'].includes(event.key)) {
				this.decrement();
				this.play();
			}
		});
		fetch('imgs.json')
			.then(blob => blob.json())
			.then(json => {
				this.slides = json;
				this.slidesAlfabetical();
			});
		setTimeout(() => {
			this.init = true;
			setTimeout(() => {
				this.play();
			}, 1000);
		}, 11);
	},
	methods: {
		increment() {
			if (this.slidePosition < this.slides.length - 1) {
				this.slidePosition++;
			} else {
				this.slidePosition = 0;
			}
		},
		decrement() {
			if (this.slidePosition > 0) {
				this.slidePosition--;
			} else {
				this.slidePosition = this.slides.length - 1;
			}
		},
		pause() {
			clearInterval(this.intervalTimer);
		},
		play() {
			clearInterval(this.intervalTimer);
			this.intervalTimer = setInterval(() => {
				// console.log(this.intervalTimer);
				this.increment();
			}, this.interval);
		},
		mySort(type) {
			return this.slides
				.slice(0)
				.filter(slide => slide.type == type)
				.sort((a, b) => {
					return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
				});
		},
		slidesAlfabetical() {
			this.moderne = this.mySort('M');
			this.klassisk = this.mySort('K');
			this.herskapelig = this.mySort('H');
			this.tidlos = this.mySort('T');
			this.hytter = this.mySort('Hytte');
			this.slides = [
				...this.moderne,
				...this.klassisk,
				...this.herskapelig,
				...this.tidlos,
				...this.hytter
			];
		}
	}
});
