/* =========================================================
   nav.js — En-tête + barre de navigation
   Meylan Handball · Arbitrage · Saison 26-27

   Usage : placer <script src="nav.js"></script> juste après
   <div class="top-stripe"></div> (à la place de <header> et <nav>).
   Le lien de la page courante est mis en "active" automatiquement.

   Options (facultatives) pour personnaliser l'en-tête d'une page :
   <script src="nav.js" data-titre="Mon titre" data-sous-titre="Mon sous-titre"></script>
   ========================================================= */
(function () {
  // ---- 1. Configuration : à modifier ici uniquement ----
  const LOGO = "MHB_logo.png";
  const TITRE = "Suivi Pédagogique";
  const SOUS_TITRE = "Meylan Handball · Arbitrage · Saison 26-27";

  const LIENS = [
    { label: "Accueil",       href: "index.html" },
    { label: "Fiches d'aide", href: "ressources.html" },
    { label: "Commission",    href: "commission.html" }
  ];

  // ---- 2. Styles (injectés une seule fois) ----
  const CSS = `
    /* HEADER */
    .site-header {
      padding: 2.5rem 3rem 2rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      border-bottom: 1px solid #222;
      position: relative;
    }
    .site-header .logo-badge {
      width: 75px;
      height: 75px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.4rem;
      color: white;
      flex-shrink: 0;
      letter-spacing: 1px;
      object-fit: contain;
    }
    .site-header .header-text h1 {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.6rem;
      letter-spacing: 3px;
      color: var(--blanc, #F5F2EC);
      line-height: 1;
    }
    .site-header .header-text p {
      font-size: 0.72rem;
      color: var(--texte-doux, #9A9A9A);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 4px;
    }

    /* NAV */
    .subnav {
      padding: 0 3rem;
      border-bottom: 1px solid #222;
      display: flex;
      gap: 0;
    }
    .subnav a {
      padding: 0.9rem 1.4rem;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--texte-doux, #9A9A9A);
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: color 0.2s, border-color 0.2s;
    }
    .subnav a.active,
    .subnav a:hover {
      color: var(--blanc, #F5F2EC);
      border-bottom-color: var(--bleu, #4A9FFF);
    }

    @media (max-width: 700px) {
      .site-header,
      .subnav {
        padding-left: 1.2rem;
        padding-right: 1.2rem;
      }
      .subnav { overflow-x: auto; }
      .subnav a { white-space: nowrap; }
    }
  `;

  if (!document.getElementById("site-nav-style")) {
    const style = document.createElement("style");
    style.id = "site-nav-style";
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // ---- 3. Détection de la page courante ----
  let page = window.location.pathname.split("/").pop();
  if (!page) page = "index.html"; // cas "https://site.github.io/repo/"

  // ---- 4. Construction de l'en-tête ----
  const script = document.currentScript;
  const titre = (script && script.dataset.titre) || TITRE;
  const sousTitre = (script && script.dataset.sousTitre) || SOUS_TITRE;

  const header = document.createElement("header");
  header.className = "site-header";

  const logo = document.createElement("img");
  logo.className = "logo-badge";
  logo.src = LOGO;
  logo.alt = "Logo Meylan Handball";

  const texte = document.createElement("div");
  texte.className = "header-text";
  const h1 = document.createElement("h1");
  h1.textContent = titre;
  const p = document.createElement("p");
  p.textContent = sousTitre;
  texte.append(h1, p);

  header.append(logo, texte);

  // ---- 5. Construction de la barre de navigation ----
  const nav = document.createElement("nav");
  nav.className = "subnav";

  LIENS.forEach(function (lien) {
    const a = document.createElement("a");
    a.href = lien.href;
    a.textContent = lien.label;
    if (lien.href === page) a.classList.add("active");
    nav.appendChild(a);
  });

  // ---- 6. Insertion à l'emplacement du <script> ----
  if (script && script.parentNode) {
    script.parentNode.insertBefore(header, script);
    script.parentNode.insertBefore(nav, script);
  } else {
    document.body.prepend(nav);
    document.body.prepend(header);
  }
})();
