// ========== MOCK DATA ==========
const mockData = {
    students: [
        {
            id: "STU001", name: "Ahmed Hassan", email: "ahmed.hassan@university.edu", password: "123456",
            phone: "01712345678", program: "Computer Science (BS)", semester: 4, gpa: 3.78,
            completedCredits: 45, totalCredits: 120, admissionDate: "2022-09-15", bloodType: "O+",
            address: "123 Main Street, Dhaka", registeredCourses: ["CS401", "CS402"]
        },
        {
            id: "STU002", name: "Fatima Khan", email: "fatima.khan@university.edu", password: "123456",
            phone: "01798765432", program: "Business Administration (BBA)", semester: 3, gpa: 3.92,
            completedCredits: 36, totalCredits: 120, admissionDate: "2023-09-10", bloodType: "AB+",
            address: "456 Oak Avenue, Chittagong", registeredCourses: ["BBA301"]
        },
        {
            id: "STU003", name: "Mohammad Ali", email: "mohammad.ali@university.edu", password: "123456",
            phone: "01654321098", program: "Engineering (BE)", semester: 2, gpa: 3.45,
            completedCredits: 24, totalCredits: 132, admissionDate: "2023-09-05", bloodType: "B-",
            address: "789 Pine Road, Sylhet", registeredCourses: []
        },
        {
            id: "STU004", name: "Saira Begum", email: "saira.begum@university.edu", password: "123456",
            phone: "01587654321", program: "Pharmacy (B.Pharm)", semester: 5, gpa: 3.88,
            completedCredits: 60, totalCredits: 120, admissionDate: "2021-09-20", bloodType: "A+",
            address: "321 Elm Street, Rajshahi", registeredCourses: ["PHARM501"]
        },
        {
            id: "STU005", name: "Hassan Rahman", email: "hassan.rahman@university.edu", password: "123456",
            phone: "01723456789", program: "Economics (BA)", semester: 1, gpa: 0.00,
            completedCredits: 0, totalCredits: 120, admissionDate: "2024-09-01", bloodType: "O-",
            address: "654 Birch Lane, Khulna", registeredCourses: []
        }
    ],
    courses: [
        { id: "CS401", name: "Database Management Systems", credits: 3, instructor: "Dr. Karim Ahmed", schedule: "Mon 10:00", room: "CSB-301", capacity: 40, enrolled: 38, semester: 4 },
        { id: "CS402", name: "Web Development Advanced", credits: 4, instructor: "Engr. Nasrin Akter", schedule: "Tue 14:00", room: "CSB-205", capacity: 35, enrolled: 34, semester: 4 },
        { id: "CS403", name: "Artificial Intelligence", credits: 3, instructor: "Prof. Dr. Rashed Khan", schedule: "Mon 13:00", room: "CSB-401", capacity: 30, enrolled: 28, semester: 4 },
        { id: "BBA301", name: "Financial Management", credits: 3, instructor: "Dr. Sayyida Alam", schedule: "Wed 10:00", room: "MBA-101", capacity: 45, enrolled: 42, semester: 3 },
        { id: "PHARM501", name: "Pharmacology Advanced", credits: 4, instructor: "Dr. Runa Dey", schedule: "Fri 09:00", room: "PH-201", capacity: 25, enrolled: 24, semester: 5 }
    ],
    faculty: [
        { id: "FAC001", name: "Dr. Karim Ahmed", department: "Computer Science", designation: "Associate Professor", email: "karim.ahmed@university.edu", phone: "01912345678", officeHours: "Mon, Wed 3:00 PM" },
        { id: "FAC002", name: "Engr. Nasrin Akter", department: "Computer Science", designation: "Assistant Professor", email: "nasrin.akter@university.edu", phone: "01887654321", officeHours: "Tue, Thu 4:00 PM" },
        { id: "FAC003", name: "Prof. Dr. Rashed Khan", department: "Computer Science", designation: "Professor", email: "rashed.khan@university.edu", phone: "01798765432", officeHours: "Fri 2:00 PM" }
    ],
    programs: ["Computer Science (BS)", "Business Administration (BBA)", "Engineering (BE)", "Pharmacy (B.Pharm)", "Economics (BA)", "Law (LLB)", "Medicine (MBBS)"],
    results: {
        "STU001": [
            { semester: 4, course: "CS301", courseName: "Data Structures", credits: 3, grade: "A", gpa: 4.0 },
            { semester: 4, course: "CS302", courseName: "Algorithms", credits: 3, grade: "A-", gpa: 3.7 }
        ],
        "STU002": [
            { semester: 3, course: "BBA201", courseName: "Marketing Principles", credits: 3, grade: "A", gpa: 4.0 },
            { semester: 3, course: "BBA202", courseName: "Business Statistics", credits: 3, grade: "A", gpa: 4.0 }
        ]
    }
};

