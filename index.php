<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>That Nguyen — Developer & Mechanic</title>
  <link rel="icon" href="img/favicon/favicon.ico">
  <link rel="icon" type="image/png" sizes="128x128" href="img/favicon/rx7-favicon-128x128.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap" rel="stylesheet">
  
  <?php include 'partials/css.php' ?>
</head>
<body>

<!-- ═══ HERO SECTION ═══ -->
<section id="hero-section">
  <canvas id="glCanvas"></canvas>
  <canvas id="carOverlay"></canvas>
  <canvas id="three-hidden"></canvas>
  <div id="car-loading">LOADING...</div>

  <div id="hero">
    <div class="rule-line">
      <div class="line line-short"></div>
      <span class="num">001</span>
      <div class="line line-flex"></div>
    </div>
    <div class="hero-name-wrap">
      <div class="dither-bar"></div>
      <h1 class="hero-h1">THAT<br><span class="name-nguyen">NGUYEN</span></h1>
    </div>
    <div class="dots-row" id="dotsRow"></div>
    <p class="desc">Developer &nbsp;·&nbsp; Car Mechanic &nbsp;·&nbsp; Builder</p>
    <div class="btn-row">
      <a class="btn" href="#projects">
        <span class="acc acc-tl"></span><span class="acc acc-br"></span>
        VIEW MY WORK
      </a>
      <a class="btn" href="#contact">
        <span class="acc acc-tl"></span><span class="acc acc-br"></span>
        CONTACT ME
      </a>
    </div>

    <!-- GARAGE SWITCHER -->
    <div id="garage">
      <div class="garage-label">GARAGE — SELECT VEHICLE</div>
      <div class="garage-slots" id="garageSlots"></div>
    </div>

    <div class="bottom-note">
      <div class="line"></div>
      <span>LS3 2JZ</span>
    </div>
  </div>

  <div id="car-nameplate"></div>

  <div class="scroll-cue">
    <span class="scroll-cue-text t-accent">SCROLL</span>
    <div class="scroll-cue-line t-accent"></div>
  </div>
</section>
<!-- ═══ END HERO ═══ -->


