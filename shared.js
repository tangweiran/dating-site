document.addEventListener('DOMContentLoaded', function() {
    const frame = document.createElement('iframe');
    frame.src = 'music-player.html';
    frame.style.display = 'none';
    frame.allow = 'autoplay';
    document.body.appendChild(frame);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    if (document.getElementById('shareBtn')) {
        document.getElementById('shareBtn').onclick = function() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.textContent = '已复制!';
                setTimeout(() => { this.textContent = '分享'; }, 2000);
            });
        };
    }

    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => { loading.style.display = 'none'; }, 300);
        }, 300);
    }

    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '🌸', '✨'];
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
        heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }
    setInterval(createHeart, 1500);
    for (let i = 0; i < 5; i++) setTimeout(createHeart, i * 300);
});