// ========== STATE MANAGEMENT ==========
let currentUser = null;
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
let currentUserData = null;
let appState = {
    payments: JSON.parse(localStorage.getItem('payments')) || [],
    programRequests: JSON.parse(localStorage.getItem('programRequests')) || [],
    specialExamApps: JSON.parse(localStorage.getItem('specialExamApps')) || []
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Initialize registered users from localStorage
    if (!localStorage.getItem('registeredUsers')) {
        registeredUsers = mockData.students;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }

    // Check existing session
    const sessionUser = localStorage.getItem('currentUser');
    if (sessionUser) {
        currentUser = JSON.parse(sessionUser);
        currentUserData = getUserData(currentUser.id);
        showDashboard();
    } else {
        document.getElementById('loginPage').classList.remove('hidden');
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
    updateThemeDisplay();
}

function setupEventListeners() {
    // Login Form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });

    // Register Form
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleRegister();
    });

    // Password Form
    document.getElementById('passwordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handlePasswordChange();
    });

    // Payment Form
    document.getElementById('paymentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handlePayment();
    });

    // Program Change Form
    document.getElementById('programChangeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleProgramChange();
    });

    // Special Exam Form
    document.getElementById('specialExamForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleSpecialExamApp();
    });

    // Edit Profile Form
    document.getElementById('editProfileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleProfileUpdate();
    });

    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Logout Button
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Mobile Menu
    document.getElementById('mobileMenuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('active');
    });

    // Menu Items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Special Exam Course Selector
    document.getElementById('examCourse')?.addEventListener('change', function() {
        const course = mockData.courses.find(c => c.id === this.value);
        if (course) {
            this.dataset.credits = course.credits;
        }
    });
}

// ========== AUTHENTICATION ==========
function handleLogin() {
    const studentIdRaw = document.getElementById('studentId').value || '';
    const password = document.getElementById('password').value || '';

    // Normalize input: trim and use uppercase for IDs, allow login by email (case-insensitive)
    const studentId = studentIdRaw.trim();
    const studentIdUpper = studentId.toUpperCase();
    const studentEmailLower = studentId.toLowerCase();

    const user = registeredUsers.find(u => {
        const matchId = (u.id || '').toString().toUpperCase() === studentIdUpper;
        const matchEmail = (u.email || '').toString().toLowerCase() === studentEmailLower;
        const matchPassword = u.password === password;
        return matchPassword && (matchId || matchEmail);
    });

    if (user) {
        currentUser = { id: user.id };
        currentUserData = { ...user };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.getElementById('loginForm').reset();
        showDashboard();
        showToast('Login successful!', 'success');
    } else {
        showToast('Invalid Student ID / Email or Password', 'error');
    }
}

function handleRegister() {
    const studentId = document.getElementById('regStudentId').value;
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    // Validation
    if (registeredUsers.find(u => u.id === studentId)) {
        showToast('Student ID already exists', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: studentId,
        name: name,
        email: email,
        password: password,
        phone: "0171234567",
        program: "Computer Science (BS)",
        semester: 1,
        gpa: 0,
        completedCredits: 0,
        totalCredits: 120,
        admissionDate: new Date().toISOString().split('T')[0],
        bloodType: "O+",
        address: "Address not set",
        registeredCourses: []
    };

    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    closeRegisterModal();
    showToast('Registration successful! You can now login.', 'success');
}

function handlePasswordChange() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (currentUserData.password !== currentPassword) {
        showToast('Current password is incorrect', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showToast('New password must be at least 6 characters', 'error');
        return;
    }

    // Update password
    currentUserData.password = newPassword;
    const userIndex = registeredUsers.findIndex(u => u.id === currentUserData.id);
    if (userIndex !== -1) {
        registeredUsers[userIndex].password = newPassword;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.setItem('currentUser', JSON.stringify(currentUserData));
    }

    document.getElementById('passwordForm').reset();
    showToast('Password changed successfully!', 'success');
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    currentUserData = null;
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    showToast('You have been logged out', 'success');
}

// ========== UI FUNCTIONS ==========
function showDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadPage('dashboard');
    updateUserInfo();
}

