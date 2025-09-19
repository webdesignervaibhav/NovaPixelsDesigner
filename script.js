// Smooth scroll for same-page links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ 
      e.preventDefault(); 
      el.scrollIntoView({behavior:'smooth', block:'start'}); 
      // Close mobile menu when clicking a link
      document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
      document.querySelector('.main-nav')?.classList.remove('active');
    }
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
if(menuToggle && mainNav){
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close menu when window is resized to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Back to top button
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll',()=>{
  if(window.scrollY > 500){ backBtn.classList.add('show'); }
  else{ backBtn.classList.remove('show'); }
});

// Simple form check (no backend)
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if(!data.name || !data.email || !data.service || !data.message){
    alert('Please fill in all required fields (Name, Email, Service, Message).');
    return;
  }
  alert('Thanks! Your message is ready to be sent via your email client.');
  // Open mail client prefilled to preferred email
  const subject = encodeURIComponent('New Project Inquiry');
  const body = encodeURIComponent(
    `Name: ${data.name}\nPhone: ${data.phone || ''}\nService: ${data.service}\nBudget: ${data.budget || ''}\n\nMessage:\n${data.message}`
  );
  window.location.href = `mailto:webdesignernovapixels@gmail.com?subject=${subject}&body=${body}`;
});

// Copy phone to clipboard
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(val).then(()=>{
      btn.textContent = 'Copied!';
      setTimeout(()=>btn.textContent='Copy',1500);
    });
  });
});