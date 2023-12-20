$(() => {

    if (!localStorage.getItem(`token`)) {
      location.href = "index.html"; 
    }

    $("#logout").click(() => {
        localStorage.clear();
        location.reload();
    });

    $.ajax({
        type: "GET",
        url: "https://localhost:7275/user",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(`token`)}`
        },
        success: createTable,
        contentType: "application/json",
        dataType: "json",
      });

      
     
});

function createTable(data) {

    console.log(data);

    data.forEach(linha => {
        const tr = `
            <tr>
                <th scope="row">${linha.id}</th>
                <td>${linha.name}</td>
                <td>${linha.email}</td>
                <td>${linha.role}</td>
                <td><a class="btn btn-primary" href="user-form.html?id=${linha.id}">Editar</a></td>
                <td><a class="btn btn-danger delete" onclick="delet(${linha.id})">Deletar</a></td>
            </tr>
        `;

        $(`tbody`).append($(tr));
    });
    
}

function delet(id) {
    const result = confirm("Deseja deletar");
    if (result) {
        $.ajax({
            type: "DELETE",
            url: `https://localhost:7275/user?id=${id}`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(`token`)}`
            },
            success: () => {
                location.reload();
            },
            contentType: "application/json",
            dataType: "json",
          });
    }
}