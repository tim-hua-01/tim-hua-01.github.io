//This is the javascript file app.js
'use strict'

document.addEventListener('DOMContentLoaded', () => {
    // The Random nav tab takes its name seriously: a fresh color on every
    // hover. Inline styles beat the CSS green fallback while hovered.
    const cell = document.querySelector('#masterheader th:nth-child(7)');
    if (!cell) {
        throw new Error('The Random navigation tab is missing.');
    }
    const link = cell.querySelector('a');
    cell.addEventListener('mouseenter', () => {
        const hue = Math.floor(Math.random() * 360);
        // yellows/greens/cyans are bright at this lightness: use ink, not cream
        const text = (hue >= 40 && hue <= 190) ? '#141414' : '#fdfaf1';
        cell.style.backgroundColor = `hsl(${hue}, 78%, 48%)`;
        cell.style.color = text;
        if (link) link.style.color = text;
    });
    cell.addEventListener('mouseleave', () => {
        cell.style.backgroundColor = '';
        cell.style.color = '';
        if (link) link.style.color = '';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Links to photos on this site preview the photo as a small framed
    // plate on hover, so "click on the hyperlinks to see photos" works
    // without leaving the page. Old Books photos preview from the shrunk
    // copies in oldbooks/thumbs/. Touch screens keep plain links.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const links = [...document.querySelectorAll('a[href]')].filter(a =>
        a.host === location.host && /\.(jpe?g|png|gif|webp)$/i.test(a.pathname));
    if (links.length === 0) return;

    const preview = document.createElement('img');
    preview.className = 'link-preview';
    preview.alt = '';
    preview.setAttribute('aria-hidden', 'true');
    document.body.append(preview);

    let current = null;
    const hide = () => {
        current = null;
        preview.classList.remove('shown');
    };

    // y picks which line of a wrapped link to hang the plate from
    const show = (link, y) => {
        current = link;
        const href = link.getAttribute('href');
        const rects = [...link.getClientRects()];
        const line = rects.find(r => y >= r.top && y <= r.bottom) ?? rects[0];
        const place = () => {
            if (current !== link) return;
            const gap = 10, edge = 8;
            const w = preview.offsetWidth, h = preview.offsetHeight;
            // below the link if it fits, otherwise above
            const below = line.bottom + gap;
            const top = below + h <= innerHeight - edge ? below : Math.max(edge, line.top - gap - h);
            const left = Math.min(Math.max(edge, line.left), innerWidth - edge - w);
            preview.style.top = `${top}px`;
            preview.style.left = `${left}px`;
            preview.classList.add('shown');
        };
        preview.classList.remove('shown');
        preview.onload = place;
        preview.src = href.startsWith('oldbooks/') ? href.replace('oldbooks/', 'oldbooks/thumbs/') : href;
        if (preview.complete && preview.naturalWidth) place();
    };

    for (const link of links) {
        link.addEventListener('mouseenter', e => show(link, e.clientY));
        link.addEventListener('mouseleave', hide);
        link.addEventListener('focus', () => show(link));
        link.addEventListener('blur', hide);
    }
    addEventListener('scroll', hide, { passive: true });
});

