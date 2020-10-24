//set local variables
function storeSessionStorage(name, val) {
    //will die after you close the browser
    sessionStorage.setItem(name, val);
}
function storeLocalsStorage(name, val) {
    //permenant
    localStorage.setItem(name, val);
}
function removeSession(name) {
    sessionStorage.removeItem(name);
}
function removeLocal(name) {
    localStorage.removeItem(name);
}

$("#btn-login").click(function (event) {
    event.preventDefault()
    //validation
    if (valid) {
        $.ajax({
            url: 'backend/login.php',
            method: "POST",
            data: {
                email: $("#login-email").val(),
                password: $("#login-password").val(),
                submit: "login"
            },
            statusCode: {
                '404': function () {
                    console.error("Page not found");
                }
            },
            success: function (data) {
                // console.log(data);
                if (data != "0") {
                    //success login
                    loggedin = JSON.parse(data);
                    level = JSON.parse(data).level;
                    startLevel(level);
                    $("#login-form").modal("hide");
                    if ($("#remember-me").checked) {
                        storeLocalStorage("email", loggedin.email);
                        storeLocalStorage("password", loggedin.password);
                    } else {
                        storeSessionStorage("password", loggedin.password);
                        storeSessionStorage("email", loggedin.email);
                    }
                    // hide login and register button and display user nav
                    var dropdownhtml = `<div class="dropdown">
                    <button class="btn btn-outline-primary text-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-user"></i> ${loggedin.name}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <button class="dropdown-item" id="btn-logout"><i class="fas fa-sign-out-alt"></i> Logout</button>
                    </div>
                    </div>`;
                    $("#right-nav").html(dropdownhtml);
                }
                else {
                    // console.log("not valid creadentials");
                    if (!$("#btn-login").prev().is("span"))
                        $("<span class='error'>Invalid email or password</span>").insertBefore("#btn-login");
                    else {
                        $("#btn-login").prev().remove();
                    }
                }
            }
        })
    }
})


$("#right-nav").on('click', '#btn-logout', function (event) {
    event.preventDefault()
    var buttonsHTML = `<ul class="mb-0">
    <button type="button" class="btn btn-outline-primary text-light" data-toggle="modal" data-target="#login-form">
        <i class="fas fa-user"></i> Login
    </button>
    <button type="button" class="btn btn-outline-primary text-light" data-toggle="modal" data-target="#register-form">
        <i class="fas fa-user-plus"></i> Register
    </button>
    </ul>`;
    $("#right-nav").html(buttonsHTML);
    removeSession('email')
    removeSession('password')
    removeLocal('email')
    removeLocal('password')
    loggedin = false;
    startLevel(0);
});