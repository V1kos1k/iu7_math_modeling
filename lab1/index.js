// import {table1} from './table';

class Congruential {
  constructor() {
    this.x = 0;
    this.a = 16807;
    this.c = 2147483647;
    this.m = 2836;
  }

  getRandom() {
    this.x = (this.a*this.x + this.c) % this.m;
    return this.x;
  }
  getOneItem() {
    return this.getRandom() % 10;
  }
  getTwoItem() {
    return 10 + (this.getRandom() % 90);
  }
  getThreeItem() {
    return 100 + (this.getRandom() % 900);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var random = new Congruential();
function fillAlgo() {
  const count = $("#lenAlgo").val();
  var table = document.getElementById('algorithm');
  var arr1 = [];
  var arr2 = [];
  var arr3 = [];

  table.innerHTML = '';

  for (var i = 0; i < count; i++) {
    const oneItem = random.getOneItem();
    const twoItem = random.getTwoItem();
    const threeItem = random.getThreeItem();

    arr1.push(oneItem);
    arr2.push(twoItem);
    arr3.push(threeItem);

    table.innerHTML += 
        '<tr> '+
          '<th class="text-center">' + (i+1) + '</th>'  +
          '<td class="text-center">' + oneItem + '</td>' +
          '<td class="text-center">' + twoItem + '</td>' +
          '<td class="text-center">' + threeItem + '</td>' +
        '</tr>';
  }

  const coef1 = corellation(arr1);
  const coef2 = corellation(arr2);
  const coef3 = corellation(arr3);
  table.innerHTML += 
        '<tr> '+
          '<th class="text-center">Коэффициент</th>'  +
          '<td class="text-center">' + coef1.toFixed(4) + '</td>' +
          '<td class="text-center">' + coef2.toFixed(4) + '</td>' +
          '<td class="text-center">' + coef3.toFixed(4) + '</td>' +
        '</tr>';
}

function fillTable() {
  const count = $("#lenTable").val();
  var table = document.getElementById('table');

  var arr1 = [];
  var arr2 = [];
  var arr3 = [];

  table.innerHTML = '';

  for (var i = 0; i < count; i++) {
    const oneItem = table1[getRandomInt(table1.length)];
    const twoItem = table2[getRandomInt(table2.length)];
    const threeItem = table3[getRandomInt(table3.length)];

    arr1.push(oneItem);
    arr2.push(twoItem);
    arr3.push(threeItem);

    table.innerHTML += 
        '<tr> '+
          '<th class="text-center">' + (i+1) + '</th>'  +
          '<td class="text-center">' + oneItem + '</td>' +
          '<td class="text-center">' + twoItem + '</td>' +
          '<td class="text-center">' + threeItem + '</td>' +
        '</tr>';
  }

  const coef1 = corellation(arr1);
  const coef2 = corellation(arr2);
  const coef3 = corellation(arr3);
  table.innerHTML += 
        '<tr> '+
          '<th class="text-center">Коэффициент</th>'  +
          '<td class="text-center">' + coef1.toFixed(4) + '</td>' +
          '<td class="text-center">' + coef2.toFixed(4) + '</td>' +
          '<td class="text-center">' + coef3.toFixed(4) + '</td>' +
        '</tr>';
}

function fillInput() {
  var values = $("#input").val().split(' ');
  values = values.map(function(x) {
    return parseInt(x);
  });
  var result = document.getElementById('usersResult');
    console.log(values);

    const coef = corellation(values);
    if (coef) {
      result.innerHTML = 'Коэффициент: ' + coef;
    }
    else {
      result.innerHTML = 'Корреляции нет';
    }
}

function corellation(arr) {
  var u = arr[0];
  var u2 = arr[0]*arr[0];
  var uv = 0;
  var last = arr[0];
  const n = arr.length;

  for (var i = 1; i < n; i++) {
    u += arr[i];
    u2 += arr[i]*arr[i];
    uv += arr[i]*last;
    last = arr[i];
  }
  uv += arr[n-1]*arr[0];

  const C = (n*uv - u*u)/(n*u2 - u*u);

  return C;
}