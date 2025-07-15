document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Load menu data from JSON
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.querySelector('.menu-categories');
            menuContainer.innerHTML = '';
            
            data.categories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = 'menu-category';
                
                let categoryHTML = `<h3>${category.name}</h3>`;
                
                category.items.forEach(item => {
                    categoryHTML += `
                        <div class="menu-item">
                            <h4>
                                <span>${item.name}</span>
                                <span>₹${item.price.toFixed(2)}</span>
                            </h4>
                            <p>${item.description}</p>
                        </div>
                    `;
                });
                
                categoryElement.innerHTML = categoryHTML;
                menuContainer.appendChild(categoryElement);
            });
        })
        .catch(error => console.error('Error loading menu:', error));
    
    // Form submission
    const reservationForm = document.getElementById('reservation-form');
    // if (reservationForm) {
    //     reservationForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Get form values
    //         const name = document.getElementById('name').value;
    //         const email = document.getElementById('email').value;
    //         const date = document.getElementById('date').value;
    //         const time = document.getElementById('time').value;
    //         const guests = document.getElementById('guests').value;
            
    //         // In a real app, you would send this data to a server
    //         console.log('Reservation submitted:', {
    //             name,
    //             email,
    //             date,
    //             time,
    //             guests
    //         });
            
    //         // Show confirmation
    //         alert(`Thank you, ${name}! Your reservation for ${guests} on ${date} at ${time} has been received. We'll send a confirmation to ${email}.`);
            
    //         // Reset form
    //         reservationForm.reset();
    //     });
    // }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth < 768) {
                    mainNav.style.display = 'none';
                }
            }
        });
    });
});