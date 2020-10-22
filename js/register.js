$("#btn-register").click(function(event){
    event.preventDefault()
    //validation

    $.ajax({
        url:'backend/adduser.php',
        method:"POST",
        data:{
            name:$("#register-name").val(),
            email:$("#register-email").val(),
            password:$("#register-password").val(),
            submit:"register"
        },
        statusCode:{
            '404': function(){
                console.error("Page not found");
            }
        },
        success:function(data){
            if(data == "1")
            {
                //store data in local storage

                console.log("user added successfully")
            }
            else{
                console.log("error ocurred");
            }
        }
    })
})

$("#btn-level-up").click(function(){
    $.ajax({
        url:"backend/updatelevel.php",
        method:"POST",
        data:{
            email:"khaled@email.com",
            submit:"levelUp"
        },
        success:function(data){
            console.log(data);
        }
    })
})