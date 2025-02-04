document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts-container");
    const menuLinks = document.querySelectorAll(".blog-menu a");

    function loadPosts() {
        return JSON.parse(localStorage.getItem("posts")) || [];
    }

    function displayPosts(category = "all") {
        const posts = loadPosts();
        const filteredPosts = category === "all" 
            ? posts 
            : posts.filter(post => post.category === category);

        postsContainer.innerHTML = "";
        
        if (filteredPosts.length === 0) {
            postsContainer.innerHTML = "<p>No posts found in this category.</p>";
            return;
        }

        filteredPosts.forEach((post, index) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p><strong>${post.author}</strong> - ${post.date}</p>
                <p>${post.content}</p>
                <img src="${post.image}" class="post-image-small" onclick="expandImage('${post.image}')">
                <button class="delete-post" data-index="${index}">🗑 Delete</button>
            `;
            postsContainer.appendChild(postElement);
        });

        // Asignar eventos de eliminación
        document.querySelectorAll(".delete-post").forEach(button => {
            button.addEventListener("click", function () {
                deletePost(this.getAttribute("data-index"));
            });
        });
    }

    function deletePost(index) {
        let posts = loadPosts();
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        displayPosts("all");
    }

    // Filtrar posts por categoría
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const category = this.getAttribute("data-category");
            displayPosts(category);
        });
    });

    // Cargar posts al iniciar
    displayPosts();
});

// Función para agrandar la imagen
function expandImage(src) {
    const newWindow = window.open("");
    newWindow.document.write(`<img src="${src}" style="width:100%">`);
}
