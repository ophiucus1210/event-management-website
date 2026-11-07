// ==========================================
// 1. REALISTIC SAMPLE DATA
// ==========================================
const eventsData = [
    {
        id: 1,
        title: "AI Innovation Summit 2024",
        category: "Technology",
        date: "2024-12-15T09:00:00",
        venue: "Moscone Center, San Francisco",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        description: "Join industry leaders to explore the future of Artificial Intelligence, machine learning, and their impact on various sectors. Features keynote speeches from top tech CEOs.",
        popularity: 98
    },
    {
        id: 2,
        title: "UX/UI Design Masterclass",
        category: "Workshops",
        date: "2024-11-20T10:00:00",
        venue: "Design Hub, New York",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
        description: "A hands-on workshop covering the latest principles of user experience and interface design. Bring your laptop and Figma installed.",
        popularity: 85
    },
    {
        id: 3,
        title: "Summer Vibes Music Festival",
        category: "Music and Entertainment",
        date: "2024-12-05T16:00:00",
        venue: "Central Park, New York",
        image: "https://images.unsplash.com/photo-1459749411177-0473ef716175?auto=format&fit=crop&w=800&q=80",
        description: "Experience an unforgettable day of live music featuring top indie and electronic artists. Food trucks and art installations included.",
        popularity: 92
    },
    {
        id: 4,
        title: "City Marathon 2024",
        category: "Sports",
        date: "2024-11-25T07:00:00",
        venue: "Downtown Chicago",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
        description: "Run through the historic streets of Chicago. Categories include 5K, 10K, Half Marathon, and Full Marathon. Medals for all finishers.",
        popularity: 88
    },
    {
        id: 5,
        title: "International Food Festival",
        category: "Cultural Events",
        date: "2024-12-10T11:00:00",
        venue: "Exhibition Grounds, London",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
        description: "Taste cuisines from over 30 countries. Cooking demonstrations, cultural performances, and family-friendly activities all day.",
        popularity: 90
    },
    {
        id: 6,
        title: "Startup Pitch Competition",
        category: "Business and Networking",
        date: "2024-11-30T13:00:00",
        venue: "Tech Incubator, Austin",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
        description: "Watch 10 promising startups pitch to a panel of venture capitalists. Great networking opportunities for entrepreneurs and investors.",
        popularity: 78
    },
    {
        id: 7,
        title: "Web3 Developer Conference",
        category: "Technology",
        date: "2025-01-15T09:00:00",
        venue: "Convention Center, Miami",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
        description: "Deep dive into blockchain, smart contracts, and decentralized applications. Workshops and hackathon included.",
        popularity: 82
    },
    {
        id: 8,
        title: "Jazz Night Under the Stars",
        category: "Music and Entertainment",
        date: "2024-12-01T19:00:00",
        venue: "Rooftop Garden, Seattle",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
        description: "An elegant evening of smooth jazz, wine tasting, and stargazing. Dress code: Smart casual.",
        popularity: 75
    }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
let currentEvents = [...eventsData];
let registrations = JSON.parse(localStorage.getItem('registrations')) || [];

// ==========================================
// 3. DOM ELEMENTS
// ==========================================
const eventsGrid = document.getElementById('eventsGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const categoryPills = document.getElementById('categoryPills');
const registrationForm = document.getElementById('registrationForm');
const regEventSelect = document.getElementById('regEvent');

// ==========================================
// 4. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderCategoryPills();
    populateEventDropdown();
    renderEvents(currentEvents);
    startCountdown();
    setupEventListeners();
});

// ==========================================
// 5. RENDERING FUNCTIONS
// ==========================================
function renderEvents(events) {
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    events.forEach(event => {
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700';
        card.innerHTML = `
            <div class="relative h-48 overflow-hidden">
                <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                <span class="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-primary text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                    ${event.category}
                </span>
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                    <span class="flex items-center"><i class="fa-regular fa-calendar mr-2 text-primary"></i> ${formattedDate}</span>
                    <span class="flex items-center"><i class="fa-regular fa-clock mr-2 text-primary"></i> ${formattedTime}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">${event.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">${event.description}</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400"><i class="fa-solid fa-location-dot mr-1 text-secondary"></i> ${event.venue.split(',')[0]}</span>
                    <button onclick="openEventModal(${event.id})" class="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 transition-colors shadow-md hover:shadow-lg">
                        View Details
                    </button>
                </div>
            </div>
        `;
        eventsGrid.appendChild(card);
    });
}

function renderCategoryPills() {
    const categories = ['All', 'Technology', 'Workshops', 'Music and Entertainment', 'Sports', 'Cultural Events', 'Business and Networking'];
    categoryPills.innerHTML = categories.map(cat => `
        <button onclick="setCategory('${cat}')" 
            class="category-pill px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary dark:hover:bg-primary dark:hover:text-white ${cat === 'All' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300'}">
            ${cat}
        </button>
    `).join('');
}

function populateEventDropdown() {
    regEventSelect.innerHTML = '<option value="">Select an event...</option>' + 
        eventsData.map(event => `<option value="${event.id}">${event.title}</option>`).join('');
}