<div id="content">

  <!-- ── MARQUEE 1 ── -->
  <div class="marquee-wrap">
    <div class="marquee-inner" id="marqueeInner"></div>
  </div>

  <!-- ══════════════════ ABOUT ══════════════════ -->
  <section id="about">
    <div class="s-wrap">
      <div class="s-label reveal"><span class="s-num t-accent">002</span> About</div>

      <div class="about-grid">
        <!-- Left: heading + bio -->
        <div>
          <h2 class="about-heading reveal glitch-title" data-text="Software Developer. Car Mechanic.">
            Software Developer.<br><em>Car Mechanic.</em>
          </h2>
          <div class="about-text reveal reveal-delay-1">
            <p>I'm That, based in the Netherlands — a software developer with a background in web development and a deep passion for the automotive world.</p>
            <p>I love building things for the web, exploring software and game development, and continuously sharpening my technical skills.</p>
            <p>Beyond the screen, I'm also a hands-on car mechanic and automotive enthusiast who enjoys diving into the mechanical side of cars just as much as developing websites and software.</p>
          </div>
        </div>

        <!-- Right: spec sheet -->
        <div class="reveal reveal-delay-1">
          <div class="spec-list about-grid-specs">
            <div class="spec-row"><span class="spec-key">Location</span><span class="spec-val t-accent" data-val="'s-Hertogenbosch, NL">—</span></div>
            <div class="spec-row"><span class="spec-key">Current Role</span><span class="spec-val t-accent" data-val="Autotechnicus — Nefkens Peugeot">—</span></div>
            <div class="spec-row"><span class="spec-key">Education</span><span class="spec-val t-accent" data-val="MBO Lvl 4 Software Dev — ROC van Amsterdam">—</span></div>
            <div class="spec-row"><span class="spec-key">Currently Training</span><span class="spec-val t-accent" data-val="MBO Lvl 2 Autotechnicus — ROC Midden NL">—</span></div>
            <div class="spec-row"><span class="spec-key">Availability</span><span class="spec-val t-accent" data-val="Open to opportunities">—</span></div>
          </div>

          <!-- Animated stat bar -->
          <div class="stat-block stat-block-anim reveal reveal-delay-3">
            <div class="stat-item">
              <span class="stat-num"><span data-count="10">0</span>+</span>
              <span class="stat-label">Projects built</span>
            </div>
            <div class="stat-item">
              <span class="stat-num"><span data-count="2">0</span>+</span>
              <span class="stat-label">Years experience</span>
            </div>
            <div class="stat-item">
              <span class="stat-num"><span data-count="5">0</span></span>
              <span class="stat-label">Companies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="s-divider"></div>

  <!-- ══════════════════ PROJECTS ══════════════════ -->
  <section id="projects">
    <div class="s-wrap">
      <div class="s-label reveal"><span class="s-num t-accent">003</span> Selected Work</div>

      <div class="projects-list">

        <a class="proj-row reveal" href="https://ladderservice.nl/" target="_blank">
          <span class="proj-num t-accent">01</span>
          <div class="proj-info">
            <span class="proj-title t-accent">LADDERSERVICE</span>
            <div class="proj-tags">
              <span class="proj-tag">UX/UI</span>
              <span class="proj-tag">WordPress</span>
              <span class="proj-tag">Web Design</span>
            </div>
            <span class="proj-desc">Platform for ladder inspections, maintenance and certifications. Designed a professional site communicating expertise and trustworthiness.</span>
          </div>
          <span class="proj-date">AUG 2022</span>
          <span class="proj-arrow">↗</span>
        </a>

        <a class="proj-row reveal reveal-delay-1" href="https://www.ksuverhuur.nl/" target="_blank">
          <span class="proj-num t-accent">02</span>
          <div class="proj-info">
            <span class="proj-title t-accent">KSU VERHUUR</span>
            <div class="proj-tags">
              <span class="proj-tag">UX/UI</span>
              <span class="proj-tag">WordPress</span>
              <span class="proj-tag">Web Design</span>
            </div>
            <span class="proj-desc">Event &amp; equipment rental platform. Optimised layout and refined design for smooth, intuitive browse-and-book experience.</span>
          </div>
          <span class="proj-date">JUL 2022</span>
          <span class="proj-arrow">↗</span>
        </a>

        <a class="proj-row reveal reveal-delay-2" href="https://www.demeesventilatie.nl/" target="_blank">
          <span class="proj-num t-accent">03</span>
          <div class="proj-info">
            <span class="proj-title t-accent">DE MEES VENTILATIE</span>
            <div class="proj-tags">
              <span class="proj-tag">UX/UI</span>
              <span class="proj-tag">WordPress</span>
              <span class="proj-tag">Web Design</span>
            </div>
            <span class="proj-desc">Website for a ventilation solutions company. Balanced client requirements with a clean, user-focused online presence.</span>
          </div>
          <span class="proj-date">JUL 2022</span>
          <span class="proj-arrow">↗</span>
        </a>

        <a class="proj-row reveal reveal-delay-3" href="https://www.camerainstallatie.nl/" target="_blank">
          <span class="proj-num t-accent">04</span>
          <div class="proj-info">
            <span class="proj-title t-accent">CAMERA INSTALLATIE</span>
            <div class="proj-tags">
              <span class="proj-tag">UX/UI</span>
              <span class="proj-tag">WordPress</span>
              <span class="proj-tag">Web Design</span>
            </div>
            <span class="proj-desc">Sleek, professional website for a security camera company. Clarity-first design enabling customers to find solutions fast.</span>
          </div>
          <span class="proj-date">JUN 2022</span>
          <span class="proj-arrow">↗</span>
        </a>

        <a class="proj-row reveal reveal-delay-4" href="https://checkjestem.nl/" target="_blank">
          <span class="proj-num t-accent">05</span>
          <div class="proj-info">
            <span class="proj-title t-accent">CHECK JE STEM</span>
            <div class="proj-tags">
              <span class="proj-tag">UX/UI</span>
              <span class="proj-tag">WordPress</span>
              <span class="proj-tag">Web Design</span>
            </div>
            <span class="proj-desc">Voting advice platform. Clean, accessible design prioritising usability and delivering political insights in a straightforward manner.</span>
          </div>
          <span class="proj-date">JUN 2022</span>
          <span class="proj-arrow">↗</span>
        </a>

        <a class="proj-row reveal reveal-delay-5" href="https://www.interplast.nl/" target="_blank">
          <span class="proj-num t-accent">06</span>
          <div class="proj-info">
            <span class="proj-title t-accent">STICHTING INTERPLAST HOLLAND</span>
            <div class="proj-tags">
              <span class="proj-tag">UX/UI</span>
              <span class="proj-tag">WordPress</span>
              <span class="proj-tag">Web Design</span>
              <span class="proj-tag">Non-Profit</span>
            </div>
            <span class="proj-desc">Website for a non-profit providing free reconstructive surgery in underserved regions. A project close to heart — best work delivered.</span>
          </div>
          <span class="proj-date">JUN 2022</span>
          <span class="proj-arrow">↗</span>
        </a>

        <a class="proj-row reveal" href="https://www.greenfoot.org/scenarios/30084" target="_blank">
          <span class="proj-num t-accent">07</span>
          <div class="proj-info">
            <span class="proj-title t-accent">SAN'S NIGHTMARE</span>
            <div class="proj-tags">
              <span class="proj-tag">Java</span>
              <span class="proj-tag">Greenfoot</span>
              <span class="proj-tag">Game Dev</span>
            </div>
            <span class="proj-desc">Developed and published an interactive Java game in one school project week using Greenfoot IDE. Rapid prototyping under a hard deadline.</span>
          </div>
          <span class="proj-date">NOV 2019</span>
          <span class="proj-arrow">↗</span>
        </a>

      </div>
    </div>
  </section>

  <div class="s-divider"></div>

  <!-- ══════════════════ CV / EXPERIENCE ══════════════════ -->
  <section id="cv">
    <div class="s-wrap">
      <div class="s-label reveal"><span class="s-num t-accent">004</span> Experience &amp; Education</div>

      <div class="cv-grid">

        <!-- LEFT: Experience -->
        <div class="cv-block">
          <div class="cv-block-title reveal">Work Experience</div>

          <div class="cv-entry reveal">
            <div class="cv-entry-head">
              <span class="cv-entry-title">BASIS AUTOTECHNICUS</span>
              <span class="cv-entry-date">SEP 2025 — NOW</span>
            </div>
            <div class="cv-entry-org">Nefkens Peugeot — 's-Hertogenbosch</div>
            <div class="cv-entry-desc">Automotive technician in training at an official Peugeot dealer. Hands-on diagnostics, maintenance, and repair in a professional workshop environment.</div>
          </div>

          <div class="cv-entry reveal reveal-delay-1">
            <div class="cv-entry-head">
              <span class="cv-entry-title">ALGEMEEN MEDEWERKER</span>
              <span class="cv-entry-date">MAY 2025 — AUG 2025</span>
            </div>
            <div class="cv-entry-org">Nefkens Peugeot — 's-Hertogenbosch</div>
            <div class="cv-entry-desc">General operations support at the dealership before transitioning into the technical role.</div>
          </div>

          <div class="cv-entry reveal reveal-delay-2">
            <div class="cv-entry-head">
              <span class="cv-entry-title">MEDEWERKER</span>
              <span class="cv-entry-date">OCT 2024 — MAY 2025</span>
            </div>
            <div class="cv-entry-org">Cafetaria De Poort</div>
            <div class="cv-entry-desc">Customer-facing service role in a fast-paced food service environment.</div>
          </div>

          <div class="cv-entry reveal reveal-delay-3">
            <div class="cv-entry-head">
              <span class="cv-entry-title">MEDEWERKER EXPEDITIE &amp; PRODUCTIE</span>
              <span class="cv-entry-date">FEB 2024 — JUL 2024</span>
            </div>
            <div class="cv-entry-org">Poultry Trade Partners N.V. — Harderwijk</div>
            <div class="cv-entry-desc">Loading and unloading trucks, processing transport documents, quality control within poultry industry production processes.</div>
          </div>

          <div class="cv-entry reveal reveal-delay-4">
            <div class="cv-entry-head">
              <span class="cv-entry-title">ALLROUND MEDEWERKER</span>
              <span class="cv-entry-date">AUG 2022 — FEB 2024</span>
            </div>
            <div class="cv-entry-org">Big Bread Kitchen — Almere</div>
            <div class="cv-entry-desc">Welcoming guests, taking orders, handling and delivering food in a dynamic hospitality environment. Developed strong communication skills.</div>
          </div>

          <div class="cv-entry reveal reveal-delay-5">
            <div class="cv-entry-head">
              <span class="cv-entry-title">STAGIAIR SOFTWARE DEVELOPER</span>
              <span class="cv-entry-date">AUG 2022 — JAN 2023</span>
            </div>
            <div class="cv-entry-org">Raion Design — Almere</div>
            <div class="cv-entry-desc">Worked on a range of websites from personal portfolios to non-profit platforms. Gained professional experience in web design and development with real client briefs.</div>
            <div class="cv-skills">
              <span class="cv-skill-tag t-accent">HTML/CSS</span>
              <span class="cv-skill-tag t-accent">PHP</span>
              <span class="cv-skill-tag t-accent">WordPress</span>
              <span class="cv-skill-tag t-accent">JavaScript</span>
              <span class="cv-skill-tag t-accent">MySQL</span>
            </div>
          </div>

          <div class="cv-entry reveal">
            <div class="cv-entry-head">
              <span class="cv-entry-title">SHOPPER</span>
              <span class="cv-entry-date">APR 2021 — APR 2022</span>
            </div>
            <div class="cv-entry-org">Picnic Technologies — Diemen</div>
            <div class="cv-entry-desc">Collecting grocery orders, quality control of products, and restocking warehouse scraps with precision and speed in a tech-driven logistics environment.</div>
          </div>

        </div>

        <!-- RIGHT: Education + Skills -->
        <div class="cv-block">
          <div class="cv-block-title reveal">Education</div>

          <div class="cv-entry reveal">
            <div class="cv-entry-head">
              <span class="cv-entry-title">MBO NIVEAU 2 — AUTOTECHNICUS</span>
              <span class="cv-entry-date">SEP 2025 — JUL 2028</span>
            </div>
            <div class="cv-entry-org">ROC Midden Nederland</div>
            <div class="cv-entry-desc">Basis technicus voertuigen en mobiele werktuigen. Currently pursuing this qualification alongside hands-on work at Nefkens Peugeot.</div>
          </div>

          <div class="cv-entry reveal reveal-delay-1">
            <div class="cv-entry-head">
              <span class="cv-entry-title">MBO NIVEAU 4 — SOFTWARE DEVELOPER</span>
              <span class="cv-entry-date">AUG 2019 — JUN 2023</span>
            </div>
            <div class="cv-entry-org">ROC van Amsterdam | Flevoland</div>
            <div class="cv-entry-desc">Full four-year software development programme covering web development, databases, back-end scripting, graphic design, and agile methodology.</div>
          </div>

          <div class="cv-entry reveal reveal-delay-2">
            <div class="cv-entry-head">
              <span class="cv-entry-title">VMBO-KBL — TECHNIEK</span>
              <span class="cv-entry-date">AUG 2013 — JUL 2017</span>
            </div>
            <div class="cv-entry-org">OSG De Meergronden</div>
            <div class="cv-entry-desc">Technical pre-vocational secondary education with a focus on practical engineering subjects.</div>
          </div>

          <!-- Skills block inside education column -->
          <div class="cv-skills-wrap reveal reveal-delay-3">
            <div class="cv-block-title">Technical Skills</div>
            <div class="cv-skills">
              <span class="cv-skill-tag t-accent">HTML5</span>
              <span class="cv-skill-tag t-accent">CSS3</span>
              <span class="cv-skill-tag t-accent">JavaScript</span>
              <span class="cv-skill-tag t-accent">PHP</span>
              <span class="cv-skill-tag t-accent">MySQL</span>
              <span class="cv-skill-tag t-accent">WordPress</span>
              <span class="cv-skill-tag t-accent">Oxygen Builder</span>
              <span class="cv-skill-tag t-accent">Figma</span>
              <span class="cv-skill-tag t-accent">Back-End Dev</span>
              <span class="cv-skill-tag t-accent">Grafisch Ontwerp</span>
              <span class="cv-skill-tag t-accent">Java (Greenfoot)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>

  <div class="s-divider"></div>

  <!-- ══════════════════ CONTACT ══════════════════ -->
  <section id="contact">
    <div class="s-wrap">
      <div class="s-label reveal"><span class="s-num t-accent">005</span> Contact</div>
      <h2 class="contact-big reveal glitch-title" data-text="Let's Build Something.">
        Let's Build<br><em>Something.</em>
      </h2>
      <div class="contact-btn-wrap reveal reveal-delay-1">
        <a class="btn-accent" href="/cdn-cgi/l/email-protection#335d47045d54464a565d73545e525a5f1d505c5e">GET IN TOUCH →</a>
      </div>
    </div>
  </section>

  <!-- ── FOOTER ── -->
  <?php include 'partials/footer.php' ?>

</div><!-- end #content -->

<?php include 'partials/js.php' ?>

</body>
</html>