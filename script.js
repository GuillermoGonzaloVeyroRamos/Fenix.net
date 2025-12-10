document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Elementos del modal de seguidores
    const followersModal = document.getElementById('followersModal');
    const followersCloseBtn = followersModal.querySelector('.close-btn');
    const platformSelectFollowers = document.getElementById('platformSelectFollowers');
    const profileLinkInputFollowers = document.getElementById('profileLinkInputFollowers');
    const followersCountSelect = document.getElementById('followersCountSelect');
    const paymentMethodSelectFollowers = document.getElementById('paymentMethodSelectFollowers');
    const processOrderBtnFollowers = document.getElementById('processOrderBtnFollowers');
    const errorMessageFollowers = document.getElementById('errorMessageFollowers');
    const paymentInfoDivFollowers = document.getElementById('paymentInfoFollowers');
    const totalPriceSpanFollowers = document.getElementById('totalPriceFollowers');
    
    // Elementos del modal de likes
    const likesModal = document.getElementById('likesModal');
    const likesCloseBtn = likesModal.querySelector('.close-btn');
    const platformSelectLikes = document.getElementById('platformSelectLikes');
    const profileLinkInputLikes = document.getElementById('profileLinkInputLikes');
    const likesCountSelect = document.getElementById('likesCountSelect');
    const paymentMethodSelectLikes = document.getElementById('paymentMethodSelectLikes');
    const processOrderBtnLikes = document.getElementById('processOrderBtnLikes');
    const errorMessageLikes = document.getElementById('errorMessageLikes');
    const paymentInfoDivLikes = document.getElementById('paymentInfoLikes');
    const totalPriceSpanLikes = document.getElementById('totalPriceLikes');

    // Variables para almacenar información del pedido
    let currentServiceType = ''; // 'seguidores' o 'likes'
    let currentPackage = '';
    let currentPrice = '';
    let currentCount = '1000'; // Cantidad de seguidores o likes
    
    // Variables específicas para cada modal
    let currentFollowersPaymentInfo = '';
    let currentLikesPaymentInfo = '';

    // Función para actualizar el precio total de seguidores
    const updateFollowersTotalPrice = () => {
        const selectedOption = followersCountSelect.options[followersCountSelect.selectedIndex];
        const customInput = document.getElementById('customFollowersInput');
        
        if (selectedOption.value === 'custom') {
            customInput.style.display = 'block';
            totalPriceSpanFollowers.textContent = 'Consulte el precio de los seguidores elegidos';
            currentPrice = '0';
            currentCount = 'custom';
        } else {
            customInput.style.display = 'none';
            const price = selectedOption.getAttribute('data-price');
            totalPriceSpanFollowers.textContent = 'Consulte el precio de los seguidores elegidos';
            currentPrice = price;
            currentCount = selectedOption.value;
        }
    };
    
    // Función para actualizar el precio total de likes
    const updateLikesTotalPrice = () => {
        const selectedOption = likesCountSelect.options[likesCountSelect.selectedIndex];
        const customInput = document.getElementById('customLikesInput');
        
        if (selectedOption.value === 'custom') {
            customInput.style.display = 'block';
            totalPriceSpanLikes.textContent = 'Consulte el precio de los likes elegidos';
            currentPrice = '0';
            currentCount = 'custom';
        } else {
            customInput.style.display = 'none';
            const price = selectedOption.getAttribute('data-price');
            totalPriceSpanLikes.textContent = 'Consulte el precio de los likes elegidos';
            currentPrice = price;
            currentCount = selectedOption.value;
        }
    };

    // Función para actualizar la información de pago en el modal de seguidores
    const updateFollowersPaymentInfo = () => {
        const method = paymentMethodSelectFollowers.value;
        let infoHtml = '';
        let infoText = '';

        if (method === 'MercadoPago') {
            infoHtml = `<div class="payment-header"><picture><source srcset="Mercado-Pago.avif" type="image/avif"><img src="Mercado-Pago.png" alt="Mercado Pago Logo" width="50" class="payment-icon"></picture><h4>Pago con Mercado Pago</h4></div><p>Realiza tu pago a través de nuestro enlace de Mercado Pago:</p><p><b>Link de pago:</b> <a href="http://link.mercadopago.com.mx/fenixdigitalstore" target="_blank">Pagar en mercado pago</a></p>`;
            infoText = `Información de pago Mercado Pago: Link de pago: http://link.mercadopago.com.mx/fenixdigitalstore`;
        } else if (method === 'Spei') {
            infoHtml = `<div class="payment-header"><picture><source srcset="spei-logo.avif" type="image/avif"><img src="spei-logo.png" alt="SPEI Logo" width="50" class="payment-icon"></picture><h4>Transferencia SPEI</h4></div><p>Realiza la transferencia a los siguientes datos:</p><p><b>Banco:</b> Santander<br><b>Número de cuenta:</b> 5579100421039650<br><b>Beneficiario:</b> Fenix Digital S.A. de C.V.</p>`;
            infoText = `Información de pago SPEI: Banco: Santander, Número de cuenta: 5579100421039650, Beneficiario: Fenix Digital S.A. de C.V.`;
        }

        paymentInfoDivFollowers.innerHTML = infoHtml;
        currentFollowersPaymentInfo = infoText;
    };
    
    // Función para actualizar la información de pago en el modal de likes
    const updateLikesPaymentInfo = () => {
        const method = paymentMethodSelectLikes.value;
        let infoHtml = '';
        let infoText = '';

        if (method === 'MercadoPago') {
            infoHtml = `<div class="payment-header"><picture><source srcset="Mercado-Pago.avif" type="image/avif"><img src="Mercado-Pago.png" alt="Mercado Pago Logo" width="50" class="payment-icon"></picture><h4>Pago con Mercado Pago</h4></div><p>Realiza tu pago a través de nuestro enlace de Mercado Pago:</p><p><b>Link de pago:</b> <a href="http://link.mercadopago.com.mx/fenixdigitalstore" target="_blank">Pagar en mercado pago</a></p>`;
            infoText = `Información de pago Mercado Pago: Link de pago: http://link.mercadopago.com.mx/fenixdigitalstore`;
        } else if (method === 'Spei') {
            infoHtml = `<div class="payment-header"><picture><source srcset="spei-logo.avif" type="image/avif"><img src="spei-logo.png" alt="SPEI Logo" width="50" class="payment-icon"></picture><h4>Transferencia SPEI</h4></div><p>Realiza la transferencia a los siguientes datos:</p><p><b>Banco:</b> Santander<br><b>Número de cuenta:</b> 5579100421039650<br><b>Beneficiario:</b> Fenix Digital S.A. de C.V.</p>`;
            infoText = `Información de pago SPEI: Banco: Santander, Número de cuenta: 5579100421039650, Beneficiario: Fenix Digital S.A. de C.V.`;
        }

        paymentInfoDivLikes.innerHTML = infoHtml;
        currentLikesPaymentInfo = infoText;
    };

    // Seleccionar botones específicos para cada modal
    const followersButtons = document.querySelectorAll('.followers-btn');
    const likesButtons = document.querySelectorAll('.likes-btn');
    
    // Event listener para botones de seguidores
    followersButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentPackage = btn.getAttribute('data-package');
            currentServiceType = 'seguidores';
            
            // Seleccionar la opción de 1000 seguidores por defecto
            const defaultOption = Array.from(followersCountSelect.options).find(option => option.value === '1000');
            if (defaultOption) {
                followersCountSelect.value = '1000';
                currentPrice = defaultOption.getAttribute('data-price');
            }
            
            // Mostrar el modal de seguidores
            updateFollowersTotalPrice();
            errorMessageFollowers.style.display = 'none';
            followersModal.classList.add('show');
            
            // Asegurar que se cargue la info de pago inicial
            updateFollowersPaymentInfo();
        });
    });
    
    // Event listener para botones de likes
    likesButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentPackage = btn.getAttribute('data-package');
            currentServiceType = 'likes';
            
            // Seleccionar la opción de 1000 likes por defecto
            const defaultOption = Array.from(likesCountSelect.options).find(option => option.value === '1000');
            if (defaultOption) {
                likesCountSelect.value = '1000';
                currentPrice = defaultOption.getAttribute('data-price');
            }
            
            // Mostrar el modal de likes
            updateLikesTotalPrice();
            errorMessageLikes.style.display = 'none';
            likesModal.classList.add('show');
            
            // Asegurar que se cargue la info de pago inicial
            updateLikesPaymentInfo();
        });
    });

    // Event listeners para cerrar modales
    followersCloseBtn.addEventListener('click', () => {
        followersModal.classList.remove('show');
    });
    
    likesCloseBtn.addEventListener('click', () => {
        likesModal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === followersModal) {
            followersModal.classList.remove('show');
        }
        if (e.target === likesModal) {
            likesModal.classList.remove('show');
        }
    });

    // Escuchar cambios en los selectores
    followersCountSelect.addEventListener('change', updateFollowersTotalPrice);
    likesCountSelect.addEventListener('change', updateLikesTotalPrice);
    
    // Escuchar cambios en los métodos de pago
    paymentMethodSelectFollowers.addEventListener('change', updateFollowersPaymentInfo);
    paymentMethodSelectLikes.addEventListener('change', updateLikesPaymentInfo);
    
    // Escuchar cambios en los selectores de plataforma
    platformSelectFollowers.addEventListener('change', () => {
        currentPlatform = platformSelectFollowers.value;
    });
    
    platformSelectLikes.addEventListener('change', () => {
        currentPlatform = platformSelectLikes.value;
    });

    // Procesar pedido de seguidores
    processOrderBtnFollowers.addEventListener('click', () => {
        const profileLink = profileLinkInputFollowers.value.trim();
        const paymentMethod = paymentMethodSelectFollowers.value;
        const platform = platformSelectFollowers.value;

        if (profileLink === '') {
            errorMessageFollowers.style.display = 'block';
            return;
        }

        // Obtener la cantidad correcta
        let finalCount = currentCount;
        if (currentCount === 'custom') {
            const customValue = document.getElementById('customFollowersCount').value;
            if (!customValue || customValue <= 0) {
                alert('Por favor, ingrese una cantidad válida de seguidores.');
                return;
            }
            finalCount = customValue;
        }

        const orderId = 'FNX' + Date.now().toString().slice(-6);
        const date = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

        const whatsappMessage = `Hola!\n\nGracias por adquirir tu paquete :)\n- Id pedido: ${orderId}\n- Plataforma: ${platform}\n- Paquete Adquirido: Seguidores (${finalCount} seguidores)\n- Precio: Consultar\n- Fecha: ${date}\n- Link del perfil: ${profileLink}\n\n- Método de pago: ${paymentMethod}\n\n${currentFollowersPaymentInfo}\n\nPor favor, consulte el precio y envíe su comprobante de pago a este número para procesar su pedido.`;

        const whatsappUrl = `https://wa.me/524771515109?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');
        followersModal.classList.remove('show');
    });
    
    
    // Procesar pedido de likes
    processOrderBtnLikes.addEventListener('click', () => {
        const profileLink = profileLinkInputLikes.value.trim();
        const paymentMethod = paymentMethodSelectLikes.value;
        const platform = platformSelectLikes.value;

        if (profileLink === '') {
            errorMessageLikes.style.display = 'block';
            return;
        }

        // Obtener la cantidad correcta
        let finalCount = currentCount;
        if (currentCount === 'custom') {
            const customValue = document.getElementById('customLikesCount').value;
            if (!customValue || customValue <= 0) {
                alert('Por favor, ingrese una cantidad válida de likes.');
                return;
            }
            finalCount = customValue;
        }

        const orderId = 'FNX' + Date.now().toString().slice(-6);
        const date = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

        const whatsappMessage = `Hola!\n\nGracias por adquirir tu paquete :)\n- Id pedido: ${orderId}\n- Plataforma: ${platform}\n- Paquete Adquirido: Likes (${finalCount} likes)\n- Precio: Consultar\n- Fecha: ${date}\n- Link de la publicación: ${profileLink}\n\n- Método de pago: ${paymentMethod}\n\n${currentLikesPaymentInfo}\n\nPor favor, consulte el precio y envíe su comprobante de pago a este número para procesar su pedido.`;

        const whatsappUrl = `https://wa.me/524771515109?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');
        likesModal.classList.remove('show');
    });
});

