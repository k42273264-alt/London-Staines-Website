document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const DEBOUNCE_DELAY = 200;

    // Utility: Debounce
    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(null, args), delay);
      };
    };

    // Preloader Logic
    const initPreloader = () => {
      if (sessionStorage.getItem('preloaderShown') !== 'true') {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
          document.body.classList.add('preloading');
          document.querySelectorAll('.site-header, .hero-section, section, footer').forEach((el) => {
            el.style.display = 'none';
          });

          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
              clearInterval(interval);
              preloader.style.opacity = '0';
              setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.remove('preloading');
                document.querySelectorAll('.site-header, .hero-section, section, footer').forEach((el) => {
                  el.style.display = '';
                });
                sessionStorage.setItem('preloaderShown', 'true');
              }, 300);
            }
          }, 50);
        }
      } else {
        const preloader = document.querySelector('.preloader');
        if (preloader) preloader.style.display = 'none';
        document.body.classList.remove('preloading');
        document.querySelectorAll('.site-header, .hero-section, section, footer').forEach((el) => {
          el.style.display = '';
        });
      }
    };

    // Preload Images
    const preloadImages = (container) => {
      const images = container.querySelectorAll('img');
      images.forEach((img) => {
        const preloadImg = new Image();
        preloadImg.src = img.src;
        preloadImg.onerror = () => {
          console.warn(`Failed to preload image: ${img.src}`);
          img.src = 'images/fallback.jpg';
        };
      });
    };

    // Mobile Menu Logic
    const initMobileMenu = () => {
      const toggle = document.querySelector('.mobile-menu-toggle');
      const nav = document.querySelector('.nav-container');
      const dropdowns = document.querySelectorAll('.has-dropdown');

      if (!toggle || !nav) return;

      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
      });

      dropdowns.forEach((dropdown) => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            const submenu = dropdown.querySelector('.dropdown-menu');
            submenu.style.display = dropdown.classList.contains('active') ? 'flex' : 'none';
          }
        });
      });

      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768 && !link.parentElement.classList.contains('has-dropdown')) {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
        });
      });
    };

    // Header Scroll Effect
    const initHeaderScroll = () => {
      const header = document.querySelector('.site-header');
      let lastScroll = 0;

      window.addEventListener('scroll', debounce(() => {
        const currentScroll = window.pageYOffset;
        header.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
      }, 50));
    };

    // Smooth Scroll for Get in Touch
    const initSmoothScroll = () => {
      const getInTouch = document.querySelector('.hero-content .btn-primary');
      if (getInTouch) {
        getInTouch.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(getInTouch.getAttribute('href'));
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        });
      }
    };

    // Venue Modal Functionality
    const initVenueModal = () => {
      const modal = document.getElementById('venueModal');
      const modalTitle = document.getElementById('modalTitle');
      const modalDetails = document.getElementById('modalDetails');
      const closeModal = document.querySelector('.modal-close');

      const venueDetails = {
        'Riverside Restaurant & Bar': {
          details: 'The Riverside Restaurant & Bar features seasonal menus crafted with local produce, a bar with cocktails and fine wines, and a signature buffet breakfast. Enjoy stunning Thames views and accommodate up to 100 guests.'
        }
      };

      document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
          const venue = button.getAttribute('data-venue');
          modalTitle.textContent = venue;
          modalDetails.textContent = venueDetails[venue].details;
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
    };

    // Gallery Modal Functionality
    const initGalleryModal = () => {
      const galleryModal = document.getElementById('galleryModal');
      const galleryModalImage = document.getElementById('galleryModalImage');
      const galleryModalCaption = document.getElementById('galleryModalCaption');
      const closeGalleryModal = document.querySelector('.gallery-modal-close');

      document.querySelectorAll('.gallery-zoom').forEach(button => {
        button.addEventListener('click', () => {
          const img = button.closest('.gallery-item').querySelector('img');
          galleryModalImage.src = img.src;
          galleryModalImage.alt = img.alt;
          galleryModalCaption.textContent = img.alt;
          galleryModal.classList.add('active');
        });
      });

      closeGalleryModal.addEventListener('click', () => {
        galleryModal.classList.remove('active');
      });

      galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
          galleryModal.classList.remove('active');
        }
      });
    };

    // Testimonial Carousel
    const initTestimonialCarousel = () => {
      const testimonialCards = document.querySelectorAll('.testimonial-card');
      const prevButton = document.querySelector('.carousel-prev');
      const nextButton = document.querySelector('.carousel-next');
      let currentIndex = 0;

      function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
          card.classList.remove('active');
          if (i === index) {
            card.classList.add('active');
          }
        });
      }

      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
        showTestimonial(currentIndex);
      });

      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
      });

      // Auto-slide every 5 seconds
      let autoSlide = setInterval(() => {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
      }, 5000);

      // Pause on hover
      const testimonialsContainer = document.querySelector('.testimonials-container');
      if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
        testimonialsContainer.addEventListener('mouseleave', () => {
          autoSlide = setInterval(() => {
            currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
          }, 5000);
        });
      }
    };

    // Animation Trigger on Scroll
    const initAnimations = () => {
      const elements = document.querySelectorAll('[data-animate]');
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(element => observer.observe(element));
    };

    // Initialize All Functions
    initPreloader();
    preloadImages(document);
    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initVenueModal();
    initGalleryModal();
    initTestimonialCarousel();
    initAnimations();

    // Handle Window Resize
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth > 768) {
        const nav = document.querySelector('.nav-container');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (nav && toggle) {
          nav.classList.remove('active');
          toggle.classList.remove('active');
          document.body.classList.remove('no-scroll');
          document.querySelectorAll('.has-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
            const submenu = dropdown.querySelector('.dropdown-menu');
            if (submenu) submenu.style.display = '';
          });
        }
      }
    }, DEBOUNCE_DELAY));
});