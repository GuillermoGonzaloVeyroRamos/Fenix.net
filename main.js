        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // WhatsApp Modal Functionality
        const whatsappModal = document.getElementById('whatsappModal');
        const closeModal = document.getElementById('closeModal');
        const serviceButtons = document.querySelectorAll('.btn-service');
        const serviceName = document.getElementById('serviceName');
        const servicePrice = document.getElementById('servicePrice');
        const serviceFeatures = document.getElementById('serviceFeatures');
        const whatsappForm = document.getElementById('whatsappForm');
        const sendWhatsapp = document.getElementById('sendWhatsapp');
        const usernameInput = document.getElementById('username');
        
        // Open modal with service details
        serviceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const service = this.getAttribute('data-service');
                const price = this.getAttribute('data-price');
                const features = this.getAttribute('data-features');
                
                serviceName.textContent = service;
                servicePrice.textContent = price;
                serviceFeatures.textContent = features;
                
                whatsappModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            whatsappModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === whatsappModal) {
                whatsappModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Send WhatsApp message
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            if (!username) {
                alert('Por favor ingresa tu usuario de Instagram');
                return;
            }
            
            const service = serviceName.textContent;
            const price = servicePrice.textContent;
            const features = serviceFeatures.textContent;
            
            // WhatsApp message template
            const message = `¡Hola Fenix.net! Estoy interesado en comprar el siguiente servicio:
            
📦 *Servicio:* ${service}
💰 *Precio:* ${price}
🌟 *Características:* ${features}
📱 *Mi Usuario de Instagram:* ${username}

Por favor, envíenme más información para completar mi compra. ¡Gracias!`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // WhatsApp API URL (replace with your number)
            const whatsappUrl = `https://wa.me/15551234567?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Close modal
            whatsappModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form
            usernameInput.value = '';
            
            // Show confirmation message
            alert('¡Gracias! Se abrirá WhatsApp para que completes tu compra.');
        });
        
        // Stats Counter Animation
        const counters = document.querySelectorAll('.stat-item h3');
        const speed = 200;
        
        const startCounter = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.innerText.replace('+', '').replace('%', '');
                    const count = +counter.innerText.replace('+', '').replace('%', '');
                    
                    const inc = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc) + (counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : ''));
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target + (counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : ''));
                    }
                };
                
                updateCount();
            });
        };
        
        // Start counter when in view
        window.addEventListener('load', startCounter);