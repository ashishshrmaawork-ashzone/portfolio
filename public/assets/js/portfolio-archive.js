(async () => {
    const list = document.getElementById('portfolio-archive-list');
    const count = document.getElementById('project-count');
    const pagination = document.getElementById('portfolio-pagination');
    const pageSize = 9;
    try {
        const projects = await window.portfolioApi.collection('projects');
        const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
        const requested = Number(new URLSearchParams(location.search).get('page') || 1);
        const page = Math.min(totalPages, Math.max(1, Number.isSafeInteger(requested) ? requested : 1));
        const address = new URL(location.href);
        if (address.searchParams.has('page') && address.searchParams.get('page') !== String(page)) {
            address.searchParams.set('page', String(page)); history.replaceState(null, '', address);
        }
        const start = (page - 1) * pageSize;
        list.replaceChildren();
        projects.slice(start, start + pageSize).forEach(project => list.append(window.portfolioApi.renderProjectCard(project)));
        count.textContent = projects.length ? 'Showing ' + (start + 1) + '-' + Math.min(start + pageSize, projects.length) + ' of ' + projects.length + ' projects' : 'No projects published yet.';
        document.title = 'Portfolio' + (page > 1 ? ' - Page ' + page : '') + ' | Ashish Sharma';
        if (totalPages > 1) {
            function link(label, target, disabled = false) {
                const node = document.createElement(disabled ? 'span' : 'a');
                node.textContent = label;
                if (disabled) node.setAttribute('aria-disabled', 'true');
                else {
                    node.href = 'portfolio.html?page=' + target;
                    if (String(target) === label) node.setAttribute('aria-label', 'Page ' + target);
                    if (target === page && String(target) === label) node.setAttribute('aria-current', 'page');
                }
                pagination.append(node);
            }
            link('Previous', page - 1, page === 1);
            const visible = new Set([1, totalPages, page - 1, page, page + 1]);
            let previous = 0;
            [...visible].filter(value => value > 0 && value <= totalPages).sort((a,b) => a-b).forEach(value => {
                if (previous && value - previous > 1) { const gap = document.createElement('span'); gap.textContent = '...'; pagination.append(gap); }
                link(String(value), value); previous = value;
            });
            link('Next', page + 1, page === totalPages);
            pagination.hidden = false;
        }
    } catch (error) {
        console.error('Portfolio archive failed', error);
        count.textContent = 'Projects could not load. Please try again.';
        const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'button'; retry.textContent = 'Try again';
        retry.addEventListener('click', () => location.reload()); list.replaceChildren(retry);
    } finally { list.removeAttribute('aria-busy'); }
})();
