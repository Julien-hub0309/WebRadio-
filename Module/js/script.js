// ====================================================================
// SECTION 1: Vérification du mot de passe pour l'admin
// ====================================================================
function verifierMotDePasse() {
    var password = document.getElementById("password").value;
    if (password === "test") {  // Change le mot de passe ici
        window.location.href = "podcaste_admin.html"; // Redirige vers la page
    } else {
        alert("Mot de passe incorrect !");
    }
}

// ====================================================================
// SECTION 2: Gestion du toggle de la sidebar
// ====================================================================
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var overlay = document.getElementById("overlay");
    if (sidebar) {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}



// ====================================================================
// SECTION 3: Redirection après fermeture de la sidebar
// ====================================================================
function redirectWithSidebarClose(url) {
    var sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.add("closing");
        setTimeout(function () {
            window.location.href = url;
        }, 300);
    }
}

// ====================================================================
// SECTION 4: Ouverture et fermeture du modal de connexion
// ====================================================================
function openLoginModal() {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("loginModal");

  overlay.style.display = "block";
  overlay.style.zIndex = "1000";

  modal.style.display = "flex";  // flex pour centrer si tu veux
  modal.style.zIndex = "1100";
}

function closeLoginModal() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("loginModal").style.display = "none";
}


document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector("button[type='submit']");
    let originalPosition = { left: "0px", top: "0px" }; // Position initiale

    loginButton.style.position = "relative"; // Assure que le bouton peut bouger

    loginButton.addEventListener("mouseenter", function () {
        if (!emailInput.value || !passwordInput.value) {
            moveButton();
        }
    });

    function moveButton() {
        const maxX = 400; // Déplacement max en X
        const maxY = 200; // Déplacement max en Y
        const randomX = Math.floor(Math.random() * maxX) - maxX / 2;
        const randomY = Math.floor(Math.random() * maxY) - maxY / 2;

        loginButton.style.left = `${randomX}px`;
        loginButton.style.top = `${randomY}px`;
    }

    function resetButtonPosition() {
        loginButton.style.left = originalPosition.left;
        loginButton.style.top = originalPosition.top;
    }

    // Vérifie si les champs sont remplis et remet le bouton en place
    function checkInputs() {
        if (emailInput.value && passwordInput.value) {
            resetButtonPosition();
        }
    }

    emailInput.addEventListener("input", checkInputs);
    passwordInput.addEventListener("input", checkInputs);
});


// ====================================================================
// SECTION 5: Fermeture de tous les panneaux avant d'en ouvrir un autre
// ====================================================================
function closeAllPanels() {
    const panels = [
        "loginPanel", 
        "uploadModal", 
        "sideMenu"
    ];
    panels.forEach(panelId => {
        const panel = document.getElementById(panelId);
        if (panel) {
            if (panelId === "sideMenu") {
                panel.style.right = "-250px";
            } else {
                panel.style.display = "none";
            }
        }
    });
}

// ====================================================================
// SECTION 6: Gestion du panneau de connexion (Login Panel)
// ====================================================================
function openPanel() {
    closeAllPanels();
    const loginPanel = document.getElementById("loginPanel");
    if (loginPanel) loginPanel.classList.add("active");
}

function closePanel() {
    const loginPanel = document.getElementById("loginPanel");
    if (loginPanel) loginPanel.classList.remove("active");
}

// ====================================================================
// SECTION 7: Gestion du modal d'upload de vidéo
// ====================================================================
const openModal = document.getElementById("openModal");
const closeUpload = document.querySelector(".close");
const uploadForm = document.getElementById("uploadForm");

if (openModal) {
    openModal.addEventListener("click", function() {
        closeAllPanels();
        const uploadModal = document.getElementById("uploadModal");
        if (uploadModal) uploadModal.style.display = "flex";
    });
}

if (closeUpload) {
    closeUpload.addEventListener("click", function() {
        const uploadModal = document.getElementById("uploadModal");
        if (uploadModal) uploadModal.style.display = "none";
    });
}

// Gérer l'upload sans recharger la page
if (uploadForm) {
    uploadForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêcher le rechargement

        var formData = new FormData(this);
        var file = document.getElementById("video").files[0];

        // Vérifier si le fichier est bien une vidéo
        if (file && file.type.startsWith('video/')) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "video.php", true);

            xhr.onload = function() {
                if (xhr.status == 200) {
                    var newVideo = document.createElement("video");
                    newVideo.setAttribute("controls", "true");
                    newVideo.setAttribute("src", "uploads/" + file.name);
                    newVideo.style.width = "320px";
                    newVideo.style.height = "240px";

                    const videosContainer = document.getElementById("videos");
                    if (videosContainer) {
                        videosContainer.appendChild(newVideo);
                    } else {
                        console.error("Le conteneur des vidéos n'a pas été trouvé.");
                    }

                    // Fermer la modale après l'upload
                    const uploadModal = document.getElementById("uploadModal");
                    if (uploadModal) uploadModal.style.display = "none";
                }
            };

            xhr.send(formData);
        } else {
            alert('Veuillez télécharger un fichier vidéo valide.');
        }
    });
}

