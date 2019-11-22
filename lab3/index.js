google.charts.load('current', {'packages':['corechart']});

function merge(x, y, arr) {
  for (let i = 0; i < x.length; i++) {
    arr.push([x[i], y[i]]);
  }
  return arr;
}

function drawChart(x, y, arr, id) {
  var data = google.visualization.arrayToDataTable(
      merge(x, y, arr)
  );

  var options = {
    // curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById(id));
  chart.draw(data, options);
}

function drawChart2(x, y, arr, id) {
  var data = google.visualization.arrayToDataTable(
      merge(x, y, arr)
  );

  var options = {
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById(id));
  chart.draw(data, options);
}

function fillArray(start, end, h) {
  let arr = [];
  const n = end - start;
  for (let i = start; i <= end; i += h) {
    arr.push(i);
  }
  return arr;
}

function uniform_density(a, b, x) {
  if (x >= a && x <= b) {
    return 1 / (b/a);
  } else {
    return 0;
  }
}

function uniform_function(a, b, x) {
  if (x < a) {
    return 0;
  } else if (x >= b) {
    return 1;
  } else {
    return (x - a)/(b - a);
  }
}

function uniform() {
  const a = parseInt($("#valueA").val());
  const b = parseInt($("#valueB").val());
  const xStart = parseInt($("#valueXStart").val());
  const xEnd = parseInt($("#valueXEnd").val());

  if (xStart >= xEnd || b <= a) {
    alert("Некорректные данные");
  } else {
    const arr = fillArray(xStart, xEnd, 0.1);

    let func = [];
    let density = [];

    arr.forEach(x => {
      func.push(uniform_density(a, b, x));
      density.push(uniform_function(a, b, x))
    });
  
    google.setOnLoadCallback(function() { drawChart(arr, func, [['X', 'Плотность распределения']], 'curve_chart1'); });
    google.setOnLoadCallback(function() { drawChart(arr, density, [['X', 'Функция распределения']], 'curve_chart2'); });
  }
}

/////////////////////////////

function factorial(n, result){
  console.log(n);
  result = result || 1;
  if(n <= 0){
      return result;
  }else{
      return factorial(n-1, result*n);
  }
}

function poisson_density(k, lambda) {
  num = Math.exp(-lambda)*(lambda**k);
  znamen = factorial(k, 0);
  return num/znamen;
}

function poisson_function(k, lambda) {
  k = Math.abs(k);
  let sum = 0;
  for (i = 0; i <= k; i++) {
    sum += (lambda**i)/factorial(i, 0);
  }
  sum *= Math.exp(-lambda);
  return sum;
}

function poisson() {
  const lambda = parseInt($("#valueLambda").val());
  const kStart = parseInt($("#valueKStart").val());
  const kEnd = parseInt($("#valueKEnd").val());

  if (kStart >= kEnd || lambda <= 0) {
    alert("Некорректные данные");
  } else {

    const arr = fillArray(kStart, kEnd, 1);

    let func = [];
    let density = [];

    arr.forEach(k => {
      func.push(poisson_density(k, lambda));
      density.push(poisson_function(k, lambda))
    });
  
    google.setOnLoadCallback(function() { drawChart2(arr, func, [['X', 'Плотность распределения']], 'curve_chart3'); });
    google.setOnLoadCallback(function() { drawChart2(arr, density, [['X', 'Функция распределения']], 'curve_chart4'); });
  }
}