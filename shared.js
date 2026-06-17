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

    if (typeof busuanzi !== 'undefined') {
        const script = document.createElement('script');
        script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
        document.head.appendChild(script);
    }

    const loading = document.getElementById('loading');
    if (loading) {
        window.addEventListener('load', () => {
            loading.style.opacity = '0';
            setTimeout(() => { loading.style.display = 'none'; }, 500);
        });
    }
});
