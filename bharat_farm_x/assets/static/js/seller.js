document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        var navbar = document.querySelector(".header");
        navbar.classList.toggle("scrolled", window.pageYOffset > 50);
    });
});

(function () {
    "use strict";

    const select = (el, all = false) => all ? [...document.querySelectorAll(el.trim())] : document.querySelector(el.trim());

    // Easy event listener function
    const on = (type, el, listener, all = false) => {
        const elements = select(el, all);
        if (Array.isArray(elements)) {
            elements.forEach(e => e.addEventListener(type, listener));
        } else {
            elements.addEventListener(type, listener);
        }
    };

    // Easy on scroll event listener 
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    };

    // Navbar links active state on scroll
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    };

    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    // Scrolls to an element with header offset
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 10
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    };

    // Toggle .header-scrolled class to #header when page is scrolled
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    };

    // Mobile nav toggle
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('fa-list')
        this.classList.toggle('fa-xmark')
    })

    // Scrool with ofset on links with a class name .scrollto
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('fa-list')
                navbarToggle.classList.toggle('fa-xmark')
            }
            scrollto(this.hash)
        }
    }, true)

    // Scroll with ofset on page load with hash links in the url
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    // Animation on scroll
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    };
    window.addEventListener('load', () => {
        aos_init();
    });

})();