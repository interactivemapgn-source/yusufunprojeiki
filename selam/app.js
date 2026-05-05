const STORAGE_KEY = "akademiport-data-v1";
const SESSION_KEY = "akademiport-session-v1";
const THEME_KEY = "akademiport-theme-v1";

const seedData = {
  users: [
    {
      id: "u-admin",
      name: "Okul Admini",
      email: "admin@okul.test",
      password: "Admin123",
      role: "admin",
      className: "Yönetim",
      status: "Aktif",
    },
    {
      id: "u-student",
      name: "Deniz Yılmaz",
      email: "ogrenci@okul.test",
      password: "Ogrenci123",
      role: "user",
      className: "11-A",
      status: "Aktif",
    },
    {
      id: "u-parent",
      name: "Ayşe Kaya",
      email: "veli@okul.test",
      password: "Veli123",
      role: "user",
      className: "Veli",
      status: "Aktif",
    },
  ],
  announcements: [
    {
      id: "a-1",
      title: "Matematik deneme sınavı",
      body: "11. sınıflar için deneme sınavı cuma günü birinci ders saatinde yapılacaktır.",
      category: "Sınav",
      audience: "11. sınıflar",
      date: "2026-05-08",
    },
    {
      id: "a-2",
      title: "Bilim şenliği başvuruları",
      body: "Proje başvuruları idare ofisine teslim edilebilir. Son teslim tarihi 15 Mayıs.",
      category: "Etkinlik",
      audience: "Tüm okul",
      date: "2026-05-15",
    },
    {
      id: "a-3",
      title: "Kütüphane çalışma saatleri",
      body: "Sınav haftası boyunca kütüphane hafta içi 18.30'a kadar açık olacaktır.",
      category: "Bilgilendirme",
      audience: "Öğrenci ve veliler",
      date: "2026-05-06",
    },
  ],
  courses: [
    {
      id: "c-1",
      name: "Matematik",
      teacher: "Ece Demir",
      day: "Pazartesi",
      time: "09:00",
      endTime: "09:40",
      room: "Derslik 204",
      quota: 28,
    },
    {
      id: "c-2",
      name: "Türk Dili ve Edebiyatı",
      teacher: "Serkan Aydın",
      day: "Salı",
      time: "10:00",
      endTime: "10:40",
      room: "Derslik 105",
      quota: 26,
    },
    {
      id: "c-3",
      name: "Bilişim Teknolojileri",
      teacher: "Derya Çelik",
      day: "Çarşamba",
      time: "13:20",
      endTime: "14:00",
      room: "Laboratuvar 2",
      quota: 22,
    },
    {
      id: "c-4",
      name: "İngilizce",
      teacher: "Nazlı Karaca",
      day: "Perşembe",
      time: "11:00",
      endTime: "11:40",
      room: "Derslik 302",
      quota: 24,
    },
  ],
  teachers: [
    {
      id: "t-1",
      name: "Ece Demir",
      branch: "Matematik",
      email: "ece.demir@akademiport.test",
      phone: "0212 000 10 11",
      room: "Öğretmenler Odası A",
      officeHours: "Pazartesi 14:00 - 15:00",
      bio: "TYT ve AYT matematik hazırlık çalışmalarını yürütür.",
    },
    {
      id: "t-2",
      name: "Serkan Aydın",
      branch: "Türk Dili ve Edebiyatı",
      email: "serkan.aydin@akademiport.test",
      phone: "0212 000 10 12",
      room: "Öğretmenler Odası B",
      officeHours: "Salı 13:00 - 14:00",
      bio: "Okuma kulübü ve yazılı anlatım çalışmalarından sorumludur.",
    },
    {
      id: "t-3",
      name: "Derya Çelik",
      branch: "Bilişim Teknolojileri",
      email: "derya.celik@akademiport.test",
      phone: "0212 000 10 13",
      room: "Laboratuvar 2",
      officeHours: "Çarşamba 15:00 - 16:00",
      bio: "Web teknolojileri, algoritma ve proje geliştirme derslerini yürütür.",
    },
    {
      id: "t-4",
      name: "Nazlı Karaca",
      branch: "İngilizce",
      email: "nazli.karaca@akademiport.test",
      phone: "0212 000 10 14",
      room: "Derslik 302",
      officeHours: "Perşembe 12:20 - 13:00",
      bio: "Konuşma pratiği ve yabancı dil sınav hazırlığı çalışmalarını yürütür.",
    },
  ],
  contact: {
    schoolName: "AkademiPort Anadolu Lisesi",
    address: "Akademi Mah. Eğitim Cad. No:12, İstanbul",
    phone: "0212 000 10 00",
    email: "info@akademiport.test",
    hours: "Hafta içi 08:30 - 17:00",
    department: "İdare ve danışma birimi",
    note: "Randevu ve resmi belge talepleri için mesaj formunu kullanabilirsiniz.",
  },
  exams: [
    { id: "e-1", lesson: "Matematik", date: "2026-05-08", time: "09:00", className: "11-A" },
    { id: "e-2", lesson: "Bilişim Teknolojileri", date: "2026-05-12", time: "13:20", className: "11-A" },
    { id: "e-3", lesson: "İngilizce", date: "2026-05-18", time: "11:00", className: "11-B" },
  ],
  requests: [
    {
      id: "r-1",
      userId: "u-student",
      subject: "Öğrenci belgesi",
      body: "Yarışma başvurusu için öğrenci belgesi istiyorum.",
      status: "Bekliyor",
      date: "2026-05-04",
    },
  ],
};

const app = document.querySelector("#app");
const headerActions = document.querySelector("#headerActions");

let data = loadData();
let session = loadSession();
let route = getInitialRoute();
let adminTab = "announcements";
let editingAnnouncementId = null;
let editingCourseId = null;
let editingExamId = null;
let editingTeacherId = null;
let theme = loadTheme();

applyTheme(theme);
render();

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function addMinutesToTime(time, minutes) {
  if (!time || !time.includes(":")) return "";
  const [hour, minute] = time.split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  const nextHour = String(Math.floor(total / 60) % 24).padStart(2, "0");
  const nextMinute = String(total % 60).padStart(2, "0");
  return `${nextHour}:${nextMinute}`;
}

