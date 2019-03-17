$(function(){

    $("#submit").on("click", function(){

        $.ajax({
            url: "http://localhost/calendari/somewhere.php",
            method: "GET",
            success: function (){
                console.log("Funciona");
            },

            error : function (){
                console.log("No funciona");
            },
        });
    });
});