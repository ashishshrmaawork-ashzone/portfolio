(async () => {
    await window.portfolioContentReady;
    const mobile = window.matchMedia('(max-width: 767px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sliders = [];
    function controls(track, cards, label) {
        const bar = document.createElement('div');
        bar.className = 'mobile-cards-controls';
        const hint = document.createElement('span');
        hint.className = 'mobile-cards-hint';
        hint.textContent = 'Swipe to explore';
        const count = document.createElement('span');
        count.setAttribute('role', 'status');
        count.setAttribute('aria-live', 'polite');
        const buttons = document.createElement('div');
        buttons.className = 'mobile-cards-buttons';
        const prev = document.createElement('button');
        const next = document.createElement('button');
        for (const [button, text, name] of [[prev, '\u2190', 'Previous'], [next, '\u2192', 'Next']]) {
            button.type = 'button';
            button.textContent = text;
            button.setAttribute('aria-label', `${name} ${label}`);
            button.setAttribute('aria-controls', track.id);
            buttons.append(button);
        }
        bar.append(hint, count, buttons);
        track.after(bar);
        let active = 0;
        function position(card) {
            return card.getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
        }
        function update() {
            if (!mobile.matches || !track.getClientRects().length) return;
            let nearest = Infinity;
            cards.forEach((card, index) => {
                const distance = Math.abs(position(card) - track.scrollLeft);
                if (distance < nearest) { nearest = distance; active = index; }
            });
            count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
            prev.disabled = active === 0;
            next.disabled = active === cards.length - 1;
        }
        function go(direction) {
            const index = Math.max(0, Math.min(cards.length - 1, active + direction));
            track.scrollTo({ left: position(cards[index]), behavior: reduced.matches ? 'instant' : 'smooth' });
        }
        prev.addEventListener('click', () => go(-1));
        next.addEventListener('click', () => go(1));
        track.addEventListener('scroll', update, { passive: true });
        track.addEventListener('keydown', event => {
            if (event.target !== track || !mobile.matches) return;
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault(); go(event.key === 'ArrowRight' ? 1 : -1);
            }
        });
        track.setAttribute('aria-label', `${label}: swipe or use arrow keys`);
        function sync() {
            if (mobile.matches) { track.tabIndex = 0; track.setAttribute('role', 'region'); }
            else { track.removeAttribute('tabindex'); track.removeAttribute('role'); }
            requestAnimationFrame(update);
        }
        sliders.push({ sync, update });
        return sync;
    }
    const services = document.querySelector('#features .row.row--25');
    if (services && services.querySelector('.rn-service')) {
        services.classList.add('mobile-services-track');
        services.id = 'mobile-services-track';
        controls(services, [...services.children], 'service');
    }
    const portfolio = document.querySelector('#portfolio .row.row--25');
    if (portfolio && portfolio.querySelector(".rn-portfolio")) {
        portfolio.classList.add('mobile-portfolio-track');
        portfolio.id = 'mobile-portfolio-track';
        controls(portfolio, [...portfolio.children], 'portfolio project');
    }
    const resumeGroups = [];
    document.querySelectorAll('#resume .tab-pane').forEach((pane, index) => {
        const cards = [...pane.querySelectorAll('.resume-single-list')];
        if (!cards.length) return;
        const original = pane.querySelector('.personal-experience-inner');
        const anchors = cards.map(card => {
            const anchor = document.createComment('Resume card original position');
            card.before(anchor);
            return anchor;
        });
        const track = document.createElement('div');
        track.className = 'mobile-resume-track';
        track.id = `mobile-resume-track-${index}`;
        original.after(track);
        controls(track, cards, pane.id === 'professional' ? 'work experience' : 'education');
        resumeGroups.push({ original, track, cards, anchors });
    });
    function layout() {
        resumeGroups.forEach(({ original, track, cards, anchors }) => {
            if (mobile.matches) {
                cards.forEach(card => track.append(card));
                original.hidden = true;
            } else {
                cards.forEach((card, index) => anchors[index].after(card));
                original.hidden = false;
            }
        });
        sliders.forEach(slider => slider.sync());
    }
    mobile.addEventListener('change', layout);
    window.addEventListener('resize', () => sliders.forEach(slider => slider.update()));
    document.querySelectorAll('#resume [data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', () => sliders.forEach(slider => slider.update()));
    });
    layout();
})();
