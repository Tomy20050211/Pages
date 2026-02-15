// ========================================
// PARALLAX AND SCROLL EFFECTS
// ========================================

const slogan = document.querySelector(".slogan");
const interfaz = document.querySelector(".interfaz");
const materias = document.querySelector(".container-materias");
const header = document.querySelector("header");

// Scroll parallax effect + header background
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const progress = Math.min(scrollY / windowHeight, 1);

    // Hero section animations
    const scaleHero = 1 - progress * 0.3;
    const translateHero = progress * 150;
    const opacityHero = 1 - progress * 1.2;

    if (slogan) {
        slogan.style.transform = `translateY(${translateHero}px) scale(${scaleHero})`;
        slogan.style.opacity = opacityHero;
    }

    if (interfaz) {
        interfaz.style.transform = `translateY(${translateHero}px) scale(${scaleHero})`;
        interfaz.style.opacity = opacityHero;
    }

    // Materias section animations
    if (materias) {
        const translateMaterias = 200 - progress * 200;
        const scaleMaterias = 0.9 + progress * 0.1;
        materias.style.transform = `translateY(${translateMaterias}px) scale(${scaleMaterias})`;
    }

    // Header background on scroll
    if (header) {
        if (scrollY > 100) {
            header.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
            header.style.backdropFilter = "blur(10px)";
            header.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
        } else {
            header.style.backgroundColor = "transparent";
            header.style.backdropFilter = "none";
            header.style.boxShadow = "none";
        }
    }
});

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        let target;

        // Mapeo correcto de los enlaces a sus secciones correspondientes
        switch(targetId) {
            case "#home":
                target = document.querySelector(".slogan");
                break;
            case "#aboutUs":
                target = document.getElementById("aboutUs");
                break;
            case "#skills-container":
                target = document.getElementById("skills-container");
                break;
            case "#contact":
                target = document.getElementById("contact");
                break;
            default:
                target = document.querySelector(targetId);
        }

        if (!target) {
            console.warn(`No se encontró el elemento para: ${targetId}`);
            return;
        }

        const startPosition = window.scrollY;
        const targetPosition = target.offsetTop - 100;
        const distance = targetPosition - startPosition;
        const duration = 1500;
        let start = null;

        function animation(currentTime) {
            if (!start) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    });
});

// ========================================
// DUPLICATE CARDS FOR INFINITE CAROUSEL
// ========================================

function duplicateCards() {
    const columnUp = document.getElementById('columnUp');
    const columnDown = document.getElementById('columnDown');

    if (columnUp && columnDown) {
        const cardsUp = columnUp.innerHTML;
        columnUp.innerHTML = cardsUp + cardsUp;

        const cardsDown = columnDown.innerHTML;
        columnDown.innerHTML = cardsDown + cardsDown;
    }
}

duplicateCards();

