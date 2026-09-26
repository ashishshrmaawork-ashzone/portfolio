(async () => {
    if (!document.getElementById('project-detail')) return;
    const loading = document.createElement('p');
    loading.setAttribute('role', 'status'); loading.textContent = 'Loading project?';
    document.getElementById('project-content').before(loading);
    try {
        const projects = await window.portfolioApi.collection('projects');
        const requested = new URLSearchParams(location.search).get('project') || projects[0]?.slug;
        const index = projects.findIndex(project => project.slug === requested || String(project.id) === requested);
        if (index < 0) {
            document.getElementById('project-missing').hidden = false;
            document.title = 'Project not found | Ashish Sharma';
            return;
        }
        const project = projects[index];
        const { plain, url } = window.portfolioApi;
        const text = (id, value) => { document.getElementById(id).textContent = plain(value); };
        text('project-category', project.category);
        text('project-title', project.title);
        text('project-number', String(index + 1).padStart(2, '0'));
        text('preview-category', project.category);
        text('summary-category', project.category);
        text('project-overview-copy', project.content);
        const image = document.getElementById('project-image');
        const source = url(project.poster_image) || url(project.thumbnail_image);
        if (source) { image.src = source; image.alt = plain(project.title) + ' ? project preview'; }
        else image.closest('figure').hidden = true;
        const summary = document.querySelector('.project-summary dl');
        if (project.tech) {
            const row = document.createElement('div');
            const label = document.createElement('dt'); label.textContent = 'Technologies';
            const value = document.createElement('dd'); value.textContent = plain(project.tech);
            row.append(label, value); summary.append(row);
        }
        if (url(project.url)) {
            const link = document.createElement('a'); link.className = 'text-link';
            link.href = url(project.url); link.target = '_blank'; link.rel = 'noopener noreferrer';
            link.textContent = 'Visit live website ?'; summary.after(link);
        }
        for (const [id, offset] of [['previous-project', -1], ['next-project', 1]]) {
            const item = projects[(index + offset + projects.length) % projects.length];
            const link = document.getElementById(id);
            link.href = 'project-details.html?project=' + encodeURIComponent(item.slug);
            link.querySelector('strong').textContent = plain(item.title);
        }
        document.title = plain(project.title) + ' | Ashish Sharma';
        document.getElementById('project-content').hidden = false;
    } catch (error) {
        console.error('Project failed to load', error);
        const missing = document.getElementById('project-missing');
        missing.hidden = false;
        missing.querySelector('h1').textContent = 'Project could not load.';
        missing.querySelector('p').textContent = 'Please refresh to try again, or return to the portfolio.';
    } finally { loading.remove(); }
})();
