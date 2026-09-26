(() => {
    const host = document.getElementById('google-reviews-list');
    if (!host) return;
    // Replace these clearly labelled placeholders with approved client feedback.
    const reviews = [
        { author: 'Your Client Name', category: 'Website development', image: 'final-home--2nd.png', text: 'Replace this sample text with a real Google review from your client.' },
        { author: 'Client Name', category: 'Application development', image: 'final-home--1st.png', text: 'Add genuine feedback here after copying it from your Google Business Profile.' },
        { author: 'Happy Client', category: 'Ongoing collaboration', image: 'final-home--3rd.png', text: 'This is editable local review content. Replace it with verified customer feedback.' }
    ];
    host.className = 'stories-slider';
    host.removeAttribute('aria-live');
    host.setAttribute('role', 'region');
    host.setAttribute('aria-label', 'Client testimonials');
    host.setAttribute('aria-roledescription', 'carousel');
    host.innerHTML = '';
    const track = document.createElement('div');
    track.className = 'stories-track';
    track.id = 'testimonial-track';
    track.tabIndex = 0;
    track.setAttribute('aria-label', 'Reviews. Use left and right arrow keys to browse.');
    reviews.forEach((review, index) => {
        const card = document.createElement('article');
        card.className = 'story-card';
        card.setAttribute('role', 'group');
        card.setAttribute('aria-roledescription', 'slide');
        card.setAttribute('aria-label', `${index + 1} of ${reviews.length}`);
        const top = document.createElement('div');
        top.className = 'story-top';
        const tag = document.createElement('span');
        tag.textContent = 'Sample review';
        const quote = document.createElement('span');
        quote.className = 'story-quote';
        quote.setAttribute('aria-hidden', 'true');
        quote.textContent = '\u201c';
        top.append(tag, quote);
        const text = document.createElement('blockquote');
        text.textContent = review.text;
        const footer = document.createElement('div');
        footer.className = 'story-author';
        const avatar = document.createElement('span');
        avatar.className = 'story-avatar';
        avatar.setAttribute('aria-hidden', 'true');
        avatar.textContent = review.author.split(' ').slice(0, 2).map(word => word[0]).join('');
        const details = document.createElement('div');
        const name = document.createElement('strong');
        name.textContent = review.author;
        const category = document.createElement('span');
        category.textContent = review.category;
        details.append(name, category);
        footer.append(avatar, details);
        const portrait = document.createElement('div');
        portrait.className = 'story-portrait';
        const photo = document.createElement('img');
        photo.src = 'assets/images/' + review.image;
        photo.alt = 'Sample portrait for testimonial layout';
        photo.width = 335;
        photo.height = 252;
        photo.loading = index === 0 ? 'eager' : 'lazy';
        photo.decoding = 'async';
        const caption = document.createElement('span');
        caption.className = 'story-photo-note';
        caption.textContent = 'Sample portrait';
        portrait.append(photo, caption, footer);
        const body = document.createElement('div');
        body.className = 'story-body';
        const heading = document.createElement('h3');
        heading.textContent = review.category;
        const note = document.createElement('p');
        note.className = 'story-project-note';
        note.textContent = 'Client experience / Portfolio';
        body.append(top, heading, note, text);
        card.append(portrait, body);
        track.append(card);
    });
    const controls = document.createElement('div');
    controls.className = 'stories-controls';
    controls.innerHTML = '<div class="stories-position" role="status" aria-live="polite"></div><div class="stories-buttons"><button type="button" aria-label="Previous review" aria-controls="testimonial-track">&#8592;</button><button type="button" aria-label="Next review" aria-controls="testimonial-track">&#8594;</button></div>';
    host.append(track, controls);
    const [prev, next] = controls.querySelectorAll('button');
    const counter = controls.querySelector('.stories-position');
    const dots = document.createElement('div');
    dots.className = 'stories-dots';
    dots.setAttribute('role', 'group');
    dots.setAttribute('aria-label', 'Choose a review');
    reviews.forEach((review, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to review ${index + 1}`);
        dot.setAttribute('aria-controls', 'testimonial-track');
        dot.addEventListener('click', () => go(index - active));
        dots.append(dot);
    });
    controls.insertBefore(dots, controls.querySelector('.stories-buttons'));
    let active = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    function update() {
        active = Math.round(track.scrollLeft / (track.children[0].getBoundingClientRect().width + 20));
        active = Math.max(0, Math.min(reviews.length - 1, active));
        counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(reviews.length).padStart(2, '0')}`;
        Array.from(dots.children).forEach((dot, index) => dot.setAttribute('aria-current', index === active ? 'true' : 'false'));
        prev.disabled = active === 0;
        next.disabled = active === reviews.length - 1;
    }
    function go(direction) {
        const target = Math.max(0, Math.min(reviews.length - 1, active + direction));
        track.scrollTo({ left: target * (track.children[0].getBoundingClientRect().width + 20), behavior: reduced.matches ? 'instant' : 'smooth' });
    }
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    track.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault(); go(event.key === 'ArrowRight' ? 1 : -1);
        }
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
})();
