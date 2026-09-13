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

