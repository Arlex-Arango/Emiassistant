document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts-container");
    const menuLinks = document.querySelectorAll(".blog-menu a");

    function loadPosts() {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        displayPosts(posts, "all");
    }

    function displayPosts(posts, category) {
        postsContainer.innerHTML = "";
        const filteredPosts = category === "all" ? posts : posts.filter(post => post.category === category);

        if (filteredPosts.length === 0) {
            postsContainer.innerHTML = "<p>No hay posts en esta categoría.</p>";
            return;
        }

        filteredPosts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <img src="${post.image}" alt="Imagen del post" class="small-image">
                <p><strong>${post.category}</strong> - ${post.date}</p>
                <p>${post.content.substring(0, 100)}...</p>
                <button class="view-post" data-id="${post.id}">Leer más</button>
            `;

            postElement.querySelector(".view-post").addEventListener("click", function () {
                openPost(post.id);
            });

            postsContainer.appendChild(postElement);
        });
    }

    function openPost(postId) {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        const post = posts.find(p => p.id === postId);

        if (!post) return;

        postsContainer.innerHTML = `
            <div class="full-post">
                <h2>${post.title}</h2>
                <img src="${post.image}" alt="Imagen del post" class="large-image">
                <p><strong>${post.category}</strong> - ${post.date}</p>
                <p>${post.content}</p>
                <button class="back-to-all">⬆ Volver a All Posts</button>
            </div>
        `;

        document.querySelector(".back-to-all").addEventListener("click", function () {
            loadPosts();
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const category = this.getAttribute("data-category");
            loadPosts();
            displayPosts(JSON.parse(localStorage.getItem("posts")), category);
        });
    });

    loadPosts();
});