// ========================================
// AUTH MODAL FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Get modal elements
    const authModal = document.getElementById('authModal');
    const authWrapper = document.getElementById('authWrapper');
    const brandPanel = document.getElementById('brandPanel');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const openLoginBtn = document.getElementById('openLoginBtn');
    const openRegisterBtn = document.getElementById('openRegisterBtn');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const dots = document.querySelectorAll('.dot');
    const h1 = document.getElementById('h1Mahoraga')

    // ========================================
    // ⭐ FUNCIÓN PARA CAMBIAR COLOR DEL LOGO Y CÍRCULO
    // ========================================
    function updateLogoColor(isRegisterMode) {
        const logoLogin = document.querySelector('.logoLogin');
        const logoCircle = document.querySelector('.logo-circle');
        const brandPanel = document.getElementById('brandPanel');
        
        if (logoLogin && logoCircle) {
            // Pequeño efecto de escala durante el cambio
            logoCircle.style.transform = 'scale(0.95)';
            logoLogin.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (isRegisterMode) {
                    // Register: Logo Blanco + Círculo Negro + Fondo Blanco
                    logoLogin.style.filter = 'brightness(100%)';
                    logoCircle.style.background = 'linear-gradient(135deg, #000000 0%, #000000 100%)';
                    logoCircle.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
                    if (brandPanel) {
                        brandPanel.style.background = 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)';
                        h1.style.color = 'black';
                    }
                } else {
                    // Login: Logo Negro + Círculo Blanco + Fondo Oscuro
                    logoLogin.style.filter = 'brightness(1%)';
                    logoCircle.style.background = 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)';
                    logoCircle.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.2)';
                    if (brandPanel) {
                        brandPanel.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #000000 100%)';
                    }
                }
            }, 100);
            
            // Efecto de expansión (pop)
            setTimeout(() => {
                logoCircle.style.transform = 'scale(1.05)';
                logoLogin.style.transform = 'scale(1.05)';
            }, 150);
            
            // Volver a normal
            setTimeout(() => {
                logoCircle.style.transform = 'scale(1)';
                logoLogin.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Open modal with login form
    if (openLoginBtn) {
        openLoginBtn.addEventListener('click', () => {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset to login view
            authWrapper.classList.remove('register-mode');
            registerSection.classList.remove('active');
            loginSection.classList.add('active');
            updateDots(0);
            
            // ⭐ Establecer colores iniciales para login
            setTimeout(() => {
                updateLogoColor(false);
            }, 100);
        });
    }

    // Open modal with register form
    if (openRegisterBtn) {
        openRegisterBtn.addEventListener('click', () => {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Switch to register view
            setTimeout(() => {
                switchToRegisterView();
            }, 100);
        });
    }

    // Close modal function
    function closeModal() {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset forms
        if (loginForm) loginForm.reset();
        if (registerForm) registerForm.reset();
        
        // Clear any alerts
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => alert.remove());
    }

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Click outside to close
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && authModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ========================================
    // ⭐ Switch to Register (ACTUALIZADO)
    // ========================================
    function switchToRegisterView() {
        // Fade out brand panel
        brandPanel.classList.add('fade-out');
        brandPanel.classList.remove('fade-in');
        
        // Remove active from login
        loginSection.classList.remove('active');
        
        // Change order after fade out
        setTimeout(() => {
            authWrapper.classList.add('register-mode');
            updateDots(1);
            updateLogoColor(true); // ⭐ Logo blanco + círculo negro
        }, 250);
        
        // Fade in brand panel in new position
        setTimeout(() => {
            brandPanel.classList.remove('fade-out');
            brandPanel.classList.add('fade-in');
        }, 500);
        
        // Show register form
        setTimeout(() => {
            registerSection.classList.add('active');
        }, 350);
    }

    // ========================================
    // ⭐ Switch to Login (ACTUALIZADO)
    // ========================================
    function switchToLoginView() {
        // Fade out brand panel
        brandPanel.classList.add('fade-out');
        brandPanel.classList.remove('fade-in');
        
        // Remove active from register
        registerSection.classList.remove('active');
        
        // Change order after fade out
        setTimeout(() => {
            authWrapper.classList.remove('register-mode');
            updateDots(0);
            updateLogoColor(false); // ⭐ Logo negro + círculo blanco
        }, 250);
        
        // Fade in brand panel in new position
        setTimeout(() => {
            brandPanel.classList.remove('fade-out');
            brandPanel.classList.add('fade-in');
        }, 500);
        
        // Show login form
        setTimeout(() => {
            loginSection.classList.add('active');
        }, 350);
    }

    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            switchToRegisterView();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            switchToLoginView();
        });
    }

    // Update dots indicator
    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Show alert message
    function showAlert(form, message, type) {
        // Remove existing alerts
        const existingAlert = form.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create new alert
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;

        // Insert at the beginning of the form
        form.insertBefore(alert, form.firstChild);

        // Remove after 4 seconds
        setTimeout(() => {
            alert.remove();
        }, 4000);
    }

    // Validate username
    function validateUsername(username) {
        if (!username || username.length < 3) {
            return 'Username must be at least 3 characters long';
        }
        if (username.length > 20) {
            return 'Username must be less than 20 characters';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return 'Username can only contain letters, numbers and underscores';
        }
        return null;
    }

    // Validate password
    function validatePassword(password) {
        if (!password || password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        if (password.length > 50) {
            return 'Password must be less than 50 characters';
        }
        return null;
    }

    // Login Form Handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('loginUser').value.trim();
            const password = document.getElementById('loginPass').value;

            // Validate inputs
            const usernameError = validateUsername(username);
            if (usernameError) {
                showAlert(loginForm, usernameError, 'error');
                return;
            }

            const passwordError = validatePassword(password);
            if (passwordError) {
                showAlert(loginForm, passwordError, 'error');
                return;
            }

            // Check credentials
            const users = JSON.parse(localStorage.getItem('mahoraga_users')) || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                showAlert(loginForm, 'Login successful! Welcome back.', 'success');
                
                // Save session
                localStorage.setItem('mahoraga_session', JSON.stringify({
                    username: user.username,
                    loginTime: new Date().toISOString()
                }));

                // Close modal and redirect after success
                setTimeout(() => {
                    closeModal();
                    console.log('Logged in as:', username);
                    // window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showAlert(loginForm, 'Invalid username or password', 'error');
            }
        });
    }

    // Register Form Handler
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('registerUser').value.trim();
            const password = document.getElementById('registerPass').value;
            const confirmPassword = document.getElementById('registerConfirm').value;

            // Validate username
            const usernameError = validateUsername(username);
            if (usernameError) {
                showAlert(registerForm, usernameError, 'error');
                return;
            }

            // Validate password
            const passwordError = validatePassword(password);
            if (passwordError) {
                showAlert(registerForm, passwordError, 'error');
                return;
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                showAlert(registerForm, 'Passwords do not match', 'error');
                return;
            }

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('mahoraga_users')) || [];
            const userExists = users.find(u => u.username === username);

            if (userExists) {
                showAlert(registerForm, 'Username already exists', 'error');
                return;
            }

            // Create new user
            const newUser = {
                username: username,
                password: password,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('mahoraga_users', JSON.stringify(users));

            showAlert(registerForm, 'Account created successfully!', 'success');

            // Clear form
            registerForm.reset();

            // Switch to login after 2 seconds
            setTimeout(() => {
                switchToLoginView();
            }, 2000);
        });
    }

    // Input animations
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    console.log('Mahoraga - All systems initialized ✨');
});