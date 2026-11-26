/* =========================================================
   nav.js — Barre de navigation secondaire
   Meylan Handball · Arbitrage · Saison 26-27

   Usage : placer <script src="nav.js"></script> à l'endroit
   où la barre doit apparaître (à la place de <nav class="subnav">).
   Le lien de la page courante est mis en "active" automatiquement.
   ========================================================= */
(function () {
  // ---- 1. Liens de navigation : à modifier ici uniquement ----
  const LIENS = [
    { label: "Accueil",       href: "index.html" },
    { label: "Fiches d'aide", href: "ressources.html" },
    { label: "Commission",    href: "commission.html" }
  ];

  // ---- 2. Styles (injectés une seule fois) ----
  const CSS = `
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
      .subnav {
        padding-left: 1.2rem;
        padding-right: 1.2rem;
        overflow-x: auto;
      }
      .subnav a { white-space: nowrap; }
    }
  `;

  if (!document.getElementById("subnav-style")) {
    const style = document.createElement("style");
    style.id = "subnav-style";
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // ---- 3. Détection de la page courante ----
  let page = window.location.pathname.split("/").pop();
  if (!page) page = "index.html"; // cas "https://site.github.io/repo/"

  // ---- 4. Construction de la barre ----
  const nav = document.createElement("nav");
  nav.className = "subnav";

  LIENS.forEach(function (lien) {
    const a = document.createElement("a");
    a.href = lien.href;
    a.textContent = lien.label;
    if (lien.href === page) a.classList.add("active");
    nav.appendChild(a);
  });

  // ---- 5. Insertion à l'emplacement du <script> ----
  const script = document.currentScript;
  if (script && script.parentNode) {
    script.parentNode.insertBefore(nav, script);
  } else {
    document.body.prepend(nav);
  }
})();
