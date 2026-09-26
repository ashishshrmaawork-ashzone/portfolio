(() => {
    // Keep the existing card popup while letting the separate link navigate normally.
    document.querySelectorAll('.project-details-link').forEach(link => {
        link.addEventListener('click', event => event.stopPropagation());
    });
    if (!document.getElementById('project-detail')) return;
    const projects = window.portfolioProjects || [];
    const requested = new URLSearchParams(location.search).get('project') || projects[0]?.id;
    const index = projects.findIndex(project => project.id === requested);
    if (index < 0) {
        document.getElementById('project-missing').hidden = false;
        document.title = 'Project not found | Ashish Sharma';
        return;
    }
    const project = projects[index];
    const text = (id, value) => { document.getElementById(id).textContent = value; };
    text('project-category', project.category);
    text('project-title', project.title);
    text('project-number', String(index + 1).padStart(2, '0'));
    text('preview-category', project.category);
    text('summary-category', project.category);
    text('project-overview-copy', `${project.title} is presented in the ${project.category.toLowerCase()} collection. This page brings together the selected visual and its portfolio category.`);
    const image = document.getElementById('project-image');
    image.src = project.image;
    image.alt = project.title + ' — project preview';
    for (const [id, offset] of [['previous-project', -1], ['next-project', 1]]) {
        const item = projects[(index + offset + projects.length) % projects.length];
        const link = document.getElementById(id);
        link.href = 'project-details.html?project=' + encodeURIComponent(item.id);
        link.querySelector('strong').textContent = item.title;
    }
    document.title = project.title + ' | Ashish Sharma';
    document.getElementById('project-content').hidden = false;
})();
