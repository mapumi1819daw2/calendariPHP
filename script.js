 var post = [];
 var horaIncial = 0;
 var horaFinal = 0;
 var diaInicial = 0;
 var diaFinal = 0;



$(function () {



    function getMonth(m) {
        var n = 0;
        switch (m) {
            case "Junuary":
                n = 1;
                break;
            case "February":
                n = 2;
                break;
    
            case "March":
                n = 3;
                break;
    
            case "April":
                n = 4;
                break;
    
            case "May":
                n = 5;
                break;
    
            case "June":
                n = 6;
                break;
    
            case "July":
                n = 7;
                break;
    
            case "August":
                n = 8;
                break;
    
            case "September":
                n = 9;
                break;
    
            case "Octover":
                n = 10;
                break;
    
            case "November":
                n = 11;
                break;
    
            case "December":
                n = 12;
    
                break;
        }
    
        return n;
    
    }
    
    
    function obtenirDates() {
        
        horaIncial = post[0] + ":" + post[1];
        diaInicial = post[4] + "-" + getMonth(post[3]) + "-" + post[2];
        diaInicial += " "+ horaIncial;
        horaFinal = post[5] + ":" + post[6];
        diaFinal = post[9] + "-" + getMonth(post[8]) + "-" + post[7];
        diaFinal += " "+ horaFinal;
    
    }





    function dibuixaGrafica(ctx, creat, fila, nom) {
        var chartdata = {
            labels: creat,
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




    $("select").change(function () {
        post = [];
        $("select option:selected").each(function () {
            post.push($(this).text());
            console.log($(this).text());
        });
        console.log(post);


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

                obtenirDates();

               
                console.log(diaInicial);
               
                console.log(diaFinal);

                var obj = $.parseJSON(data);
                var created_atX = [];
                var ModuleCurrentX = [];
                var Battery = [];
                var Lig = [];

                //x="2018-12-17 19:22:18";
                for (var i in obj) {
                     if(obj[i].created_at>=diaInicial && obj[i].created_at<=diaFinal){
                    created_atX.push(obj[i].created_at);
                    ModuleCurrentX.push(obj[i].ModuleCurrent);
                    Battery.push(obj[i].BatterySoC);
                    Lig.push(obj[i].LightingPower);
                    }
                    else console.log("rip");

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
                dibuixaGrafica(ctx, created_atX,  ModuleCurrentX, "ModuleCurrentX");

                ctx = $("#myCanvas1");

                dibuixaGrafica(ctx, created_atX, Battery, "Battery");
                ctx = $("#myCanvas2");

                dibuixaGrafica(ctx, created_atX, Lig, "Lig");

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