// ====================================================================
// SECTION 8: Gestion du menu déroulant (side menu)
// ====================================================================
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");

if (openMenu) {
    openMenu.addEventListener("click", () => {
        closeAllPanels();
        if (sideMenu) sideMenu.style.right = "0";
    });
}

if (closeMenu) {
    closeMenu.addEventListener("click", () => {
        if (sideMenu) sideMenu.style.right = "-250px";
    });
}

// Fermer le menu lorsqu'on clique sur un lien
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        if (sideMenu) sideMenu.style.right = "-250px";
    });
});

// ====================================================================
// SECTION 9: Gestion du carrousel d'images
// ====================================================================
let index = 0;
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.style.transform = `translateX(${-index * 100}%)`;
    }

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
}

function nextImage() {
    index = (index + 1) % totalImages;
    updateCarousel();
}

function prevImage() {
    index = (index - 1 + totalImages) % totalImages;
    updateCarousel();
}

if (prevButton && nextButton) {
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
    });
});

// Défilement automatique
if (totalImages > 0) {
    setInterval(function() {
        if (!document.querySelector('.carousel:hover')) {
            nextImage();
        }
    }, 10000);  // Défiler toutes les 10 secondes
}

updateCarousel();

// ====================================================================
// SECTION 10: Gestion du modal supplémentaire (MyModal)
// ====================================================================
// Obtenez le modal
var modal = document.getElementById("myModal");

// Obtenez le bouton qui ouvre le modal
var btn = document.getElementById("openModalBtn");

// Obtenez le bouton de fermeture
var span = document.getElementsByClassName("close")[0];

// Lorsque l'utilisateur clique sur le bouton, ouvrez le modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Lorsque l'utilisateur clique sur (x), fermez le modal
span.onclick = function() {
  modal.style.display = "none";
}

// Lorsque l'utilisateur clique en dehors du modal, fermez-le
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// ====================================================================
// SECTION 11: Bouton vers le haut
// ====================================================================
window.onscroll = function() {     
    document.getElementById("topButton").style.display = (window.scrollY > 300) ? "block" : "none"; 
}
function scrollToTop() {     
    window.scrollTo({top: 0, behavior: "smooth"}); 
}

// ====================================================================
// SECTION 12: Barre de recherche
// ====================================================================
function toggleSearchBar() {
    let searchWrapper = document.querySelector(".search-wrapper");
    let searchButton = document.querySelector(".search-wrapper button");
    
    searchWrapper.classList.toggle("active");
    
    if (searchWrapper.classList.contains("active")) {
        searchButton.style.opacity = "1";
        searchButton.style.visibility = "visible";
    } else {
        searchButton.style.opacity = "0";
        searchButton.style.visibility = "hidden";
    }
}

// Ferme la barre si on clique en dehors
document.addEventListener("click", function(event) {
    let searchWrapper = document.querySelector(".search-wrapper");
    let searchButton = document.querySelector(".search-wrapper button");
    
    if (!searchWrapper.contains(event.target)) {
        searchWrapper.classList.remove("active");
        searchButton.style.opacity = "0";
        searchButton.style.visibility = "hidden";
    }
});

function searchText() {
    let searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput === "") return;
    
    // Supprime les anciens surlignages
    removeHighlights();
    
    let regex = new RegExp(searchInput, "gi");
    let paragraphs = document.querySelectorAll("p, h6");
    
    paragraphs.forEach(p => {
        p.innerHTML = p.innerHTML.replace(regex, (match) => `<span class='highlight'>${match}</span>`);
    });
    
    // Scroll jusqu'au premier élément surligné
    let firstHighlight = document.querySelector(".highlight");
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function removeHighlights() {
    document.querySelectorAll(".highlight").forEach(span => {
        span.outerHTML = span.innerHTML; // Remet le texte à son état d'origine
    });
}

document.getElementById("overlay").addEventListener("click", () => {
    // Ferme la sidebar si elle est active
    const sidebar = document.getElementById("sidebar");
    if (sidebar && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
    }

    // Ferme le modal de login si visible
    const loginModal = document.getElementById("loginModal");
    if (loginModal && loginModal.style.display !== "none") {
        closeLoginModal();
    }

    // Désactive l'overlay
    document.getElementById("overlay").classList.remove("active");
    document.getElementById("overlay").style.display = "none";
});
