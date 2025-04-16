const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', async () => {
    const blogsGrid = document.querySelector('.blogs-grid');
    
    try {
        // Update path to be relative
        const response = await fetch('./blogs/api/blog-posts.json');
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        
        const data = await response.json();
        
        for (const post of data.posts) {
            const card = document.createElement('a');
            card.href = `blogpost.html?post=${post.slug}`;
            card.className = 'blog-card';
            
            card.innerHTML = `
                <h2 class="blog-title">${post.title}</h2>
                <div class="blog-meta">
                    <span class="blog-date">${new Date(post.date).toLocaleDateString()}</span>
                    <span class="blog-tags">${post.tags.join(', ')}</span>
                </div>
            `;
            
            blogsGrid.appendChild(card);
            observer.observe(card);
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
        blogsGrid.innerHTML = '<p style="color: white">Error loading blog posts. Please try again later.</p>';
    }
});
