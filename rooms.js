document.addEventListener('DOMContentLoaded', () => {
    // Modal Functionality
    const modal = document.getElementById('roomModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.modal-close');

    const roomDetails = {
        'standard-room': {
            title: 'Standard Rooms',
            details: 'Stylish and comfortable, perfect for short stays.<br>Sunday Signature Touches: plush bedding, tea & coffee facilities, iron & ironing board, hair dryer.'
        },
        'classic-room': {
            title: 'Classic Room with Riverside View',
            details: 'Enjoy calming views of the Thames from your room.<br>Sunday Signature Touches: plush bedding, tea & coffee facilities, iron & ironing board, hair dryer.'
        },
        'privilege-room': {
            title: 'Privilege Rooms',
            details: 'More space and refined finishes for an elevated stay.<br>Sunday Signature Touches: plush bedding, tea & coffee facilities, iron & ironing board, hair dryer, Nespresso Machine and MiniBar.'
        },
        'family-room': {
            title: 'Family Rooms',
            details: 'Designed for comfort and convenience with extra space.<br>Sunday Signature Touches: plush bedding, tea & coffee facilities, iron & ironing board, hair dryer.'
        }
    };

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const room = button.getAttribute('data-room');
            modalTitle.textContent = roomDetails[room].title;
            modalDetails.innerHTML = roomDetails[room].details;
            modal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            roomCards.forEach(card => {
                const type = card.getAttribute('data-type');
                if (filter === 'all' || type === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Animation on Scroll
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(element => observer.observe(element));

    // Initialize existing scripts
    if (typeof initMagazineCarousels === 'function') {
        initMagazineCarousels();
    }
});