// Traducciones
const translations = {
    es: {
        "menu.home": "Inicio",
        "menu.services": "Servicios",
        "menu.howItWorks": "Cómo Funciona",
        "menu.contact": "Contacto",
        "hero.title": "Impulsa tu <span>presencia digital</span> al instante",
        "hero.subtitle": "Consigue miles de seguidores reales y aumenta tu credibilidad en redes sociales con nuestros servicios premium. ¡Haz despegar tu marca hoy mismo!",
        "hero.seePackages": "Ver Paquetes",
        "hero.howItWorks": "Cómo Funciona",
        "hero.support": "Soporte Premium",
        "services.title": "Nuestros Servicios",
        "services.subtitle": "Paquetes diseñados para impulsar tu crecimiento en redes sociales con resultados inmediatos",
        "services.followers": "Seguidores",
        "services.followers.feature1": "Perfiles reales y activos",
        "services.followers.feature2": "Entrega rápida (24-48 horas)",
        "services.followers.feature3": "Garantía de reemplazo",
        "services.followers.feature4": "Mejora tu reputación digital",
        "services.followers.feature5": "Compatible con cuentas personales o de negocio",
        "services.followers.price": "/ 1,000 seguidores",
        "services.likes": "Likes",
        "services.likes.feature1": "Likes auténticos de cuentas reales",
        "services.likes.feature2": "Entrega inmediata",
        "services.likes.feature3": "Aumenta el engagement de tus publicaciones",
        "services.likes.feature4": "Ideal para impulsar contenido viral",
        "services.likes.feature5": "Atención al cliente 24/7",
        "services.likes.price": "/ 1,000 likes",
        "services.buyNow": "Comprar Ahora",
        "howItWorks.title": "¿Cómo Funciona?",
        "howItWorks.subtitle": "En solo 4 sencillos pasos podrás aumentar tu presencia en redes sociales",
        "howItWorks.step1.title": "Selecciona tu Red",
        "howItWorks.step1.description": "Elige la plataforma donde quieres aumentar tu presencia (Instagram o TikTok)",
        "howItWorks.step2.title": "Elige tu Paquete",
        "howItWorks.step2.description": "Selecciona la cantidad de seguidores u likes que necesitas y completa tu compra",
        "howItWorks.step3.title": "Proporciona el link de tu cuenta",
        "howItWorks.step3.description": "Ingresa solo tu nombre de usuario (nunca pedimos contraseñas)",
        "howItWorks.step4.title": "Disfruta los Resultados",
        "howItWorks.step4.description": "Recibe tus nuevos seguidores en el tiempo prometido y observa cómo crece tu cuenta",
        "cta.title": "¿Listo para transformar tu presencia digital?",
        "cta.subtitle": "Únete a miles de clientes satisfechos y lleva tus redes sociales al siguiente nivel hoy mismo",
        "cta.button": "Comprar Ahora",
        "footer.about": "Fenix.net te ayuda a disparar tu crecimiento en redes sociales de manera segura y eficiente.",
        "footer.navigation": "Navegación",
        "footer.contact": "Contacto",
        "footer.address": "León, Guanajuato, México",
        "footer.rights": "Todos los derechos reservados.",
        "modals.followers.title": "Comprar Seguidores",
        "modals.followers.subtitle": "Por favor, ingresa los datos de tu pedido para continuar.",
        "modals.platform": "Plataforma:",
        "modals.followers.profileLink": "Link o URL del perfil:",
        "modals.followers.quantity": "Cantidad de seguidores:",
        "modals.customQuantity": "Cantidad personalizada",
        "modals.customFollowers": "Ingrese la cantidad de seguidores:",
        "modals.paymentMethod": "Método de Pago:",
        "modals.totalPrice": "Precio total:",
        "modals.followers.error": "Por favor, ingresa un link de perfil válido.",
        "modals.sendPayment": "Mandar comprobante de pago",
        "modals.likes.title": "Comprar Likes",
        "modals.likes.subtitle": "Por favor, ingresa los datos de tu pedido para continuar.",
        "modals.likes.postLink": "Link o URL de la publicación:",
        "modals.likes.quantity": "Cantidad de likes:",
        "modals.customLikes": "Ingrese la cantidad de likes:",
        "modals.likes.error": "Por favor, ingresa un link de publicación válido."
    },
    en: {
        "menu.home": "Home",
        "menu.services": "Services",
        "menu.howItWorks": "How It Works",
        "menu.contact": "Contact",
        "hero.title": "Boost your <span>digital presence</span> instantly",
        "hero.subtitle": "Get thousands of real followers and increase your credibility on social media with our premium services. Take your brand to the next level today!",
        "hero.seePackages": "View Packages",
        "hero.howItWorks": "How It Works",
        "hero.support": "Premium Support",
        "services.title": "Our Services",
        "services.subtitle": "Packages designed to boost your social media growth with immediate results",
        "services.followers": "Followers",
        "services.followers.feature1": "Real and active profiles",
        "services.followers.feature2": "Fast delivery (24-48 hours)",
        "services.followers.feature3": "Replacement guarantee",
        "services.followers.feature4": "Improve your digital reputation",
        "services.followers.feature5": "Compatible with personal or business accounts",
        "services.followers.price": "/ 1,000 followers",
        "services.likes": "Likes",
        "services.likes.feature1": "Authentic likes from real accounts",
        "services.likes.feature2": "Instant delivery",
        "services.likes.feature3": "Increase your post engagement",
        "services.likes.feature4": "Ideal for viral content",
        "services.likes.feature5": "24/7 customer support",
        "services.likes.price": "/ 1,000 likes",
        "services.buyNow": "Buy Now",
        "howItWorks.title": "How It Works",
        "howItWorks.subtitle": "In just 4 simple steps you can increase your social media presence",
        "howItWorks.step1.title": "Select Your Platform",
        "howItWorks.step1.description": "Choose the platform where you want to increase your presence (Instagram or TikTok)",
        "howItWorks.step2.title": "Choose Your Package",
        "howItWorks.step2.description": "Select the number of followers or likes you need and complete your purchase",
        "howItWorks.step3.title": "Provide Your Account Link",
        "howItWorks.step3.description": "Enter just your username (we never ask for passwords)",
        "howItWorks.step4.title": "Enjoy the Results",
        "howItWorks.step4.description": "Receive your new followers in the promised time and watch your account grow",
        "cta.title": "Ready to transform your digital presence?",
        "cta.subtitle": "Join thousands of satisfied customers and take your social media to the next level today",
        "cta.button": "Buy Now",
        "footer.about": "Fenix.net helps you skyrocket your social media growth safely and efficiently.",
        "footer.navigation": "Navigation",
        "footer.contact": "Contact",
        "footer.address": "León, Guanajuato, Mexico",
        "footer.rights": "All rights reserved.",
        "modals.followers.title": "Buy Followers",
        "modals.followers.subtitle": "Please enter your order details to continue.",
        "modals.platform": "Platform:",
        "modals.followers.profileLink": "Profile link or URL:",
        "modals.followers.quantity": "Number of followers:",
        "modals.customQuantity": "Custom quantity",
        "modals.customFollowers": "Enter number of followers:",
        "modals.paymentMethod": "Payment Method:",
        "modals.totalPrice": "Total price:",
        "modals.followers.error": "Please enter a valid profile link.",
        "modals.sendPayment": "Send payment proof",
        "modals.likes.title": "Buy Likes",
        "modals.likes.subtitle": "Please enter your order details to continue.",
        "modals.likes.postLink": "Post link or URL:",
        "modals.likes.quantity": "Number of likes:",
        "modals.customLikes": "Enter number of likes:",
        "modals.likes.error": "Please enter a valid post link."
    },
    pt: {
        "menu.home": "Início",
        "menu.services": "Serviços",
        "menu.howItWorks": "Como Funciona",
        "menu.contact": "Contato",
        "hero.title": "Impulsione sua <span>presença digital</span> instantaneamente",
        "hero.subtitle": "Obtenha milhares de seguidores reais e aumente sua credibilidade nas redes sociais com nossos serviços premium. Faça sua marca decolar hoje mesmo!",
        "hero.seePackages": "Ver Pacotes",
        "hero.howItWorks": "Como Funciona",
        "hero.support": "Suporte Premium",
        "services.title": "Nossos Serviços",
        "services.subtitle": "Pacotes projetados para impulsionar seu crescimento nas redes sociais com resultados imediatos",
        "services.followers": "Seguidores",
        "services.followers.feature1": "Perfis reais e ativos",
        "services.followers.feature2": "Entrega rápida (24-48 horas)",
        "services.followers.feature3": "Garantia de substituição",
        "services.followers.feature4": "Melhore sua reputação digital",
        "services.followers.feature5": "Compatível com contas pessoais ou comerciais",
        "services.followers.price": "/ 1,000 seguidores",
        "services.likes": "Curtidas",
        "services.likes.feature1": "Curtidas autênticas de contas reais",
        "services.likes.feature2": "Entrega imediata",
        "services.likes.feature3": "Aumente o engajamento de suas publicações",
        "services.likes.feature4": "Ideal para impulsionar conteúdo viral",
        "services.likes.feature5": "Atendimento ao cliente 24/7",
        "services.likes.price": "/ 1,000 curtidas",
        "services.buyNow": "Comprar Agora",
        "howItWorks.title": "Como Funciona",
        "howItWorks.subtitle": "Em apenas 4 passos simples você pode aumentar sua presença nas redes sociais",
        "howItWorks.step1.title": "Selecione sua Rede",
        "howItWorks.step1.description": "Escolha a plataforma onde deseja aumentar sua presença (Instagram ou TikTok)",
        "howItWorks.step2.title": "Escolha seu Pacote",
        "howItWorks.step2.description": "Selecione a quantidade de seguidores ou curtidas que precisa e complete sua compra",
        "howItWorks.step3.title": "Forneça o link da sua conta",
        "howItWorks.step3.description": "Insira apenas seu nome de usuário (nunca pedimos senhas)",
        "howItWorks.step4.title": "Aproveite os Resultados",
        "howItWorks.step4.description": "Receba seus novos seguidores no tempo prometido e veja sua conta crescer",
        "cta.title": "Pronto para transformar sua presença digital?",
        "cta.subtitle": "Junte-se a milhares de clientes satisfeitos e leve suas redes sociais para o próximo nível hoje mesmo",
        "cta.button": "Comprar Agora",
        "footer.about": "Fenix.net te ajuda a impulsionar seu crescimento nas redes sociais de forma segura e eficiente.",
        "footer.navigation": "Navegação",
        "footer.contact": "Contato",
        "footer.address": "León, Guanajuato, México",
        "footer.rights": "Todos os direitos reservados.",
        "modals.followers.title": "Comprar Seguidores",
        "modals.followers.subtitle": "Por favor, insira os dados do seu pedido para continuar.",
        "modals.platform": "Plataforma:",
        "modals.followers.profileLink": "Link ou URL do perfil:",
        "modals.followers.quantity": "Quantidade de seguidores:",
        "modals.customQuantity": "Quantidade personalizada",
        "modals.customFollowers": "Digite a quantidade de seguidores:",
        "modals.paymentMethod": "Método de Pagamento:",
        "modals.totalPrice": "Preço total:",
        "modals.followers.error": "Por favor, insira um link de perfil válido.",
        "modals.sendPayment": "Enviar comprovante de pagamento",
        "modals.likes.title": "Comprar Curtidas",
        "modals.likes.subtitle": "Por favor, insira os dados do seu pedido para continuar.",
        "modals.likes.postLink": "Link ou URL da publicação:",
        "modals.likes.quantity": "Quantidade de curtidas:",
        "modals.customLikes": "Digite a quantidade de curtidas:",
        "modals.likes.error": "Por favor, insira um link de publicação válido."
    },
    fr: {
        "menu.home": "Accueil",
        "menu.services": "Services",
        "menu.howItWorks": "Comment ça Marche",
        "menu.contact": "Contact",
        "hero.title": "Boostez votre <span>présence digitale</span> instantanément",
        "hero.subtitle": "Obtenez des milliers de followers réels et augmentez votre crédibilité sur les réseaux sociaux avec nos services premium. Faites décoller votre marque dès aujourd'hui!",
        "hero.seePackages": "Voir les Forfaits",
        "hero.howItWorks": "Comment ça Marche",
        "hero.support": "Support Premium",
        "services.title": "Nos Services",
        "services.subtitle": "Forfaits conçus pour booster votre croissance sur les réseaux sociaux avec des résultats immédiats",
        "services.followers": "Followers",
        "services.followers.feature1": "Profils réels et actifs",
        "services.followers.feature2": "Livraison rapide (24-48 heures)",
        "services.followers.feature3": "Garantie de remplacement",
        "services.followers.feature4": "Améliorez votre réputation digitale",
        "services.followers.feature5": "Compatible avec les comptes personnels ou professionnels",
        "services.followers.price": "/ 1,000 followers",
        "services.likes": "Likes",
        "services.likes.feature1": "Likes authentiques de comptes réels",
        "services.likes.feature2": "Livraison immédiate",
        "services.likes.feature3": "Augmentez l'engagement de vos publications",
        "services.likes.feature4": "Idéal pour booster du contenu viral",
        "services.likes.feature5": "Service client 24/7",
        "services.likes.price": "/ 1,000 likes",
        "services.buyNow": "Acheter Maintenant",
        "howItWorks.title": "Comment ça Marche",
        "howItWorks.subtitle": "En seulement 4 étapes simples, vous pouvez augmenter votre présence sur les réseaux sociaux",
        "howItWorks.step1.title": "Sélectionnez votre Réseau",
        "howItWorks.step1.description": "Choisissez la plateforme où vous souhaitez augmenter votre présence (Instagram ou TikTok)",
        "howItWorks.step2.title": "Choisissez votre Forfait",
        "howItWorks.step2.description": "Sélectionnez le nombre de followers ou likes dont vous avez besoin et complétez votre achat",
        "howItWorks.step3.title": "Fournissez le lien de votre compte",
        "howItWorks.step3.description": "Entrez simplement votre nom d'utilisateur (nous ne demandons jamais de mot de passe)",
        "howItWorks.step4.title": "Profitez des Résultats",
        "howItWorks.step4.description": "Recevez vos nouveaux followers dans le délai promis et regardez votre compte grandir",
        "cta.title": "Prêt à transformer votre présence digitale?",
        "cta.subtitle": "Rejoignez des milliers de clients satisfaits et amenez vos réseaux sociaux au niveau supérieur dès aujourd'hui",
        "cta.button": "Acheter Maintenant",
        "footer.about": "Fenix.net vous aide à propulser votre croissance sur les réseaux sociaux de manière sûre et efficace.",
        "footer.navigation": "Navigation",
        "footer.contact": "Contact",
        "footer.address": "León, Guanajuato, Mexique",
        "footer.rights": "Tous droits réservés.",
        "modals.followers.title": "Acheter des Followers",
        "modals.followers.subtitle": "Veuillez entrer les détails de votre commande pour continuer.",
        "modals.platform": "Plateforme:",
        "modals.followers.profileLink": "Lien ou URL du profil:",
        "modals.followers.quantity": "Nombre de followers:",
        "modals.customQuantity": "Quantité personnalisée",
        "modals.customFollowers": "Entrez le nombre de followers:",
        "modals.paymentMethod": "Méthode de Paiement:",
        "modals.totalPrice": "Prix total:",
        "modals.followers.error": "Veuillez entrer un lien de profil valide.",
        "modals.sendPayment": "Envoyer la preuve de paiement",
        "modals.likes.title": "Acheter des Likes",
        "modals.likes.subtitle": "Veuillez entrer les détails de votre commande pour continuer.",
        "modals.likes.postLink": "Lien ou URL de la publication:",
        "modals.likes.quantity": "Nombre de likes:",
        "modals.customLikes": "Entrez le nombre de likes:",
        "modals.likes.error": "Veuillez entrer un lien de publication valide."
    }
};

// Función para cambiar el idioma
function changeLanguage(language) {
    // Guardar preferencia en localStorage
    localStorage.setItem('preferredLanguage', language);
    
    // Cambiar el atributo lang del html
    document.documentElement.lang = language;
    
    // Traducir todos los elementos con data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key];
            } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                element.alt = translations[language][key];
            } else {
                // Manejar contenido con HTML (como el título del héroe)
                if (key === 'hero.title') {
                    element.innerHTML = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            }
        }
    });
    
    // Actualizar el selector de idioma
    document.getElementById('languageSelect').value = language;
}

// Inicializar el idioma
document.addEventListener('DOMContentLoaded', function() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'es';
    changeLanguage(preferredLanguage);
    
    // Manejar cambio de idioma
    document.getElementById('languageSelect').addEventListener('change', function() {
        changeLanguage(this.value);
    });
});