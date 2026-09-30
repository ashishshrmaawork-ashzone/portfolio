(() => {
    const safeUrl = value => {
        try {
            const parsed = new URL(value, location.href);
            return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : '';
        } catch {
            return '';
        }
    };

    const dialog = document.createElement('dialog');
    dialog.className = 'project-preview-dialog';
    dialog.setAttribute('aria-label', 'Project preview');

    const toolbar = document.createElement('div');
    toolbar.className = 'project-preview-toolbar';
    const heading = document.createElement('div');
    const category = document.createElement('span');
    const title = document.createElement('h2');
    heading.append(category, title);

    const actions = document.createElement('div');
    actions.className = 'project-preview-toolbar-actions';
    const liveLink = document.createElement('a');
    liveLink.target = '_blank';
    liveLink.rel = 'noreferrer';
    liveLink.textContent = 'Visit live site ↗';
    const detailsLink = document.createElement('a');
    detailsLink.textContent = 'Project details';
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close project preview');
    closeButton.textContent = '×';
    actions.append(liveLink, detailsLink, closeButton);
    toolbar.append(heading, actions);

    const content = document.createElement('div');
    content.className = 'project-preview-content';
    dialog.append(toolbar, content);
    document.body.append(dialog);

    document.addEventListener('click', event => {
        const trigger = event.target instanceof Element
            ? event.target.closest('.js-project-preview')
            : null;
        if (!(trigger instanceof HTMLElement)) return;

        const imageUrl = safeUrl(trigger.dataset.previewImage || '');
        const projectUrl = safeUrl(trigger.dataset.projectUrl || '');
        title.textContent = trigger.dataset.projectTitle || 'Project preview';
        category.textContent = trigger.dataset.projectCategory || 'Web development';
        liveLink.href = projectUrl;
        liveLink.hidden = !projectUrl;

        detailsLink.href = trigger.dataset.projectDetails || '#';
        detailsLink.hidden = !trigger.dataset.projectDetails;

        content.replaceChildren();
        if (imageUrl) {
            const image = document.createElement('img');
            image.src = imageUrl;
            image.alt = `${title.textContent} full-page preview`;
            content.append(image);
        } else {
            const message = document.createElement('p');
            message.textContent = 'No project preview image is available.';
            content.append(message);
        }

        dialog.setAttribute('aria-label', `${title.textContent} preview`);
        if (!dialog.open) dialog.showModal();
    });

    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
})();