function normalizeData(rawData) {
  const normalized = {
    ...clone(seedData),
    ...rawData,
  };

  normalized.courses = (normalized.courses || []).map((course) => ({
    ...course,
    endTime: course.endTime || addMinutesToTime(course.time, 40),
  }));
  const users = normalized.users || [];
  seedData.users.forEach((seedUser) => {
    const existingUser = users.find((user) => user.id === seedUser.id);
    if (!existingUser) {
      users.push(clone(seedUser));
      return;
    }

    if (existingUser.id === "u-admin") {
      Object.assign(existingUser, clone(seedUser));
    }
  });
  normalized.users = users.filter((user, index, allUsers) => allUsers.findIndex((item) => item.id === user.id) === index);
  normalized.requests = (normalized.requests || []).map((request) =>
    request.id === "r-1" && request.subject === "Öğrenci belgesi" ? { ...request, userId: "u-student" } : request,
  );
  normalized.teachers = normalized.teachers || [];
  normalized.contact = {
    ...seedData.contact,
    ...(normalized.contact || {}),
  };

  return normalized;
}

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return normalizeData(clone(seedData));
  }

  try {
    const parsed = normalizeData(JSON.parse(stored));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return parsed;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return normalizeData(clone(seedData));
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadSession() {
  const stored = localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
}

function saveSession(userId) {
  session = { userId };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  session = null;
  localStorage.removeItem(SESSION_KEY);
}

function loadTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(nextTheme) {
  theme = nextTheme;
  document.body.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  applyTheme(theme === "dark" ? "light" : "dark");
  render();
  toast(theme === "dark" ? "Gece modu açıldı." : "Gündüz modu açıldı.");
}

function currentUser() {
  return session ? data.users.find((user) => user.id === session.userId) : null;
}

function getInitialRoute() {
  return window.location.hash.replace("#", "") || "home";
}

function setRoute(nextRoute) {
  route = nextRoute;
  window.location.hash = nextRoute;
  render();
  app.focus({ preventScroll: true });
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function selectedOption(value, selectedValue) {
  return value === selectedValue ? " selected" : "";
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00`));
}

function sortedByDate(items) {
  return [...items].sort((a, b) => new Date(a.date) - new Date(b.date));
}

function routeForUser(user) {
  return user?.role === "admin" ? "admin" : "panel";
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.append(node);
  setTimeout(() => node.remove(), 2600);
}

function render() {
  const user = currentUser();
  renderHeader(user);
  document.querySelectorAll(".nav-link").forEach((link) => {
    const routeName = link.dataset.route || routeForUser(user);
    link.classList.toggle("is-active", routeName === route);
  });

  if (route === "admin") {
    app.innerHTML =
      user?.role === "admin"
        ? adminView(user)
        : restrictedView("Admin paneline erişim için admin hesabı ile giriş yapmalısınız.");
    bindPageForms();
    return;
  }

  if (route === "panel") {
    app.innerHTML = user ? userPanelView(user) : restrictedView("Kullanıcı paneline erişim için giriş yapmalısınız.");
    bindPageForms();
    return;
  }

  if (route === "register") {
    app.innerHTML = registerView(user);
    bindPageForms();
    return;
  }

  if (route === "announcements") {
    app.innerHTML = announcementsView();
    return;
  }

  if (route === "schedule") {
    app.innerHTML = scheduleView();
    return;
  }

  if (route === "teachers") {
    app.innerHTML = teachersView();
    return;
  }

  if (route === "contact") {
    app.innerHTML = contactView();
    bindPageForms();
    return;
  }

  app.innerHTML = homeView(user);
  bindPageForms();
}

function renderHeader(user) {
  document.querySelector("[data-auth-route]").textContent = user?.role === "admin" ? "Admin" : "Panel";
  const themeButton = `
    <button class="theme-toggle" type="button" data-theme-toggle aria-label="Tema değiştir">
      ${theme === "dark" ? "Gündüz Modu" : "Gece Modu"}
    </button>
  `;

  if (!user) {
    headerActions.innerHTML = `
      ${themeButton}
      <button class="button small" type="button" data-route="panel">Giriş Yap</button>
      <button class="button secondary small" type="button" data-route="register">Kayıt Ol</button>
    `;
    return;
  }

  headerActions.innerHTML = `
    ${themeButton}
    <span class="user-chip" title="${escapeHtml(user.email)}">
      <strong>${escapeHtml(user.name)}</strong>
      <span>${user.role === "admin" ? "Admin" : "Kullanıcı"}</span>
    </span>
    <button class="button secondary small" type="button" data-logout>Çıkış</button>
  `;
}

function homeView(user) {
  const upcomingExam = sortedByDate(data.exams)[0];
  const nextAnnouncement = sortedByDate(data.announcements)[0];
  const openRequests = data.requests.filter((request) => request.status === "Bekliyor").length;

  return `
    <section class="content-stack">
      <section class="panel intro-panel home-hero">
        <div class="panel-body intro-layout">
          <div class="intro-copy">
            <span class="eyebrow">Okul Yönetim Portalı</span>
            <h1>AkademiPort okul operasyon paneli.</h1>
            <p>Duyuru, sınav takvimi, ders programı, kullanıcı hesabı ve yönetim işlemlerini tek, düzenli ve modern bir web arayüzünde toplar.</p>
            <div class="intro-actions">
              <button class="button" type="button" data-route="${user ? routeForUser(user) : "panel"}">${user ? "Panele Git" : "Giriş Yap"}</button>
              <button class="button secondary" type="button" data-route="register">Yeni Hesap Aç</button>
              <button class="button secondary" type="button" data-route="schedule">Takvimi İncele</button>
            </div>
            <div class="summary-strip">
              <div><span>Sonraki sınav</span><strong>${upcomingExam ? `${escapeHtml(upcomingExam.lesson)} · ${formatDate(upcomingExam.date)}` : "Planlanmadı"}</strong></div>
              <div><span>Tema</span><strong>${theme === "dark" ? "Gece" : "Gündüz"}</strong></div>
              <div><span>Veri</span><strong>Tarayıcıda kayıtlı</strong></div>
            </div>
          </div>

          <div class="portal-preview" aria-label="Portal canlı özeti">
            <div class="preview-toolbar">
              <span></span>
              <span></span>
              <span></span>
              <strong>Canlı Portal Özeti</strong>
            </div>
            <div class="preview-stat-row">
              <div><span>Kullanıcı</span><strong>${data.users.length}</strong></div>
              <div><span>Ders</span><strong>${data.courses.length}</strong></div>
              <div><span>Duyuru</span><strong>${data.announcements.length}</strong></div>
            </div>
            <div class="preview-focus">
              <span class="badge amber">Yaklaşan</span>
              <h3>${upcomingExam ? escapeHtml(upcomingExam.lesson) : "Sınav planı yok"}</h3>
              <p>${upcomingExam ? `${formatDate(upcomingExam.date)} · ${escapeHtml(upcomingExam.time)} · ${escapeHtml(upcomingExam.className)}` : "Admin panelinden yeni sınav eklenebilir."}</p>
            </div>
            <div class="preview-list">
              <div><span>Bekleyen talepler</span><strong>${openRequests}</strong></div>
              <div><span>Son duyuru</span><strong>${nextAnnouncement ? escapeHtml(nextAnnouncement.title) : "Henüz yok"}</strong></div>
              <div><span>Oturum</span><strong>${user ? escapeHtml(user.name) : "Misafir"}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <div class="quick-board home-metrics" aria-label="Portal özeti">
        ${metricCard(data.users.length, "Kayıtlı kullanıcı", "Tarayıcıda kalır")}
        ${metricCard(data.announcements.length, "Aktif duyuru", "Tüm kullanıcılara açık")}
        ${metricCard(data.courses.length, "Ders kaydı", "Haftalık program")}
        ${metricCard(openRequests, "Bekleyen talep", "Admin takip eder")}
      </div>

      <section class="home-action-grid" aria-label="Hızlı erişim">
        <article class="action-card">
          <span class="eyebrow">Hesap</span>
          <h2>${user ? "Paneline devam et" : "Hesap oluştur veya giriş yap"}</h2>
          <p>${user ? "Duyuru, ders, sınav ve talep kayıtlarını hesabından takip edebilirsin." : "E-postanı ve şifreni seçerek kalıcı kullanıcı hesabı açabilirsin."}</p>
          <button class="button small" type="button" data-route="${user ? routeForUser(user) : "register"}">${user ? "Paneli Aç" : "Yeni Hesap Aç"}</button>
        </article>
        <article class="action-card">
          <span class="eyebrow">Takvim</span>
          <h2>Ders ve sınav akışı</h2>
          <p>Haftalık dersler ve yaklaşan sınavlar tarih sırasına göre görünür.</p>
          <button class="button secondary small" type="button" data-route="schedule">Programı Gör</button>
        </article>
        <article class="action-card">
          <span class="eyebrow">İletişim</span>
          <h2>Duyuru merkezi</h2>
          <p>Okul yönetiminin paylaştığı duyurular sade ve okunabilir listelenir.</p>
          <button class="button secondary small" type="button" data-route="announcements">Duyurular</button>
        </article>
        <article class="action-card">
          <span class="eyebrow">Kadro</span>
          <h2>Öğretmen kadrosu</h2>
          <p>Branş öğretmenleri, e-posta, oda ve görüşme saatleri tek sayfada.</p>
          <button class="button secondary small" type="button" data-route="teachers">Öğretmenler</button>
        </article>
        <article class="action-card">
          <span class="eyebrow">Ulaşım</span>
          <h2>İletişim merkezi</h2>
          <p>Okula ulaşım bilgileri ve admin paneline düşen hızlı mesaj formu.</p>
          <button class="button secondary small" type="button" data-route="contact">İletişim</button>
        </article>
      </section>

      <section class="home-section-grid">
        <div class="content-stack">
          <section class="panel">
            <div class="panel-header">
              <div>
                <h2>Yaklaşan sınavlar</h2>
                <p>Sınav takvimi kullanıcı panelinde de gösterilir.</p>
              </div>
              <button class="button secondary small" type="button" data-route="schedule">Program</button>
            </div>
            <div class="panel-body">${examTable(data.exams)}</div>
          </section>

          <section class="panel">
            <div class="panel-header">
              <div>
                <h2>Son duyurular</h2>
                <p>Admin hesabı duyuruları ekleyebilir ve silebilir.</p>
              </div>
            </div>
            <div class="panel-body">${announcementList(data.announcements.slice(0, 3))}</div>
          </section>
        </div>

        <aside class="content-stack">
          ${user ? accountCard(user) : `${loginCard()}${demoAccountsCard()}`}
        </aside>
      </section>
    </section>
  `;
}

function metricCard(value, label, detail) {
  return `
    <div class="metric-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(detail)}</small>
    </div>
  `;
}

function loginCard(message = "") {
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>Kullanıcı girişi</h2>
          <p>Hesabınızla giriş yapıp panele geçebilirsiniz.</p>
        </div>
      </div>
      <div class="panel-body">
        <form class="form-grid" id="loginForm">
          <div class="field">
            <label for="loginEmail">E-posta</label>
            <input id="loginEmail" name="email" type="email" autocomplete="username" required />
          </div>
          <div class="field">
            <label for="loginPassword">Şifre</label>
            <input id="loginPassword" name="password" type="password" autocomplete="current-password" required />
          </div>
          <button class="button full" type="submit">Giriş Yap</button>
          <button class="button secondary full" type="button" data-route="register">Yeni Hesap Oluştur</button>
          <div class="status-line" id="loginStatus">${escapeHtml(message)}</div>
        </form>
      </div>
    </section>
  `;
}

function demoAccountsCard() {
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>Demo hesaplar</h2>
          <p>Projeyi hızlıca test etmek için.</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="list">
          <div class="item"><strong>Admin</strong><p>admin@okul.test / Admin123</p></div>
          <div class="item"><strong>Kullanıcı</strong><p>ogrenci@okul.test / Ogrenci123</p></div>
          <div class="item"><strong>Veli</strong><p>veli@okul.test / Veli123</p></div>
        </div>
      </div>
    </section>
  `;
}

function registerCard(message = "") {
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>Yeni hesap oluştur</h2>
          <p>Kendi e-postanız ve şifrenizle kullanıcı hesabı açabilirsiniz.</p>
        </div>
      </div>
      <div class="panel-body">
        <form class="form-grid" id="registerForm">
          <div class="field">
            <label for="registerName">Ad Soyad</label>
            <input id="registerName" name="name" autocomplete="name" required maxlength="70" />
          </div>
          <div class="field">
            <label for="registerEmail">E-posta</label>
            <input id="registerEmail" name="email" type="email" autocomplete="username" required maxlength="90" />
          </div>
          <div class="field">
            <label for="registerPassword">Şifre</label>
            <input id="registerPassword" name="password" type="password" autocomplete="new-password" required />
          </div>
          <div class="field">
            <label for="registerPasswordAgain">Şifre tekrar</label>
            <input id="registerPasswordAgain" name="passwordAgain" type="password" autocomplete="new-password" required />
          </div>
          <div class="field">
            <label for="registerClass">Sınıf / rol</label>
            <input id="registerClass" name="className" value="Öğrenci" required maxlength="50" />
          </div>
          <button class="button full" type="submit">Hesabı Kaydet</button>
          <button class="button secondary full" type="button" data-route="panel">Zaten Hesabım Var</button>
          <div class="status-line" id="registerStatus">${escapeHtml(message)}</div>
        </form>
      </div>
    </section>
  `;
}

function registerView(user) {
  if (user) {
    return `
      <section class="workspace-grid">
        <div class="content-stack">
          <div class="panel">
            <div class="panel-header">
              <div>
                <h1>Zaten giriş yapıldı</h1>
                <p>Yeni hesap açmak için önce mevcut oturumu kapatabilirsiniz.</p>
              </div>
            </div>
          </div>
          ${accountCard(user)}
        </div>
        <aside class="panel">
          <div class="panel-header">
            <div>
              <h2>Hesap bilgisi</h2>
              <p>Aktif hesap: ${escapeHtml(user.email)}</p>
            </div>
          </div>
          <div class="panel-body">
            <button class="button secondary full" type="button" data-logout>Çıkış Yap</button>
          </div>
        </aside>
      </section>
    `;
  }

  return `
    <section class="workspace-grid">
      <div class="content-stack">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h1>Kayıt ol</h1>
              <p>Oluşturduğunuz hesap tarayıcıda kayıtlı kalır ve sonraki girişlerde kullanılabilir.</p>
            </div>
          </div>
        </div>
        ${registerCard()}
      </div>
      <aside class="content-stack">${loginCard()}</aside>
    </section>
  `;
}

function accountCard(user) {
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>Oturum</h2>
          <p>${escapeHtml(user.email)}</p>
        </div>
        <span class="badge ${user.role === "admin" ? "amber" : "blue"}">${user.role === "admin" ? "Admin" : "Kullanıcı"}</span>
      </div>
      <div class="panel-body">
        <div class="list">
          <div class="item">
            <h3>${escapeHtml(user.name)}</h3>
            <p>Sınıf / rol: ${escapeHtml(user.className)}</p>
          </div>
          <button class="button full" type="button" data-route="${routeForUser(user)}">Paneli Aç</button>
          <button class="button secondary full" type="button" data-logout>Çıkış Yap</button>
        </div>
      </div>
    </section>
  `;
}

function restrictedView(message) {
  return `
    <section class="workspace-grid">
      <div class="content-stack">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h1>Giriş gerekli</h1>
              <p>${escapeHtml(message)}</p>
            </div>
          </div>
        </div>
        ${loginCard()}
        ${registerCard()}
      </div>
      <aside class="content-stack">
        ${demoAccountsCard()}
      </aside>
    </section>
  `;
}

function announcementsView() {
  return `
    <section class="content-stack">
      <div class="section-title">
        <div>
          <span class="eyebrow">İletişim</span>
          <h1>Duyurular</h1>
          <p>Okul yönetimi tarafından paylaşılan aktif duyurular.</p>
        </div>
        <div class="summary-strip">
          <div><span>Toplam</span><strong>${data.announcements.length}</strong></div>
          <div><span>Son tarih</span><strong>${data.announcements.length ? formatDate(sortedByDate(data.announcements).at(-1).date) : "-"}</strong></div>
          <div><span>Görünürlük</span><strong>Tüm okul</strong></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-body">${announcementList(data.announcements)}</div>
      </div>
    </section>
  `;
}

function announcementList(announcements) {
  if (!announcements.length) return `<div class="empty-state">Henüz duyuru bulunmuyor.</div>`;

  return `
    <div class="list">
      ${sortedByDate(announcements)
        .map(
          (announcement) => `
          <article class="item">
            <div class="item-top">
              <div>
                <h3>${escapeHtml(announcement.title)}</h3>
                <div class="badge-row">
                  <span class="badge">${escapeHtml(announcement.category)}</span>
                  <span class="badge blue">${escapeHtml(announcement.audience)}</span>
                  <span class="badge amber">${formatDate(announcement.date)}</span>
                </div>
              </div>
            </div>
            <p>${escapeHtml(announcement.body)}</p>
          </article>
        `,
        )
        .join("")}
    </div>
  `;
}

function scheduleView() {
  return `
    <section class="content-stack">
      <div class="section-title">
        <div>
          <span class="eyebrow">Akademik Takvim</span>
          <h1>Ders programı</h1>
          <p>Haftalık dersler, öğretmenler ve sınıf bilgileri.</p>
        </div>
        <div class="summary-strip">
          <div><span>Ders</span><strong>${data.courses.length}</strong></div>
          <div><span>Sınav</span><strong>${data.exams.length}</strong></div>
          <div><span>Güncel</span><strong>2026</strong></div>
        </div>
      </div>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Haftalık program</h2>
            <p>Admin panelinde dersler düzenlenebilir.</p>
          </div>
        </div>
        <div class="panel-body">${courseTable(data.courses)}</div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Sınav takvimi</h2>
            <p>Yaklaşan sınavlar tarih sırasına göre listelenir.</p>
          </div>
        </div>
        <div class="panel-body">${examTable(data.exams)}</div>
      </section>
    </section>
  `;
}

function courseTable(courses) {
  if (!courses.length) return `<div class="empty-state">Ders kaydı bulunmuyor.</div>`;

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Ders</th>
            <th>Öğretmen</th>
            <th>Gün</th>
            <th>Başlangıç</th>
            <th>Bitiş</th>
            <th>Sınıf</th>
            <th>Kontenjan</th>
          </tr>
        </thead>
        <tbody>
          ${courses
            .map(
              (course) => `
              <tr>
                <td><strong>${escapeHtml(course.name)}</strong></td>
                <td>${escapeHtml(course.teacher)}</td>
                <td>${escapeHtml(course.day)}</td>
                <td>${escapeHtml(course.time)}</td>
                <td>${escapeHtml(course.endTime || "-")}</td>
                <td>${escapeHtml(course.room)}</td>
                <td>${escapeHtml(course.quota)}</td>
              </tr>
            `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function examTable(exams) {
  if (!exams.length) return `<div class="empty-state">Sınav kaydı bulunmuyor.</div>`;

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Ders</th>
            <th>Tarih</th>
            <th>Saat</th>
            <th>Sınıf</th>
          </tr>
        </thead>
        <tbody>
          ${sortedByDate(exams)
            .map(
              (exam) => `
              <tr>
                <td><strong>${escapeHtml(exam.lesson)}</strong></td>
                <td>${formatDate(exam.date)}</td>
                <td>${escapeHtml(exam.time)}</td>
                <td>${escapeHtml(exam.className)}</td>
              </tr>
            `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function teachersView() {
  return `
    <section class="content-stack">
      <div class="section-title">
        <div>
          <span class="eyebrow">Akademik Kadro</span>
          <h1>Öğretmenler</h1>
          <p>Okulun branş öğretmenleri, iletişim bilgileri ve görüşme saatleri.</p>
        </div>
        <div class="summary-strip">
          <div><span>Öğretmen</span><strong>${data.teachers.length}</strong></div>
          <div><span>Branş</span><strong>${new Set(data.teachers.map((teacher) => teacher.branch)).size}</strong></div>
          <div><span>Güncel</span><strong>Admin yönetir</strong></div>
        </div>
      </div>
      ${teacherGrid(data.teachers)}
    </section>
  `;
}

function teacherGrid(teachers) {
  if (!teachers.length) {
    return `<div class="empty-state">Öğretmen kaydı bulunmuyor.</div>`;
  }

  return `
    <div class="teacher-grid">
      ${teachers
        .map(
          (teacher) => `
          <article class="teacher-card">
            <div class="teacher-avatar">${escapeHtml(teacher.name.split(" ").map((part) => part[0]).join("").slice(0, 2))}</div>
            <div>
              <span class="badge">${escapeHtml(teacher.branch)}</span>
              <h2>${escapeHtml(teacher.name)}</h2>
              <p>${escapeHtml(teacher.bio)}</p>
            </div>
            <div class="teacher-meta">
              <div><span>E-posta</span><strong>${escapeHtml(teacher.email)}</strong></div>
              <div><span>Telefon</span><strong>${escapeHtml(teacher.phone)}</strong></div>
              <div><span>Oda</span><strong>${escapeHtml(teacher.room)}</strong></div>
              <div><span>Görüşme</span><strong>${escapeHtml(teacher.officeHours)}</strong></div>
            </div>
          </article>
        `,
        )
        .join("")}
    </div>
  `;
}

function contactView() {
  const contact = data.contact;

  return `
    <section class="content-stack">
      <div class="section-title">
        <div>
          <span class="eyebrow">İletişim</span>
          <h1>Bize ulaşın</h1>
          <p>${escapeHtml(contact.schoolName)} iletişim bilgileri ve hızlı mesaj formu.</p>
        </div>
        <div class="summary-strip">
          <div><span>Telefon</span><strong>${escapeHtml(contact.phone)}</strong></div>
          <div><span>E-posta</span><strong>${escapeHtml(contact.email)}</strong></div>
          <div><span>Saat</span><strong>${escapeHtml(contact.hours)}</strong></div>
        </div>
      </div>

      <section class="contact-grid">
        <div class="content-stack">
          <section class="panel">
            <div class="panel-header">
              <div>
                <h2>Okul bilgileri</h2>
                <p>${escapeHtml(contact.department)}</p>
              </div>
            </div>
            <div class="panel-body">
              <div class="contact-list">
                <div><span>Okul</span><strong>${escapeHtml(contact.schoolName)}</strong></div>
                <div><span>Adres</span><strong>${escapeHtml(contact.address)}</strong></div>
                <div><span>Telefon</span><strong>${escapeHtml(contact.phone)}</strong></div>
                <div><span>E-posta</span><strong>${escapeHtml(contact.email)}</strong></div>
                <div><span>Çalışma saatleri</span><strong>${escapeHtml(contact.hours)}</strong></div>
                <div><span>Not</span><strong>${escapeHtml(contact.note)}</strong></div>
              </div>
            </div>
          </section>

          <section class="panel">
            <div class="panel-header">
              <div>
                <h2>Hızlı yönlendirme</h2>
                <p>İlgili okul bölümlerine hızlı erişim.</p>
              </div>
            </div>
            <div class="panel-body">
              <div class="home-action-grid compact">
                <article class="action-card"><span class="eyebrow">Kadro</span><h2>Öğretmenler</h2><p>Branş öğretmenlerini ve görüşme saatlerini inceleyin.</p><button class="button secondary small" type="button" data-route="teachers">Öğretmenler</button></article>
                <article class="action-card"><span class="eyebrow">Takvim</span><h2>Program</h2><p>Ders ve sınav takvimini görüntüleyin.</p><button class="button secondary small" type="button" data-route="schedule">Program</button></article>
              </div>
            </div>
          </section>
        </div>

        <aside class="panel">
          <div class="panel-header">
            <div>
              <h2>Mesaj gönder</h2>
              <p>Mesajınız admin panelindeki taleplere düşer.</p>
            </div>
          </div>
          <div class="panel-body">
            <form class="form-grid" id="contactForm">
              <div class="field">
                <label for="contactName">Ad Soyad</label>
                <input id="contactName" name="name" required maxlength="70" />
              </div>
              <div class="field">
                <label for="contactEmail">E-posta</label>
                <input id="contactEmail" name="email" type="email" required maxlength="90" />
              </div>
              <div class="field">
                <label for="contactSubject">Konu</label>
                <input id="contactSubject" name="subject" required maxlength="90" />
              </div>
              <div class="field">
                <label for="contactBody">Mesaj</label>
                <textarea id="contactBody" name="body" required maxlength="320"></textarea>
              </div>
              <button class="button full" type="submit">Mesaj Gönder</button>
            </form>
          </div>
        </aside>
      </section>
    </section>
  `;
}

function userPanelView(user) {
  const userRequests = data.requests.filter((request) => request.userId === user.id);

  return `
    <section class="content-stack">
      <div class="section-title">
        <div>
          <span class="eyebrow">Kullanıcı Alanı</span>
          <h1>Kullanıcı paneli</h1>
          <p>${escapeHtml(user.name)} hesabı ile giriş yapıldı.</p>
        </div>
        <div class="summary-strip">
          <div><span>Hesap</span><strong>${escapeHtml(user.className)}</strong></div>
          <div><span>Talep</span><strong>${userRequests.length}</strong></div>
          <div><span>Tema</span><strong>${theme === "dark" ? "Gece" : "Gündüz"}</strong></div>
        </div>
      </div>

      <div class="panel-grid">
        ${metricCard(data.exams.length, "Yaklaşan sınav", "Takvimde kayıtlı")}
        ${metricCard(data.announcements.length, "Okunabilir duyuru", "Tüm okul")}
        ${metricCard(userRequests.length, "Gönderilen talep", "İdareye iletilen")}
      </div>

      <section class="workspace-grid">
        <div class="content-stack">
          <section class="panel">
            <div class="panel-header">
              <div>
                <h2>Duyurular</h2>
                <p>Kullanıcı panelinden hızlı erişim.</p>
              </div>
            </div>
            <div class="panel-body">${announcementList(data.announcements.slice(0, 4))}</div>
          </section>

          <section class="panel">
            <div class="panel-header">
              <div>
                <h2>Sınav takvimi</h2>
                <p>Yaklaşan sınavlar.</p>
              </div>
            </div>
            <div class="panel-body">${examTable(data.exams)}</div>
          </section>
        </div>

        <aside class="content-stack">
          <section class="panel">
            <div class="panel-header">
              <div>
                <h2>Talep oluştur</h2>
                <p>İdare paneline düşen yeni talep.</p>
              </div>
            </div>
            <div class="panel-body">
              <form class="form-grid" id="requestForm">
                <div class="field">
                  <label for="requestSubject">Konu</label>
                  <input id="requestSubject" name="subject" required maxlength="80" />
                </div>
                <div class="field">
                  <label for="requestBody">Açıklama</label>
                  <textarea id="requestBody" name="body" required maxlength="240"></textarea>
                </div>
                <button class="button full" type="submit">Talep Gönder</button>
              </form>
            </div>
          </section>

          <section class="panel">
            <div class="panel-header">
              <div>
                <h2>Taleplerim</h2>
                <p>Başvuru durumları.</p>
              </div>
            </div>
            <div class="panel-body">${requestList(userRequests, false)}</div>
          </section>
        </aside>
      </section>
    </section>
  `;
}

function requestList(requests, adminMode) {
  if (!requests.length) return `<div class="empty-state">Talep bulunmuyor.</div>`;

  return `
    <div class="list">
      ${requests
        .map((request) => {
          const owner = data.users.find((user) => user.id === request.userId);
          const ownerName = request.userId === "visitor" ? "Ziyaretçi" : owner?.name || "Silinmiş kullanıcı";
          return `
            <article class="item">
              <div class="item-top">
                <div>
                  <h3>${escapeHtml(request.subject)}</h3>
                  <div class="badge-row">
                    <span class="badge ${request.status === "Bekliyor" ? "amber" : "blue"}">${escapeHtml(request.status)}</span>
                    <span class="badge">${formatDate(request.date)}</span>
                  </div>
                </div>
              </div>
              <p>${escapeHtml(request.body)}</p>
              ${adminMode ? `<p><strong>Gönderen:</strong> ${escapeHtml(ownerName)}</p>` : ""}
              ${
                adminMode
                  ? `<div class="item-actions">
                      <button class="button secondary small" type="button" data-request-status="${escapeHtml(request.id)}" data-status="İşleme alındı">İşleme Al</button>
                      <button class="button small" type="button" data-request-status="${escapeHtml(request.id)}" data-status="Tamamlandı">Tamamlandı</button>
                    </div>`
                  : ""
              }
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function adminView(user) {
  const tabContent = {
    announcements: adminAnnouncements(),
    users: adminUsers(),
    courses: adminCourses(),
    exams: adminExams(),
    teachers: adminTeachers(),
    contact: adminContact(),
    requests: adminRequests(),
  }[adminTab];

  return `
    <section class="content-stack">
      <div class="section-title">
        <div>
          <span class="eyebrow">Yönetim Konsolu</span>
          <h1>Admin paneli</h1>
          <p>${escapeHtml(user.name)} hesabı duyuru, kullanıcı, ders ve talep kayıtlarını yönetir.</p>
        </div>
        <div class="summary-strip">
          <div><span>Kullanıcı</span><strong>${data.users.length}</strong></div>
          <div><span>Açık talep</span><strong>${data.requests.filter((request) => request.status !== "Tamamlandı").length}</strong></div>
          <div><span>Yetki</span><strong>Admin</strong></div>
        </div>
      </div>

      <div class="panel-grid">
        ${metricCard(data.users.length, "Kullanıcı", "Kayıtlı hesap")}
        ${metricCard(data.courses.length, "Ders", "Haftalık program")}
        ${metricCard(data.exams.length, "Sınav", "Yaklaşan takvim")}
        ${metricCard(data.teachers.length, "Öğretmen", "Kadro kaydı")}
        ${metricCard(data.requests.filter((request) => request.status !== "Tamamlandı").length, "Açık talep", "Takip edilen")}
      </div>

      <section class="panel">
        <div class="panel-body">
          <div class="tabs" role="tablist" aria-label="Admin bölümleri">
            ${adminTabButton("announcements", "Duyurular")}
            ${adminTabButton("users", "Kullanıcılar")}
            ${adminTabButton("courses", "Dersler")}
            ${adminTabButton("exams", "Sınavlar")}
            ${adminTabButton("teachers", "Öğretmenler")}
            ${adminTabButton("contact", "İletişim")}
            ${adminTabButton("requests", "Talepler")}
          </div>
          ${tabContent}
        </div>
      </section>
    </section>
  `;
}

function adminTabButton(tab, label) {
  return `<button class="tab-button ${adminTab === tab ? "is-active" : ""}" type="button" data-admin-tab="${tab}">${label}</button>`;
}

function adminAnnouncements() {
  const editingAnnouncement = data.announcements.find((announcement) => announcement.id === editingAnnouncementId);
  const formDate = editingAnnouncement?.date || new Date().toISOString().slice(0, 10);

  return `
    <div class="admin-layout">
      <div>
        <h2>Duyuru listesi</h2>
        <div class="list">
          ${
            data.announcements.length
              ? sortedByDate(data.announcements)
                  .map(
                    (announcement) => `
                  <article class="item ${editingAnnouncementId === announcement.id ? "is-editing" : ""}">
                    <div class="item-top">
                      <div>
                        <h3>${escapeHtml(announcement.title)}</h3>
                        <div class="badge-row">
                          <span class="badge">${escapeHtml(announcement.category)}</span>
                          <span class="badge blue">${escapeHtml(announcement.audience)}</span>
                          <span class="badge amber">${formatDate(announcement.date)}</span>
                        </div>
                      </div>
                      <div class="item-actions">
                        <button class="button secondary small" type="button" data-edit-announcement="${escapeHtml(announcement.id)}">${editingAnnouncementId === announcement.id ? "Düzenleniyor" : "Düzenle"}</button>
                        <button class="button danger small" type="button" data-delete-announcement="${escapeHtml(announcement.id)}">Sil</button>
                      </div>
                    </div>
                    <p>${escapeHtml(announcement.body)}</p>
                  </article>
                `,
                  )
                  .join("")
              : `<div class="empty-state">Duyuru yok.</div>`
          }
        </div>
      </div>
      <aside>
        <h2>${editingAnnouncement ? "Duyuruyu düzenle" : "Yeni duyuru"}</h2>
        ${editingAnnouncement ? `<p class="hint">Seçili duyuru: ${escapeHtml(editingAnnouncement.title)}</p>` : ""}
        <form class="form-grid" id="announcementForm">
          <div class="field">
            <label for="announcementTitle">Başlık</label>
            <input id="announcementTitle" name="title" required maxlength="90" value="${escapeHtml(editingAnnouncement?.title || "")}" />
          </div>
          <div class="field">
            <label for="announcementBody">Metin</label>
            <textarea id="announcementBody" name="body" required maxlength="260">${escapeHtml(editingAnnouncement?.body || "")}</textarea>
          </div>
          <div class="form-grid two-col">
            <div class="field">
              <label for="announcementCategory">Kategori</label>
              <select id="announcementCategory" name="category">
                <option${selectedOption("Sınav", editingAnnouncement?.category)}>Sınav</option>
                <option${selectedOption("Etkinlik", editingAnnouncement?.category)}>Etkinlik</option>
                <option${selectedOption("Bilgilendirme", editingAnnouncement?.category)}>Bilgilendirme</option>
                <option${selectedOption("Acil", editingAnnouncement?.category)}>Acil</option>
              </select>
            </div>
            <div class="field">
              <label for="announcementAudience">Hedef</label>
              <input id="announcementAudience" name="audience" value="${escapeHtml(editingAnnouncement?.audience || "Tüm okul")}" required />
            </div>
          </div>
          <div class="field">
            <label for="announcementDate">Tarih</label>
            <input id="announcementDate" name="date" type="date" required value="${escapeHtml(formDate)}" />
          </div>
          <button class="button full" type="submit">${editingAnnouncement ? "Duyuruyu Güncelle" : "Duyuru Ekle"}</button>
          ${editingAnnouncement ? `<button class="button secondary full" type="button" data-cancel-announcement-edit>Vazgeç</button>` : ""}
        </form>
      </aside>
    </div>
  `;
}

function adminUsers() {
  return `
    <div class="admin-layout">
      <div>
        <h2>Kullanıcı listesi</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>E-posta</th>
                <th>Rol</th>
                <th>Sınıf</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              ${data.users
                .map(
                  (listedUser) => `
                  <tr>
                    <td><strong>${escapeHtml(listedUser.name)}</strong></td>
                    <td>${escapeHtml(listedUser.email)}</td>
                    <td><span class="badge ${listedUser.role === "admin" ? "amber" : "blue"}">${listedUser.role === "admin" ? "Admin" : "Kullanıcı"}</span></td>
                    <td>${escapeHtml(listedUser.className)}</td>
                    <td>
                      ${
                        listedUser.id === "u-admin"
                          ? `<span class="hint">Sabit hesap</span>`
                          : `<button class="button danger small" type="button" data-delete-user="${escapeHtml(listedUser.id)}">Sil</button>`
                      }
                    </td>
                  </tr>
                `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
      <aside>
        <h2>Yeni kullanıcı</h2>
        <form class="form-grid" id="userForm">
          <div class="field">
            <label for="userName">Ad Soyad</label>
            <input id="userName" name="name" required maxlength="70" />
          </div>
          <div class="field">
            <label for="userEmail">E-posta</label>
            <input id="userEmail" name="email" type="email" required maxlength="90" />
          </div>
          <div class="form-grid two-col">
            <div class="field">
              <label for="userPassword">Şifre</label>
              <input id="userPassword" name="password" required minlength="6" />
            </div>
            <div class="field">
              <label for="userRole">Rol</label>
              <select id="userRole" name="role">
                <option value="user">Kullanıcı</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="userClass">Sınıf / görev</label>
            <input id="userClass" name="className" required value="11-A" />
          </div>
          <button class="button full" type="submit">Kullanıcı Ekle</button>
        </form>
      </aside>
    </div>
  `;
}

function adminCourses() {
  const editingCourse = data.courses.find((course) => course.id === editingCourseId);

  return `
    <div class="admin-layout">
      <div>
        <h2>Ders listesi</h2>
        <div class="list">
          ${
            data.courses.length
              ? data.courses
                  .map(
                    (course) => `
                    <article class="item ${editingCourseId === course.id ? "is-editing" : ""}">
                      <div class="item-top">
                        <div>
                          <h3>${escapeHtml(course.name)}</h3>
                          <div class="badge-row">
                            <span class="badge">${escapeHtml(course.day)}</span>
                            <span class="badge blue">${escapeHtml(course.time)} - ${escapeHtml(course.endTime || "-")}</span>
                            <span class="badge amber">${escapeHtml(course.room)}</span>
                          </div>
                        </div>
                        <div class="item-actions">
                          <button class="button secondary small" type="button" data-edit-course="${escapeHtml(course.id)}">${editingCourseId === course.id ? "Düzenleniyor" : "Düzenle"}</button>
                          <button class="button danger small" type="button" data-delete-course="${escapeHtml(course.id)}">Sil</button>
                        </div>
                      </div>
                      <p>${escapeHtml(course.teacher)} tarafından yürütülür. Kontenjan: ${escapeHtml(course.quota)}</p>
                    </article>
                  `,
                  )
                  .join("")
              : `<div class="empty-state">Ders yok.</div>`
          }
        </div>
      </div>
      <aside>
        <h2>${editingCourse ? "Dersi düzenle" : "Yeni ders"}</h2>
        ${editingCourse ? `<p class="hint">Seçili ders: ${escapeHtml(editingCourse.name)}</p>` : ""}
        <form class="form-grid" id="courseForm">
          <div class="field">
            <label for="courseName">Ders adı</label>
            <input id="courseName" name="name" required maxlength="70" value="${escapeHtml(editingCourse?.name || "")}" />
          </div>
          <div class="field">
            <label for="courseTeacher">Öğretmen</label>
            <input id="courseTeacher" name="teacher" required maxlength="70" value="${escapeHtml(editingCourse?.teacher || "")}" />
          </div>
          <div class="form-grid two-col">
            <div class="field">
              <label for="courseDay">Gün</label>
              <select id="courseDay" name="day">
                <option${selectedOption("Pazartesi", editingCourse?.day)}>Pazartesi</option>
                <option${selectedOption("Salı", editingCourse?.day)}>Salı</option>
                <option${selectedOption("Çarşamba", editingCourse?.day)}>Çarşamba</option>
                <option${selectedOption("Perşembe", editingCourse?.day)}>Perşembe</option>
                <option${selectedOption("Cuma", editingCourse?.day)}>Cuma</option>
              </select>
            </div>
            <div class="field">
              <label for="courseTime">Başlangıç saati</label>
              <input id="courseTime" name="time" type="time" required value="${escapeHtml(editingCourse?.time || "")}" />
            </div>
          </div>
          <div class="form-grid two-col">
            <div class="field">
              <label for="courseEndTime">Bitiş saati</label>
              <input id="courseEndTime" name="endTime" type="time" required value="${escapeHtml(editingCourse?.endTime || "")}" />
            </div>
            <div class="field">
              <label for="courseRoom">Sınıf</label>
              <input id="courseRoom" name="room" required value="${escapeHtml(editingCourse?.room || "")}" />
            </div>
          </div>
          <div class="field">
            <label for="courseQuota">Kontenjan</label>
            <input id="courseQuota" name="quota" type="number" min="1" max="60" value="${escapeHtml(editingCourse?.quota || 24)}" required />
          </div>
          <button class="button full" type="submit">${editingCourse ? "Dersi Güncelle" : "Ders Ekle"}</button>
          ${editingCourse ? `<button class="button secondary full" type="button" data-cancel-course-edit>Vazgeç</button>` : ""}
        </form>
      </aside>
    </div>
  `;
}

function adminExams() {
  const editingExam = data.exams.find((exam) => exam.id === editingExamId);
  const formDate = editingExam?.date || new Date().toISOString().slice(0, 10);

  return `
    <div class="admin-layout">
      <div>
        <h2>Sınav listesi</h2>
        <div class="list">
          ${
            data.exams.length
              ? sortedByDate(data.exams)
                  .map(
                    (exam) => `
                    <article class="item ${editingExamId === exam.id ? "is-editing" : ""}">
                      <div class="item-top">
                        <div>
                          <h3>${escapeHtml(exam.lesson)}</h3>
                          <div class="badge-row">
                            <span class="badge amber">${formatDate(exam.date)}</span>
                            <span class="badge blue">${escapeHtml(exam.time)}</span>
                            <span class="badge">${escapeHtml(exam.className)}</span>
                          </div>
                        </div>
                        <div class="item-actions">
                          <button class="button secondary small" type="button" data-edit-exam="${escapeHtml(exam.id)}">${editingExamId === exam.id ? "Düzenleniyor" : "Düzenle"}</button>
                          <button class="button danger small" type="button" data-delete-exam="${escapeHtml(exam.id)}">Sil</button>
                        </div>
                      </div>
                      <p>${escapeHtml(exam.className)} sınıfı için ${escapeHtml(exam.time)} saatinde uygulanacak sınav.</p>
                    </article>
                  `,
                  )
                  .join("")
              : `<div class="empty-state">Sınav yok.</div>`
          }
        </div>
      </div>
      <aside>
        <h2>${editingExam ? "Sınavı düzenle" : "Yeni sınav"}</h2>
        ${editingExam ? `<p class="hint">Seçili sınav: ${escapeHtml(editingExam.lesson)}</p>` : ""}
        <form class="form-grid" id="examForm">
          <div class="field">
            <label for="examLesson">Ders</label>
            <input id="examLesson" name="lesson" required maxlength="70" value="${escapeHtml(editingExam?.lesson || "")}" />
          </div>
          <div class="form-grid two-col">
            <div class="field">
              <label for="examDate">Tarih</label>
              <input id="examDate" name="date" type="date" required value="${escapeHtml(formDate)}" />
            </div>
            <div class="field">
              <label for="examTime">Saat</label>
              <input id="examTime" name="time" type="time" required value="${escapeHtml(editingExam?.time || "")}" />
            </div>
          </div>
          <div class="field">
            <label for="examClassName">Sınıf</label>
            <input id="examClassName" name="className" required maxlength="40" value="${escapeHtml(editingExam?.className || "11-A")}" />
          </div>
          <button class="button full" type="submit">${editingExam ? "Sınavı Güncelle" : "Sınav Ekle"}</button>
          ${editingExam ? `<button class="button secondary full" type="button" data-cancel-exam-edit>Vazgeç</button>` : ""}
        </form>
      </aside>
    </div>
  `;
}

function adminTeachers() {
  const editingTeacher = data.teachers.find((teacher) => teacher.id === editingTeacherId);

  return `
    <div class="admin-layout">
      <div>
        <h2>Öğretmen listesi</h2>
        <div class="list">
          ${
            data.teachers.length
              ? data.teachers
                  .map(
                    (teacher) => `
                    <article class="item ${editingTeacherId === teacher.id ? "is-editing" : ""}">
                      <div class="item-top">
                        <div>
                          <h3>${escapeHtml(teacher.name)}</h3>
                          <div class="badge-row">
                            <span class="badge">${escapeHtml(teacher.branch)}</span>
                            <span class="badge blue">${escapeHtml(teacher.room)}</span>
                            <span class="badge amber">${escapeHtml(teacher.officeHours)}</span>
                          </div>
                        </div>
                        <div class="item-actions">
                          <button class="button secondary small" type="button" data-edit-teacher="${escapeHtml(teacher.id)}">${editingTeacherId === teacher.id ? "Düzenleniyor" : "Düzenle"}</button>
                          <button class="button danger small" type="button" data-delete-teacher="${escapeHtml(teacher.id)}">Sil</button>
                        </div>
                      </div>
                      <p>${escapeHtml(teacher.email)} · ${escapeHtml(teacher.phone)}</p>
                      <p>${escapeHtml(teacher.bio)}</p>
                    </article>
                  `,
                  )
                  .join("")
              : `<div class="empty-state">Öğretmen kaydı yok.</div>`
          }
        </div>
      </div>
      <aside>
        <h2>${editingTeacher ? "Öğretmeni düzenle" : "Yeni öğretmen"}</h2>
        ${editingTeacher ? `<p class="hint">Seçili öğretmen: ${escapeHtml(editingTeacher.name)}</p>` : ""}
        <form class="form-grid" id="teacherForm">
          <div class="field">
            <label for="teacherName">Ad Soyad</label>
            <input id="teacherName" name="name" required maxlength="70" value="${escapeHtml(editingTeacher?.name || "")}" />
          </div>
          <div class="field">
            <label for="teacherBranch">Branş</label>
            <input id="teacherBranch" name="branch" required maxlength="70" value="${escapeHtml(editingTeacher?.branch || "")}" />
          </div>
          <div class="form-grid two-col">
            <div class="field">
              <label for="teacherEmail">E-posta</label>
              <input id="teacherEmail" name="email" type="email" required maxlength="90" value="${escapeHtml(editingTeacher?.email || "")}" />
            </div>
            <div class="field">
              <label for="teacherPhone">Telefon</label>
              <input id="teacherPhone" name="phone" required maxlength="30" value="${escapeHtml(editingTeacher?.phone || "")}" />
            </div>
          </div>
          <div class="form-grid two-col">
            <div class="field">
              <label for="teacherRoom">Oda / sınıf</label>
              <input id="teacherRoom" name="room" required maxlength="70" value="${escapeHtml(editingTeacher?.room || "")}" />
            </div>
            <div class="field">
              <label for="teacherOfficeHours">Görüşme saati</label>
              <input id="teacherOfficeHours" name="officeHours" required maxlength="80" value="${escapeHtml(editingTeacher?.officeHours || "")}" />
            </div>
          </div>
          <div class="field">
            <label for="teacherBio">Kısa açıklama</label>
            <textarea id="teacherBio" name="bio" required maxlength="260">${escapeHtml(editingTeacher?.bio || "")}</textarea>
          </div>
          <button class="button full" type="submit">${editingTeacher ? "Öğretmeni Güncelle" : "Öğretmen Ekle"}</button>
          ${editingTeacher ? `<button class="button secondary full" type="button" data-cancel-teacher-edit>Vazgeç</button>` : ""}
        </form>
      </aside>
    </div>
  `;
}

function adminContact() {
  const contact = data.contact;

  return `
    <div class="admin-layout">
      <div>
        <h2>İletişim önizlemesi</h2>
        <div class="list">
          <article class="item">
            <div class="item-top">
              <div>
                <h3>${escapeHtml(contact.schoolName)}</h3>
                <div class="badge-row">
                  <span class="badge">${escapeHtml(contact.phone)}</span>
                  <span class="badge blue">${escapeHtml(contact.email)}</span>
                  <span class="badge amber">${escapeHtml(contact.hours)}</span>
                </div>
              </div>
            </div>
            <p><strong>Adres:</strong> ${escapeHtml(contact.address)}</p>
            <p><strong>Birim:</strong> ${escapeHtml(contact.department)}</p>
            <p>${escapeHtml(contact.note)}</p>
          </article>
        </div>
      </div>
      <aside>
        <h2>İletişim bilgilerini düzenle</h2>
        <p class="hint">Buradan kaydedilen bilgiler iletişim sayfasına yansır.</p>
        <form class="form-grid" id="contactSettingsForm">
          <div class="field">
            <label for="contactSchoolName">Okul adı</label>
            <input id="contactSchoolName" name="schoolName" required maxlength="90" value="${escapeHtml(contact.schoolName)}" />
          </div>
          <div class="field">
            <label for="contactAddressSetting">Adres</label>
            <textarea id="contactAddressSetting" name="address" required maxlength="220">${escapeHtml(contact.address)}</textarea>
          </div>
          <div class="form-grid two-col">
            <div class="field">
              <label for="contactPhoneSetting">Telefon</label>
              <input id="contactPhoneSetting" name="phone" required maxlength="40" value="${escapeHtml(contact.phone)}" />
            </div>
            <div class="field">
              <label for="contactEmailSetting">E-posta</label>
              <input id="contactEmailSetting" name="email" type="email" required maxlength="90" value="${escapeHtml(contact.email)}" />
            </div>
          </div>
          <div class="form-grid two-col">
            <div class="field">
              <label for="contactHoursSetting">Çalışma saatleri</label>
              <input id="contactHoursSetting" name="hours" required maxlength="80" value="${escapeHtml(contact.hours)}" />
            </div>
            <div class="field">
              <label for="contactDepartmentSetting">Birim</label>
              <input id="contactDepartmentSetting" name="department" required maxlength="90" value="${escapeHtml(contact.department)}" />
            </div>
          </div>
          <div class="field">
            <label for="contactNoteSetting">Not</label>
            <textarea id="contactNoteSetting" name="note" required maxlength="220">${escapeHtml(contact.note)}</textarea>
          </div>
          <button class="button full" type="submit">İletişimi Güncelle</button>
        </form>
      </aside>
    </div>
  `;
}

function adminRequests() {
  return `
    <div class="content-stack">
      <h2>Kullanıcı talepleri</h2>
      ${requestList(data.requests, true)}
    </div>
  `;
}

function bindPageForms() {
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const email = String(formData.get("email")).trim().toLowerCase();
      const password = String(formData.get("password"));
      const user = data.users.find(
        (candidate) =>
          candidate.email.toLowerCase() === email &&
          candidate.password === password &&
          candidate.status === "Aktif",
      );

      const status = document.querySelector("#loginStatus");
      if (!user) {
        status.textContent = "E-posta veya şifre hatalı.";
        return;
      }

      saveSession(user.id);
      toast(`Hoş geldiniz, ${user.name}`);
      setRoute(routeForUser(user));
    });
  }

  const registerForm = document.querySelector("#registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const name = String(formData.get("name")).trim();
      const email = String(formData.get("email")).trim().toLowerCase();
      const password = String(formData.get("password"));
      const passwordAgain = String(formData.get("passwordAgain"));
      const className = String(formData.get("className")).trim() || "Öğrenci";
      const status = document.querySelector("#registerStatus");

      if (password !== passwordAgain) {
        status.textContent = "Şifreler aynı olmalı.";
        return;
      }

      if (data.users.some((user) => user.email.toLowerCase() === email)) {
        status.textContent = "Bu e-posta ile kayıtlı bir hesap zaten var.";
        return;
      }

      const user = {
        id: uid("u"),
        name,
        email,
        password,
        role: "user",
        className,
        status: "Aktif",
      };

      data.users.push(user);
      saveData();
      saveSession(user.id);
      toast("Hesap oluşturuldu ve kaydedildi.");
      setRoute("panel");
    });
  }

  const requestForm = document.querySelector("#requestForm");
  const activeUser = currentUser();
  if (requestForm && activeUser) {
    requestForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(requestForm);
      data.requests.unshift({
        id: uid("r"),
        userId: activeUser.id,
        subject: String(formData.get("subject")).trim(),
        body: String(formData.get("body")).trim(),
        status: "Bekliyor",
        date: new Date().toISOString().slice(0, 10),
      });
      saveData();
      toast("Talep admin paneline gönderildi.");
      render();
    });
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get("name")).trim();
      const email = String(formData.get("email")).trim();
      data.requests.unshift({
        id: uid("r"),
        userId: currentUser()?.id || "visitor",
        subject: `İletişim: ${String(formData.get("subject")).trim()}`,
        body: `${String(formData.get("body")).trim()} | Gönderen: ${name} (${email})`,
        status: "Bekliyor",
        date: new Date().toISOString().slice(0, 10),
      });
      saveData();
      contactForm.reset();
      toast("Mesajınız admin paneline gönderildi.");
    });
  }

  bindAdminForms();
}

function bindAdminForms() {
  const announcementForm = document.querySelector("#announcementForm");
  if (announcementForm) {
    announcementForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(announcementForm);
      const announcementPayload = {
        title: String(formData.get("title")).trim(),
        body: String(formData.get("body")).trim(),
        category: String(formData.get("category")),
        audience: String(formData.get("audience")).trim(),
        date: String(formData.get("date")),
      };

      const editingAnnouncement = data.announcements.find(
        (announcement) => announcement.id === editingAnnouncementId,
      );

      if (editingAnnouncement) {
        Object.assign(editingAnnouncement, announcementPayload);
        editingAnnouncementId = null;
        toast("Duyuru güncellendi.");
      } else {
        data.announcements.unshift({
          id: uid("a"),
          ...announcementPayload,
        });
        toast("Duyuru eklendi.");
      }

      saveData();
      render();
    });
  }

  const userForm = document.querySelector("#userForm");
  if (userForm) {
    userForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(userForm);
      const email = String(formData.get("email")).trim().toLowerCase();

      if (data.users.some((user) => user.email.toLowerCase() === email)) {
        toast("Bu e-posta zaten kayıtlı.");
        return;
      }

      data.users.push({
        id: uid("u"),
        name: String(formData.get("name")).trim(),
        email,
        password: String(formData.get("password")),
        role: String(formData.get("role")),
        className: String(formData.get("className")).trim(),
        status: "Aktif",
      });
      saveData();
      toast("Kullanıcı eklendi.");
      render();
    });
  }

  const courseForm = document.querySelector("#courseForm");
  if (courseForm) {
    courseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(courseForm);
      const coursePayload = {
        name: String(formData.get("name")).trim(),
        teacher: String(formData.get("teacher")).trim(),
        day: String(formData.get("day")),
        time: String(formData.get("time")),
        endTime: String(formData.get("endTime")),
        room: String(formData.get("room")).trim(),
        quota: Number(formData.get("quota")),
      };

      const editingCourse = data.courses.find((course) => course.id === editingCourseId);

      if (editingCourse) {
        Object.assign(editingCourse, coursePayload);
        editingCourseId = null;
        toast("Ders güncellendi.");
      } else {
        data.courses.push({
          id: uid("c"),
          ...coursePayload,
        });
        toast("Ders eklendi.");
      }

      saveData();
      render();
    });
  }

  const examForm = document.querySelector("#examForm");
  if (examForm) {
    examForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(examForm);
      const examPayload = {
        lesson: String(formData.get("lesson")).trim(),
        date: String(formData.get("date")),
        time: String(formData.get("time")),
        className: String(formData.get("className")).trim(),
      };

      const editingExam = data.exams.find((exam) => exam.id === editingExamId);

      if (editingExam) {
        Object.assign(editingExam, examPayload);
        editingExamId = null;
        toast("Sınav güncellendi.");
      } else {
        data.exams.push({
          id: uid("e"),
          ...examPayload,
        });
        toast("Sınav eklendi.");
      }

      saveData();
      render();
    });
  }

  const teacherForm = document.querySelector("#teacherForm");
  if (teacherForm) {
    teacherForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(teacherForm);
      const teacherPayload = {
        name: String(formData.get("name")).trim(),
        branch: String(formData.get("branch")).trim(),
        email: String(formData.get("email")).trim(),
        phone: String(formData.get("phone")).trim(),
        room: String(formData.get("room")).trim(),
        officeHours: String(formData.get("officeHours")).trim(),
        bio: String(formData.get("bio")).trim(),
      };

      const editingTeacher = data.teachers.find((teacher) => teacher.id === editingTeacherId);

      if (editingTeacher) {
        Object.assign(editingTeacher, teacherPayload);
        editingTeacherId = null;
        toast("Öğretmen bilgisi güncellendi.");
      } else {
        data.teachers.push({
          id: uid("t"),
          ...teacherPayload,
        });
        toast("Öğretmen eklendi.");
      }

      saveData();
      render();
    });
  }

  const contactSettingsForm = document.querySelector("#contactSettingsForm");
  if (contactSettingsForm) {
    contactSettingsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactSettingsForm);
      data.contact = {
        schoolName: String(formData.get("schoolName")).trim(),
        address: String(formData.get("address")).trim(),
        phone: String(formData.get("phone")).trim(),
        email: String(formData.get("email")).trim(),
        hours: String(formData.get("hours")).trim(),
        department: String(formData.get("department")).trim(),
        note: String(formData.get("note")).trim(),
      };
      saveData();
      toast("İletişim bilgileri güncellendi.");
      render();
    });
  }
}

document.addEventListener("click", (event) => {
  const themeButton = event.target.closest("[data-theme-toggle]");
  if (themeButton) {
    toggleTheme();
    return;
  }

  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    setRoute(routeButton.dataset.route);
    return;
  }

  const authRouteButton = event.target.closest("[data-auth-route]");
  if (authRouteButton) {
    setRoute(routeForUser(currentUser()));
    return;
  }

  const logoutButton = event.target.closest("[data-logout]");
  if (logoutButton) {
    clearSession();
    toast("Oturum kapatıldı.");
    setRoute("home");
    return;
  }

  const tabButton = event.target.closest("[data-admin-tab]");
  if (tabButton) {
    adminTab = tabButton.dataset.adminTab;
    if (adminTab !== "announcements") editingAnnouncementId = null;
    if (adminTab !== "courses") editingCourseId = null;
    if (adminTab !== "exams") editingExamId = null;
    if (adminTab !== "teachers") editingTeacherId = null;
    render();
    return;
  }

  const editAnnouncementButton = event.target.closest("[data-edit-announcement]");
  if (editAnnouncementButton) {
    editingAnnouncementId = editAnnouncementButton.dataset.editAnnouncement;
    adminTab = "announcements";
    render();
    return;
  }

  const cancelAnnouncementEditButton = event.target.closest("[data-cancel-announcement-edit]");
  if (cancelAnnouncementEditButton) {
    editingAnnouncementId = null;
    render();
    return;
  }

  const deleteAnnouncementButton = event.target.closest("[data-delete-announcement]");
  if (deleteAnnouncementButton) {
    if (editingAnnouncementId === deleteAnnouncementButton.dataset.deleteAnnouncement) {
      editingAnnouncementId = null;
    }
    data.announcements = data.announcements.filter(
      (announcement) => announcement.id !== deleteAnnouncementButton.dataset.deleteAnnouncement,
    );
    saveData();
    toast("Duyuru silindi.");
    render();
    return;
  }

  const deleteUserButton = event.target.closest("[data-delete-user]");
  if (deleteUserButton) {
    data.users = data.users.filter((user) => user.id !== deleteUserButton.dataset.deleteUser);
    data.requests = data.requests.filter((request) => request.userId !== deleteUserButton.dataset.deleteUser);
    saveData();
    toast("Kullanıcı silindi.");
    render();
    return;
  }

  const editCourseButton = event.target.closest("[data-edit-course]");
  if (editCourseButton) {
    editingCourseId = editCourseButton.dataset.editCourse;
    adminTab = "courses";
    render();
    return;
  }

  const cancelCourseEditButton = event.target.closest("[data-cancel-course-edit]");
  if (cancelCourseEditButton) {
    editingCourseId = null;
    render();
    return;
  }

  const deleteCourseButton = event.target.closest("[data-delete-course]");
  if (deleteCourseButton) {
    if (editingCourseId === deleteCourseButton.dataset.deleteCourse) {
      editingCourseId = null;
    }
    data.courses = data.courses.filter((course) => course.id !== deleteCourseButton.dataset.deleteCourse);
    saveData();
    toast("Ders silindi.");
    render();
    return;
  }

  const editExamButton = event.target.closest("[data-edit-exam]");
  if (editExamButton) {
    editingExamId = editExamButton.dataset.editExam;
    adminTab = "exams";
    render();
    return;
  }

  const cancelExamEditButton = event.target.closest("[data-cancel-exam-edit]");
  if (cancelExamEditButton) {
    editingExamId = null;
    render();
    return;
  }

  const deleteExamButton = event.target.closest("[data-delete-exam]");
  if (deleteExamButton) {
    if (editingExamId === deleteExamButton.dataset.deleteExam) {
      editingExamId = null;
    }
    data.exams = data.exams.filter((exam) => exam.id !== deleteExamButton.dataset.deleteExam);
    saveData();
    toast("Sınav silindi.");
    render();
    return;
  }

  const editTeacherButton = event.target.closest("[data-edit-teacher]");
  if (editTeacherButton) {
    editingTeacherId = editTeacherButton.dataset.editTeacher;
    adminTab = "teachers";
    render();
    return;
  }

  const cancelTeacherEditButton = event.target.closest("[data-cancel-teacher-edit]");
  if (cancelTeacherEditButton) {
    editingTeacherId = null;
    render();
    return;
  }

  const deleteTeacherButton = event.target.closest("[data-delete-teacher]");
  if (deleteTeacherButton) {
    if (editingTeacherId === deleteTeacherButton.dataset.deleteTeacher) {
      editingTeacherId = null;
    }
    data.teachers = data.teachers.filter((teacher) => teacher.id !== deleteTeacherButton.dataset.deleteTeacher);
    saveData();
    toast("Öğretmen silindi.");
    render();
    return;
  }

  const requestStatusButton = event.target.closest("[data-request-status]");
  if (requestStatusButton) {
    const request = data.requests.find((item) => item.id === requestStatusButton.dataset.requestStatus);
    if (!request) return;
    request.status = requestStatusButton.dataset.status;
    saveData();
    toast("Talep durumu güncellendi.");
    render();
  }
});

window.addEventListener("hashchange", () => {
  route = getInitialRoute();
  render();
});