function updateUserInfo() {
    document.getElementById('userName').textContent = currentUserData.name;
    document.getElementById('userProgram').textContent = currentUserData.program;
    document.getElementById('userAvatar').textContent = getInitials(currentUserData.name);
    
    // Update dashboard stats
    document.getElementById('statGPA').textContent = currentUserData.gpa.toFixed(2);
    document.getElementById('statCredits').textContent = currentUserData.completedCredits;
    document.getElementById('statFees').textContent = '৳' + currentUserData.pendingFees?.toLocaleString() || '0';
    document.getElementById('statSemester').textContent = currentUserData.semester;
    
    // Welcome message
    document.getElementById('dashboardWelcome').textContent = `Welcome back, ${currentUserData.name.split(' ')[0]}!`;
    document.getElementById('dashboardSubtitle').textContent = `${currentUserData.totalCredits - currentUserData.completedCredits} credits remaining to graduate`;
}

function loadPage(pageId) {
    // Hide all pages
    document.querySelectorAll('[id^="page-"]').forEach(page => page.classList.add('hidden'));

    // Show selected page
    document.getElementById(`page-${pageId}`)?.classList.remove('hidden');

    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });

    // Load page content
    switch(pageId) {
        case 'results': loadResults(); break;
        case 'billing': loadBilling(); break;
        case 'courses': loadCourses(); break;
        case 'routine': loadRoutine(); break;
        case 'faculty': loadFaculty(); break;
        case 'admitcard': loadAdmitCard(); break;
        case 'profile': loadProfile(); break;
        case 'settings': loadSettings(); break;
        case 'programchange': loadProgramChange(); break;
        case 'specialexam': loadSpecialExam(); break;
    }
}

// ========== RESULTS PAGE ==========
function loadResults() {
    const resultsTable = document.getElementById('resultsTable');
    const results = mockData.results[currentUserData.id] || [];

    resultsTable.innerHTML = results.map(result => `
        <tr class="border-b">
            <td class="py-3">${result.course}</td>
            <td class="py-3">${result.courseName}</td>
            <td class="text-center py-3">${result.credits}</td>
            <td class="text-center py-3">
                <span class="badge badge-success">${result.grade}</span>
            </td>
            <td class="text-center py-3">${result.gpa.toFixed(1)}</td>
        </tr>
    `).join('');

    document.getElementById('currentGPA').textContent = currentUserData.gpa.toFixed(2);
    document.getElementById('cumulativeGPA').textContent = currentUserData.gpa.toFixed(2);
}

function downloadTranscript() {
    showToast('Downloading transcript...', 'info');
    setTimeout(() => {
        showToast('Transcript downloaded successfully!', 'success');
    }, 1500);
}

// ========== BILLING PAGE ==========
function loadBilling() {
    const pendingFees = currentUserData.pendingFees || 0;
    const paidFees = currentUserData.paidFees || 0;

    document.getElementById('pendingFeeDisplay').textContent = '৳' + pendingFees.toLocaleString();
    document.getElementById('paidFeeDisplay').textContent = '৳' + paidFees.toLocaleString();

    // Load payment history
    const paymentHistory = document.getElementById('paymentHistory');
    const payments = appState.payments.filter(p => p.studentId === currentUserData.id);

    paymentHistory.innerHTML = payments.map(payment => `
        <tr class="border-b">
            <td class="py-3">${payment.date}</td>
            <td class="py-3">৳${payment.amount.toLocaleString()}</td>
            <td class="py-3">${payment.method}</td>
            <td class="py-3"><span class="badge badge-success">Completed</span></td>
        </tr>
    `).join('') || '<tr><td colspan="4" class="py-4 text-center text-gray-600">No payment history</td></tr>';
}

