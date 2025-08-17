class LoginManager {
    constructor() {
        this.currentRole = 'student';
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateRoleDisplay();
    }

    bindEvents() {
        // Role selection
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectRole(e.target.closest('.role-btn').dataset.role);
            });
        });

        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            this.handleLogin(e);
        });

        // Create account modal
        document.getElementById('createAccount').addEventListener('click', (e) => {
            e.preventDefault();
            this.openCreateAccountModal();
        });

        // Forgot password modal
        document.getElementById('forgotPassword').addEventListener('click', (e) => {
            e.preventDefault();
            this.openForgotPasswordModal();
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        // Signup form
        document.getElementById('signupForm').addEventListener('submit', (e) => {
            this.handleSignup(e);
        });

        // Reset password form
        document.getElementById('resetForm').addEventListener('submit', (e) => {
            this.handlePasswordReset(e);
        });
    }

    selectRole(role) {
        this.currentRole = role;
        
        // Update active button
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-role="${role}"]`).classList.add('active');
        
        this.updateRoleDisplay();
    }

    updateRoleDisplay() {
        const roleNames = {
            student: 'Student',
            mentor: 'Mentor',
            public: 'Public User'
        };
        
        document.getElementById('selectedRole').textContent = roleNames[this.currentRole];
        document.getElementById('resetRole').textContent = roleNames[this.currentRole];
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        // Simulate login process
        this.showMessage('Signing in...', 'info');
        
        setTimeout(() => {
            // Simulate successful login
            this.showMessage(`Welcome back, ${this.currentRole}!`, 'success');
            
            // Redirect based on role
            setTimeout(() => {
                this.redirectToRole();
            }, 1500);
        }, 1000);
    }

    handleSignup(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!fullName || !email || !password || !confirmPassword) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showMessage('Password must be at least 6 characters', 'error');
            return;
        }

        // Simulate account creation
        this.showMessage('Creating account...', 'info');
        
        setTimeout(() => {
            this.showMessage(`Account created successfully for ${this.currentRole}!`, 'success');
            this.closeModal(document.getElementById('createAccountModal'));
            
            // Clear form
            document.getElementById('signupForm').reset();
        }, 1000);
    }

    handlePasswordReset(e) {
        e.preventDefault();
        
        const email = document.getElementById('resetEmail').value;
        
        if (!email) {
            this.showMessage('Please enter your email address', 'error');
            return;
        }

        // Simulate password reset
        this.showMessage('Sending reset link...', 'info');
        
        setTimeout(() => {
            this.showMessage('Password reset link sent to your email!', 'success');
            this.closeModal(document.getElementById('forgotPasswordModal'));
            
            // Clear form
            document.getElementById('resetForm').reset();
        }, 1000);
    }

    openCreateAccountModal() {
        document.getElementById('createAccountModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    openForgotPasswordModal() {
        document.getElementById('forgotPasswordModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        // Style the message
        Object.assign(messageEl.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        });

        // Set background based on type
        const backgrounds = {
            success: 'rgba(34, 197, 94, 0.8)',
            error: 'rgba(239, 68, 68, 0.8)',
            info: 'rgba(59, 130, 246, 0.8)'
        };
        
        messageEl.style.background = backgrounds[type] || backgrounds.info;

        document.body.appendChild(messageEl);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    messageEl.remove();
                }, 300);
            }
        }, 3000);
    }

    redirectToRole() {
        const redirectUrls = {
            student: '/student-dashboard.html',
            mentor: '/mentor-dashboard.html',
            public: '/public-courses.html'
        };
        
        // In a real application, you would redirect to the appropriate page
        console.log(`Redirecting to: ${redirectUrls[this.currentRole]}`);
        this.showMessage(`Redirecting to ${this.currentRole} dashboard...`, 'info');
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Initialize the login manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const xOffset = (x - 0.5) * speed * 20;
        const yOffset = (y - 0.5) * speed * 20;
        
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});