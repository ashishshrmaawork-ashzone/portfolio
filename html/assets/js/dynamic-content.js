(() => {
    const localPreview = location.protocol === 'file:' || location.pathname.includes('/portfolio-html/html/');
    const wordpress = 'https://reactapp.kgkrealty.com/ashportfolio/wp-json/custom/v1';
    const names = { projects: 'portfolio-page' };
    async function request(url) {
        const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error('Content request failed (' + response.status + ')');
        return response.json();
    }
    async function collection(name) {
        if (!localPreview) {
            const result = await request('/api/portfolio/' + name);
            if (!Array.isArray(result)) throw new Error('Invalid content response');
            return result;
        }
        const result = await request(wordpress + '/' + (names[name] || name));
        if (name !== 'projects') {
            if (!Array.isArray(result)) throw new Error('Invalid content response');
            return result;
        }
        if (!result.success || !Array.isArray(result.data)) throw new Error('Invalid projects response');
        const pages = await Promise.all(Array.from({ length: Math.max(0, result.total_pages - 1) }, (_, i) => request(wordpress + '/portfolio-page?page=' + (i + 2))));
        if (pages.some(page => !page.success || !Array.isArray(page.data))) throw new Error('Invalid projects page');
        return result.data.concat(...pages.map(page => page.data));
    }
    const text = value => String(value ?? '');
    function plain(value) {
        const doc = new DOMParser().parseFromString(text(value), 'text/html');
        doc.querySelectorAll('script,style').forEach(node => node.remove());
        return doc.body.textContent || '';
    }
    function url(value) {
        try { const parsed = new URL(value); return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : ''; }
        catch { return ''; }
    }
    function status(host, message) {
        const p = document.createElement('p');
        p.className = 'dynamic-content-status';
        p.setAttribute('role', 'status');
        p.textContent = message;
        host.replaceChildren(p);
    }
    async function populate(name, host, render) {
        status(host, 'Loading?');
        host.setAttribute('aria-busy', 'true');
        try {
            const items = await collection(name);
            host.replaceChildren();
            if (items.length) render(items); else status(host, 'No entries published yet.');
            window.AOS?.refreshHard();
            return items;
        } catch (error) {
            console.error(name, error);
            status(host, 'This section could not load. Please try again.');
            const retry = document.createElement('button');
            retry.type = 'button'; retry.className = 'rn-btn'; retry.textContent = 'Reload page';
            retry.addEventListener('click', () => location.reload());
            host.append(retry);
            return [];
        } finally { host.removeAttribute('aria-busy'); }
    }
    window.portfolioApi = { collection, plain, url };
    function autoScrollPreview(card) {
        const preview = card.querySelector('.thumbnail');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0, previous = 0, position = 0;
        function stop() { cancelAnimationFrame(frame); frame = 0; previous = 0; }
        function tick(time) {
            const max = preview.scrollHeight - preview.clientHeight;
            if (max <= 0 || reducedMotion.matches) { stop(); return; }
            if (previous) position += Math.min(time - previous, 50) * 0.09;
            previous = time;
            preview.scrollTop = Math.min(position, max);
            if (position < max) frame = requestAnimationFrame(tick);
            else stop();
        }
        card.addEventListener('pointerenter', event => {
            if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
            stop(); position = preview.scrollTop;
            frame = requestAnimationFrame(tick);
        });
        card.addEventListener('pointerleave', () => {
            stop(); preview.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
        });
        // Manual scrolling takes over immediately, including on touch screens.
        preview.addEventListener('wheel', stop, { passive: true });
        preview.addEventListener('pointerdown', stop);
        reducedMotion.addEventListener('change', stop);
        document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
    }
    const tasks = [];
    const services = document.querySelector('#features .row.row--25');
    if (services) {
        const templates = [...services.children].map(card => card.cloneNode(true));
        tasks.push(populate('services', services, items => items.forEach((item, i) => {
            const card = templates[i % templates.length].cloneNode(true);
            card.querySelector('.title a').textContent = plain(item.title);
            card.querySelector('.description').textContent = plain(item.content);
            card.querySelectorAll('a').forEach(link => link.href = '#contacts');
            card.classList.add('aos-animate');
            services.append(card);
        })));
    }
    const projects = document.querySelector('#portfolio .row.row--25');
    if (projects) {
        const template = projects.firstElementChild.cloneNode(true);
        tasks.push(populate('projects', projects, items => items.forEach(item => {
            const card = template.cloneNode(true);
            const link = 'project-details.html?project=' + encodeURIComponent(item.slug);
            const box = card.querySelector('.rn-portfolio');
            box.removeAttribute('data-bs-toggle'); box.removeAttribute('data-bs-target');
            card.querySelectorAll('a').forEach(a => a.href = link);
            card.querySelector('.title a').textContent = plain(item.title);
            card.querySelector('.category-list a').textContent = plain(item.category || 'Web development');
            card.querySelector('.meta')?.remove();
            const details = card.querySelector('.project-details-link');
            if (item.tech) {
                const technology = document.createElement('p');
                technology.className = 'project-tech';
                technology.textContent = plain(item.tech);
                technology.title = technology.textContent;
                details.before(technology);
            }
            const excerpt = plain(item.content).trim();
            if (excerpt) {
                const description = document.createElement('p');
                description.className = 'project-excerpt';
                description.textContent = excerpt;
                details.before(description);
            }
            const image = card.querySelector('img');
            const source = url(item.thumbnail_image);
            if (source) { image.src = source; image.alt = plain(item.title); image.loading = 'lazy'; }
            else image.remove();
            card.classList.add('aos-animate');
            projects.append(card);
            autoScrollPreview(box);
        })));
    }
    for (const [id, name] of [['professional', 'workexperience'], ['education', 'education']]) {
        const host = document.querySelector('#' + id + ' .personal-experience-inner > .row');
        if (!host) continue;
        const template = host.querySelector('.resume-single-list').cloneNode(true);
        tasks.push(populate(name, host, items => {
            const columns = [0, 1].map(() => {
                const column = document.createElement('div');
                column.className = 'col-lg-6 col-md-12 col-12';
                column.innerHTML = '<div class="content"><div class="experience-list"></div></div>';
                host.append(column); return column.querySelector('.experience-list');
            });
            items.forEach((item, i) => {
                const card = template.cloneNode(true);
                card.querySelector('.title h4').textContent = plain(item.title);
                card.querySelector('.title span').textContent = plain(item.experience);
                card.querySelector('.description').textContent = plain(item.content);
                columns[i < Math.ceil(items.length / 2) ? 0 : 1].append(card);
            });
        }));
    }
    window.portfolioContentReady = Promise.allSettled(tasks);

    for (const form of document.querySelectorAll('#contact-form, .quote-form')) {
        const feedback = document.createElement('p');
        feedback.className = 'form-group col-12 quote-full';
        feedback.setAttribute('role', 'status');
        form.append(feedback);
        let sending = false;
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (sending) return;
            const data = new FormData(form);
            const quote = form.classList.contains('quote-form');
            const payload = {
                'contact-name': text(data.get(quote ? 'name' : 'contact-name')),
                'contact-email': text(data.get(quote ? 'email' : 'contact-email')),
                'contact-phone': text(data.get(quote ? 'phone' : 'contact-phone')),
                subject: quote ? 'Quote: ' + text(data.get('service')) : text(data.get('subject')),
                'contact-message': quote ? text(data.get('details')) + '\nBudget: ' + text(data.get('budget') || 'Not specified') : text(data.get('contact-message')),
            };
            sending = true;
            const button = form.querySelector('[type="submit"]');
            button.disabled = true; feedback.textContent = 'Sending?';
            try {
                const body = localPreview ? { name: payload['contact-name'], email: payload['contact-email'], phone: payload['contact-phone'], subject: payload.subject, message: payload['contact-message'] } : payload;
                const response = await fetch(localPreview ? wordpress + '/contact' : '/api/contact', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body), signal: AbortSignal.timeout(20000),
                });
                const result = await response.json();
                if (!response.ok || result.success === false) throw new Error(result.message || 'Your message could not be sent.');
                feedback.textContent = result.message || 'Thank you. Your message has been sent.';
                form.reset();
                if (!quote) document.getElementById('captcha-refresh')?.click();
            } catch (error) {
                feedback.textContent = error.message || 'Unable to send. Please try again or contact me by email.';
            } finally { sending = false; button.disabled = false; }
        });
    }
})();
