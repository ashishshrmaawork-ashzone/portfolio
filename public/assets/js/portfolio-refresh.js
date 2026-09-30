(() => {
    const shapes = {
        code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
        atom: '<ellipse cx="12" cy="12" rx="11" ry="4"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1"/>',
        database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
        server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6h1m-1 11h1m5-11h4m-4 11h4"/>',
        browser: '<rect x="2" y="3" width="20" height="18" rx="3"/><path d="M2 8h20M6 5.5h.1m3 0h.1m-1 7-3 3 3 3m8-6 3 3-3 3"/>',
        cube: '<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 10L3 7m9 5 9-5m-9 5v10"/>',
        flame: '<path d="M12 2c3 7-4 7-2 12 2-1 4-3 5-6 8 9 4 14-3 14-8 0-12-8 0-20Z"/>',
        terminal: '<rect x="2" y="3" width="20" height="18" rx="3"/><path d="m6 8 4 4-4 4m7 0h5"/>'
    };
    const tech = [ ['PHP','code'], ['Laravel','cube'], ['React','atom'], ['Next.js','terminal'], ['SQL','database'], ['CodeIgniter','flame'], ['Frontend','browser'], ['Backend','server'], ['API','code'], ['JavaScript','browser'] ];
    document.querySelectorAll('#home, #features, #portfolio, #resume, #testimonial, #contacts').forEach((section, sectionIndex) => {
        section.classList.add('developer-scene');
        const backdrop = document.createElement('div');
        backdrop.className = 'developer-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        const count = section.id === 'home' ? 6 : 3;
        for (let index = 0; index < count; index++) {
            const [label, shape] = tech[(sectionIndex * 3 + index) % tech.length];
            const icon = document.createElement('span');
            icon.className = 'developer-symbol';
            icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" focusable="false">${shapes[shape]}</svg><span>${label}</span>`;
            icon.style.setProperty('--i', index);
            backdrop.appendChild(icon);
        }
        section.prepend(backdrop);
    });
    ['contact-email', 'subject'].forEach(id => {
        const field = document.getElementById(id);
        const column = field && field.closest('.col-lg-12');
        if (column) column.className = 'col-md-6';
    });
})();

(() => {
    const form = document.querySelector('#quoteModal .quote-form');
    const input = document.getElementById('quote-captcha');
    const question = document.getElementById('quote-captcha-question');
    const help = document.getElementById('quote-captcha-help');
    if (!form || !input || !question || !help) return;
    let answer;
    function refresh() {
        const first = Math.floor(Math.random() * 9) + 1;
        const second = Math.floor(Math.random() * 9) + 1;
        answer = first + second;
        question.textContent = `${first} + ${second}`;
        input.value = '';
        input.removeAttribute('aria-invalid');
        help.textContent = 'Solve this simple sum to continue.';
        help.classList.remove('captcha-error');
    }
    document.getElementById('quote-captcha-refresh').addEventListener('click', () => { refresh(); input.focus(); });
    form.addEventListener('reset', refresh);
    form.addEventListener('submit', event => {
        if (!/^\d{1,2}$/.test(input.value.trim()) || Number(input.value) !== answer) {
            event.preventDefault();
            event.stopImmediatePropagation();
            refresh();
            input.setAttribute('aria-invalid', 'true');
            help.textContent = 'Incorrect answer. Please solve the new sum.';
            help.classList.add('captcha-error');
            input.focus();
        }
    }, true);
    refresh();
})();

/* Progressive enhancement: content stays visible when motion APIs are unavailable. */
(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const running = new Set();
    const seen = new WeakSet();
    const candidates = document.querySelectorAll('#home .hero-proof, #home .hero-connect, #resume .section-title, #testimonial .section-title, #testimonial .stories-slider, #contacts .section-title, #contacts .mt-contact-sm, .footer-grid > div');
    let observer;
    function reveal(element, delay = 0) {
        if (reduced.matches || seen.has(element) || !element.animate || element.closest('[data-aos]')) return;
        seen.add(element);
        const animation = element.animate([
            { opacity: .2, transform: 'translateY(18px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 550, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
        running.add(animation);
        animation.onfinish = () => running.delete(animation);
        animation.oncancel = () => running.delete(animation);
    }
    function setup() {
        if (reduced.matches || !('IntersectionObserver' in window)) return;
        observer = new IntersectionObserver(entries => {
            let stagger = 0;
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                reveal(entry.target, Math.min(stagger++ * 70, 210));
                observer.unobserve(entry.target);
            });
        }, { threshold: .12 });
        candidates.forEach(element => observer.observe(element));
    }
    reduced.addEventListener('change', () => {
        if (observer) observer.disconnect();
        running.forEach(animation => animation.cancel());
        if (!reduced.matches) setup();
    });
    setup();
    // Reuse the existing AOS card reveals instead of applying a second animation.
    document.querySelectorAll('#features [data-aos], #portfolio [data-aos]').forEach((element, index) => {
        element.setAttribute('data-aos-duration', '550');
        element.setAttribute('data-aos-delay', String((index % 3) * 80));
        element.setAttribute('data-aos-once', 'true');
    });
    if (window.AOS) window.AOS.refreshHard();
    const progress = document.createElement('div');
    progress.className = 'page-scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.append(progress);
    let queued = false;
    function draw() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
        queued = false;
    }
    function schedule() {
        if (!queued) { queued = true; requestAnimationFrame(draw); }
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    draw();
})();

(() => {
    const menu = document.getElementById('mobile-navigation');
    const toggle = document.getElementById('menuBtn');
    if (!menu || !toggle) return;
    const close = menu.querySelector('.close-menu-activation');
    function sync() {
        const open = menu.classList.contains('menu-open');
        toggle.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('mobile-nav-open', open);
        if (open) close.focus();
    }
    toggle.addEventListener('click', () => menu.classList.add('menu-open'));
    new MutationObserver(sync).observe(menu, { attributes:true, attributeFilter:['class'] });
    menu.addEventListener('keydown', event => {
        if (event.key === 'Escape') { menu.classList.remove('menu-open'); toggle.focus(); }
        if (event.key === 'Tab') {
            const items = [...menu.querySelectorAll('a[href], button')].filter(el => el.getClientRects().length);
            const first = items[0], last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });
    close.addEventListener('click', () => { menu.classList.remove('menu-open'); toggle.focus(); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 1200) menu.classList.remove('menu-open'); });
    sync();
})();
