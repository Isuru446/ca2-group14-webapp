'use strict';

// TASK 4 CUSTOMIZATION: Replace "G" with your actual group number (for example, "4").
const GROUP_NUMBER = 'G';

// Keep all visible group labels and the browser title consistent.
document.querySelectorAll('[data-group-number]').forEach((label) => {
  label.textContent = GROUP_NUMBER;
});
document.title = `Group ${GROUP_NUMBER} Cloud Showcase`;

// Lab 04 / Task 4 interactive feature #1: Show today's local date on the page.
const dateButton = document.getElementById('dateBtn');
const dateResult = document.getElementById('dateOutput');

if (dateButton && dateResult) {
  dateButton.addEventListener('click', () => {
    const today = new Date();
    const formatted = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(today);
    dateResult.textContent = `Today is ${formatted}`;
    dateResult.classList.add('visible');
    dateButton.classList.add('date-shown');
  });
}

// Task 4 interactive feature #2: Interactive cloud service-model explorer.
// Choose IaaS, PaaS or SaaS to update the explanation and real-world example.
const cloudModels = {
  iaas: {
    category: 'MODEL 01 / 03',
    icon: '▦',
    title: 'Infrastructure as a Service',
    description: 'Rent virtual computing infrastructure, such as servers, storage and networking, without buying physical hardware.',
    use: 'Custom systems and virtual machines',
    example: 'Azure Virtual Machines'
  },
  paas: {
    category: 'MODEL 02 / 03',
    icon: '◈',
    title: 'Platform as a Service',
    description: 'Build, run and deploy applications on a managed platform. The provider handles much of the underlying infrastructure.',
    use: 'Developing and hosting web applications',
    example: 'Azure App Service'
  },
  saas: {
    category: 'MODEL 03 / 03',
    icon: '▤',
    title: 'Software as a Service',
    description: 'Use ready-made software over the internet. The provider operates and maintains the application for you.',
    use: 'Email, collaboration and productivity',
    example: 'Microsoft 365'
  }
};

const tabs = Array.from(document.querySelectorAll('.model-tab'));
const modelPanel = document.getElementById('model-panel');

function selectModel(key) {
  const model = cloudModels[key];
  if (!model || !modelPanel) return;

  tabs.forEach((tab) => {
    const active = tab.dataset.model === key;
    tab.classList.toggle('selected', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  document.getElementById('model-category').textContent = model.category;
  document.getElementById('model-icon').textContent = model.icon;
  document.getElementById('model-title').textContent = model.title;
  document.getElementById('model-description').textContent = model.description;
  document.getElementById('model-use').textContent = model.use;
  document.getElementById('model-example').textContent = model.example;
  modelPanel.setAttribute('aria-labelledby', `tab-${key}`);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectModel(tab.dataset.model));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else nextIndex = (index - 1 + tabs.length) % tabs.length;
    selectModel(tabs[nextIndex].dataset.model);
    tabs[nextIndex].focus();
  });
});

// Mobile navigation and scroll-position indicators.
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  };
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const sectionLinks = Array.from(document.querySelectorAll('.nav-link'));
const pageSections = Array.from(document.querySelectorAll('main section[id]'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
      });
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
  pageSections.forEach((section) => observer.observe(section));
}
