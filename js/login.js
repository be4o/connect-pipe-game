//set local variables

$("#btn-login").click(function(event){
    event.preventDefault()
    //validation

    $.ajax({
        url:'backend/login.php',
        method:"POST",
        data:{
            email:$("#login-email").val(),
            password:$("#login-password").val(),
            submit:"login"
        },
        statusCode:{
            '404': function(){
                console.error("Page not found");
            }
        },
        success:function(data){
            // console.log(data);
            if(data != "0")
            {
                loggedin = JSON.parse(data);
                level = JSON.parse(data).level;
                startLevel(level);
                $("#login-form").modal("hide");
                // hide login and register button and display user nav
            }
            else{
                console.log("not valid creadentials");
            }
        }
    })
})