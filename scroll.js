const h1 = document.querySelector('h1');
const box2_p = document.querySelector("p");
const sections = document.querySelectorAll('section');
const lis = document.querySelectorAll('ul li');

const base = -500;
const box3_h1 = document.querySelector("h1");
let posArr = [];


//배열에 섹션의 각각 요소의 윗면에서 얼마나 y값이 떨어져있는가를 반환하여 넣어야한다.
for (let el of sections) {
	posArr.push(el.offsetTop);
}

console.log(posArr);
//[0, 1000, 1700, 2600]
window.addEventListener('scroll', () => {
	let scroll = window.scrollY || window.pageYOffset;


	box2_p.style.left = `${scroll - posArr[1] + 300}px`;
	// let transX = scroll - posArr[2] + 300;

	box3_h1.style.transform = `translateX(${-500 + scroll}px) scale(${1 + scroll / 400})`;
	box3_h1.style.opacity = `${2 - scroll / 1000}`;

	//	섹션에 스크롤되어 범위안에 들어오면 활성화되는 코드
	// if (scroll >= posArr[0] && scroll < posArr[1]) {
	// 	for (let el of lis) {
	// 		el.classList.remove('on');
	//     sections[index].classList.remove('on');
	// 	}
	// 	lis[0].classList.add('on');
	//   el.classList.add('on');
	// }

	// if (scroll >= posArr[1] && scroll < posArr[2]) {
	// 	for (let el of lis) {
	// 		el.classList.remove('on');
	//     sections[index].classList.remove('on');
	// 	}
	// 	lis[1].classList.add('on');
	//   el.classList.add('on');
	// }

	// if (scroll >= posArr[2] && scroll < posArr[3]) {
	// 	for (let el of lis) {
	// 		el.classList.remove('on');
	//     sections[index].classList.remove('on');
	// 	}
	// 	lis[2].classList.add('on');
	// }

	// if (posArr[3] <= scroll) {
	// 	for (let el of lis) {
	// 		el.classList.remove('on');
	//     sections[index].classList.remove('on');
	// 	}
	// 	lis[3].classList.add('on');
	// }

	//반복문과 조건문을 활용해서 코드를 줄일수 있습니다.

	sections.forEach((el, index) => {
		if (scroll >= posArr[index] + base) {
			//lis에 반복하는 부분
			for (let el of lis) {
				el.classList.remove('on'); //el = lis[index]
			}
			lis[index].classList.add('on');

			for (let el of sections) {
				el.classList.remove('on'); //el = sections[index]
			}
			sections[index].classList.add('on');
		}
	});
});

lis.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		new Anim(window, {
			prop: 'scroll',
			value: posArr[index],
			duration: 500,
		});

		active(lis, index);
	});
});

// 함수패키징
function active(arr, index) {
	for (let el of arr) {
		el.classList.remove('on');
	}
	arr[index].classList.add('on');
}
