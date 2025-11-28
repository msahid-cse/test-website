# SQA Testing Guide - Student Portal

## Quick Start for Testing

### 1. Login Testing
**Test Case ID:** TC-LOGIN-001
- **Objective:** Verify successful login with valid credentials
- **Steps:**
  1. Open the website
  2. Enter Student ID: `STU001`
  3. Enter Password: `123456`
  4. Click "Sign In" button
- **Expected Result:** User should be redirected to dashboard
- **Selectors:**
  - Student ID: `#studentId` or `[data-testid="student-id-input"]`
  - Password: `#password` or `[data-testid="password-input"]`
  - Submit: `#loginButton` or `[data-testid="login-submit-btn"]`

**Test Case ID:** TC-LOGIN-002
- **Objective:** Verify login fails with invalid credentials
- **Steps:**
  1. Enter Student ID: `INVALID`
  2. Enter Password: `wrong`
  3. Click "Sign In"
- **Expected Result:** Error toast message appears

### 2. Registration Testing
**Test Case ID:** TC-REG-001
- **Objective:** Create new student account
- **Steps:**
  1. Click "Create New Account" button
  2. Fill in all fields
  3. Click "Register"
- **Selectors:**
  - Show Modal: `#showRegisterBtn` or `[data-testid="show-register-btn"]`
  - Student ID: `#regStudentId`
  - Name: `#regName`
  - Email: `#regEmail`
  - Password: `#regPassword`
  - Confirm Password: `#regConfirmPassword`

### 3. Navigation Testing
**Test Case ID:** TC-NAV-001
- **Objective:** Navigate through all pages
- **Pages to Test:**
  - Dashboard: `[data-page="dashboard"]`
  - Results: `[data-page="results"]`
  - Billing: `[data-page="billing"]`
  - Courses: `[data-page="courses"]`
  - Routine: `[data-page="routine"]`
  - Faculty: `[data-page="faculty"]`
  - Admit Card: `[data-page="admitcard"]`
  - Special Exam: `[data-page="specialexam"]`
  - Program Change: `[data-page="programchange"]`
  - Profile: `[data-page="profile"]`
  - Settings: `[data-page="settings"]`

### 4. Theme Toggle Testing
**Test Case ID:** TC-THEME-001
- **Objective:** Toggle between light and dark themes
- **Steps:**
  1. Click theme toggle button
  2. Verify body class changes
- **Selectors:**
  - Toggle Button: `#themeToggle`
  - Body Element: `body.light-mode` or `body.dark-mode`

### 5. Course Registration Testing
**Test Case ID:** TC-COURSE-001
- **Objective:** Register for a course
- **Steps:**
  1. Navigate to Courses page
  2. Click "Pre-Register" on any course
  3. Verify course appears in registered section
- **Selectors:**
  - Courses Grid: `#coursesGrid`
  - Registered Courses: `#registeredCourses`

### 6. Payment Testing
**Test Case ID:** TC-PAY-001
- **Objective:** Process a payment
- **Steps:**
  1. Navigate to Billing page
  2. Select payment method
  3. Enter amount
  4. Click "Pay Now"
- **Selectors:**
  - Payment Form: `#paymentForm`
  - Method: `#paymentMethod`
  - Amount: `#paymentAmount`
  - History: `#paymentHistory`

### 7. Profile Update Testing
**Test Case ID:** TC-PROFILE-001
- **Objective:** Update profile information
- **Steps:**
  1. Navigate to Profile page
  2. Click "Edit Profile"
  3. Update fields
  4. Click "Save Changes"
- **Selectors:**
  - Edit Button: Button with onclick="showEditProfileModal()"
  - Phone: `#editPhone`
  - Address: `#editAddress`
  - Blood Type: `#editBlood`

### 8. Password Change Testing
**Test Case ID:** TC-PASS-001
- **Objective:** Change user password
- **Steps:**
  1. Navigate to Settings page
  2. Enter current password
  3. Enter new password
  4. Confirm new password
  5. Click "Change Password"
