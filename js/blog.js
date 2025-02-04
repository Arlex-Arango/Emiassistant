document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts-container");
    const categoryLinks = document.querySelectorAll(".blog-menu a");
    const fullPostContainer = document.getElementById("full-post");
    const fullPostImage = document.getElementById("full-post-image");
    const fullPostTitle = document.getElementById("full-post-title");
    const fullPostContent = document.getElementById("full-post-content");
    const backButton = document.getElementById("back-to-posts");

    // Cargar y mostrar los posts
    function loadPosts(category = "all") {
        postsContainer.innerHTML = "";
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        if (category !== "all") {
            posts = posts.filter((post) => post.category === category);
        }

        if (posts.length === 0) {
            postsContainer.innerHTML = "<p>No hay posts en esta categoría.</p>";
            return;
        }

        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p><strong>${post.author}</strong> - ${post.date}</p>
                <img src="${post.image}" alt="Imagen del post">
                <p>${post.content.substring(0, 100)}...</p>
            `;

            // Mostrar el post completo al hacer clic
            postElement.addEventListener("click", function () {
                fullPostTitle.textContent = post.title;
                fullPostContent.textContent = post.content;
                fullPostImage.src = post.image;
                fullPostContainer.style.display = "block";
                postsContainer.style.display = "none";
            });

            postsContainer.appendChild(postElement);
        });
    }

    // Filtrar por categoría
    categoryLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            categoryLinks.forEach((el) => el.classList.remove("selected"));
            this.classList.add("selected");

            const category = this.dataset.category;
            loadPosts(category);
        });
    });

    // Botón para volver al listado de posts
    backButton.addEventListener("click", function () {
        fullPostContainer.style.display = "none";
        postsContainer.style.display = "grid";
    });

    // Cargar todos los posts al inicio
    loadPosts();
});
