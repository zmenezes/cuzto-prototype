/* Cuzto Prototype — Shared JS */

(function () {
  "use strict";

  /* ======== THEME TOGGLE ======== */
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    var themes = ["light", "dark"];
    var ti = 0;
    try {
      var saved = localStorage.getItem("cuzto-theme");
      if (saved) {
        ti = themes.indexOf(saved);
        if (ti < 0) ti = 0;
        document.documentElement.setAttribute("data-theme", themes[ti]);
      }
    } catch (e) {}
    themeBtn.addEventListener("click", function () {
      ti = (ti + 1) % themes.length;
      document.documentElement.setAttribute("data-theme", themes[ti]);
      try {
        localStorage.setItem("cuzto-theme", themes[ti]);
      } catch (e) {}
      updateThemeIcon();
    });
    function updateThemeIcon() {
      if (themes[ti] === "dark") {
        themeBtn.innerHTML =
          '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      } else {
        themeBtn.innerHTML =
          '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
      }
    }
    updateThemeIcon();
  }

  /* ======== SIDEBAR ACTIVE STATE ======== */
  var currentPage = location.pathname.split("/").pop() || "dashboard.html";
  var page = currentPage.replace(".html", "");
  var parentMap = {
    "expense-detail": "expenses",
    "expense-new-manual": "expenses",
    "expenses-empty": "expenses",
    "expense-reversal": "expenses",
    "approval-confirm": "approvals",
    "approval-reject-confirm": "approvals",
    "approvals-bulk": "approvals",
    "employee-detail": "employees",
    "employee-new": "employees",
    "employee-edit": "employees",
    "employee-deactivate": "employees",
    "advance-detail": "advances",
    "advance-new": "advances",
    "advance-payment": "advances",
    "policy-rule-new": "policy",
    "policy-rule-edit": "policy",
    "policy-new-version": "policy",
    "policy-version-detail": "policy",
    "audit-detail": "audit",
    "settings-company": "settings",
    "settings-whatsapp": "settings",
    "user-new": "settings",
    "user-edit": "settings",
    "user-permissions": "settings",
    "whatsapp-template-edit": "settings",
    "whatsapp-test": "settings",
    "export-progress": "export",
    notifications: "dashboard",
    "search-results": "dashboard",
    profile: "settings",
    reports: "reports",
    "empty-dashboard": "dashboard",
  };
  var match = parentMap[page] || page;
  document.querySelectorAll(".nav-item").forEach(function (item) {
    var href = item.getAttribute("href");
    if (href && href.replace(".html", "") === match) {
      item.classList.add("active");
    }
  });

  /* ======== BOTTOM NAV ACTIVE STATE ======== */
  document.querySelectorAll(".bnav-item").forEach(function (item) {
    var href = item.getAttribute("href");
    if (href && href.replace(".html", "") === match) {
      item.classList.add("active");
    }
  });

  /* ======== SIDEBAR MOBILE DRAWER ======== */
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("sidebar-overlay");
  var hamburger = document.getElementById("hamburger");

  function openSidebar() {
    if (sidebar) sidebar.classList.add("open");
    if (overlay) overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (hamburger) hamburger.addEventListener("click", openSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  /* ======== CHIP TOGGLES ======== */
  document.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip[data-toggle]");
    if (chip) {
      chip.classList.toggle("on");
    }
  });

  /* ======== PASSWORD TOGGLE ======== */
  document.querySelectorAll(".pw-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wrap = btn.closest(".pw-wrap");
      var inp = wrap ? wrap.querySelector("input") : null;
      if (!inp) return;
      if (inp.type === "password") {
        inp.type = "text";
        btn.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
      } else {
        inp.type = "password";
        btn.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
      }
    });
  });

  /* ======== TABLE ROW CLICKS ======== */
  document.querySelectorAll("tr[data-href]").forEach(function (row) {
    row.addEventListener("click", function () {
      window.location.href = row.dataset.href;
    });
  });

  /* ======== MOBILE CARD CLICKS ======== */
  document.querySelectorAll(".m-exp-card[data-href]").forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (e.target.closest("a,button")) return;
      window.location.href = card.dataset.href;
    });
  });

  /* ======== NOTIFICATION DROPDOWN ======== */
  var notifBtn = document.getElementById("notif-btn");
  var notifDd = document.getElementById("notif-dropdown");
  if (notifBtn && notifDd) {
    notifBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      notifDd.classList.toggle("open");
      // Close user menu if open
      var userDd = document.getElementById("user-dropdown");
      if (userDd) userDd.classList.remove("open");
    });
  }

  /* ======== USER MENU DROPDOWN ======== */
  var userBtn = document.getElementById("user-menu-btn");
  var userDd = document.getElementById("user-dropdown");
  if (userBtn && userDd) {
    userBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      userDd.classList.toggle("open");
      // Close notification dropdown if open
      if (notifDd) notifDd.classList.remove("open");
    });
  }

  /* ======== CLOSE DROPDOWNS ON OUTSIDE CLICK ======== */
  document.addEventListener("click", function () {
    if (notifDd) notifDd.classList.remove("open");
    if (userDd) userDd.classList.remove("open");
  });
  // Prevent closing when clicking inside dropdowns
  if (notifDd)
    notifDd.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  if (userDd)
    userDd.addEventListener("click", function (e) {
      e.stopPropagation();
    });

  /* ======== TAB SWITCHING ======== */
  document.querySelectorAll("[data-tab-group]").forEach(function (group) {
    var tabs = group.querySelectorAll("[data-tab]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.dataset.tab;
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");
        var panels = group.parentElement.querySelectorAll("[data-panel]");
        panels.forEach(function (p) {
          p.style.display = p.dataset.panel === target ? "" : "none";
        });
      });
    });
  });

  /* ======== CUSTOM 3D SELECT ======== */
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest(".cs-trigger");
    if (trigger) {
      var wrap = trigger.closest(".custom-select");
      var wasOpen = wrap.classList.contains("open");
      document.querySelectorAll(".custom-select.open").forEach(function (s) {
        s.classList.remove("open");
      });
      if (!wasOpen) wrap.classList.add("open");
      return;
    }
    var opt = e.target.closest(".cs-opt");
    if (opt) {
      var wrap = opt.closest(".custom-select");
      var valEl = wrap.querySelector(".cs-val") || wrap.querySelector(".cs-placeholder");
      wrap.querySelectorAll(".cs-opt").forEach(function (o) {
        o.classList.remove("selected");
      });
      opt.classList.add("selected");
      if (valEl.classList.contains("cs-placeholder")) {
        valEl.classList.remove("cs-placeholder");
        valEl.classList.add("cs-val");
      }
      valEl.textContent = opt.textContent;
      wrap.classList.remove("open");
      return;
    }
    document.querySelectorAll(".custom-select.open").forEach(function (s) {
      s.classList.remove("open");
    });
  });

  // Sidebar user menu
  document.querySelectorAll(".sidebar-user").forEach(function (user) {
    var menu = user.querySelector(".sidebar-user-menu");
    if (!menu) {
      // Detect if admin or company context
      var isAdmin = location.pathname.indexOf("/admin/") !== -1;
      var profileHref = isAdmin ? "admin-users.html" : "../company/profile.html";
      var settingsHref = isAdmin ? "system-health.html" : "../company/settings.html";
      var logoutHref = isAdmin ? "login.html" : "../company/login.html";
      // Fix relative paths for company pages (already in company/)
      if (!isAdmin) {
        profileHref = "profile.html";
        settingsHref = "settings.html";
        logoutHref = "login.html";
      }
      menu = document.createElement("div");
      menu.className = "sidebar-user-menu";
      menu.innerHTML =
        '<a href="' +
        profileHref +
        '"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Meu perfil</a>' +
        '<a href="' +
        settingsHref +
        '"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4"/></svg>Configurações</a>' +
        '<div class="sep"></div>' +
        '<a href="' +
        logoutHref +
        '" class="logout"><svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sair</a>';
      user.appendChild(menu);
    }
    user.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("open");
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".sidebar-user-menu.open").forEach(function (m) {
      m.classList.remove("open");
    });
  });

  // Number stepper
  document.querySelectorAll(".stepper-inline, .stepper").forEach(function (s) {
    var val = s.querySelector("span, .stepper-val");
    var btns = s.querySelectorAll("button");
    if (!val || btns.length < 2) return;
    var min = parseInt(s.dataset.min || "1", 10);
    var max = parseInt(s.dataset.max || "10", 10);
    function update() {
      var n = parseInt(val.textContent, 10);
      btns[0].disabled = n <= min;
      btns[1].disabled = n >= max;
    }
    btns[0].addEventListener("click", function () {
      var n = parseInt(val.textContent, 10);
      if (n > min) {
        val.textContent = n - 1;
        update();
      }
    });
    btns[1].addEventListener("click", function () {
      var n = parseInt(val.textContent, 10);
      if (n < max) {
        val.textContent = n + 1;
        update();
      }
    });
    update();
  });

  // Currency mask BRL — auto-applies to all inputs inside .currency-wrap
  // and inputs with data-currency attribute
  function formatBRL(value) {
    var digits = value.replace(/\D/g, "");
    if (!digits) return "";
    var num = parseInt(digits, 10);
    var reais = Math.floor(num / 100);
    var cents = num % 100;
    var reaisStr = reais.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return reaisStr + "," + ("0" + cents).slice(-2);
  }

  function applyCurrencyMask(inp) {
    inp.addEventListener("input", function () {
      var pos = inp.selectionStart;
      var oldLen = inp.value.length;
      inp.value = formatBRL(inp.value);
      var newLen = inp.value.length;
      var newPos = Math.max(0, pos + (newLen - oldLen));
      inp.setSelectionRange(newPos, newPos);
    });
    if (inp.value) inp.value = formatBRL(inp.value);
  }

  document.querySelectorAll(".currency-wrap input").forEach(applyCurrencyMask);
  document.querySelectorAll("input[data-currency]").forEach(applyCurrencyMask);
})();
