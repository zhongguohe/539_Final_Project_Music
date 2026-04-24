/* ===== main.js — Mandopop Starter Guide ===== */

(function () {
  'use strict';

  /* ---------- Mobile Navigation Toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---------- Scroll-based Fade-In Animation ---------- */
  var fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  /* ---------- Expandable Artist Cards ---------- */
  var expandButtons = document.querySelectorAll('.card-expand-btn');

  expandButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('aria-controls');
      var target = document.getElementById(targetId);
      if (!target) return;

      var isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      btn.classList.toggle('expanded');
      target.classList.toggle('open');

      if (!isExpanded) {
        btn.innerHTML = 'Hide Songs <span class="arrow" aria-hidden="true">&#9660;</span>';
      } else {
        btn.innerHTML = 'View Notable Songs <span class="arrow" aria-hidden="true">&#9660;</span>';
      }
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  /* ---------- Artist Filter (Artists Page) ---------- */
  var artistFilterBtns = document.querySelectorAll('.filter-bar [data-filter]');
  var artistCards = document.querySelectorAll('.artist-detail-card[data-genre]');

  if (artistFilterBtns.length > 0 && artistCards.length > 0) {
    artistFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        artistFilterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');

        artistCards.forEach(function (card) {
          var genres = card.getAttribute('data-genre');
          if (filter === 'all' || genres.includes(filter)) {
            card.style.display = '';
            card.classList.remove('visible');
            requestAnimationFrame(function () { card.classList.add('visible'); });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Era Filter (Eras Page) ---------- */
  var eraFilterBtns = document.querySelectorAll('.filter-bar [data-era]');
  var eraBlocks = document.querySelectorAll('.era-block[data-era]');

  if (eraFilterBtns.length > 0 && eraBlocks.length > 0) {
    eraFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        eraFilterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var era = btn.getAttribute('data-era');

        eraBlocks.forEach(function (block) {
          var blockEra = block.getAttribute('data-era');
          if (era === 'all' || blockEra === era) {
            block.style.display = '';
            block.classList.remove('visible');
            requestAnimationFrame(function () { block.classList.add('visible'); });
          } else {
            block.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Navbar Scroll Effect & Back to Top ---------- */
  var navbar = document.querySelector('.navbar');
  var backToTopBtn = document.getElementById('backToTop');

  function handleScroll() {
    var currentScroll = window.pageYOffset;

    if (navbar) {
      if (currentScroll > 80) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.85)';
        navbar.style.boxShadow = 'none';
      }
    }

    if (backToTopBtn) {
      if (currentScroll > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Carousel Pause / Play Button ---------- */
  var carouselTrack = document.querySelector('.carousel-track');
  var carouselPauseBtn = document.getElementById('carouselPauseBtn');
  var carouselPaused = false;

  if (carouselTrack && carouselPauseBtn) {
    // Pause on focus for keyboard users
    carouselTrack.addEventListener('focusin', function () {
      carouselTrack.classList.add('paused');
    });
    carouselTrack.addEventListener('focusout', function () {
      if (!carouselPaused) {
        carouselTrack.classList.remove('paused');
      }
    });

    // Pause / Play toggle button
    carouselPauseBtn.addEventListener('click', function () {
      carouselPaused = !carouselPaused;
      var pauseIcon = carouselPauseBtn.querySelector('.pause-icon');
      var playIcon = carouselPauseBtn.querySelector('.play-icon');

      if (carouselPaused) {
        carouselTrack.classList.add('paused');
        carouselPauseBtn.setAttribute('aria-label', 'Play carousel animation');
        if (pauseIcon) pauseIcon.hidden = true;
        if (playIcon) playIcon.hidden = false;
      } else {
        carouselTrack.classList.remove('paused');
        carouselPauseBtn.setAttribute('aria-label', 'Pause carousel animation');
        if (pauseIcon) pauseIcon.hidden = false;
        if (playIcon) playIcon.hidden = true;
      }
    });

    // Auto-pause if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      carouselPaused = true;
      carouselTrack.classList.add('paused');
      carouselPauseBtn.setAttribute('aria-label', 'Play carousel animation');
      var pi = carouselPauseBtn.querySelector('.pause-icon');
      var pli = carouselPauseBtn.querySelector('.play-icon');
      if (pi) pi.hidden = true;
      if (pli) pli.hidden = false;
    }
  }

  /* ---------- YouTube Player Modal ---------- */
  var playerModal = document.getElementById('playerModal');
  var modalClose = document.getElementById('modalClose');
  var youtubePlayer = document.getElementById('youtubePlayer');
  var modalAlbumArt = document.getElementById('modalAlbumArt');
  var modalSongTitle = document.getElementById('modalSongTitle');
  var modalArtistName = document.getElementById('modalArtistName');
  var songCards = document.querySelectorAll('.song-card[data-youtube]');
  var lastFocusedElement = null;

  function openPlayer(card) {
    if (!playerModal || !youtubePlayer) return;

    var videoId = card.getAttribute('data-youtube');
    var title = card.getAttribute('data-title');
    var artist = card.getAttribute('data-artist');
    var cover = card.getAttribute('data-cover');

    if (!videoId) return;

    lastFocusedElement = card.querySelector('.play-btn') || card;

    if (modalSongTitle) modalSongTitle.textContent = title || '';
    if (modalArtistName) modalArtistName.textContent = artist || '';
    if (modalAlbumArt) {
      modalAlbumArt.src = cover || '';
      modalAlbumArt.alt = 'Album cover for ' + (title || 'the currently playing song');
    }

    youtubePlayer.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';

    playerModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    setTimeout(function () {
      if (modalClose) modalClose.focus();
    }, 100);
  }

  function closePlayer() {
    if (!playerModal || !youtubePlayer) return;

    youtubePlayer.src = '';
    playerModal.classList.remove('active');
    document.body.style.overflow = '';

    // Return focus to the card that opened the modal
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  if (songCards.length > 0) {
    songCards.forEach(function (card) {
      // Make the whole card focusable and announce as a button
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      var title = card.getAttribute('data-title') || '';
      var artist = card.getAttribute('data-artist') || '';
      if (title && artist) {
        card.setAttribute('aria-label', 'Play ' + title + ' by ' + artist);
      }

      // Click on the card itself
      card.addEventListener('click', function () {
        openPlayer(card);
      });

      // Keyboard support for the card
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPlayer(card);
        }
      });
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closePlayer);
  }

  if (playerModal) {
    // Close on overlay click
    playerModal.addEventListener('click', function (e) {
      if (e.target === playerModal) {
        closePlayer();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && playerModal.classList.contains('active')) {
        closePlayer();
      }
    });

    // Trap focus inside modal when open
    playerModal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      if (!playerModal.classList.contains('active')) return;

      var focusable = playerModal.querySelectorAll('button, [href], iframe, [tabindex]:not([tabindex="-1"])');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // ─── Picks Tab Navigation ───
  const picksTabs = document.querySelectorAll('.picks-tab');
  const picksPanels = document.querySelectorAll('.picks-panel');

  if (picksTabs.length && picksPanels.length) {
    picksTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Deactivate all tabs
        picksTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        // Hide all panels
        picksPanels.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('hidden', '');
        });
        // Activate clicked tab
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        // Show corresponding panel
        const panelId = tab.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        }
      });

      // Keyboard navigation: arrow keys between tabs
      tab.addEventListener('keydown', (e) => {
        const tabsArr = Array.from(picksTabs);
        const idx = tabsArr.indexOf(tab);
        let newIdx = idx;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          newIdx = (idx + 1) % tabsArr.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          newIdx = (idx - 1 + tabsArr.length) % tabsArr.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          newIdx = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          newIdx = tabsArr.length - 1;
        }
        if (newIdx !== idx) {
          tabsArr[newIdx].focus();
          tabsArr[newIdx].click();
        }
      });
    });
  }

})();
