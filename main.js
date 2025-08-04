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

        // Nueva funcionalidad de métodos de pago
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentModal = document.getElementById('closePaymentModal');
    const paymentForm = document.getElementById('paymentForm');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentDetails = document.getElementById('paymentDetails');
    const processPaymentBtn = document.getElementById('processPayment');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    
    let selectedPaymentMethod = '';
    
    // Abrir modal de pago cuando se selecciona un paquete
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const price = this.getAttribute('data-price');
            
            document.getElementById('paymentServiceName').textContent = service;
            document.getElementById('paymentServicePrice').textContent = price;
            
            paymentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Resetear selección de método
            paymentMethods.forEach(method => method.classList.remove('active'));
            paymentDetails.style.display = 'none';
            selectedPaymentMethod = '';
        });
    });
    
    // Cerrar modal de pago
    closePaymentModal.addEventListener('click', function() {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar modal de confirmación
    closeConfirmationModal.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        paymentModal.style.display = 'none';
    });
    
    // Seleccionar método de pago
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            selectedPaymentMethod = this.getAttribute('data-method');
            paymentDetails.style.display = 'block';
            
            // Mostrar detalles específicos del método seleccionado
            let detailsHTML = '';
            
            switch(selectedPaymentMethod) {
                case 'paypal':
                    detailsHTML = `
                        <div class="payment-details">
                            <h4><i class="fab fa-paypal"></i> Pagar con PayPal</h4>
                            <p>Serás redirigido a PayPal para completar tu pago de manera segura.</p>
                        </div>
                    `;
                    break;
                    
                case 'mercadopago':
                    detailsHTML = `
                        <div class="payment-details">
                            <h4><i class="fas fa-money-bill-wave"></i> Pagar con Mercado Pago</h4>
                            <p>Puedes pagar con tarjeta, efectivo o saldo de Mercado Pago.</p>
                        </div>
                    `;
                    break;
                    
                case 'creditcard':
                    detailsHTML = `
                        <div class="payment-details credit-card-form">
                            <h4><i class="far fa-credit-card"></i> Tarjeta de Crédito/Débito</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="card-number">Número de Tarjeta</label>
                                    <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="card-name">Nombre en la Tarjeta</label>
                                    <input type="text" id="card-name" placeholder="Juan Pérez" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="card-expiry">Fecha de Expiración</label>
                                    <input type="text" id="card-expiry" placeholder="MM/AA" required>
                                </div>
                                <div class="form-group">
                                    <label for="card-cvv">CVV</label>
                                    <input type="text" id="card-cvv" placeholder="123" required>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'oxxo':
                    const reference = 'FENIX' + Math.floor(100000 + Math.random() * 900000);
                    detailsHTML = `
                        <div class="payment-details oxxo-instructions">
                            <h4><i class="fas fa-store"></i> Pago en OXXO</h4>
                            <p>Sigue estos pasos para completar tu pago:</p>
                            <ol>
                                <li>Acude a cualquier tienda OXXO</li>
                                <li>Proporciona la siguiente referencia de pago al cajero:</li>
                            </ol>
                            <div class="reference-number">${reference}</div>
                            <p>Realiza el pago en efectivo antes de 48 horas.</p>
                        </div>
                    `;
                    break;
            }
            
            paymentDetails.innerHTML = detailsHTML;
        });
    });
    
    // Procesar pago
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('social-username').value.trim();
        if (!username) {
            alert('Por favor ingresa tu usuario de red social');
            return;
        }
        
        if (!selectedPaymentMethod) {
            alert('Por favor selecciona un método de pago');
            return;
        }
        
        // Simulación de procesamiento de pago
        const service = document.getElementById('paymentServiceName').textContent;
        const price = document.getElementById('paymentServicePrice').textContent;
        const transactionId = 'TX-' + Math.floor(100000000 + Math.random() * 900000000);
        
        // Actualizar modal de confirmación
        document.getElementById('confirmationService').textContent = service;
        document.getElementById('confirmationUsername').textContent = username;
        document.getElementById('confirmationMethod').textContent = 
            selectedPaymentMethod === 'paypal' ? 'PayPal' :
            selectedPaymentMethod === 'mercadopago' ? 'Mercado Pago' :
            selectedPaymentMethod === 'creditcard' ? 'Tarjeta de Crédito/Débito' : 'Efectivo en OXXO';
        
        document.getElementById('transactionId').textContent = transactionId;
        
        let message = `¡Tu compra de ${service} se ha completado con éxito!`;
        
        if (selectedPaymentMethod === 'oxxo') {
            message += ' Por favor realiza el pago en OXXO con la referencia proporcionada.';
        } else {
            message += ' Recibirás tus seguidores en las próximas 24 horas.';
        }
        
        document.getElementById('confirmationMessage').textContent = message;
        
        // Mostrar modal de confirmación
        confirmationModal.style.display = 'flex';
    });
    
    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            paymentModal.style.display = 'none';
        }
    });