document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts-container");
    const menuLinks = document.querySelectorAll(".blog-menu a");

    // Función para cargar posts desde localStorage o el archivo JSON
    async function loadPosts() {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        if (posts.length === 0) {
            try {
                const response = await fetch("posts.json"); // Asegúrate de que la ruta sea correcta
                if (!response.ok) throw new Error("No se pudo cargar el archivo JSON.");
                posts = await response.json();
                localStorage.setItem("posts", JSON.stringify(posts)); // Guardar en localStorage
            } catch (error) {
                console.error("Error al cargar los posts:", error);
                postsContainer.innerHTML = "<p>No se pudieron cargar los posts.</p>";
                return;
            }
        }

        displayPosts(posts, "all"); // Mostrar todos los posts al inicio
    }

    // Función para mostrar los posts según la categoría seleccionada
    function displayPosts(posts, category) {
        postsContainer.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos posts
        const filteredPosts = category === "all" ? posts : posts.filter(post => post.category === category);

        if (filteredPosts.length === 0) {
            postsContainer.innerHTML = `<p>No hay posts en esta categoría.</p>`;
            return;
        }

        filteredPosts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            // Crear HTML para el índice con imagen pequeña
            postElement.innerHTML = `
                <div class="post-preview">
                    <img src="${post.image}" alt="${post.title}" class="post-thumbnail">
                    <div class="post-info">
                        <h2>${post.title}</h2>
                        <p><strong>${post.author}</strong> - ${post.date}</p>
                        <p>${post.content.substring(0, 100)}...</p>
                        <button class="view-post">Leer más</button>
                    </div>
                </div>
            `;

            // Evento para ampliar el post al hacer clic en "Leer más"
            postElement.querySelector(".view-post").addEventListener("click", () => {
                postsContainer.innerHTML = `
                    <div class="full-post">
                        <img src="${post.image}" alt="${post.title}" class="full-image">
                        <h2>${post.title}</h2>
                        <p><strong>${post.author}</strong> - ${post.date}</p>
                        <p>${post.content}</p>
                        <button class="back-to-all">⬆ Volver a All Posts</button>
                    </div>
                `;

                // Botón para volver al índice
                document.querySelector(".back-to-all").addEventListener("click", () => {
                    displayPosts(posts, "all");
                });
            });

            postsContainer.appendChild(postElement);
        });
    }

    // Manejo de clics en el menú de categorías
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const category = this.getAttribute("data-category");
            const posts = JSON.parse(localStorage.getItem("posts"));
            displayPosts(posts, category);
        });
    });

    // Cargar los posts al iniciar la página
    loadPosts();
});
