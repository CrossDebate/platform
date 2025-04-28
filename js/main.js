document.addEventListener('DOMContentLoaded', function() {
    // Scroll behavior for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        if (!link.getAttribute('href').includes('#login') && !link.getAttribute('href').includes('#register')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Modal handling for login/register
    document.querySelectorAll('a[href="#login"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        });
    });

    document.querySelectorAll('a[href="#register"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
            registerModal.show();
        });
    });

    // Form submission handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // TODO: Implement actual login logic
            console.log('Login attempt:', { email, password });
            
            // Mock successful login
            alert('Login bem-sucedido! Redirecionando para dashboard...');
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            
            // Get selected interests
            const interestsSelect = document.getElementById('register-interests');
            const selectedInterests = Array.from(interestsSelect.selectedOptions).map(option => option.value);
            
            // Validate at least 3 interests
            if (selectedInterests.length < 3) {
                alert('Por favor selecione ao menos 3 interesses.');
                return;
            }
            
            // TODO: Implement actual registration logic
            console.log('Registration:', { name, email, password, interests: selectedInterests });
            
            // Mock successful registration
            alert('Conta criada com sucesso! Verifique seu email para confirmar o cadastro.');
        });
    }

    // Load featured debates dynamically
    loadFeaturedDebates();
    
    // Load testimonials dynamically
    loadTestimonials();
    
    // Newsletter subscription handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // TODO: Implement newsletter subscription
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Obrigado por se inscrever em nossa newsletter!');
            this.reset();
        });
    }
});

// Function to load featured debates
function loadFeaturedDebates() {
    const debatesContainer = document.getElementById('featured-debates-container');
    if (!debatesContainer) return;
    
    // Sample debate data - in a real app, this would come from an API
    const featuredDebates = [
        {
            id: 1,
            title: 'O papel da inteligência artificial no futuro do trabalho',
            description: 'Um debate sobre como a IA está transformando o mercado de trabalho e quais serão as implicações para profissionais.',
            participants: 24,
            category: 'Tecnologia',
            image: 'assets/images/debates/ai-debate.jpg'
        },
        {
            id: 2,
            title: 'Modelos econômicos sustentáveis para o século XXI',
            description: 'Análise crítica de diferentes perspectivas sobre como estruturar economias que respeitem limites ecológicos.',
            participants: 18,
            category: 'Economia',
            image: 'assets/images/debates/economy-debate.jpg'
        },
        {
            id: 3,
            title: 'Democracia representativa vs. democracia participativa',
            description: 'Comparação dos modelos democráticos e discussão sobre qual seria mais efetivo nos contextos atuais.',
            participants: 32,
            category: 'Política',
            image: 'assets/images/debates/democracy-debate.jpg'
        }
    ];
    
    // Clear container first
    debatesContainer.innerHTML = '';
    
    // Create and append debate cards
    featuredDebates.forEach(debate => {
        const debateCard = document.createElement('div');
        debateCard.className = 'col-md-4';
        debateCard.innerHTML = `
            <div class="debate-card">
                <div class="debate-image">
                    <img src="${debate.image}" alt="${debate.title}" class="img-fluid">
                    <span class="debate-category">${debate.category}</span>
                </div>
                <div class="debate-content">
                    <h4>${debate.title}</h4>
                    <p>${debate.description}</p>
                    <div class="debate-meta">
                        <span><i class="bi bi-people"></i> ${debate.participants} participantes</span>
                    </div>
                    <a href="#debate-${debate.id}" class="btn btn-outline-primary btn-sm">Ver Debate</a>
                </div>
            </div>
        `;
        debatesContainer.appendChild(debateCard);
    });
}

// Function to load testimonials
function loadTestimonials() {
    const testimonialContainer = document.getElementById('testimonials-container');
    if (!testimonialContainer) return;
    
    // Sample testimonial data - in a real app, this would come from an API
    const testimonials = [
        {
            id: 1,
            name: "Ana Silva",
            role: "Professora Universitária",
            image: "assets/images/testimonials/testimonial-1.jpg",
            text: "CrossDebate me ajudou a explorar perspectivas que eu nunca teria encontrado de outra forma. A estrutura dos debates promove respeito mútuo, mesmo em tópicos controversos."
        },
        {
            id: 2,
            name: "Carlos Mendes",
            role: "Estudante de Ciência Política",
            image: "assets/images/testimonials/testimonial-2.jpg",
            text: "Participo regularmente dos debates e percebi uma melhora significativa na minha capacidade de argumentação e compreensão de diferentes pontos de vista."
        },
        {
            id: 3,
            name: "Lucia Ferreira",
            role: "Jornalista",
            image: "assets/images/testimonials/testimonial-3.jpg",
            text: "Como jornalista, valorizo plataformas que promovem diálogo honesto. O CrossDebate oferece um espaço onde ideias podem ser desafiadas respeitosamente."
        }
    ];
    
    // Clear container first
    testimonialContainer.innerHTML = '';
    
    // Create and append testimonial cards
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'col-md-4';
        testimonialCard.innerHTML = `
            <div class="testimonial-card">
                <div class="testimonial-text">
                    <p>"${testimonial.text}"</p>
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img">
                    <div class="testimonial-info">
                        <h5>${testimonial.name}</h5>
                        <span>${testimonial.role}</span>
                    </div>
                </div>
            </div>
        `;
        testimonialContainer.appendChild(testimonialCard);
    });
}
