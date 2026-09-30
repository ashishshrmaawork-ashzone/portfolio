(() => {
    const page = location.pathname.split('/').pop();
    const home = !page || page === 'index.html';
    const blog = page === 'blog.html' || page === 'blog-detail.html';
    const href = id => id === 'portfolio' ? '/projects' : id === 'blog' ? '/blog' : (home ? '/' : '/') + '#' + id;
    const links = [['home','Home'],['features','Features'],['portfolio','Portfolio'],['resume','Resume'],['blog','Blog'],['contacts','Contact']];
    const quote = home ? 'href="#quoteModal" data-bs-toggle="modal" data-bs-target="#quoteModal"' : 'href="/?quote=1#home"';
    const navigation = links.map(([id,label]) => `<a href="${href(id)}" ${(blog && id === 'blog') || (['project-details.html', 'portfolio.html'].includes(page) && id === 'portfolio') ? 'aria-current="page"' : ''}>${label}</a>`).join('');
    const header = document.querySelector('[data-site-header]');
    if (header) header.outerHTML = `<header class="site-header"><div class="site-header-inner"><a class="site-brand" href="${href('home')}"><img src="assets/images/logo.svg" alt="Ashish Sharma - Build, Optimize, Scale" width="225" height="48"></a><nav class="site-desktop-nav" aria-label="Main navigation">${navigation}</nav><a class="site-quote" ${quote}>Get a Quote</a><button class="site-menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="site-mobile-menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button></div></header><div class="site-menu-overlay" id="site-mobile-menu" hidden><div class="site-menu-panel" role="dialog" aria-modal="true" aria-label="Navigation"><div class="site-menu-heading"><img src="assets/images/logo.svg" width="210" height="45" alt="Ashish Sharma"><button class="site-menu-close" aria-label="Close navigation">&#215;</button></div><nav aria-label="Mobile navigation">${navigation}<a class="site-quote" ${quote}>Get a Quote</a></nav></div></div>`;
    let footerMarkup = "\u003cfooter class=\"rn-footer-area rn-section-gap section-separator\"\u003e\n        \u003cdiv class=\"container\"\u003e\n            \u003cdiv class=\"footer-grid\"\u003e\n                \u003cdiv class=\"footer-intro\"\u003e\n                    \u003ca class=\"footer-brand\" href=\"#home\"\u003e\n                        \u003cimg class=\"footer-wordmark\" src=\"assets/images/logo-footer.svg\" alt=\"Ashish Sharma - Build, Optimize, Scale\" width=\"240\" height=\"52\"\u003e\n                    \u003c/a\u003e\n                    \u003cp\u003eBuilding fast, secure and scalable digital experiences from idea to deployment.\u003c/p\u003e\n                    \u003ca class=\"footer-cta\" href=\"#contacts\"\u003eLet’s work together \u003cspan aria-hidden=\"true\"\u003e\u0026#8599;\u003c/span\u003e\u003c/a\u003e\n                \u003c/div\u003e\n                \u003cdiv class=\"footer-links\"\u003e\n                    \u003ch4\u003eExplore\u003c/h4\u003e\n                    \u003ca href=\"#home\"\u003eHome\u003c/a\u003e\n                    \u003ca href=\"#features\"\u003eWhat I Do\u003c/a\u003e\n                    \u003ca href=\"#portfolio\"\u003ePortfolio\u003c/a\u003e\n                    \u003ca href=\"#resume\"\u003eExperience\u003c/a\u003e\n                \u003c/div\u003e\n                \u003cdiv class=\"footer-links\"\u003e\n                    \u003ch4\u003eServices\u003c/h4\u003e\n                    \u003ca href=\"#features\"\u003eWeb Development\u003c/a\u003e\n                    \u003ca href=\"#features\"\u003ePerformance Optimization\u003c/a\u003e\n                    \u003ca href=\"#features\"\u003eServer Handling\u003c/a\u003e\n                    \u003ca href=\"#features\"\u003eWebsite Maintenance\u003c/a\u003e\n                \u003c/div\u003e\n                \u003cdiv class=\"footer-links footer-contact\"\u003e\n                    \u003ch4\u003eConnect\u003c/h4\u003e\n                    \u003ca href=\"#contacts\"\u003eStart a project\u003c/a\u003e\n                    \u003ca href=\"mailto:ashishsharmaaa@outlook.com\"\u003eashishsharmaaa@outlook.com\u003c/a\u003e\n                    \u003cdiv class=\"footer-socials\"\u003e\n                        \u003ca href=\"#contacts\" aria-label=\"Contact Ashish\"\u003e\u003cspan aria-hidden=\"true\"\u003e@\u003c/span\u003e\u003c/a\u003e\n                        \u003ca href=\"https://www.linkedin.com/\" target=\"_blank\" rel=\"noreferrer\" aria-label=\"LinkedIn\"\u003e\u003cspan aria-hidden=\"true\"\u003ein\u003c/span\u003e\u003c/a\u003e\n                        \u003ca href=\"#home\" aria-label=\"Back to home\"\u003e\u003cspan aria-hidden=\"true\"\u003e\u0026#8593;\u003c/span\u003e\u003c/a\u003e\n                    \u003c/div\u003e\n                \u003c/div\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"footer-bottom\"\u003e\n                \u003cspan\u003e© 2026 Ashish Sharma. All rights reserved.\u003c/span\u003e\n                \u003cspan\u003eDesigned \u0026amp; built with \u003cstrong\u003ecare\u003c/strong\u003e in India.\u003c/span\u003e\n            \u003c/div\u003e\n        \u003c/div\u003e\n    \u003c/footer\u003e";
    footerMarkup = footerMarkup.replace(/href="#(home|features|portfolio|resume|contacts)"/g, (_, id) => `href="${href(id)}"`);
    const footer = document.querySelector('[data-site-footer]');
    if (footer) footer.outerHTML = footerMarkup;
    const explore = document.querySelector('.footer-links');
    if (explore) { const link = document.createElement('a'); link.href = '/blog'; link.textContent = 'Blog'; explore.append(link); }
    const menu = document.getElementById('site-mobile-menu');
    const toggle = document.querySelector('.site-menu-toggle');
    const close = document.querySelector('.site-menu-close');
    function setOpen(open, restore = true) {
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('site-menu-open', open);
        if(open) close.focus(); else if(restore) toggle.focus();
    }
    toggle.addEventListener('click', () => setOpen(true));
    close.addEventListener('click', () => setOpen(false));
    menu.addEventListener('click', event => { if(event.target === menu || event.target.closest('a')) setOpen(false); });
    menu.addEventListener('keydown', event => {
        if(event.key === 'Escape') setOpen(false);
        if(event.key === 'Tab') {
            const items=[...menu.querySelectorAll('button,a[href]')],first=items[0],last=items[items.length-1];
            if(event.shiftKey && document.activeElement===first) {event.preventDefault();last.focus();}
            if(!event.shiftKey && document.activeElement===last) {event.preventDefault();first.focus();}
        }
    });
    window.addEventListener('resize', () => { if(innerWidth>=1200 && !menu.hidden) setOpen(false,false); });
    if(home) {
        const sections = links.map(([id])=>document.getElementById(id)).filter(Boolean);
        // Observe the remaining sections using a single observer.
        const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
            entries.forEach(entry=>{if(entry.isIntersecting) document.querySelectorAll('.site-desktop-nav a').forEach(link=>{
                if(link.hash==='#'+entry.target.id) link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
            });});
        },{rootMargin:'-15% 0px -65% 0px'}) : null;
        sections.forEach(section=>observer?.observe(section));
        const showQuote = () => {
            if(new URLSearchParams(location.search).get('quote')==='1' && window.bootstrap) bootstrap.Modal.getOrCreateInstance(document.getElementById('quoteModal')).show();
        };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showQuote, { once: true });
        else window.addEventListener('portfolio-homepage-ready', showQuote, { once: true });
    }
})();