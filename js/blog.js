document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");
    const fullPostSection = document.getElementById("full-post");
    const backToPostsButton = document.getElementById("back-to-posts");
    fetch('https://apimails.emiassistant.com/getCtBlogs')
        .then(response => response.json())
        .then(categories => {
            const menu = document.querySelector('.blog-menu ul');
            menu.innerHTML = `<li><a href="#" data-category="all" class="selected">All Posts</a></li>`; 

            categories.forEach(category => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="#" data-category="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</a>`;
                menu.appendChild(listItem);
            });

            document.querySelectorAll('.blog-menu a').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const category = e.target.dataset.category;
                    setActiveCategory(category);
                    fetchPosts(category); 
                });
            });
        })
        .catch(error => console.error('Error fetching categories:', error));

    function fetchPosts(category = 'all') {
        fetch(`https://apimails.emiassistant.com/getBlogsByCategory?category=${category}`)
            .then(response => response.json())
            .then(posts => {
                postsContainer.innerHTML = "";
                posts.forEach(post => {
                    const postElement = document.createElement("div");
                    postElement.classList.add("post");
                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p class="date">${new Date(post.date).toLocaleDateString()}</p>
                        <p class="category">${post.category}</p>
                        ${post.image ? `<img src="https://apimails.emiassistant.com/storage/${post.image}" alt="${post.title}" class="post-image">` : ""}
                        <p>${post.content.substring(0, 100)}...</p>
                        <button class="read-more" data-id="${post.id}">Leer más</button>
                    `;
                    postsContainer.appendChild(postElement);
                });
                attachEventListeners();
            })
            .catch(error => console.error("Error al obtener posts:", error));
    }

    function attachEventListeners() {
        document.querySelectorAll(".read-more").forEach(button => {
            button.addEventListener("click", (event) => {
                const postId = event.target.dataset.id;
                fetch(`https://apimails.emiassistant.com/getBlog/${postId}`)
                    .then(response => response.json())
                    .then(post => {
                        document.getElementById("full-post-title").innerText = post.title;
                        document.getElementById("full-post-author").innerText = `Categoría: ${post.category}`;
                        document.getElementById("full-post-date").innerText = `Fecha: ${new Date(post.date).toLocaleDateString()}`;
                        document.getElementById("full-post-content").innerText = post.content;
                        document.getElementById("full-post-image").src = `https://apimails.emiassistant.com/storage/${post.image}`;

                        postsContainer.style.display = "none";
                        fullPostSection.style.display = "block";
                    })
                    .catch(error => console.error("Error al obtener el post:", error));
            });
        });
    }

    function setActiveCategory(category) {
        document.querySelectorAll('.blog-menu a').forEach(link => {
            link.classList.remove('selected');
        });
        document.querySelector(`.blog-menu a[data-category="${category}"]`).classList.add('selected');
    }

    backToPostsButton.addEventListener("click", () => {
        fullPostSection.style.display = "none";
        postsContainer.style.display = "block";
    });

    fetchPosts();
});
