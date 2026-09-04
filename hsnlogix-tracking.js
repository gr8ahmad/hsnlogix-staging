// ========================================
// HSNLogix GA4 Event Tracking
// Add this script before </body> in index.html
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ----------------------------------------
    // 1. UPWORK PROFILE CLICKS (Primary Conversion)
    // ----------------------------------------
    // Tracks ALL links going to your Upwork profile
    document.querySelectorAll('a[href*="upwork.com/freelancers"]').forEach(function(link) {
        link.addEventListener('click', function() {
            // Determine which section the click came from
            var location = 'unknown';
            if (this.closest('.profile-section') || this.closest('.profile-info')) {
                location = 'header-profile';
            } else if (this.closest('.contact-info') || this.closest('footer')) {
                location = this.textContent.trim().includes('Schedule') ? 'footer-schedule-call' : 'footer-upwork-icon';
            }

            gtag('event', 'upwork_click', {
                'event_category': 'conversion',
                'event_label': location,
                'link_url': this.href
            });

            console.log('[HSNLogix Tracking] Upwork click from:', location);
        });
    });

    // ----------------------------------------
    // 2. CTA BUTTON CLICKS
    // ----------------------------------------
    document.querySelectorAll('.cta-button').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var label = this.textContent.trim().substring(0, 50);
            var section = 'unknown';
            if (this.closest('.cta-section')) section = 'hero';
            else if (this.closest('footer')) section = 'footer';

            gtag('event', 'cta_click', {
                'event_category': 'engagement',
                'event_label': section + ' - ' + label
            });

            console.log('[HSNLogix Tracking] CTA click:', section, label);
        });
    });

    // ----------------------------------------
    // 3. PROJECT CARD CLICKS
    // ----------------------------------------
    document.querySelectorAll('.project-card, .project-card-small').forEach(function(card) {
        card.addEventListener('click', function() {
            var projectName = this.querySelector('.project-title');
            projectName = projectName ? projectName.textContent.trim() : 'unknown';
            var category = this.querySelector('.category-name');
            category = category ? category.textContent.trim() : 'unknown';

            gtag('event', 'project_click', {
                'event_category': 'engagement',
                'event_label': projectName,
                'project_category': category
            });

            console.log('[HSNLogix Tracking] Project click:', projectName);
        });
    });

    // ----------------------------------------
    // 4. VIEW ALL PROJECTS CLICK
    // ----------------------------------------
    document.querySelectorAll('.view-all-section').forEach(function(link) {
        link.addEventListener('click', function() {
            gtag('event', 'view_all_projects', {
                'event_category': 'engagement',
                'event_label': 'projects-section'
            });
        });
    });

    // ----------------------------------------
    // 5. FAQ INTERACTIONS
    // ----------------------------------------
    document.querySelectorAll('.faq-question').forEach(function(faq) {
        faq.addEventListener('click', function() {
            var questionTitle = this.querySelector('.question-title');
            questionTitle = questionTitle ? questionTitle.textContent.trim() : 'unknown';

            gtag('event', 'faq_click', {
                'event_category': 'engagement',
                'event_label': questionTitle
            });

            console.log('[HSNLogix Tracking] FAQ click:', questionTitle);
        });
    });

    // ----------------------------------------
    // 6. SERVICE ACCORDION INTERACTIONS
    // ----------------------------------------
    document.querySelectorAll('.accordion-question').forEach(function(acc) {
        acc.addEventListener('click', function() {
            var serviceName = this.querySelector('.question-title');
            serviceName = serviceName ? serviceName.textContent.trim() : 'unknown';

            gtag('event', 'service_click', {
                'event_category': 'engagement',
                'event_label': serviceName
            });
        });
    });

    // ----------------------------------------
    // 7. SCROLL DEPTH TRACKING (25%, 50%, 75%, 100%)
    // ----------------------------------------
    var scrollMarks = { 25: false, 50: false, 75: false, 100: false };
    window.addEventListener('scroll', function() {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        var scrollPercent = Math.round((window.scrollY / docHeight) * 100);

        [25, 50, 75, 100].forEach(function(mark) {
            if (scrollPercent >= mark && !scrollMarks[mark]) {
                scrollMarks[mark] = true;
                gtag('event', 'scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': mark + '%',
                    'value': mark
                });
                console.log('[HSNLogix Tracking] Scroll depth:', mark + '%');
            }
        });
    });

    // ----------------------------------------
    // 8. NAV LINK CLICKS
    // ----------------------------------------
    document.querySelectorAll('.site-header__link').forEach(function(link) {
        link.addEventListener('click', function() {
            gtag('event', 'nav_click', {
                'event_category': 'navigation',
                'event_label': this.textContent.trim()
            });
        });
    });

    console.log('[HSNLogix Tracking] GA4 event tracking initialized.');
});
