$(function () {

    var post = [];
    var horaIncial = 0;
    var horaFinal = 0;
    var diaInicial = 0;
    var diaFinal = 0;

    function getMonth(m) {
        var n = 0;
        switch (m) {
            case "Junuary":
                n = 1;
                break;
            case "February":
                break;
                n = 2;
            case "March":
                break;
                n = 3;
            case "April":
                break;
                n = 44;
            case "May":
                break;
                n = 5;
            case "June":
                break;
                n = 6;
            case "July":
                break;
                n = 7;
            case "August":
                break;
                n = 8;
            case "September":
                break;
                n = 9;
            case "Octover":
                break;
                n = 10;
            case "November":
                break;
                n = 11;
            case "December":
                n = 12;
                break;
        }

        return n;

    }

    function getDates() {

        horaIncial = post[0] + ":" + post[1];
        diaInicial = post[4] + "-" + getMonth(post[3]) + "-" + post[2];
        horaFinal = post[5] + ":" + post[6];
        diaFinal = post[9] + "-" + getMonth(post[8]) + "-" + post[7];

    }


    function dibuixaGrafica(ctx, fila, nom){
        var chartdata = {
            labels: fila,
            datasets: [{
                label: nom,
                backgroundColor: 'rgba(200, 200, 200, 0.75)',
                borderColor: 'rgba(200, 200, 200, 0.75)',
                hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                hoverBorderColor: 'rgba(200, 200, 200, 1)',
                data: fila
            }]
        };

        

        var barGraph = new Chart(ctx, {
            type: 'line',
            data: chartdata
        });
    }




$("#HoraIni").change(function () {
    $("select option:selected").each(function () {
        post.push($(this).text());
        console.log($(this).text());
    });
    console.log(post);

    getDates();
});

$("#formulari").submit(function (event) {
    console.log("Submit");

    event.preventDefault();
    $.ajax({
        url: "http://localhost/calendariPHP/somewhere.php",
        method: "GET",
        success: function (data) {
            console.log("Funciona");
            console.log(data);

            var obj = $.parseJSON(data);
            var created_atX = [];
            var ModuleCurrentX = [];
            var Battery = [];
            var Lig = [];

            //x="2018-12-17 19:22:18";
            for (var i in obj) {
                // if(obj[i].created_at>=data1 && obj[i].created_at<=data2){
                created_atX.push(obj[i].created_at);
                ModuleCurrentX.push(obj[i].ModuleCurrent);
                Battery.push(obj[i].BatterySoC);
                Lig.push(obj[i].LightingPower);
                //}
                //else console.log("rip");

            }

            /* var chartdata = {
                labels: created_atX,
                datasets: [{
                    label: 'ModuleCurrent',
                    backgroundColor: 'rgba(200, 200, 200, 0.75)',
                    borderColor: 'rgba(200, 200, 200, 0.75)',
                    hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                    hoverBorderColor: 'rgba(200, 200, 200, 1)',
                    data: ModuleCurrentX
                }]
            }; */

            var ctx = $("#myCanvas");
            dibuixaGrafica(ctx,ModuleCurrentX, "ModuleCurrentX" );

             ctx = $("#myCanvas1");

             dibuixaGrafica(ctx, Battery, "Battery");
            ctx = $("#myCanvas2");

            dibuixaGrafica(ctx, Lig, "Lig");

            /* var barGraph = new Chart(ctx, {
                type: 'line',
                data: chartdata
            }); */
        },

        error: function () {
            console.log("No funciona");
        },
    });
});
});