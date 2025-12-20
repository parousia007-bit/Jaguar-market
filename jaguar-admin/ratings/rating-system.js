/**
 * SISTEMA DE CALIFICACIONES JAGUAR MARKET
 * Sistema completo de ratings 1-5 estrellas
 */

const ratingSystem = {
    // Configuración
    config: {
        storageKey: 'jaguar_ratings',
        maxUsernameLength: 30,
        minCommentLength: 3,
        maxCommentLength: 500
    },

    // Inicializar sistema
    init() {
        console.log('📱 Sistema de ratings inicializado');
        this.loadRatings();
        return this;
    },

    // Cargar ratings desde localStorage
    loadRatings() {
        try {
            const stored = localStorage.getItem(this.config.storageKey);
            this.ratings = stored ? JSON.parse(stored) : {};
            console.log(`📊 Ratings cargados: ${Object.keys(this.ratings).length} negocios`);
        } catch (error) {
            console.error('❌ Error cargando ratings:', error);
            this.ratings = {};
        }
    },

    // Guardar ratings en localStorage
    saveRatings() {
        try {
            localStorage.setItem(this.config.storageKey, JSON.stringify(this.ratings));
            return true;
        } catch (error) {
            console.error('❌ Error guardando ratings:', error);
            return false;
        }
    },

    // Calificar un negocio
    rateBusiness(businessId, businessName, rating, comment = '', username = '') {
        if (!businessId || !rating || rating < 1 || rating > 5) {
            console.error('❌ Datos inválidos para calificar');
            return false;
        }

        // Inicializar si no existe
        if (!this.ratings[businessId]) {
            this.ratings[businessId] = {
                businessName,
                ratings: [],
                average: 0,
                count: 0,
                breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            };
        }

        // Crear nueva calificación
        const review = {
            id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            rating: parseInt(rating),
            comment: comment.trim(),
            username: username.trim() || 'Usuario Anónimo',
            date: new Date().toISOString(),
            helpful: 0,
            hasResponse: false,
            response: null,
            responseDate: null
        };

        // Agregar al array
        this.ratings[businessId].ratings.unshift(review);
        
        // Actualizar estadísticas
        this.updateBusinessStats(businessId);
        
        // Guardar
        this.saveRatings();
        
        console.log(`⭐ ${businessName} calificado con ${rating} estrellas`);
        
        // Disparar evento
        this.dispatchRatingUpdate(businessId);
        
        return review.id;
    },

    // Actualizar estadísticas de un negocio
    updateBusinessStats(businessId) {
        const business = this.ratings[businessId];
        if (!business || !business.ratings.length) return;

        const ratings = business.ratings;
        const total = ratings.length;
        const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
        
        business.count = total;
        business.average = parseFloat((sum / total).toFixed(1));
        
        // Reset breakdown
        business.breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        
        // Recalcular breakdown
        ratings.forEach(r => {
            business.breakdown[r.rating]++;
        });
    },

    // Obtener ratings de un negocio
    getBusinessRatings(businessId) {
        return this.ratings[businessId] || {
            businessName: '',
            ratings: [],
            average: 0,
            count: 0,
            breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
    },

    // Responder a una reseña (solo para negocios con tier adecuado)
    respondToReview(businessId, reviewId, response, responderName) {
        const business = this.ratings[businessId];
        if (!business) return false;

        const review = business.ratings.find(r => r.id === reviewId);
        if (!review) return false;

        review.hasResponse = true;
        review.response = response;
        review.responseDate = new Date().toISOString();
        review.responderName = responderName;

        this.saveRatings();
        this.dispatchRatingUpdate(businessId);
        
        console.log(`💬 Respuesta agregada a reseña ${reviewId}`);
        return true;
    },

    // Marcar reseña como útil
    markHelpful(reviewId, businessId) {
        const business = this.ratings[businessId];
        if (!business) return false;

        const review = business.ratings.find(r => r.id === reviewId);
        if (!review) return false;

        review.helpful = (review.helpful || 0) + 1;
        this.saveRatings();
        
        return review.helpful;
    },

    // Disparar evento de actualización
    dispatchRatingUpdate(businessId) {
        try {
            const event = new CustomEvent('ratingsUpdated', {
                detail: { businessId, ratings: this.getBusinessRatings(businessId) }
            });
            window.dispatchEvent(event);
        } catch (error) {
            console.error('Error disparando evento:', error);
        }
    },

    // Obtener rating promedio de un negocio
    getBusinessAverage(businessId) {
        const business = this.ratings[businessId];
        return business ? business.average : 0;
    },

    // Obtener conteo de ratings
    getBusinessCount(businessId) {
        const business = this.ratings[businessId];
        return business ? business.count : 0;
    },

    // Obtener todas las calificaciones
    getAllRatings() {
        return this.ratings;
    },

    // Limpiar ratings (para testing)
    clearAllRatings() {
        this.ratings = {};
        localStorage.removeItem(this.config.storageKey);
        console.log('🧹 Todos los ratings eliminados');
        return true;
    }
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    window.ratingSystem = ratingSystem.init();
    console.log('🎯 Rating System listo para usar');
});

