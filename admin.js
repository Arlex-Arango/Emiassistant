document.addEventListener("DOMContentLoaded", () => {
    const addPostForm = document.getElementById("add-post-form");

    function loadPosts() {
        return JSON.parse(localStorage.getItem("posts")) || [];
    }

    function savePosts(posts) {
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    addPostForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const date = document.getElementById("date").value;
        const category = document.getElementById("category").value;
        const content = document.getElementById("content").value;
        const imageInput = document.getElementById("image");
        
        if (imageInput.files.length === 0) {
            alert("Por favor selecciona una imagen.");
            return;
        }

        // Convertir imagen a base64
        const imageFile = imageInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function () {
            const imageBase64 = reader.result;

            const newPost = { title, author, date, category, content, image: imageBase64 };
            const posts = loadPosts();
            posts.push(newPost);
            savePosts(posts);

            alert("Post agregado correctamente.");
            addPostForm.reset();
        };
    });
});