- **Selectors:**
  - Form: `#passwordForm`
  - Current: `#currentPassword`
  - New: `#newPassword`
  - Confirm: `#confirmPassword`

### 9. Special Exam Application Testing
**Test Case ID:** TC-EXAM-001
- **Objective:** Apply for special exam
- **Steps:**
  1. Navigate to Special Exam page
  2. Select exam type
  3. Select course
  4. Enter reason
  5. Submit application
- **Selectors:**
  - Form: `#specialExamForm`
  - Type: `#examType`
  - Course: `#examCourse`
  - Reason: `#examReason`

### 10. Program Change Testing
**Test Case ID:** TC-PROG-001
- **Objective:** Request program change
- **Steps:**
  1. Navigate to Program Change page
  2. Select new program
  3. Submit request
- **Selectors:**
  - Form: `#programChangeForm`
  - Current: `#currentProgram`
  - New: `#newProgram`

## Selenium WebDriver Examples

### Java
```java
// Login Test
WebDriver driver = new ChromeDriver();
driver.get("file:///d:/Project/test-website/index.html");

WebElement studentId = driver.findElement(By.id("studentId"));
WebElement password = driver.findElement(By.id("password"));
WebElement loginBtn = driver.findElement(By.cssSelector("[data-testid='login-submit-btn']"));

studentId.sendKeys("STU001");
password.sendKeys("123456");
loginBtn.click();

// Wait for dashboard
WebDriverWait wait = new WebDriverWait(driver, 10);
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("dashboard")));

// Verify login success
Assert.assertTrue(driver.findElement(By.id("userName")).isDisplayed());
```

### Python
```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Login Test
driver = webdriver.Chrome()
driver.get("file:///d:/Project/test-website/index.html")

student_id = driver.find_element(By.ID, "studentId")
password = driver.find_element(By.ID, "password")
login_btn = driver.find_element(By.CSS_SELECTOR, "[data-testid='login-submit-btn']")

student_id.send_keys("STU001")
password.send_keys("123456")
login_btn.click()

# Wait for dashboard
wait = WebDriverWait(driver, 10)
wait.until(EC.visibility_of_element_located((By.ID, "dashboard")))

# Verify
assert driver.find_element(By.ID, "userName").is_displayed()
```

## Cypress Examples

```javascript
describe('Student Portal Tests', () => {
  beforeEach(() => {
    cy.visit('file:///d:/Project/test-website/index.html')
  })

  it('should login successfully', () => {
    cy.get('[data-testid="student-id-input"]').type('STU001')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="login-submit-btn"]').click()
    
    cy.get('#dashboard').should('be.visible')
    cy.get('#userName').should('contain', 'Ahmed Hassan')
  })

  it('should toggle theme', () => {
    // Login first
    cy.get('[data-testid="student-id-input"]').type('STU001')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="login-submit-btn"]').click()
    
    // Toggle theme
    cy.get('#themeToggle').click()
    cy.get('body').should('have.class', 'dark-mode')
    
    cy.get('#themeToggle').click()
    cy.get('body').should('have.class', 'light-mode')
  })

  it('should register for a course', () => {
    // Login
    cy.get('[data-testid="student-id-input"]').type('STU001')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="login-submit-btn"]').click()
    
    // Navigate to courses
    cy.get('[data-page="courses"]').click()
    
    // Register for first available course
    cy.contains('Pre-Register').first().click()
    
    // Verify toast message
    cy.contains('Course pre-registered successfully!').should('be.visible')
  })

  it('should make a payment', () => {
    // Login
    cy.get('[data-testid="student-id-input"]').type('STU001')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="login-submit-btn"]').click()
    
    // Navigate to billing
    cy.get('[data-page="billing"]').click()
    
    // Fill payment form
    cy.get('#paymentMethod').select('Bank Transfer')
    cy.get('#paymentAmount').type('5000')
    cy.get('#paymentForm').submit()
    
    // Verify success
    cy.contains('Payment of ৳5,000 successful!').should('be.visible')
  })
})
```

