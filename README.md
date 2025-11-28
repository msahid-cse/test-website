# Student Portal - SQA Testing Website

## Overview
This is a comprehensive Student Portal website designed specifically for **Software Quality Assurance (SQA) practice**. The website includes multiple features, pages, and interactive elements with proper IDs, classes, and data attributes for automation testing.

## Features for SQA Testing

### 1. **Authentication System**
- Login functionality with validation
- Registration with password strength indicator
- Session management
- Error handling

**Test IDs:**
- `data-testid="login-page"` - Login page container
- `data-testid="student-id-input"` - Student ID input field
- `data-testid="password-input"` - Password input field
- `data-testid="login-submit-btn"` - Login submit button
- `data-testid="show-register-btn"` - Show registration modal button

### 2. **Dashboard**
- Statistics cards (GPA, Credits, Fees, Semester)
- Announcements section
- User profile display
- Theme toggle (Light/Dark mode)

**Element IDs:**
- `#statGPA` - Current GPA display
- `#statCredits` - Completed credits
- `#statFees` - Pending fees
- `#statSemester` - Current semester
- `#themeToggle` - Theme toggle button
- `#logoutBtn` - Logout button

### 3. **Results & Grades**
- Semester results table
- GPA calculations
- Download transcript functionality

**Element IDs:**
- `#resultsTable` - Results table body
- `#currentGPA` - Current semester GPA
- `#cumulativeGPA` - Cumulative GPA

### 4. **Billing & Payments**
- Payment form with multiple methods
- Payment history table
- Fee tracking

**Element IDs:**
- `#paymentForm` - Payment form
- `#paymentMethod` - Payment method selector
- `#paymentAmount` - Payment amount input
- `#paymentHistory` - Payment history table
- `#pendingFeeDisplay` - Outstanding fees
- `#paidFeeDisplay` - Total paid amount

### 5. **Course Management**
- Course registration
- Course listing
- Drop courses
- Class routine

**Element IDs:**
- `#coursesGrid` - Available courses grid
- `#registeredCourses` - Registered courses list
- `#routineTable` - Class routine table

### 6. **Faculty Directory**
- Faculty listing
- Search functionality
- Contact information

**Element IDs:**
- `#facultySearch` - Faculty search input
- `#facultyGrid` - Faculty cards grid

### 7. **Admit Card**
- A4 format admit card
- Print functionality
- PDF download

**Element IDs:**
- `#admitCardId` - Student ID on admit card
- `#admitCardName` - Student name
- `#admitCardProgram` - Program name
- `#admitCardSemester` - Semester number

### 8. **Profile Management**
- View profile information
- Edit profile modal
- Update personal details

**Element IDs:**
- `#profileName` - Student name
- `#profileEmail` - Email address
- `#profilePhone` - Phone number
- `#profileAddress` - Address
- `#profileBlood` - Blood type
- `#editProfileModal` - Edit profile modal

### 9. **Program Change**
- Request program change
- View request history
- Status tracking

**Element IDs:**
- `#currentProgram` - Current program display
- `#newProgram` - New program selector
- `#programChangeForm` - Program change form
- `#programChangeHistory` - Request history

### 10. **Special Exam Application**
- Apply for makeup/supplementary exams
- Track application status
- Reason submission

**Element IDs:**
- `#specialExamForm` - Special exam form
- `#examType` - Exam type selector
- `#examCourse` - Course selector
- `#examReason` - Reason textarea
- `#specialExamHistory` - Application history

### 11. **Settings**
- Theme management
- Password change
- Notification preferences

**Element IDs:**
- `#passwordForm` - Password change form
- `#currentPassword` - Current password input
- `#newPassword` - New password input
- `#confirmPassword` - Confirm password input
- `#themeDisplay` - Current theme display

## Test Scenarios

### Functional Testing
1. **Login Flow**
   - Valid credentials
   - Invalid credentials
   - Empty fields
   - SQL injection attempts

2. **Registration Flow**
   - Valid data
   - Duplicate student ID
   - Password mismatch
   - Weak password
   - Email validation

3. **Course Registration**
   - Register for courses
   - Drop courses
   - View class routine

4. **Payment Processing**
   - Make payment
   - Invalid amount
   - Payment history

5. **Profile Updates**
   - Edit profile information
   - Change password
   - Validation

### UI/UX Testing
- Responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- Hover effects
- Animations
- Loading states

### Accessibility Testing
- ARIA labels
- Keyboard navigation
- Screen reader compatibility
- Focus management

### Performance Testing
- Page load time
- Form submission speed
- Data rendering

### Security Testing
- XSS prevention
- Input validation
- Session management
- Password strength

## Demo Accounts

| Student ID | Password | Program |
|------------|----------|---------|
| STU001 | 123456 | Computer Science (BS) |
| STU002 | 123456 | Business Administration (BBA) |
| STU003 | 123456 | Engineering (BE) |
| STU004 | 123456 | Pharmacy (B.Pharm) |
| STU005 | 123456 | Economics (BA) |

## CSS Classes for Testing

### Form States
- `.error` - Error state
- `.valid` - Valid state
- `.invalid` - Invalid state
- `.loading` - Loading state
- `.disabled` - Disabled state

### Component Classes
- `.btn-primary` - Primary buttons
- `.btn-secondary` - Secondary buttons
- `.btn-danger` - Danger buttons
- `.btn-success` - Success buttons
- `.card` - Card containers
- `.modal-backdrop` - Modal overlay
- `.toast` - Toast notifications

### Navigation
- `.menu-item` - Sidebar menu items
- `.menu-item.active` - Active menu item
- `.navbar` - Top navigation bar
- `.sidebar` - Side navigation

## Automation Testing Tips

### Selenium/Playwright Selectors
```javascript
// By ID
driver.findElement(By.id('studentId'))

// By data-testid
driver.findElement(By.css('[data-testid="login-submit-btn"]'))

// By class
driver.findElement(By.className('btn-primary'))

// By name
driver.findElement(By.name('studentId'))
```

### Cypress Examples
```javascript
// Login test
cy.get('[data-testid="student-id-input"]').type('STU001')
cy.get('[data-testid="password-input"]').type('123456')
cy.get('[data-testid="login-submit-btn"]').click()

// Theme toggle
cy.get('#themeToggle').click()
cy.get('body').should('have.class', 'dark-mode')

// Course registration
cy.get('[data-page="courses"]').click()
cy.contains('Pre-Register').first().click()
```

## Local Storage Data

The application uses localStorage for:
- `currentUser` - Current logged-in user
- `registeredUsers` - All registered users
- `payments` - Payment history
- `programRequests` - Program change requests
- `specialExamApps` - Special exam applications
- `theme` - Theme preference (light-mode/dark-mode)

## API Simulation

This is a frontend-only application using mock data. All data is stored in:
- `app.js` - mockData object
- localStorage - Persistent data

## Browser Compatibility

Tested on:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Running the Website

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```
3. Navigate to `http://localhost:8000`

## Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Register new account
- [ ] Toggle dark/light theme
- [ ] Navigate all pages
- [ ] Register for courses
- [ ] Make payment
- [ ] Edit profile
- [ ] Change password
- [ ] Apply for special exam
- [ ] Request program change
- [ ] Download admit card
- [ ] Search faculty
- [ ] View results
- [ ] Check responsive design
- [ ] Test form validations
- [ ] Verify error messages
- [ ] Check toast notifications
- [ ] Test modal functionality
- [ ] Verify data persistence

## Contact

For issues or questions about testing this website, please refer to the code comments or create test documentation.

---

**Happy Testing! 🧪**
