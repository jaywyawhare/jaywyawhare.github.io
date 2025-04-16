document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const postSlug = params.get('post');
    
    if (!postSlug) {
        window.location.href = '/blogs.html';
        return;
    }
    
    try {
        const response = await fetch('/blogs/api/blog-posts.json');
        const data = await response.json();
        const post = data.posts.find(p => p.slug === postSlug);
        
        if (!post) throw new Error('Post not found');
        
        const contentResponse = await fetch(post.path);
        const markdown = await contentResponse.text();
        
        document.title = `${post.title} - Arinjay Wyawhare`;
        document.getElementById('blog-content').innerHTML = marked.parse(markdown);
    } catch (error) {
        console.error('Error loading blog post:', error);
        document.getElementById('blog-content').innerHTML = '<p>Error loading blog post</p>';
    }
});
