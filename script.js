/* =========================================
   MENU MOBILE
========================================= */

const hamburger = document.querySelector("#hamburger");
const navLinks = document.querySelector("#navLinks");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        hamburger.classList.toggle("active");

        hamburger.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        hamburger.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

    });


    /* Fechar menu ao clicar em um link */

    const menuLinks = navLinks.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            hamburger.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

            hamburger.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        });

    });

}


/* =========================================
   CARROSSEL DO PORTFÓLIO
========================================= */

const portfolioTrack =
    document.querySelector("#portfolioTrack");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");

const portfolioPrev =
    document.querySelector("#portfolioPrev");

const portfolioNext =
    document.querySelector("#portfolioNext");

const portfolioDots =
    document.querySelector("#portfolioDots");


let currentPosition = 0;


/* =========================================
   QUANTIDADE DE PROJETOS VISÍVEIS
========================================= */

function getVisibleProjects() {

    if (window.innerWidth <= 600) {
        return 1;
    }

    if (window.innerWidth <= 900) {
        return 2;
    }

    return 3;
}


/* =========================================
   CRIAR INDICADORES
========================================= */

if (portfolioDots && portfolioItems.length > 0) {

    portfolioItems.forEach((item, index) => {

        const dot = document.createElement("button");

        dot.classList.add("portfolio-dot");

        dot.setAttribute(
            "aria-label",
            `Ir para o projeto ${index + 1}`
        );

        dot.addEventListener("click", () => {

            currentPosition = index;

            updatePortfolio();

        });

        portfolioDots.appendChild(dot);

    });

}


/* =========================================
   ATUALIZAR PORTFÓLIO
========================================= */

function updatePortfolio() {

    if (!portfolioItems.length) {
        return;
    }

    const visibleProjects =
        getVisibleProjects();

    const maxPosition =
        Math.max(
            0,
            portfolioItems.length - visibleProjects
        );


    /* Impede posição inválida */

    if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
    }

    if (currentPosition < 0) {
        currentPosition = 0;
    }


    /* Mostrar / esconder projetos */

    portfolioItems.forEach((item, index) => {

        if (
            index >= currentPosition &&
            index < currentPosition + visibleProjects
        ) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });


    /* Atualizar indicadores */

    const dots =
        document.querySelectorAll(".portfolio-dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentPosition
        );

    });


    /* Seta esquerda */

    if (portfolioPrev) {

        portfolioPrev.disabled =
            currentPosition === 0;

    }


    /* Seta direita */

    if (portfolioNext) {

        portfolioNext.disabled =
            currentPosition >= maxPosition;

    }

}


/* =========================================
   SETA ESQUERDA
========================================= */

if (portfolioPrev) {

    portfolioPrev.addEventListener("click", () => {

        if (currentPosition > 0) {

            currentPosition--;

            updatePortfolio();

        }

    });

}


/* =========================================
   SETA DIREITA
========================================= */

if (portfolioNext) {

    portfolioNext.addEventListener("click", () => {

        const visibleProjects =
            getVisibleProjects();

        const maxPosition =
            Math.max(
                0,
                portfolioItems.length - visibleProjects
            );

        if (currentPosition < maxPosition) {

            currentPosition++;

            updatePortfolio();

        }

    });

}


/* =========================================
   RESPONSIVIDADE
========================================= */

window.addEventListener("resize", () => {

    updatePortfolio();

});


/* =========================================
   INICIALIZAÇÃO
========================================= */

updatePortfolio();