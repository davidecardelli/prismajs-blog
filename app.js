const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Funzione per creare un nuovo Post
function createPost(postDataArray) {
    const [title, slug, content, image, published] = postDataArray;

    return prisma.post.create({
        data: {
            title,
            slug,
            content,
            image,
            published,
        },
    })
        .then((newPost) => {
            console.log('Nuovo Post creato:', newPost);
            return newPost;
        })
        .catch((error) => {
            console.error('Errore durante la creazione del Post:', error);
            throw error;
        });
}

// Funzione per leggere un Post usando lo slug
function getPostBySlug(slug) {
    return prisma.post
        .findUnique({
            where: {
                slug,
            },
        })
        .then((post) => {
            if (post) {
                console.log('Post trovato:', post);
                return post;
            } else {
                console.log('Nessun Post trovato con lo slug:', slug);
                return null;
            }
        })
        .catch((error) => {
            console.error('Errore durante la lettura del Post:', error);
            throw error;
        });
}

// Funzione per ottenere l'elenco di tutti i Post
function getAllPosts() {
    return prisma.post
        .findMany()
        .then((posts) => {
            console.log('Tutti i Post:', posts);
            return posts;
        })
        .catch((error) => {
            console.error('Errore durante la lettura di tutti i Post:', error);
            throw error;
        });
}

// Funzione per modificare un Post
function updatePost(data) {
    const { id, title, slug, content, image, published } = data;

    return prisma.post
        .update({
            where: {
                id,
            },
            data: {
                title,
                slug,
                content,
                image,
                published,
            },
        })
        .then((updatedPost) => {
            if (updatedPost) {
                console.log('Post aggiornato:', updatedPost);
                return updatedPost;
            } else {
                console.log('Nessun Post trovato con l\'ID:', id);
                return null;
            }
        })
        .catch((error) => {
            console.error('Errore durante la modifica del Post:', error);
            throw error;
        });
}

// Funzione per eliminare un Post
function deletePost(id) {
    return prisma.post
        .delete({
            where: {
                id,
            },
        })
        .then((deletedPost) => {
            console.log('Post eliminato:', deletedPost);

        })
        .catch((error) => {
            console.error('Errore durante l\'eliminazione del Post:', error);
        });
}

// ! VARI TEST DELLE FUNZIONI
// createPost(testPost)
// getPostBySlug("slug-del-post-2")
// getAllPosts()
// deletePost(4)