// Función global para mostrar modal
window.showRatingModal = function(businessId, businessName) {
    console.log(`📝 Mostrando modal para: ${businessName} (${businessId})`);
    
    // Crear modal HTML
    const modalHTML = `
    <div class="rating-modal-overlay" id="ratingModal">
        <div class="rating-modal">
            <div class="modal-header">
                <h3>Calificar: ${businessName}</h3>
                <button class="modal-close" onclick="closeRatingModal()">×</button>
            </div>
            
            <div class="modal-body">
                <div class="stars-container">
                    <p>¿Cómo calificarías este negocio?</p>
                    <div class="stars" id="ratingStars">
                        ${[1,2,3,4,5].map(i => `
                            <button class="star-btn" data-rating="${i}" onclick="setRating(${i})">
                                <i class="far fa-star"></i>
                            </button>
                        `).join('')}
                    </div>
                    <p class="rating-text" id="ratingText">Selecciona una calificación</p>
                </div>
                
                <div class="comment-section">
                    <label for="userComment">Comentario (opcional):</label>
                    <textarea id="userComment" 
                              placeholder="Comparte tu experiencia con este negocio..."
                              maxlength="500"></textarea>
                    <div class="char-count">0/500</div>
                </div>
                
                <div class="username-section">
                    <label for="userName">Nombre (opcional):</label>
                    <input type="text" 
                           id="userName" 
                           placeholder="Usuario Anónimo"
                           maxlength="30">
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeRatingModal()">Cancelar</button>
                <button class="btn-primary" onclick="submitRating('${businessId}', '${businessName}')" 
                        disabled id="submitBtn">
                    Enviar Calificación
                </button>
            </div>
        </div>
    </div>
    `;
    
    // Agregar al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Inicializar eventos
    initializeRatingModal();
};

// Función para cerrar modal
window.closeRatingModal = function() {
    const modal = document.getElementById('ratingModal');
    if (modal) {
        modal.remove();
    }
};

// Funciones auxiliares del modal
window.setRating = function(rating) {
    const stars = document.querySelectorAll('.star-btn');
    const ratingText = document.getElementById('ratingText');
    const submitBtn = document.getElementById('submitBtn');
    const texts = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
    
    stars.forEach((star, index) => {
        const icon = star.querySelector('i');
        if (index < rating) {
            star.classList.add('selected');
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            star.classList.remove('selected');
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
    
    ratingText.textContent = texts[rating - 1];
    submitBtn.disabled = false;
    window.currentRating = rating;
};

window.initializeRatingModal = function() {
    // Contador de caracteres
    const textarea = document.getElementById('userComment');
    const charCount = document.querySelector('.char-count');
    
    if (textarea) {
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = `${length}/500`;
            charCount.style.color = length > 450 ? '#ff6b6b' : '#666';
        });
    }
    
    // Cerrar al hacer click fuera
    const overlay = document.querySelector('.rating-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeRatingModal();
            }
        });
    }
};

window.submitRating = function(businessId, businessName) {
    const rating = window.currentRating;
    const comment = document.getElementById('userComment')?.value || '';
    const username = document.getElementById('userName')?.value || '';
    
    if (!rating) {
        alert('Por favor selecciona una calificación');
        return;
    }
    
    // Validar longitud de comentario
    if (comment.length > 500) {
        alert('El comentario no puede exceder 500 caracteres');
        return;
    }
    
    if (username.length > 30) {
        alert('El nombre no puede exceder 30 caracteres');
        return;
    }
    
    // Enviar calificación
    const reviewId = window.ratingSystem.rateBusiness(
        businessId, 
        businessName, 
        rating, 
        comment, 
        username
    );
    
    if (reviewId) {
        // Mostrar confirmación
        const modal = document.getElementById('ratingModal');
        if (modal) {
            modal.innerHTML = `
                <div class="rating-modal">
                    <div class="modal-header">
                        <h3>¡Gracias!</h3>
                    </div>
                    <div class="modal-body success">
                        <div class="success-icon">⭐</div>
                        <p>Tu calificación ha sido registrada.</p>
                        <p>Gracias por ayudar a mejorar nuestra comunidad.</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary" onclick="closeRatingModal()">Cerrar</button>
                    </div>
                </div>
            `;
            
            // Cerrar automáticamente después de 3 segundos
            setTimeout(() => {
                closeRatingModal();
                // Actualizar UI si es necesario
                if (window.updateBusinessCard) {
                    window.updateBusinessCard(businessId);
                }
            }, 3000);
        }
    } else {
        alert('Error al enviar la calificación. Intenta de nuevo.');
    }
};

// Exportar para uso global
window.ratingSystem = ratingSystem;
