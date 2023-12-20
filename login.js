$(() => {

  if (!!localStorage.getItem(`token`)) {
    location.href = "home.html"; 
  }
  $("#btn-login").click((e) => {
    e.preventDefault();

    const data = {
        email: $("#email").val(),
        password: $("#password").val()
    };
   
    $.ajax({
        type: "POST",
        url: "https://localhost:7275/user/login",
        data: JSON.stringify(data),
        success: (result) => {
           localStorage.clear();
           localStorage.setItem(`token`, result.token); 
           localStorage.setItem(`userName`, result.user.name); 
           localStorage.setItem(`userRole`, result.user.role);
           location.href = "home.html"; 
        },
        contentType: "application/json",
        dataType: "json",
      });
  });
});
