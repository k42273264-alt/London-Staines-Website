document.addEventListener('DOMContentLoaded', () => {
    // Modal Functionality
    const modal = document.getElementById('attractionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.modal-close');

    const attractionDetails = {
        'river-thames': {
            title: 'River Thames',
            details: 'Just steps from Staines Hotel by Sunday, the River Thames offers scenic riverside walks and boat trips, blending natural beauty with historic charm.'
        },
        'windsor-castle': {
            title: 'Windsor Castle',
            details: 'A short drive from Staines, Windsor Castle is a royal residence with stunning architecture and gardens, perfect for a cultural day out.'
        },
        'thorpe-park': {
            title: 'Thorpe Park',
            details: 'Located near Staines, Thorpe Park features thrilling rides and family-friendly attractions, ideal for an exciting day of adventure.'
        }
    };

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const attraction = button.getAttribute('data-attraction');
            modalTitle.textContent = attractionDetails[attraction].title;
            modalDetails.textContent = attractionDetails[attraction].details;
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
});