function handlePayment() {
    const method = document.getElementById('paymentMethod').value;
    const amount = parseFloat(document.getElementById('paymentAmount').value);

    if (amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }

    const pendingFees = currentUserData.pendingFees || 0;
    if (amount > pendingFees) {
        showToast(`Cannot pay more than pending fees (৳${pendingFees.toLocaleString()})`, 'error');
        return;
    }

    // Process payment
    const payment = {
        studentId: currentUserData.id,
        amount: amount,
        method: method,
        date: new Date().toLocaleDateString(),
        reference: 'REF-' + Date.now()
    };

    appState.payments.push(payment);
    localStorage.setItem('payments', JSON.stringify(appState.payments));

    // Update fees
    currentUserData.pendingFees = (currentUserData.pendingFees || 0) - amount;
    currentUserData.paidFees = (currentUserData.paidFees || 0) + amount;

    const userIndex = registeredUsers.findIndex(u => u.id === currentUserData.id);
    if (userIndex !== -1) {
        registeredUsers[userIndex].pendingFees = currentUserData.pendingFees;
        registeredUsers[userIndex].paidFees = currentUserData.paidFees;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.setItem('currentUser', JSON.stringify(currentUserData));
    }

    document.getElementById('paymentForm').reset();
    showToast(`Payment of ৳${amount.toLocaleString()} successful!`, 'success');
    loadBilling();
    updateUserInfo();
}

// ========== COURSES PAGE ==========
function loadCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    const registeredDiv = document.getElementById('registeredCourses');

    // Available courses
    const availableCourses = mockData.courses.filter(c => c.semester <= currentUserData.semester);
    coursesGrid.innerHTML = availableCourses.map(course => `
        <div class="card">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="font-bold">${course.name} (${course.id})</h3>
                    <p class="text-sm text-gray-600">${course.instructor}</p>
                </div>
                <span class="badge badge-info">${course.credits} Credits</span>
            </div>
            <p class="text-sm mb-3">📅 ${course.schedule} | 🏛️ ${course.room}</p>
            <p class="text-sm mb-3">👥 ${course.enrolled}/${course.capacity} students</p>
            <button onclick="preRegisterCourse('${course.id}')" class="btn btn-secondary w-full">
                ${currentUserData.registeredCourses.includes(course.id) ? '✓ Registered' : 'Pre-Register'}
            </button>
        </div>
    `).join('');

    // Registered courses
    const registered = mockData.courses.filter(c => currentUserData.registeredCourses.includes(c.id));
    registeredDiv.innerHTML = registered.length > 0 ? registered.map(course => `
        <div class="card bg-green-50">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-bold">${course.name} (${course.id})</h3>
                    <p class="text-sm text-gray-600">${course.instructor} | ${course.credits} Credits</p>
                </div>
                <button onclick="dropCourse('${course.id}')" class="btn btn-danger btn-sm">Drop</button>
            </div>
        </div>
    `).join('') : '<p class="text-gray-600">No registered courses yet</p>';
}

function preRegisterCourse(courseId) {
    if (currentUserData.registeredCourses.includes(courseId)) {
        showToast('You are already registered for this course', 'error');
        return;
    }

    currentUserData.registeredCourses.push(courseId);
    const userIndex = registeredUsers.findIndex(u => u.id === currentUserData.id);
    if (userIndex !== -1) {
        registeredUsers[userIndex].registeredCourses = currentUserData.registeredCourses;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.setItem('currentUser', JSON.stringify(currentUserData));
    }

    showToast('Course pre-registered successfully!', 'success');
    loadCourses();
}

function dropCourse(courseId) {
    if (confirm('Are you sure you want to drop this course?')) {
        currentUserData.registeredCourses = currentUserData.registeredCourses.filter(id => id !== courseId);
        const userIndex = registeredUsers.findIndex(u => u.id === currentUserData.id);
        if (userIndex !== -1) {
            registeredUsers[userIndex].registeredCourses = currentUserData.registeredCourses;
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            localStorage.setItem('currentUser', JSON.stringify(currentUserData));
        }
        showToast('Course dropped successfully!', 'success');
        loadCourses();
    }
}

// ========== CLASS ROUTINE ==========
function loadRoutine() {
    const routineTable = document.getElementById('routineTable');
    const registered = mockData.courses.filter(c => currentUserData.registeredCourses.includes(c.id));

    routineTable.innerHTML = registered.map(course => `
        <tr class="border-b">
            <td class="py-3">${course.schedule.split(' ')[0]}</td>
            <td class="py-3">${course.schedule.split(' ')[1]}</td>
            <td class="py-3">${course.name} (${course.id})</td>
            <td class="py-3">${course.instructor}</td>
            <td class="py-3">${course.room}</td>
        </tr>
    `).join('') || '<tr><td colspan="5" class="py-4 text-center text-gray-600">No registered courses</td></tr>';
}

