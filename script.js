document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                mobileBtn.innerHTML = '✕';
            } else {
                mobileBtn.innerHTML = '☰';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '☰';
            }
        });
    });

    // 2. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('section, .interactive-card, .timeline-item, .service-row, .hero-content, .hero-visual');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const styleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        // Setup initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        styleObserver.observe(el);
    });

    // 3. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed navbar height + some padding
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });



    // 5. Interactive Cards Mouse Tracking Effect (Neon Glow)
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Image Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const zoomableImages = document.querySelectorAll('.about-img, .certifications .card img');

    if (modal && modalImg && closeBtn) {
        zoomableImages.forEach(img => {
            // Make image look clickable
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', function() {
                modal.classList.add('show');
                modalImg.src = this.src;
                // Add a small delay for the scale animation to trigger properly
                setTimeout(() => {
                    modalImg.style.transform = 'scale(1)';
                }, 10);
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            modalImg.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modalImg.src = '';
            }, 300); // Wait for transition
        };

        // Close on X click
        closeBtn.addEventListener('click', closeModal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    // 7. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('portfolio_theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (iconSun && iconMoon) {
            iconSun.style.display = 'none';
            iconMoon.style.display = 'inline';
        }
    }

    if (themeToggleBtn && iconSun && iconMoon) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                // Switch to dark
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio_theme', 'dark');
                iconMoon.style.display = 'none';
                iconSun.style.display = 'inline';
            } else {
                // Switch to light
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio_theme', 'light');
                iconSun.style.display = 'none';
                iconMoon.style.display = 'inline';
            }

        });
    }

    // 8. Functional AI Assistant logic (Options-driven)
    const aiBotBtn = document.getElementById('ai-bot-btn');
    const aiChatWindow = document.getElementById('ai-chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');

    // Bot Knowledge Base (Strictly aligned with CV - English)
    const cvData = {
        name: "Pablo Ezequiel Campos Segovia",
        experience: "Pablo brings over 14 years of professional experience focused on IT Support, Corporate Infrastructure, and Enterprise Networking. He currently works in IT Support, Infra & Cloud Operations at AWS Argentina (taking ownership of corporate user support, asset management, and on-site infrastructure). Previously, he was IT Coordinator (LATAM) & IT Infrastructure Engineer at NCR Voyix, with prior roles at Prosegur (ATM Systems Support), Compumundo (IT Support Sr), and PC Arts / Bangho.",
        skills: "At a professional level with 14+ years of expertise: Corporate Infrastructure, IT Support, Enterprise Networking (CISCO, Fortinet), Hardware/Software Diagnostics, Real-time Monitoring (Grafana), and Incident Governance (STAR methodology / SLAs). In Cloud & Software Development, he holds practical skills in AWS (Certified Cloud Practitioner), Azure, Docker, React, C#, SQL, and JavaScript.",
        education: "Currently studying for a Higher Degree in Programming at the National Technological University (UTN, in progress). Electronic Technician with Computing Orientation graduated from Escuela Técnica N° 29 'Reconquista de Buenos Aires' (Dec 2010, Final Grade: 8/10). Also holds AWS Certified Cloud Practitioner, CompTIA A+ (Udemy 2025), and Network Technician (UTN 2021) certifications.",
        hobbies: "Outside of work, he is a passionate animal lover and finds balance through martial arts and playing the piano. He is deeply curious about continuous personal growth, cloud technologies, and technical problem-solving.",
        talents: "Rapid adaptability, analytical troubleshooting under pressure, corporate infrastructure ownership, continuous learning, and cross-functional team collaboration.",
        goals: "To continuously expand his expertise in enterprise infrastructure and cloud operations while leveraging hands-on software development skills for automated, high-impact systems.",
        methodology: "Applies the STAR framework for structured incident management and root-cause analysis, combined with strict SLA governance to guarantee 24/7 business continuity.",
        languages: "Spanish (Native), English (Professional Working Proficiency - Argentine Air Force / Aeronáutica Argentina), and Portuguese (Basic).",
        achievements: "Over 14 years maintaining 24/7 operational reliability across multinational enterprise environments (AWS Argentina, NCR Voyix, Prosegur), and regional IT coordination across LATAM (Argentina, Chile, Brazil).",
        day1: "For Pablo, 'Day 1' is a mindset of relentless ownership, high standards, and proactive agility applied every day to infrastructure and support at AWS Argentina.",
        latam: "Regional leadership and hands-on IT operations coordination across Latin America during his tenure at NCR Voyix, overseeing infrastructure and datacenters in Argentina, Chile, and Brazil."
    };

    const toggleChat = () => {
        aiChatWindow.classList.toggle('open');
        if (aiChatWindow.classList.contains('open')) {
            // Show options if not already shown
            if (!chatMessages.querySelector('.chat-options-container')) {
                showBotOptions();
            }
        }
    };

    if (aiBotBtn && aiChatWindow && closeChatBtn) {
        aiBotBtn.addEventListener('click', toggleChat);
        closeChatBtn.addEventListener('click', toggleChat);
    }

    const appendMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const showBotOptions = () => {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'chat-options-container';
        
        const options = [
            { id: 'cv', text: '📄 Download CV (PDF)' },
            { id: 'skills', text: '🛠️ Skills & Tech' },
            { id: 'experience', text: '💼 Experience' },
            { id: 'education', text: '🎓 Education & Certs' },
            { id: 'latam', text: '🌎 LATAM Operations' },
            { id: 'achievements', text: '🏆 Achievements' },
            { id: 'methodology', text: '📐 Methodology' },
            { id: 'languages', text: '🗣️ Languages' },
            { id: 'contacto', text: '📞 Contact' }
        ];

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.innerText = opt.text;
            btn.onclick = () => handleOptionClick(opt.text, opt.id);
            optionsContainer.appendChild(btn);
        });

        chatMessages.appendChild(optionsContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleOptionClick = (text, id) => {
        // Remove existing options to avoid clutter
        const existingOptions = document.querySelector('.chat-options-container');
        if (existingOptions) existingOptions.remove();

        appendMessage(text, 'user');
        const indicator = showTypingIndicator();

        setTimeout(() => {
            indicator.remove();
            let response = "";
            if (id === 'cv') response = generateResponse('cv');
            else if (id === 'skills') response = generateResponse('skills');
            else if (id === 'experience') response = generateResponse('experience');
            else if (id === 'education') response = generateResponse('education');
            else if (id === 'latam') response = generateResponse('latam');
            else if (id === 'achievements') response = generateResponse('achievements');
            else if (id === 'methodology') response = generateResponse('methodology');
            else if (id === 'languages') response = generateResponse('languages');
            else if (id === 'contacto') response = generateResponse('contact');
            
            appendMessage(response, 'bot');
            
            // Show options again for continuous exploration
            setTimeout(() => {
                appendMessage("Would you like to explore anything else about Pablo's profile?", 'bot');
                showBotOptions();
            }, 1000);
        }, 1000);
    };

    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'message bot-message typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    };

    const generateResponse = (input) => {
        // Normalize text: lowercase and remove accents
        const query = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        // Specific Tech Keywords - strict CV alignment
        if (query.includes('aws') || query.includes('amazon') || query.includes('cloud') || query.includes('nube') || query.includes('practitioner')) {
            return "At AWS Argentina, Pablo works in IT Support, Infra & Cloud Operations focused on corporate user support, asset management, and on-site physical/corporate infrastructure. He holds the AWS Certified Cloud Practitioner certification and pursues continuous cloud training, with his primary professional expertise centered on enterprise infrastructure, IT support, and networking.";
        }
        if (query.includes('cisco')) {
            return "At a professional level, Pablo has extensive experience in networking and infrastructure, configuring and maintaining CISCO enterprise equipment.";
        }
        if (query.includes('fortinet')) {
            return "In perimeter security and network connectivity, Pablo has solid professional experience administering Fortinet solutions for corporate infrastructure.";
        }
        if (query.includes('react') || query.includes('javascript') || query.includes('js') || query.includes('frontend')) {
            return "In software development, Pablo has practical skills in React and JavaScript, complementing his programming degree studies at UTN.";
        }
        if (query.includes('azure')) {
            return "Pablo holds practical knowledge and hands-on experience in Azure, complementing his cloud training.";
        }
        if (query.includes('docker') || query.includes('vmware') || query.includes('virtualiz')) {
            return "Pablo uses Docker and VMware for virtualization and containerization practices.";
        }
        if (query.includes('grafana') || query.includes('monitoreo') || query.includes('monitoring')) {
            return "In support and operations, Pablo utilizes Grafana for real-time infrastructure and service availability monitoring.";
        }
        if (query.includes('networking') || query.includes('redes') || query.includes('switch') || query.includes('router')) {
            return "Enterprise networking and infrastructure are the core of his 14+ year professional career: configuring routers, switches, structured cabling, and end-to-end support.";
        }
        if (query.includes('especial') || query.includes('perfil') || query.includes('fuerte') || query.includes('destaca') || query.includes('habilidad') || query.includes('conocimiento') || query.includes('tecnolog') || query.includes('skills') || query.includes('que sabe') || query.includes('que hace')) {
            return cvData.skills;
        }
        if (query.includes('infra') || query.includes('corporativ') || query.includes('soporte') || query.includes('support') || query.includes('helpdesk') || query.includes('operaciones') || query.includes('operations')) {
            return "At a professional level, corporate infrastructure and IT support are the cornerstone of his 14+ year career: managing enterprise networks (CISCO, Fortinet), datacenter maintenance, user support, asset management, and SLA-governed incident resolution.";
        }
        if (query.includes('experiencia') || query.includes('experience') || query.includes('trabaj') || query.includes('trayectoria') || query.includes('donde') || query.includes('empresas') || query.includes('ncr') || query.includes('prosegur')) {
            return cvData.experience;
        }
        if (query.includes('estudi') || query.includes('education') || query.includes('formacion') || query.includes('educacion') || query.includes('certifica') || query.includes('cert') || query.includes('titulo') || query.includes('comptia') || query.includes('utn')) {
            return cvData.education;
        }
        if (query.includes('programac') || query.includes('desarrollo') || query.includes('development') || query.includes('coding') || query.includes('codigo') || query.includes('software') || query.includes('c#') || query.includes('sql')) {
            return "Pablo is studying for a Higher Degree in Programming at UTN and holds practical experience in React, C#, SQL, JavaScript, and software development.";
        }
        if (query.includes('hobby') || query.includes('aficion') || query.includes('gustar') || query.includes('hobbies') || query.includes('tiempo libre') || query.includes('free time')) {
            return cvData.hobbies;
        }
        if (query.includes('talento') || query.includes('talent') || query.includes('capacidad') || query.includes('bueno') || query.includes('why hire')) {
            return cvData.talents;
        }
        if (query.includes('deseo') || query.includes('meta') || query.includes('goal') || query.includes('crecimiento') || query.includes('objetivo') || query.includes('proyeccion')) {
            return cvData.goals;
        }
        if (query.includes('metodologia') || query.includes('methodology') || query.includes('star') || query.includes('sla') || query.includes('procedimiento')) {
            return cvData.methodology;
        }
        if (query.includes('logros') || query.includes('achievements') || query.includes('exito') || query.includes('alcance') || query.includes('logrado')) {
            return cvData.achievements;
        }
        if (query.includes('idioma') || query.includes('language') || query.includes('ingles') || query.includes('portugues') || query.includes('english')) {
            return cvData.languages;
        }
        if (query.includes('day1') || query.includes('day 1') || query.includes('philosophy') || query.includes('filosofia')) {
            return cvData.day1;
        }
        if (query.includes('latam') || query.includes('chile') || query.includes('brasil') || query.includes('brazil')) {
            return cvData.latam;
        }
        if (query.includes('hola') || query.includes('hello') || query.includes('hi') || query.includes('buenos dias') || query.includes('who are you') || query.includes('help')) {
            return `Hello! I am Pablo Campos's interactive assistant. I can provide insights into his 14+ years of professional experience in IT Support & Infrastructure, his certifications (AWS CCP, CompTIA A+, Network Tech), and his practical cloud/development background.`;
        }
        if (query.includes('cv') || query.includes('curriculum') || query.includes('descargar') || query.includes('download') || query.includes('pdf') || query.includes('resume')) {
            return `You can view and download Pablo's complete professional CV (A4 / PDF format) here: <a href="cv.html?v=7" target="_blank" style="color: var(--accent-blue); text-decoration: underline; font-weight: bold;">📄 Open and Download CV (PDF)</a>.`;
        }
        if (query.includes('contacto') || query.includes('contact') || query.includes('email') || query.includes('telefono') || query.includes('phone') || query.includes('call') || query.includes('mail')) {
            return `You can contact Pablo directly via email at pabloezequielc@gmail.com or by phone at +54 11-3321-6355. You can also visit his LinkedIn profile linked in the footer.`;
        }

        // Generic IT query fallback
        if (query.includes('it') || query.includes('computacion') || query.includes('tech')) {
            return `Pablo has over 14 years of professional experience in Corporate IT Support, Infrastructure, and Networking, alongside practical knowledge in Cloud and Software Development.`;
        }

        // Off-topic protection
        return `My role is to answer questions strictly based on the professional experience, certifications, and technical background featured in Pablo Campos's CV. Feel free to explore the options above!`;
    };
});
