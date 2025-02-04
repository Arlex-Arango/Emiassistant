document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("post-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const date = document.getElementById("date").value;
        const category = document.getElementById("category").value;
        const content = document.getElementById("content").value;

        const newPost = { title, author, date, category, content };

        // Obtener posts guardados en localStorage o array vacío si no hay
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.push(newPost);

        // Guardar en localStorage
        localStorage.setItem("posts", JSON.stringify(posts));

        alert("Post guardado con éxito!");
        form.reset();
    });
});
