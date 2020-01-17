function modelling() {
  const c_count = $("#c_count").val();

  const pg0_m = $("#pg0_m").val();
  const pg0_d = $("#pg0_d").val();

  // вход в метро
  const ev0_m = $("#ev0_m").val();
  const ev0_d = $("#ev0_d").val();
  const ev1_m = $("#ev1_m").val();
  const ev1_d = $("#ev1_d").val();
  const ev2_m = $("#ev2_m").val();
  const ev2_d = $("#ev2_d").val();
  const ev3_m = $("#ev3_m").val();
  const ev3_d = $("#ev3_d").val();

  // кассы
  const ti0_m = $("#ti0_m").val();
  const ti0_d = $("#ti0_d").val();
  const ti1_m = $("#ti1_m").val();
  const ti1_d = $("#ti1_d").val();

  // турникет
  const tu0_m = $("#tu0_m").val();
  const tu0_d = $("#tu0_d").val();
  const tu1_m = $("#tu1_m").val();
  const tu1_d = $("#tu1_d").val();
  const tu2_m = $("#tu2_m").val();
  const tu2_d = $("#tu2_d").val();

  // эскалатор
  const es0_m = $("#es0_m").val();
  const es0_d = $("#es0_d").val();
  const es1_m = $("#es1_m").val();
  const es1_d = $("#es1_d").val();


  $.ajax({
    type: "POST",
    url: 'http://localhost:5001/math',
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify({
      'pg0_m': pg0_m, 
      'pg0_d': pg0_d,
      'ev0_m': ev0_m, 
      'ev0_d': ev0_d, 
      'ev1_m': ev1_m, 
      'ev1_d': ev1_d, 
      'ev2_m': ev2_m, 
      'ev2_d': ev2_d, 
      'ev3_m': ev3_m, 
      'ev3_d': ev3_d,
      'ti0_m': ti0_m, 
      'ti0_d': ti0_d, 
      'ti1_m': ti1_m, 
      'ti1_d': ti1_d, 
      'tu0_m': tu0_m, 
      'tu0_d': tu0_d, 
      'tu1_m': tu1_m, 
      'tu1_d': tu1_d, 
      'tu2_m': tu1_m, 
      'tu2_d': tu1_d, 
      'es0_m': es0_m, 
      'es0_d': es0_d, 
      'es1_m': es1_m, 
      'es1_d': es1_d, 
      'c_count': c_count
    }),
    success: function(data) {
      let res = data;
      // $("#modelling").html(' ' + res[10]);
      $("#ev0").val(res[0]);
      $("#ev1").val(res[1]);
      $("#ev2").val(res[2]);
      $("#ev3").val(res[3]);
      $("#ti0").val(res[4]);
      $("#ti1").val(res[5]);
      $("#tu0").val(res[6]);
      $("#tu1").val(res[7]);
      $("#tu2").val(res[8]);
      $("#es0").val(res[9]);
      $("#es1").val(res[10]);

      console.log(res[10]);
    }, error: function(err) {
      console.log(err);
    }
  });
}