## Playwright Examples

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Student Portal', () => {
  test('login flow', async ({ page }) => {
    await page.goto('file:///d:/Project/test-website/index.html');
    
    await page.fill('[data-testid="student-id-input"]', 'STU001');
    await page.fill('[data-testid="password-input"]', '123456');
    await page.click('[data-testid="login-submit-btn"]');
    
    await expect(page.locator('#dashboard')).toBeVisible();
    await expect(page.locator('#userName')).toContainText('Ahmed Hassan');
  });

  test('navigate all pages', async ({ page }) => {
    // Login first
    await page.goto('file:///d:/Project/test-website/index.html');
    await page.fill('[data-testid="student-id-input"]', 'STU001');
    await page.fill('[data-testid="password-input"]', '123456');
    await page.click('[data-testid="login-submit-btn"]');
    
    // Test each page
    const pages = ['results', 'billing', 'courses', 'routine', 'faculty', 
                   'admitcard', 'specialexam', 'programchange', 'profile', 'settings'];
    
    for (const pageName of pages) {
      await page.click(`[data-page="${pageName}"]`);
      await expect(page.locator(`#page-${pageName}`)).toBeVisible();
    }
  });
});
```

## Test Data

### Valid Users
| Student ID | Password | Name | Program |
|------------|----------|------|---------|
| STU001 | 123456 | Ahmed Hassan | Computer Science (BS) |
| STU002 | 123456 | Fatima Khan | Business Administration (BBA) |
| STU003 | 123456 | Mohammad Ali | Engineering (BE) |
| STU004 | 123456 | Saira Begum | Pharmacy (B.Pharm) |
| STU005 | 123456 | Hassan Rahman | Economics (BA) |

### Invalid Test Cases
- Invalid ID: `INVALID123`
- Invalid Password: `wrongpass`
- Empty fields
- SQL Injection: `' OR '1'='1`
- XSS: `<script>alert('XSS')</script>`

## Boundary Value Testing

### Payment Amount
- Minimum: 1
- Maximum: Pending fees amount
- Invalid: 0, negative, exceeds pending

### Password Length
- Minimum: 6 characters
- Maximum: No limit
- Invalid: < 6 characters

## Accessibility Testing Checklist

- [ ] All form inputs have labels
- [ ] Buttons have aria-labels
- [ ] Tab navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG standards
- [ ] Keyboard shortcuts work

## Performance Testing

### Metrics to Measure
- Page load time
- Form submission time
- Data rendering time
- Theme toggle response
- Navigation speed

### Tools
- Chrome DevTools
- Lighthouse
- WebPageTest

## Security Testing

### Test Cases
- [ ] SQL Injection in login
- [ ] XSS in input fields
- [ ] CSRF protection
- [ ] Session management
- [ ] Password storage (hashed)
- [ ] Input validation
- [ ] Output encoding

## Responsive Testing

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Test Devices
- iPhone 12/13/14
- iPad
- Android phones
- Desktop browsers

## Browser Compatibility

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Regression Testing Checklist

After any code changes, verify:
- [ ] Login still works
- [ ] All pages load
- [ ] Forms submit correctly
- [ ] Data persists
- [ ] Theme toggle works
- [ ] Navigation functions
- [ ] Modals open/close
- [ ] Toasts appear
- [ ] LocalStorage works

## Bug Report Template

```
**Bug ID:** BUG-001
**Title:** Brief description
**Severity:** Critical/High/Medium/Low
**Priority:** P1/P2/P3
**Environment:** Browser, OS
**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:** What should happen
**Actual Result:** What actually happens
**Screenshots:** Attach if applicable
**Logs:** Console errors
```

---

**Happy Testing! 🚀**
