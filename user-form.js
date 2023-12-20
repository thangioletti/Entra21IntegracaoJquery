$(() => {
  if (!localStorage.getItem(`token`)) {
    location.href = "index.html";
  }
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id')
  
  if (id) {
    //estou editando
    request(`GET`, `user/${id}`, {}, (result) => {
        $("#name").val(result.name);
        $("#email").val(result.email);
        $("#password").val(result.password);
        $("#role").val(result.role);
    })
  } 

  $("#btn-submit").click((e) => {
    e.preventDefault();

    const data = {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      role: $("#role").val(),
    };

    let method = `POST`;
    if(id) {
        //estou editando
        method = `PUT`;
        data.id = id;
    }

    request(method, `user`, data, (result) => {
        console.log(result);      
        location.href = "home.html";
    })     
  });
});

function request(method, url, data, callback) {
    $.ajax({
        type: method,
        url: `https://localhost:7275/${url}`,
        data: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
        success: callback,
        contentType: "application/json",
        dataType: "json",
      });
}