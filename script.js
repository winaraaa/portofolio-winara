document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 1. MENU NAVIGASI
    // =========================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";

            });

        });

    }


    // =========================
    // 2. TAHUN OTOMATIS
    // =========================

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =========================
    // 3. DETAIL PROYEK
    // =========================

    const projects = {

        kosunsulbar: {
            title: "KosUnsulbar",

            description:
                "KosUnsulbar adalah prototype aplikasi pencarian kos bagi mahasiswa Universitas Sulawesi Barat. Aplikasi ini dirancang untuk membantu mahasiswa menemukan kos berdasarkan lokasi, harga, fasilitas, dan jenis kos.",

            tags: ["Figma", "UI/UX Design", "Prototype"]
        },

        portal: {
            title: "Portal Akademik Sederhana",

            description:
                "Portal Akademik Sederhana merupakan proyek latihan pengembangan website menggunakan HTML, CSS, dan PHP. Proyek ini berfokus pada tampilan informasi dan formulir data mahasiswa.",

            tags: ["HTML", "CSS", "PHP"]
        },

        portfolio: {
            title: "Portofolio Pribadi",

            description:
                "Website portofolio ini dibuat untuk memperkenalkan diri, menampilkan proyek, dan menyediakan informasi kontak. Website menggunakan HTML, CSS, dan JavaScript.",

            tags: ["HTML", "CSS", "JavaScript"]
        }

    };


    const projectButtons = document.querySelectorAll("[data-project]");
    const projectModal = document.getElementById("project-modal");
    const modalClose = document.getElementById("modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalTags = document.getElementById("modal-tags");


    projectButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const projectKey = button.dataset.project;
            const project = projects[projectKey];

            if (!project || !projectModal) {
                return;
            }

            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;

            modalTags.replaceChildren();

            project.tags.forEach(function (tag) {

                const span = document.createElement("span");

                span.textContent = tag;

                modalTags.appendChild(span);

            });

            projectModal.showModal();

        });

    });


    // Menutup modal

    if (modalClose && projectModal) {

        modalClose.addEventListener("click", function () {
            projectModal.close();
        });

        projectModal.addEventListener("click", function (event) {

            if (event.target === projectModal) {
                projectModal.close();
            }

        });

    }


    // =========================
    // 4. FORMULIR KONTAK
    // =========================

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");


    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();


            // Validasi nama

            if (name.length < 2) {

                formStatus.textContent =
                    "Nama minimal harus terdiri dari 2 karakter.";

                return;
            }


            // Validasi email

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                formStatus.textContent =
                    "Masukkan alamat email yang valid.";

                return;
            }


            // Validasi subjek

            if (subject.length === 0) {

                formStatus.textContent =
                    "Subjek pesan tidak boleh kosong.";

                return;
            }


            // Validasi pesan

            if (message.length < 10) {

                formStatus.textContent =
                    "Pesan minimal harus terdiri dari 10 karakter.";

                return;
            }


            // Formulir baru divalidasi

            formStatus.textContent =
                "Formulir berhasil divalidasi. Pengiriman pesan belum diaktifkan.";

            contactForm.reset();

        });

    }

});