const arr = [1, 2, 3];

const getData = (a, b, c) => {
  console.log(a, b, c);
};

const [a, b, ...c] = [10, 20, 30, 50, 60, 80];

getData(...arr);

const restEx = (a, b, ...c) => {
  console.log(`a ==== ${a}`);
  console.log(`b ==== ${b}`);
  console.log(`c ==== ${c}`);
};


restEx(10,20,30,40,50,80)