$(document).ready(() => {
  var input = document.querySelector('input');
  var idArr = [
    '#meter', '#kilometer2', '#celsius', '#kelvin2', '#square-meter', '#square-kilometer2', '#cubic-meter', '#cubic-kilometer2', '#kilogram', '#gram2', '#second', '#millisecond2'
  ];
  var prev = document.querySelector('.length');
  var unit1 = document.querySelector(idArr[0]);
  var unit2 = document.querySelector(idArr[1]);
  var index;


  $('button').click((e) => {
    var btnId = `#${e.target.id}`;
    var btnClass = document.querySelector(`.${e.target.id}`);

    prev.style.display = 'none';
    prev = btnClass;
    btnClass.style.display = 'grid';
    $('button').addClass('unset');
    $('button').removeClass('set');
    $(btnId).addClass('set');
    $(btnClass).addClass('grid');

    switch (btnId) {
      case '#length':
        unit1 = document.querySelector(idArr[0]);
        unit2 = document.querySelector(idArr[1]);
        break;
      case '#temp':
        unit1 = document.querySelector(idArr[2]);
        unit2 = document.querySelector(idArr[3]);

        break;
      case '#area':
        unit1 = document.querySelector(idArr[4]);
        unit2 = document.querySelector(idArr[5]);

        break;
      case '#volume':
        unit1 = document.querySelector(idArr[6]);
        unit2 = document.querySelector(idArr[7]);

        break;
      case '#weight':
        unit1 = document.querySelector(idArr[8]);
        unit2 = document.querySelector(idArr[9]);

        break;
      case '#time':
        unit1 = document.querySelector(idArr[10]);
        unit2 = document.querySelector(idArr[11]);
        break;
    }
  });

  $('li').click((e) => {
    var lastChar = e.target.id.slice(-1);   // getting last char of id

    switch (prev.className.split(' ')[0]) {
      case 'length':
        index = 0;
        break;
      case 'temp':
        index = 2;
        break;
      case 'area':
        index = 4;
        break;
      case 'volume':
        index = 6;
        break;
      case 'weight':
        index = 8;
        break;
      case 'time':
        index = 10;
        break;
    }

    if (lastChar === '2') {
      $(unit2).removeClass('selected');
      unit2 = document.querySelector(`#${e.currentTarget.id}`);
      $(unit2).addClass('selected');
      idArr[index + 1] = `#${unit2.id}`;
    }
    else {
      $(unit1).removeClass('selected');
      unit1 = document.querySelector(`#${e.currentTarget.id}`);
      $(unit1).addClass('selected');
      idArr[index] = `#${unit1.id}`;
    }
  });

  $(input).keyup(detrmUnit);
  $('li').click(detrmUnit);
  $('.tabs').click(detrmUnit);

  function detrmUnit() {
    var ans;

    if (input.value === '') {
      return clear();
    }

    switch (prev.className.split(' ')[0]) {
      case 'length':
        ans = calcLength();
        break;
      case 'temp':
        ans = calcTemp();
        break;
      case 'area':
        ans = calcArea();
        break;
      case 'volume':
        ans = calcVol();
        break;
      case 'weight':
        ans = calcWeight();
        break;
      case 'time':
        ans = calcTime();
        break;
    }
    matchPrint(ans);
  }

  function calcLength()  {
    var inputNum;
    // converting the first unit to meters
    switch (unit1.id) {
      case 'meter':
        inputNum = input.value;
        break;
      case 'kilometer':
        inputNum = input.value * 1000;
        break;
      case 'centimeter':
        inputNum = input.value * .01;
        break;
      case 'millimeter':
        inputNum = input.value * .001;
        break;
      case 'micrometer':
        inputNum = input.value * .000001;
        break;
      case 'nanometer':
        inputNum = input.value * .000000001;
        break;
      case 'mile':
        inputNum = input.value * 1609.344;
        break;
      case 'yard':
        inputNum = input.value * .9144;
        break;
      case 'foot':
        inputNum = input.value * .3048;
        break;
      case 'inch':
        inputNum = input.value * .0254;
        break;
    }

    // converting from meters to other units and displaying results
    $('#meter2 span').text(`(${inputNum})`);
    $('#kilometer2 span').text(`(${inputNum * .001})`);
    $('#centimeter2 span').text(`(${inputNum * 100})`);
    $('#millimeter2 span').text(`(${inputNum * 1000})`);
    $('#micrometer2 span').text(`(${inputNum * 1000000})`);
    $('#nanometer2 span').text(`(${inputNum * 1000000000})`);
    $('#mile2 span').text(`(${inputNum * .000621})`);
    $('#yard2 span').text(`(${inputNum * 1.093613})`);
    $('#foot2 span').text(`(${inputNum * 3.28084})`);
    $('#inch2 span').text(`(${inputNum * 39.370079})`);

    // converting from meters to user-desired unit
    switch (unit2.id) {
      case 'meter2':
        return inputNum;
      case 'kilometer2':
        return inputNum * .001;
      case 'centimeter2':
        return inputNum * 100;
      case 'millimeter2':
        return inputNum * 1000;
      case 'micrometer2':
        return inputNum * 1000000;
      case 'nanometer2':
        return inputNum * 1000000000;
      case 'mile2':
        return inputNum * .000621;
      case 'yard2':
        return inputNum * 1.093613;
      case 'foot2':
        return inputNum * 3.28084;
      case 'inch2':
        return inputNum * 39.370079;
    }
  }

  function calcTemp() {
    var celsius;

    // converting the first unit to celsius
    switch (unit1.id) {
      case 'celsius':
        celsius = input.value;
        break;
      case 'kelvin':
        celsius = input.value - 273.15;
        break;
      case 'fahrenheit':
          celsius = (input.value - 32) * 5 / 9;
    }

    // converting from celsius to other units and displaying results
    celsius = parseInt(celsius);
    $('#celsius2 span').text(`(${celsius})`);
    $('#kelvin2 span').text(`(${celsius + 273.15})`);
    $('#fahrenheit2 span').text(`(${celsius * 9 / 5 + 32})`);

    // coverting from celsius to user-desired unit
    switch (unit2.id) {
      case 'celsius2':
        return celsius;
      case 'kelvin2':
        return celsius + 273.15;
      case 'fahrenheit2':
        return celsius * 9 / 5 + 32;
    }
  }

  function calcArea() {
    var sqMeter;

    // converting the first unit to square-meter
    switch (unit1.id) {
      case 'square-meter':
        sqMeter = input.value;
        break;
      case 'square-kilometer':
        sqMeter = input.value * 1000000;
        break;
      case 'square-centimeter':
        sqMeter = input.value * .0001;
        break;
      case 'square-millimeter':
        sqMeter = input.value * .000001;
        break;
      case 'square-micrometer':
        sqMeter = input.value * .000000000001;
        break;
      case 'square-mile':
        sqMeter = input.value * 2589988.11;
        break;
      case 'square-yard':
        sqMeter = input.value * .836127;
        break;
      case 'square-foot':
        sqMeter = input.value * .092903;
        break;
      case 'square-inch':
        sqMeter = input.value * .000645;
        break;
      case 'acre':
        sqMeter = input.value * 4046.856422;
        break;
    }

    // converting from square-meter to other units and displaying results
    $('#square-meter2 span').text(`(${sqMeter})`);
    $('#square-kilometer2 span').text(`(${sqMeter * .000001})`);
    $('#square-centimeter2 span').text(`(${sqMeter * 10000})`);
    $('#square-millimeter2 span').text(`(${sqMeter * 1000000})`);
    $('#square-micrometer2 span').text(`(${sqMeter * 1000000000000})`);
    $('#square-mile2 span').text(`(${sqMeter * .0000003861})`);
    $('#square-yard2 span').text(`(${sqMeter * 1.19599})`);
    $('#square-foot2 span').text(`(${sqMeter * 10.76391})`);
    $('#square-inch2 span').text(`(${sqMeter * 1550.0031})`);
    $('#acre2 span').text(`(${sqMeter * .000247})`);

    // converting from square-meters to user-desired unit
    switch (unit2.id) {
      case 'square-meter2':
        return sqMeter;
      case 'square-kilometer2':
        return sqMeter * .000001;
      case 'square-centimeter2':
        return sqMeter * 10000;
      case 'square-millimeter2':
        return sqMeter * 1000000;
      case 'square-micrometer2':
        return sqMeter * 1000000000000;
      case 'square-mile2':
        return sqMeter * .0000003861;
      case 'square-yard2':
        return sqMeter * 1.19599;
      case 'square-foot2':
        return sqMeter * 10.76391;
      case 'square-inch2':
        return sqMeter * 1550.0031;
      case 'acre2':
        return sqMeter * .000247;
    }
  }

  function calcVol() {
    var cubicMeter;

    // converting the first unit to cubic meter
    switch (unit1.id) {
      case 'cubic-meter':
        cubicMeter = input.value;
        break;
      case 'cubic-kilometer':
        cubicMeter = input.value * 1000000000;
        break;
      case 'cubic-centimeter':
        cubicMeter = input.value * .000001;
        break;
      case 'cubic-millimeter':
        cubicMeter = input.value * .000000001;
        break;
      case 'liter':
        cubicMeter = input.value * .001;
        break;
      case 'milliliter':
        cubicMeter = input.value * .000001;
        break;
      case 'us-gallon':
        cubicMeter = input.value * .003785;
        break;
      case 'us-quart':
        cubicMeter = input.value * .000946;
        break;
      case 'us-pint':
        cubicMeter = input.value * .000473;
        break;
      case 'us-cup':
        cubicMeter = input.value * .000237;
        break;
      case 'us-fluid-ounce':
        cubicMeter = input.value * .000029574;
        break;
    }

    // converting from cubic meter to others units and displaying results
    $('#cubic-meter2 span').text(`(${cubicMeter})`);
    $('#cubic-kilometer2 span').text(`(${cubicMeter * .000000001})`);
    $('#cubic-centimeter2 span').text(`(${cubicMeter * 1000000})`);
    $('#cubic-millimeter2 span').text(`(${cubicMeter * 1000000000})`);
    $('#liter2 span').text(`(${cubicMeter * 1000})`);
    $('#milliliter2 span').text(`(${cubicMeter * 1000000})`);
    $('#us-gallon2 span').text(`(${cubicMeter * 264.172052})`);
    $('#us-quart2 span').text(`(${cubicMeter * 1056.688209})`);
    $('#us-pint2 span').text(`(${cubicMeter * 2113.376419})`);
    $('#us-cup2 span').text(`(${cubicMeter * 4226.752838})`);
    $('#us-fluid-ounce2 span').text(`(${cubicMeter * 33814.022702})`);


    // converting from cubic meter to user-desired unit
    switch (unit2.id) {
      case 'cubic-meter2':
        return cubicMeter;
      case 'cubic-kilometer2':
        return cubicMeter * .000000001;
      case 'cubic-centimeter2':
        return cubicMeter * 1000000;
      case 'cubic-millimeter2':
        return cubicMeter * 1000000000;
      case 'liter2':
        return cubicMeter * 1000;
      case 'milliliter2':
        return cubicMeter * 1000000;
      case 'us-gallon2':
        return cubicMeter * 264.172052;
      case 'us-quart2':
        return cubicMeter * 1056.688209;
      case 'us-pint2':
        return cubicMeter * 2113.376419;
      case 'us-cup2':
        return cubicMeter * 4226.752838;
      case 'us-fluid-ounce2':
        return cubicMeter * 33814.022702;
    }
  }

  function calcWeight() {
    var kilogram;

    // converting the first unit to kilogram
    switch (unit1.id) {
      case 'kilogram':
        kilogram = input.value;
        break;
      case 'gram':
        kilogram = input.value * .001;
        break;
      case 'milligram':
        kilogram = input.value * .000001;
        break;
      case 'pound':
        kilogram = input.value * .453592;
        break;
      case 'ounce':
        kilogram = input.value * .02835;
        break;
      case 'carrat':
        kilogram = input.value * .0002;
        break;
    }

    // converting from kilogram to other units and printing the results
    $('#kilogram2 span').text(`(${kilogram})`);
    $('#gram2 span').text(`(${kilogram * 1000})`);
    $('#milligram2 span').text(`(${kilogram * 1000000})`);
    $('#pound2 span').text(`(${kilogram * 2.204623})`);
    $('#ounce2 span').text(`(${kilogram * 35.273962})`);
    $('#carrat2 span').text(`(${kilogram * 5000})`);


    // converting from kilogram to user-desired unit
    switch (unit2.id) {
      case 'kilogram2':
        return kilogram;
      case 'gram2':
        return kilogram * 1000;
      case 'milligram2':
        return kilogram * 1000000;
      case 'pound2':
        return kilogram * 2.204623;
      case 'ounce2':
        return kilogram * 35.273962;
      case 'carrat2':
        return kilogram * 5000;
    }
  }

  function calcTime() {
    var sec;

    // converting the first unit to seconds
    switch (unit1.id) {
      case 'second':
        sec = input.value;
        break;
      case 'millisecond':
        sec = input.value * .001;
        break;
      case 'microsecond':
        sec = input.value * .000001;
        break;
      case 'nanosecond':
        sec = input.value * .000000001;
        break;
      case 'minute':
        sec = input.value * 60;
        break;
      case 'hour':
        sec = input.value * 3600;
        break;
      case 'day':
        sec = input.value * 86400;
        break;
      case 'week':
        sec = input.value * 604800;
        break;
      case 'month':
        sec = input.value * 2629746;
        break;
      case 'year':
        sec = input.value * 31556952;
        break;
    }

    // converting from seconds to all other units and printing the results
    $('#second2 span').text(`(${sec})`);
    $('#millisecond2 span').text(`(${sec * 1000})`);
    $('#microsecond2 span').text(`(${sec * 1000000})`);
    $('#nanosecond2 span').text(`(${sec * 1000000000})`);
    $('#minute2 span').text(`(${sec * .016667})`);
    $('#hour2 span').text(`(${sec * .000278})`);
    $('#day2 span').text(`(${sec * .000011574})`);
    $('#week2 span').text(`(${sec * .0000016534})`);
    $('#month2 span').text(`(${sec * .00000038026})`);
    $('#year2 span').text(`(${sec * .000000031689})`);

    // converting from seconds to user-desired unit
    switch (unit2.id) {
      case 'second2':
        return sec;
      case 'millisecond2':
        return sec * 1000;
      case 'microsecond2':
        return sec * 1000000;
      case 'nanosecond2':
        return sec * 1000000000;
      case 'minute2':
        return sec * .016667;
      case 'hour2':
        return sec * .000278;
      case 'day2':
        return sec * .000011574;
      case 'week2':
        return sec * .0000016534;
      case 'month2':
        return sec * .00000038026;
      case 'year2':
        return sec * .000000031689;
    }
  }

  // determines the best approach to print the results
  function matchPrint(ans) {
    $(`#${unit1.id}2 span`).text(`(${input.value})`);
    if (unit1.id === unit2.id.slice(0, unit2.id.length - 1)) {
      print(input.value);
    }
    else {
      print(ans);
    }
  }

  function print(ans) {
    var unit2Short = unit2.id.slice(0, unit2.id.length-1);
    $('.conv-num').text(ans);
    $('.result h2').text(`Result: ${input.value} ${unit1.id} = ${ans} ${unit2Short}`);
  }

  function clear() {
    $('span').text('');
    $('.result h2').text('');
    $('.conv-num').text('');
  }
});
