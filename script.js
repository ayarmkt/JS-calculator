const buttons = document.querySelectorAll('button');
const calculation = document.querySelector('.calculation');
const result = document.querySelector('.result');

let lastTyped = [];

buttons.forEach((btn) =>
  btn.addEventListener('click', function (e) {
    console.log(e.target.classList);
    console.log(e.target.textContent);
    lastTyped.push(e.target.textContent);
    console.log(lastTyped);

    if (e.target.classList == 'symbol') {
      calculation.textContent = lastTyped.join(' ');
      result.textContent = 0;
    } else {
      result.textContent = e.target.textContent;
    }
  })
);