// ========== FACULTY PAGE ==========
function loadFaculty() {
    const facultyGrid = document.getElementById('facultyGrid');

    facultyGrid.innerHTML = mockData.faculty.map(faculty => `
        <div class="card" data-search="${faculty.name.toLowerCase()} ${faculty.department.toLowerCase()} ${faculty.email.toLowerCase()}">
            <h3 class="font-bold mb-2">${faculty.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${faculty.designation}</p>
            <p class="text-sm mb-2">🏛️ ${faculty.department}</p>
            <p class="text-sm mb-2">📧 ${faculty.email}</p>
            <p class="text-sm mb-2">📱 ${faculty.phone}</p>
            <p class="text-sm">🕐 ${faculty.officeHours}</p>
        </div>
    `).join('');
}

function filterFaculty() {
    const searchTerm = document.getElementById('facultySearch').value.toLowerCase();
    document.querySelectorAll('[data-search]').forEach(card => {
        if (card.dataset.search.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ========== ADMIT CARD ==========
function loadAdmitCard() {
    const date = new Date(currentUserData.admissionDate);
    document.getElementById('admitCardId').textContent = currentUserData.id;
    document.getElementById('admitCardName').textContent = currentUserData.name;
    document.getElementById('admitCardProgram').textContent = currentUserData.program.split(' ')[0];
    document.getElementById('admitCardSemester').textContent = currentUserData.semester;
    document.getElementById('admitCardRegNo').textContent = `${date.getFullYear()}-001-${currentUserData.program.split(' ')[0]}`;
    document.getElementById('admitCardAdmDate').textContent = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    document.getElementById('admitCardAvatar').textContent = getInitials(currentUserData.name);
    document.getElementById('admitCardIssueDate').textContent = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

function downloadAdmitCardPDF() {
    showToast('Downloading admit card as PDF...', 'info');
    setTimeout(() => {
        const element = document.querySelector('.admit-card');
        const opt = {
            margin: 0,
            filename: `AdmitCard_${currentUserData.id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        showToast('Admit card PDF downloaded successfully!', 'success');
    }, 1500);
}

// ========== PROFILE PAGE ==========
function loadProfile() {
    document.getElementById('profileName').textContent = currentUserData.name;
    document.getElementById('profileId').textContent = currentUserData.id;
    document.getElementById('profileProgram').textContent = currentUserData.program;
    document.getElementById('profileEmail').textContent = currentUserData.email;
    document.getElementById('profilePhone').textContent = currentUserData.phone;
    document.getElementById('profileAddress').textContent = currentUserData.address;
    document.getElementById('profileBlood').textContent = currentUserData.bloodType;
    document.getElementById('profileAvatar').textContent = getInitials(currentUserData.name);
    document.getElementById('profileAdmission').textContent = new Date(currentUserData.admissionDate).toLocaleDateString();
    document.getElementById('profileSemester').textContent = currentUserData.semester;
}

function showEditProfileModal() {
    document.getElementById('editPhone').value = currentUserData.phone;
    document.getElementById('editAddress').value = currentUserData.address;
    document.getElementById('editBlood').value = currentUserData.bloodType;
    document.getElementById('editProfileModal').classList.add('active');
}

function closeEditProfileModal() {
    document.getElementById('editProfileModal').classList.remove('active');
}

function handleProfileUpdate() {
    currentUserData.phone = document.getElementById('editPhone').value;
    currentUserData.address = document.getElementById('editAddress').value;
    currentUserData.bloodType = document.getElementById('editBlood').value;

    const userIndex = registeredUsers.findIndex(u => u.id === currentUserData.id);
    if (userIndex !== -1) {
        registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...currentUserData };
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.setItem('currentUser', JSON.stringify(currentUserData));
    }

    closeEditProfileModal();
    loadProfile();
    showToast('Profile updated successfully!', 'success');
}

// ========== PROGRAM CHANGE ==========
function loadProgramChange() {
    document.getElementById('currentProgram').textContent = currentUserData.program;

    const programSelect = document.getElementById('newProgram');
    programSelect.innerHTML = '<option value="">Choose a program...</option>' +
        mockData.programs
            .filter(p => p !== currentUserData.program)
            .map(p => `<option value="${p}">${p}</option>`)
            .join('');

    const history = document.getElementById('programChangeHistory');
    const requests = appState.programRequests.filter(r => r.studentId === currentUserData.id);
    history.innerHTML = requests.length > 0 ? requests.map(req => `
        <div class="mb-3 pb-3 border-b">
            <p class="font-semibold">${req.newProgram}</p>
            <p class="text-sm text-gray-600">Status: <span class="badge badge-${req.status === 'Approved' ? 'success' : 'warning'}">${req.status}</span></p>
        </div>
    `).join('') : '<p class="text-gray-600">No requests yet</p>';
}

function handleProgramChange() {
    const newProgram = document.getElementById('newProgram').value;

    if (!newProgram) {
        showToast('Please select a program', 'error');
        return;
    }

    const request = {
        studentId: currentUserData.id,
        newProgram: newProgram,
        status: 'Under Review',
        date: new Date().toLocaleDateString()
    };

    appState.programRequests.push(request);
    localStorage.setItem('programRequests', JSON.stringify(appState.programRequests));

    document.getElementById('programChangeForm').reset();
    showToast('Program change request submitted!', 'success');
    loadProgramChange();
}

// ========== SETTINGS PAGE ==========
function loadSettings() {
    updateThemeDisplay();
    populateSpecialExamCourses();
}

function updateThemeDisplay() {
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('themeDisplay').textContent = isDark ? 'Dark' : 'Light';
    document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
    
    updateThemeDisplay();
    showToast('Theme changed!', 'success');
}

function checkPasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthDiv = document.getElementById('newPasswordStrength');
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    strengthDiv.innerHTML = '';
    const bars = ['weak', 'medium', 'medium', 'strong'];
    for (let i = 0; i < strength; i++) {
        const bar = document.createElement('div');
        bar.className = `strength-bar ${bars[i]}`;
        strengthDiv.appendChild(bar);
    }
}

// ========== SPECIAL EXAM PAGE ==========
function loadSpecialExam() {
    populateSpecialExamCourses();

    const history = document.getElementById('specialExamHistory');
    const apps = appState.specialExamApps.filter(a => a.studentId === currentUserData.id);
    history.innerHTML = apps.length > 0 ? apps.map(app => `
        <div class="mb-3 pb-3 border-b">
            <p class="font-semibold">${app.examType} - ${app.course}</p>
            <p class="text-sm text-gray-600">Status: <span class="badge badge-${app.status === 'Approved' ? 'success' : 'warning'}">${app.status}</span></p>
            <p class="text-sm text-gray-500">Applied: ${app.date}</p>
        </div>
    `).join('') : '<p class="text-gray-600">No applications yet</p>';
}

function populateSpecialExamCourses() {
    const courseSelect = document.getElementById('examCourse');
    if (!courseSelect) return;

    const registered = mockData.courses.filter(c => currentUserData.registeredCourses.includes(c.id));
    courseSelect.innerHTML = '<option value="">Select a course...</option>' +
        registered.map(c => `<option value="${c.id}">${c.name} (${c.id})</option>`).join('');
}

function handleSpecialExamApp() {
    const examType = document.getElementById('examType').value;
    const examCourse = document.getElementById('examCourse').value;
    const reason = document.getElementById('examReason').value;

    if (!examType || !examCourse) {
        showToast('Please fill all fields', 'error');
        return;
    }

    const app = {
        studentId: currentUserData.id,
        examType: examType,
        course: examCourse,
        reason: reason,
        status: 'Under Review',
        date: new Date().toLocaleDateString()
    };

    appState.specialExamApps.push(app);
    localStorage.setItem('specialExamApps', JSON.stringify(appState.specialExamApps));

    document.getElementById('specialExamForm').reset();
    showToast('Special exam application submitted!', 'success');
    loadSpecialExam();
}

// ========== UTILITY FUNCTIONS ==========
function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
}

function getUserData(studentId) {
    return registeredUsers.find(u => u.id === studentId);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showRegisterModal() {
    document.getElementById('registerModal').classList.add('active');
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('active');
    document.getElementById('registerForm').reset();
}