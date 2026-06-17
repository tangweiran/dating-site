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

    const petals = ['🌸', '🌸', '🌸', '🌸', '🌸', '🌺', '💮', '🏵️'];
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'floating-heart';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
        petal.style.fontSize = (Math.random() * 12 + 10) + 'px';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 10000);
    }
    for (let i = 0; i < 8; i++) setTimeout(createPetal, i * 200);
    setInterval(createPetal, 600);
});
