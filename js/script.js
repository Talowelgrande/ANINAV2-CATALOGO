document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. LÓGICA DEL MENÚ CELULAR
       ========================================== */
    const mobileMenu = document.getElementById('mobile-menu');
    const sidebar = document.getElementById('sidebar');
    const navbar = document.getElementById('navbar');
    const sidebarLinks = document.querySelectorAll('.sidebar-links li a');

    if (mobileMenu && sidebar && navbar) {
        mobileMenu.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            navbar.classList.toggle('menu-open');
            mobileMenu.classList.toggle('open');
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('active');
            if (navbar) navbar.classList.remove('menu-open');
            if (mobileMenu) mobileMenu.classList.remove('open');
        });
    });

    /* ==========================================
       2. CARRUSEL DE FONDO (HERO CROSSFADE)
       ========================================== */
    const imagenesFondo = [
        'imagenes/imagen1.jpg',
        'imagenes/imagen2.jpg',
        'imagenes/imagen3.jpg'
    ];

    const bg1 = document.getElementById('hero-bg-1');
    const bg2 = document.getElementById('hero-bg-2');

    if (bg1 && bg2) {
        let indiceActual = 0;
        let capaActiva = 1;

        bg1.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${imagenesFondo[0]}')`;

        function cambiarFondo() {
            indiceActual = (indiceActual + 1) % imagenesFondo.length;
            const siguienteImagen = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${imagenesFondo[indiceActual]}')`;

            if (capaActiva === 1) {
                bg2.style.backgroundImage = siguienteImagen;
                bg2.classList.add('active');
                bg1.classList.remove('active');
                capaActiva = 2;
            } else {
                bg1.style.backgroundImage = siguienteImagen;
                bg1.classList.add('active');
                bg2.classList.remove('active');
                capaActiva = 1;
            }
        }
        setInterval(cambiarFondo, 4500);
    }

    /* ==========================================
       3. BASE DE DATOS DE PRODUCTOS
       ========================================== */
    const materialsData = {
        belbien: {
            title: "Acabados Belbien",
            category: "Vinil Arquitectónico",
            images: [
                "imagenes/belbien3.jpg",
                "imagenes/belbien2.jpg",
                "imagenes/belbien4.jpg",
                "imagenes/belbien5.jpg"
            ],
            description: "Láminas vinílicas arquitectónicas de alta precisión, reconocidas por su sustentabilidad, fácil mantenimiento y capacidad para renovar espacios sin obra pesada.",
            specs: ["Más de 680 acabados.", "Instalación en superficies curvas.", "Uso interior y exterior.", "Imitación madera, piedra y metal."]
        },
        lentex: {
            title: "Revestimientos Len-Tex",
            category: "Revestimiento Mural",
            images: [
                "imagenes/lentex1.jpg",
                "imagenes/lentex2.jpg",
                "imagenes/lentex4.jpg",
                "imagenes/lentex5.jpg"
            ],
            description: "Revestimientos murales de alta resistencia desarrollados y fabricados en EE. UU., ideales para hotelería y sector sanitario.",
            specs: ["Fabricación en EE. UU.", "Texturas tridimensionales y relieves.", "Tratamientos antimicrobianos."]
        },
        mirroflex: {
            title: "Paneles y Valdosas MirroFlex",
            category: "Revestimiento 3D",
            images: [
                "imagenes/mirroflex2.jpg",
                "imagenes/mirroflex3.jpg",
                "imagenes/mirroflex4.jpg",
                "imagenes/mirroflex5.jpg",
                "imagenes/mirroflex6.jpg",
                "imagenes/mirroflex7.jpg",
                "imagenes/mirroflex8.jpg",
                "imagenes/mirroflex9.jpg"
            ],
            description: "Paneles decorativos 3D de textura profunda para transformar planos estáticos en acentos volumétricos.",
            specs: ["Textura de profundidad acentuada.", "Para paredes y cielos rasos.", "Fácil corte e instalación.", "+ de 40 diseños,", "+ de 60 colores cada uno."]
        },
        piedra: {
            title: "Piedra Natural Flexible",
            category: "Revestimiento Pétreo",
            images: [
                "imagenes/piedra2.jpg",
                "imagenes/piedra3.jpg",
                "imagenes/piedra4.jpg",
                "imagenes/piedra5.jpg"
            ],
            description: "Lámina de piedra auténtica ultraligera con refuerzo polimérico, aportando flexibilidad y manteniendo el peso al mínimo.",
            specs: ["Ligero y resistente.", "Adherible a hormigón, madera, metal y MDF.", "Instalación con adhesivos de construcción."]
        },
        naturals: {
            title: "The Naturals",
            category: "texturas naturales",
            images: [
                "imagenes/corcho1.jpg",
                "imagenes/corcho2.jpg",
                "imagenes/corcho4.jpg",
                "imagenes/corcho5.jpg"
            ],
            description: "Materiales naturales entrelazados como sisal, tejidos de papel, yute, corcho y lino con paletas de colores vibrantes.",
            specs: ["Materiales naturales sostenibles.", "Tacto y estética únicos.", "Ideal para interiores orgánicos."]
        },
        aslan: {
            title: "Láminas Autoadhesivas ASLAN",
            category: "Superficies Interactivas",
            images: [
                "imagenes/aslan1.JPG",
                "imagenes/aslan2.JPG",
                "imagenes/aslan3.jpg",
                "imagenes/aslan5.jpg"
            ],
            description: "Permiten transformar superficies lisas en espacios de comunicación reutilizables, borrables en seco e incluso con propiedades magnéticas.", 
            specs: [
                "Opciones para pizarra negra, pizarra blanca y superficies ferrosas.", 
                "Paneles interactivos magnéticos y borrables en seco.", 
                "Ideal para oficinas, salas de seminarios, escuelas, restaurantes y hoteles.", 
                "Disponibilidad de láminas para transformar ventanas de vidrio en pantallas de retroproyección." 
            ]
        }
    };

    /* ==========================================
       4. LÓGICA DEL CATÁLOGO (Filtros, Scroll y Modal)
       ========================================== */
    const cards = document.querySelectorAll(".card");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const modal = document.getElementById("productModal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    // Efecto Fade-in al hacer scroll
    const observerOptions = { threshold: 0.1 };
    const entranceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => entranceObserver.observe(card));

    // Filtros de Categoría del Catálogo
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const activeFilter = btn.getAttribute("data-filter");

            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (activeFilter === "all" || category === activeFilter) {
                    card.classList.remove("is-hidden");
                    requestAnimationFrame(() => card.classList.add("is-visible"));
                } else {
                    card.classList.add("is-hidden");
                    card.classList.remove("is-visible");
                }
            });
        });
    });

    // Abrir Modal y Galería de 4 fotos
    function openModal(productId) {
        const data = materialsData[productId];
        if (!data) return;

        document.getElementById("modalTag").textContent = data.category;
        document.getElementById("modalTitle").textContent = data.title;
        document.getElementById("modalDesc").textContent = data.description;
        document.getElementById("modalSpecsList").innerHTML = data.specs
            .map(spec => `<li>${spec}</li>`).join("");

        const mainImg = document.getElementById("modalMainImg");
        mainImg.src = data.images[0];

        const thumbsContainer = document.getElementById("modalThumbs");
        thumbsContainer.innerHTML = data.images.map((imgSrc, index) => {
            const activeClass = index === 0 ? "active" : "";
            return `<img src="${imgSrc}" class="modal-thumb ${activeClass}" data-src="${imgSrc}" alt="Muestra de textura ${index + 1}">`;
        }).join("");

        const thumbs = thumbsContainer.querySelectorAll('.modal-thumb');
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function () {
                mainImg.style.opacity = 0.5;
                setTimeout(() => {
                    mainImg.src = this.getAttribute('data-src');
                    mainImg.style.opacity = 1;
                }, 150);
                thumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        modal.showModal();
    }

    cards.forEach(card => {
        const quickBtn = card.querySelector(".quick-view-btn");
        const productId = card.getAttribute("data-product");

        quickBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openModal(productId);
        });
        card.addEventListener("click", () => openModal(productId));
    });

    closeModalBtn.addEventListener("click", () => modal.close());

    modal.addEventListener("click", (event) => {
        const rect = modal.getBoundingClientRect();
        if (!(rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width)) {
            modal.close();
        }
    });

    /* ==========================================
       5. LÓGICA DE ARRASTRE PARA PROYECTOS DESTACADOS
       ========================================== */
    const carruselProyectos = document.getElementById('carrusel-proyectos');

    if (carruselProyectos) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carruselProyectos.addEventListener('mousedown', (e) => {
            isDown = true;
            carruselProyectos.style.cursor = 'grabbing';
            carruselProyectos.style.scrollSnapType = 'none';
            startX = e.pageX - carruselProyectos.offsetLeft;
            scrollLeft = carruselProyectos.scrollLeft;
        });

        carruselProyectos.addEventListener('mouseleave', () => {
            isDown = false;
            carruselProyectos.style.cursor = 'grab';
            carruselProyectos.style.scrollSnapType = 'x mandatory';
        });

        carruselProyectos.addEventListener('mouseup', () => {
            isDown = false;
            carruselProyectos.style.cursor = 'grab';
            carruselProyectos.style.scrollSnapType = 'x mandatory';
        });

        carruselProyectos.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carruselProyectos.offsetLeft;
            const walk = (x - startX) * 2; // Velocidad de arrastre
            carruselProyectos.scrollLeft = scrollLeft - walk;
        });

        // Prevenir que las imágenes se arrastren nativamente y rompan el efecto
        carruselProyectos.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
    }

}); // <-- Fin del DOMContentLoaded