// ==========================================
// 6. FILTERING & SORTING
// ==========================================
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortValue = sortFilter.value;
    
    let filtered = eventsData.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                              event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    if (sortValue === 'date-asc') {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortValue === 'date-desc') {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortValue === 'popularity') {
        filtered.sort((a, b) => b.popularity - a.popularity);
    }
    
    currentEvents = filtered;
    renderEvents(currentEvents);
    
    document.querySelectorAll('.category-pill').forEach(pill => {
        if (pill.textContent.trim() === selectedCategory) {
            pill.classList.add('bg-primary', 'text-white', 'border-primary');
            pill.classList.remove('bg-white', 'dark:bg-slate-800', 'text-gray-700', 'dark:text-gray-300');
        } else {
            pill.classList.remove('bg-primary', 'text-white', 'border-primary');
            pill.classList.add('bg-white', 'dark:bg-slate-800', 'text-gray-700', 'dark:text-gray-300');
        }
    });
}

function setCategory(category) {
    categoryFilter.value = category;
    applyFilters();
}

function resetFilters() {
    searchInput.value = '';
    categoryFilter.value = 'All';
    sortFilter.value = 'date-asc';
    applyFilters();
}

// ==========================================
// 7. MODAL HANDLING
// ==========================================
let currentSelectedEventId = null;

function openEventModal(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;
    
    currentSelectedEventId = event.id;
    
    document.getElementById('modalImage').src = event.image;
    document.getElementById('modalCategory').textContent = event.category;
    document.getElementById('modalTitle').textContent = event.title;
    
    const dateObj = new Date(event.date);
    document.getElementById('modalDate').textContent = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) + ' at ' + dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('modalVenue').textContent = event.venue;
    document.getElementById('modalPopularity').textContent = event.popularity + '/100';
    document.getElementById('modalDescription').textContent = event.description;
    
    document.getElementById('openRegisterBtn').onclick = () => {
        closeModal('eventModal');
        openRegisterModal(event.id);
    };
    
    document.getElementById('eventModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function openRegisterModal(preselectedEventId = null) {
    registrationForm.reset();
    clearErrors();
    
    if (preselectedEventId) {
        regEventSelect.value = preselectedEventId;
    }
    
    document.getElementById('registerModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.body.style.overflow = '';
}

// ==========================================
// 8. FORM VALIDATION & REGISTRATION
// ==========================================
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const eventId = parseInt(document.getElementById('regEvent').value);
    
    let isValid = true;
    
    if (name.length < 2) {
        showError('regName', 'nameError', 'Name must be at least 2 characters.');
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('regEmail', 'emailError', 'Please enter a valid email address.');
        isValid = false;
    }
    
    const phoneRegex = /^\+?[\d\s-]{10,15}$/;
    if (!phoneRegex.test(phone)) {
        showError('regPhone', 'phoneError', 'Please enter a valid phone number (10-15 digits).');
        isValid = false;
    }
    
    if (!eventId) {
        showError('regEvent', 'eventError', 'Please select an event.');
        isValid = false;
    }
    
    if (!isValid) return;
    
    const isDuplicate = registrations.some(r => r.email.toLowerCase() === email.toLowerCase() && r.eventId === eventId);
    if (isDuplicate) {
        showToast('You have already registered for this event with this email.', 'error');
        return;
    }
    
    const eventName = eventsData.find(e => e.id === eventId).title;
    const newRegistration = {
        id: Date.now(),
        name,
        email,
        phone,
        eventId,
        eventName,
        registeredAt: new Date().toISOString()
    };
    
    registrations.push(newRegistration);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    showToast(`Successfully registered for ${eventName}!`, 'success');
    closeModal('registerModal');
});

function showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add('input-error');
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function clearErrors() {
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.error-msg').forEach(el => {
        el.textContent = '';
        el.classList.add('hidden');
    });
}

// ==========================================
// 9. UTILITY FUNCTIONS
// ==========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.className = `${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 translate-y-10 opacity-0 min-w-[300px]`;
    toast.innerHTML = `
        <i class="fa-solid ${icon} text-xl"></i>
        <span class="font-medium">${message}</span>
    `;
    
    container.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });
    
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function startCountdown() {
    const targetDate = new Date(eventsData[0].date).getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "EVENT STARTED";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("countdown").innerHTML = 
            `<span class="font-bold text-2xl md:text-4xl">${days}</span><span class="text-sm md:text-base">d</span> ` +
            `<span class="font-bold text-2xl md:text-4xl">${hours}</span><span class="text-sm md:text-base">h</span> ` +
            `<span class="font-bold text-2xl md:text-4xl">${minutes}</span><span class="text-sm md:text-base">m</span> ` +
            `<span class="font-bold text-2xl md:text-4xl">${seconds}</span><span class="text-sm md:text-base">s</span>`;
    }, 1000);
}

// ==========================================
// 10. EVENT LISTENERS & UI BEHAVIOR
// ==========================================
function setupEventListeners() {
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('eventModal');
            closeModal('registerModal');
        }
    });
}

// ==========================================
// 11. DARK MODE LOGIC
// ==========================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const html = document.documentElement;
    
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    const toggleTheme = () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    };
    
    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
}