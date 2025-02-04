document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("post-form");
    const postsContainer = document.getElementById("admin-posts-container");

    // Cargar posts almacenados al inicio
    loadAdminPosts();

    // Evento para agregar post
    postForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const date = document.getElementById("date").value;
        const content = document.getElementById("content").value;
        const category = document.getElementById("category").value;
        const imageInput = document.getElementById("image").files[0];

        if (!imageInput) {
            alert("Debes subir una imagen.");
            return;
        }

        // Convertir la imagen a base64 para almacenarla en localStorage
        const reader = new FileReader();
        reader.readAsDataURL(imageInput);
        reader.onload = function () {
            const imageUrl = reader.result; // Imagen en base64

            const newPost = {
                id: Date.now(), // ID único
                title,
                author,
                date,
                content,
                category,
                image: imageUrl,
            };

            savePost(newPost);
            postForm.reset(); // Limpiar formulario
            loadAdminPosts(); // Volver a cargar posts
        };
    });

    // Guardar post en localStorage
    function savePost(newPost) {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    // Cargar posts en el panel de administración
    function loadAdminPosts() {
        postsContainer.innerHTML = ""; // Limpiar antes de cargar
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        if (posts.length === 0) {
            postsContainer.innerHTML = "<p>No hay posts aún.</p>";
            return;
        }

        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post-item");
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p><strong>${post.author}</strong> - ${post.date}</p>
                <p>${post.content}</p>
                <img src="${post.image}" alt="Imagen del post" width="100">
                <button class="delete-post" data-id="${post.id}">Eliminar</button>
            `;

            postsContainer.appendChild(postElement);
        });

        // Agregar evento a los botones de eliminar
        document.querySelectorAll(".delete-post").forEach((button) => {
            button.addEventListener("click", function () {
                const postId = parseInt(this.getAttribute("data-id"));
                deletePost(postId);
            });
        });
    }

    // Eliminar post por ID
    function deletePost(postId) {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts = posts.filter((post) => post.id !== postId);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadAdminPosts(); // Recargar lista después de eliminar
    }
});
