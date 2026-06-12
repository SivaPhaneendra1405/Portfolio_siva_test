// ==========================================================================
// NAVIGATION & SCROLL EFFECT
// ==========================================================================
const header = document.getElementById('header');
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
});

// ==========================================================================
// TYPING EFFECT
// ==========================================================================
const words = ["Manual & System Testing", "Selenium UI Automation", "REST API Postman Testing", "JIRA Defect Management"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTextElement = document.querySelector('.typing-text');

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

// Start typing animation on load
document.addEventListener('DOMContentLoaded', () => {
    if (typingTextElement) {
        setTimeout(type, 1000);
    }
    updateJiraCounts();
});

// ==========================================================================
// INTERACTIVE QA LAB - TAB SWITCHING
// ==========================================================================
const tabs = document.querySelectorAll('.lab-tab');
const panels = document.querySelectorAll('.lab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs & panels
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active to current
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// ==========================================================================
// TAB 1: SELENIUM AUTOMATION RUNNER
// ==========================================================================
const runSeleniumBtn = document.getElementById('run-selenium-btn');
const seleniumConsole = document.getElementById('selenium-console');
const seleniumStatus = document.getElementById('selenium-status');

// Browser mock pages
const mockLogin = document.getElementById('mock-login-page');
const mockDashboard = document.getElementById('mock-dashboard-page');
const mockTemplate = document.getElementById('mock-template-page');
const mockEditor = document.getElementById('mock-editor-page');
const mockToast = document.getElementById('mock-toast');

// Inputs inside mock pages
const mockEmailInput = document.getElementById('mock-email');
const mockPassInput = document.getElementById('mock-password');
const mockLoginBtn = document.getElementById('mock-login-btn');
const mockCreateResumeCard = document.getElementById('mock-create-resume-card');
const mockTemplateAts = document.getElementById('mock-template-ats');
const mockFullnameInput = document.getElementById('mock-fullname-input');
const mockSaveBtn = document.getElementById('mock-save-btn');

function appendLog(text, type = 'log-msg') {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    const logElement = document.createElement('p');
    logElement.className = type;
    logElement.innerHTML = `[${timestamp}] ${text}`;
    seleniumConsole.appendChild(logElement);
    seleniumConsole.scrollTop = seleniumConsole.scrollHeight;
}

function resetBrowserMock() {
    mockLogin.classList.remove('hidden');
    mockDashboard.classList.add('hidden');
    mockTemplate.classList.add('hidden');
    mockEditor.classList.add('hidden');
    mockToast.classList.add('hidden');
    
    mockEmailInput.value = "";
    mockEmailInput.classList.remove('input-active');
    mockPassInput.value = "";
    mockPassInput.classList.remove('input-active');
    mockFullnameInput.value = "";
    mockFullnameInput.classList.remove('input-active');
    
    mockCreateResumeCard.classList.remove('clicking');
    mockTemplateAts.classList.remove('clicking');
    mockSaveBtn.classList.remove('clicking');
    mockLoginBtn.classList.remove('clicking');
}

runSeleniumBtn.addEventListener('click', () => {
    if (runSeleniumBtn.disabled) return;
    
    runSeleniumBtn.disabled = true;
    seleniumStatus.textContent = "RUNNING";
    seleniumStatus.className = "status-indicator running";
    seleniumConsole.innerHTML = "";
    
    resetBrowserMock();
    
    appendLog("Initializing WebDriver &amp; opening Chrome browser instance...", "sys-msg");
    
    setTimeout(() => {
        appendLog("WebDriver started. Navigating to: <span class='cmd-msg'>https://bowizzy.com/login</span>");
        
        // Type Email
        setTimeout(() => {
            appendLog("Locating element: <span class='cmd-msg'>By.id(\"email\")</span>");
            mockEmailInput.classList.add('input-active');
            let emailText = "phaniphani0288@gmail.com";
            let idx = 0;
            let timer = setInterval(() => {
                mockEmailInput.value += emailText[idx];
                idx++;
                if (idx === emailText.length) {
                    clearInterval(timer);
                    mockEmailInput.classList.remove('input-active');
                    appendLog("Entered text: 'phaniphani0288@gmail.com' into Email input.");
                    
                    // Type Password
                    setTimeout(() => {
                        appendLog("Locating element: <span class='cmd-msg'>By.name(\"password\")</span>");
                        mockPassInput.classList.add('input-active');
                        let passText = "••••••••••";
                        let pIdx = 0;
                        let pTimer = setInterval(() => {
                            mockPassInput.value += passText[pIdx];
                            pIdx++;
                            if (pIdx === passText.length) {
                                clearInterval(pTimer);
                                mockPassInput.classList.remove('input-active');
                                appendLog("Entered text: '*********' into Password input.");
                                
                                // Click Login Button
                                setTimeout(() => {
                                    appendLog("Locating element: <span class='cmd-msg'>By.cssSelector(\"button[type='submit']\")</span>");
                                    mockLoginBtn.classList.add('clicking');
                                    appendLog("Clicking login button.");
                                    
                                    setTimeout(() => {
                                        mockLoginBtn.classList.remove('clicking');
                                        mockLogin.classList.add('hidden');
                                        mockDashboard.classList.remove('hidden');
                                        appendLog("Authentication successful. Redirected to <span class='cmd-msg'>/dashboard</span>");
                                        
                                        // Click Create Resume
                                        setTimeout(() => {
                                            appendLog("Locating element: <span class='cmd-msg'>By.xpath(\"//a[contains(text(),'Create Resume')]\")</span>");
                                            mockCreateResumeCard.classList.add('clicking');
                                            appendLog("Clicking 'Create Resume' widget.");
                                            
                                            setTimeout(() => {
                                                mockCreateResumeCard.classList.remove('clicking');
                                                mockDashboard.classList.add('hidden');
                                                mockTemplate.classList.remove('hidden');
                                                appendLog("Navigated to templates grid. Waiting for template selection view.");
                                                
                                                // Click ATS Modern Template
                                                setTimeout(() => {
                                                    appendLog("Locating element: <span class='cmd-msg'>By.className(\"template-card-ats\")</span>");
                                                    mockTemplateAts.classList.add('clicking');
                                                    appendLog("Selecting template: 'ATS Modern'");
                                                    
                                                    setTimeout(() => {
                                                        mockTemplateAts.classList.remove('clicking');
                                                        mockTemplate.classList.add('hidden');
                                                        mockEditor.classList.remove('hidden');
                                                        appendLog("Resume Editor loaded. Asserting workspace elements visible.");
                                                        
                                                        // Type Full Name
                                                        setTimeout(() => {
                                                            appendLog("Locating element: <span class='cmd-msg'>By.id(\"fullName\")</span>");
                                                            mockFullnameInput.classList.add('input-active');
                                                            let nameText = "P. Siva Phaneendra";
                                                            let nIdx = 0;
                                                            let nTimer = setInterval(() => {
                                                                mockFullnameInput.value += nameText[nIdx];
                                                                nIdx++;
                                                                if (nIdx === nameText.length) {
                                                                    clearInterval(nTimer);
                                                                    mockFullnameInput.classList.remove('input-active');
                                                                    appendLog("Entered full name: 'P. Siva Phaneendra'");
                                                                    
                                                                    // Click Save
                                                                    setTimeout(() => {
                                                                        appendLog("Locating element: <span class='cmd-msg'>By.id(\"save-resume\")</span>");
                                                                        mockSaveBtn.classList.add('clicking');
                                                                        appendLog("Triggering Save action.");
                                                                        
                                                                        setTimeout(() => {
                                                                            mockSaveBtn.classList.remove('clicking');
                                                                            mockToast.classList.remove('hidden');
                                                                            appendLog("Asserting toast confirmation alert visibility...");
                                                                            
                                                                            setTimeout(() => {
                                                                                appendLog("Assertion Passed: Toast matches expected text 'Saved Successfully'.", "pass-msg");
                                                                                appendLog("--------------------------------------------------", "sys-msg");
                                                                                appendLog("TEST RUN STATUS: PASSED", "pass-msg");
                                                                                appendLog("Generated Extent Report: <span class='cmd-msg'>target/ExtentReports/index.html</span>", "sys-msg");
                                                                                
                                                                                seleniumStatus.textContent = "PASSED";
                                                                                seleniumStatus.className = "status-indicator passed";
                                                                                runSeleniumBtn.disabled = false;
                                                                            }, 1000);
                                                                        }, 800);
                                                                    }, 1000);
                                                                }
                                                            }, 60);
                                                        }, 1000);
                                                    }, 800);
                                                }, 1200);
                                            }, 1000);
                                        }, 1200);
                                    }, 800);
                                }, 1000);
                            }
                        }, 50);
                    }, 1000);
                }
            }, 50);
        }, 1000);
    }, 1000);
});

// ==========================================================================
// TAB 2: POSTMAN API SIMULATOR
// ==========================================================================
const apiMethod = document.getElementById('api-method');
const apiEndpoint = document.getElementById('api-endpoint');
const apiRequestJson = document.getElementById('api-request-json');
const apiSendBtn = document.getElementById('api-send-btn');
const responseStatus = document.getElementById('response-status');
const responseCodeOutput = document.getElementById('response-code-output');

const apiPayloads = {
    "/api/users/profile": {
        "GET": {
            request: "{\n  \"userId\": \"usr_99832\",\n  \"action\": \"fetch_profile\"\n}",
            response: {
                status: "200 OK",
                statusClass: "res-status-success",
                body: {
                    "statusCode": 200,
                    "status": "success",
                    "data": {
                        "user": {
                            "id": "usr_99832",
                            "name": "P. Siva Phaneendra",
                            "email": "phaniphani0288@gmail.com",
                            "role": "QA Engineer Intern",
                            "location": "Bengaluru, India",
                            "experience": "1 year",
                            "joinedDate": "2025-06-01"
                        }
                    }
                }
            }
        },
        "POST": {
            request: "{\n  \"name\": \"Siva Phaneendra\",\n  \"email\": \"phaniphani0288@gmail.com\",\n  \"location\": \"Bengaluru\"\n}",
            response: {
                status: "201 Created",
                statusClass: "res-status-created",
                body: {
                    "statusCode": 201,
                    "status": "success",
                    "message": "User profile initialized successfully",
                    "id": "usr_99832",
                    "createdAt": "2026-06-12T09:44:00Z"
                }
            }
        },
        "PUT": {
            request: "{\n  \"userId\": \"usr_99832\",\n  \"skills\": [\"Java\", \"Selenium\", \"Postman\", \"SQL\", \"Python\"]\n}",
            response: {
                status: "200 OK",
                statusClass: "res-status-success",
                body: {
                    "statusCode": 200,
                    "status": "success",
                    "message": "Profile updated successfully",
                    "updatedFields": ["skills"]
                }
            }
        },
        "DELETE": {
            request: "{\n  \"userId\": \"usr_99832\"\n}",
            response: {
                status: "200 OK",
                statusClass: "res-status-success",
                body: {
                    "statusCode": 200,
                    "status": "success",
                    "message": "Profile flagged for deletion"
                }
            }
        }
    },
    "/api/resumes/save": {
        "GET": {
            request: "{\n  \"resumeId\": \"res_40912\"\n}",
            response: {
                status: "200 OK",
                statusClass: "res-status-success",
                body: {
                    "resumeId": "res_40912",
                    "template": "ats-modern",
                    "owner": "P. Siva Phaneendra",
                    "completeness": "98%"
                }
            }
        },
        "POST": {
            request: "{\n  \"templateId\": \"ats-modern\",\n  \"content\": {\n    \"name\": \"P. Siva Phaneendra\",\n    \"role\": \"QA Engineer\",\n    \"experience\": \"1 Year\"\n  }\n}",
            response: {
                status: "201 Created",
                statusClass: "res-status-created",
                body: {
                    "statusCode": 201,
                    "status": "success",
                    "resumeId": "res_40912",
                    "message": "Resume document saved successfully in MongoDB"
                }
            }
        },
        "PUT": {
            request: "{\n  \"resumeId\": \"res_40912\",\n  \"content\": {\n    \"location\": \"Bengaluru, India\"\n  }\n}",
            response: {
                status: "200 OK",
                statusClass: "res-status-success",
                body: {
                    "statusCode": 200,
                    "status": "success",
                    "message": "Resume resource updated",
                    "documentVersion": 3
                }
            }
        },
        "DELETE": {
            request: "{\n  \"resumeId\": \"res_40912\"\n}",
            response: {
                status: "200 OK",
                statusClass: "res-status-success",
                body: {
                    "statusCode": 200,
                    "message": "Resume record deleted from datastore"
                }
            }
        }
    },
    "/api/interviews/evaluate": {
        "POST": {
            request: "{\n  \"candidateName\": \"P. Siva Phaneendra\",\n  \"module\": \"Selenium UI Automation\",\n  \"answersCount\": 12\n}",
            response: {
                status: "200 OK",
                statusClass: "res-status-success",
                body: {
                    "status": "evaluated",
                    "score": 92,
                    "passed": true,
                    "feedback": "Excellent conceptual knowledge of locators (XPath, CSS selectors) and handling WebElements/Alerts."
                }
            }
        },
        "GET": {
            request: "{}",
            response: {
                status: "400 Bad Request",
                statusClass: "res-status-error",
                body: {
                    "error": "Bad Request",
                    "message": "Required body payload candidateName is missing"
                }
            }
        },
        "PUT": {
            request: "{}",
            response: {
                status: "405 Method Not Allowed",
                statusClass: "res-status-error",
                body: {
                    "error": "Method Not Allowed",
                    "message": "PUT is not allowed on /api/interviews/evaluate"
                }
            }
        },
        "DELETE": {
            request: "{}",
            response: {
                status: "405 Method Not Allowed",
                statusClass: "res-status-error",
                body: {
                    "error": "Method Not Allowed",
                    "message": "DELETE is not allowed on /api/interviews/evaluate"
                }
            }
        }
    },
    "/api/jobs/ats-score": {
        "POST": {
            request: "{\n  \"resumeId\": \"res_40912\",\n  \"jobDescription\": \"QA Engineer position with skills in Java, Selenium, API testing, and SQL. Agile/Scrum testing experience is required.\"\n}",
            response: {
                status: "200 OK",
                statusClass: "res-status-success",
                body: {
                    "atsScore": 95,
                    "matchingKeywords": [
                        "QA Engineer",
                        "Java",
                        "Selenium",
                        "API testing",
                        "SQL",
                        "Agile"
                    ],
                    "recommendations": "Excellent resume match. No keyword optimization required."
                }
            }
        },
        "GET": {
            request: "{}",
            response: {
                status: "400 Bad Request",
                statusClass: "res-status-error",
                body: {
                    "error": "Bad Request",
                    "message": "Job description string required"
                }
            }
        },
        "PUT": {
            request: "{}",
            response: {
                status: "405 Method Not Allowed",
                statusClass: "res-status-error",
                body: {
                    "error": "Method Not Allowed",
                    "message": "PUT is not supported"
                }
            }
        },
        "DELETE": {
            request: "{}",
            response: {
                status: "405 Method Not Allowed",
                statusClass: "res-status-error",
                body: {
                    "error": "Method Not Allowed",
                    "message": "DELETE is not supported"
                }
            }
        }
    }
};

function updatePostmanRequest() {
    const endpoint = apiEndpoint.value;
    const method = apiMethod.value;
    if (apiPayloads[endpoint] && apiPayloads[endpoint][method]) {
        apiRequestJson.value = apiPayloads[endpoint][method].request;
    } else {
        apiRequestJson.value = "{\n  \"message\": \"Not configured\"\n}";
    }
}

apiMethod.addEventListener('change', updatePostmanRequest);
apiEndpoint.addEventListener('change', updatePostmanRequest);

apiSendBtn.addEventListener('click', () => {
    if (apiSendBtn.disabled) return;
    
    apiSendBtn.disabled = true;
    responseStatus.textContent = "Sending...";
    responseStatus.className = "res-status-idle";
    responseCodeOutput.textContent = "// Dispatched REST request to server...\n// Waiting for network handshake...";
    
    setTimeout(() => {
        const endpoint = apiEndpoint.value;
        const method = apiMethod.value;
        const config = apiPayloads[endpoint] ? apiPayloads[endpoint][method] : null;
        
        if (config) {
            responseStatus.textContent = "Status: " + config.response.status;
            responseStatus.className = config.response.statusClass;
            responseCodeOutput.textContent = JSON.stringify(config.response.body, null, 2);
        } else {
            responseStatus.textContent = "Status: 404 Not Found";
            responseStatus.className = "res-status-error";
            responseCodeOutput.textContent = JSON.stringify({
                "statusCode": 404,
                "error": "Not Found",
                "message": `Method ${method} is not mapped for ${endpoint}`
            }, null, 2);
        }
        
        apiSendBtn.disabled = false;
    }, 800);
});

// Initialize first request view
updatePostmanRequest();


// ==========================================================================
// TAB 3: JIRA BOARD SIMULATOR
// ==========================================================================
const bugModal = document.getElementById('bug-modal');
const addBugBtn = document.getElementById('add-bug-btn');
const cancelBugBtn = document.getElementById('cancel-bug-btn');
const submitBugBtn = document.getElementById('submit-bug-btn');

const todoHolder = document.getElementById('todo-holder');
const progressHolder = document.getElementById('progress-holder');
const resolvedHolder = document.getElementById('resolved-holder');

let bugCounter = 304;

function updateJiraCounts() {
    document.getElementById('todo-count').textContent = todoHolder.children.length;
    document.getElementById('progress-count').textContent = progressHolder.children.length;
    document.getElementById('resolved-count').textContent = resolvedHolder.children.length;
}

addBugBtn.addEventListener('click', () => {
    bugModal.classList.remove('hidden');
});

cancelBugBtn.addEventListener('click', () => {
    bugModal.classList.add('hidden');
    clearBugForm();
});

function clearBugForm() {
    document.getElementById('bug-summary').value = "";
    document.getElementById('bug-priority').value = "Low";
    document.getElementById('bug-module').value = "";
    document.getElementById('bug-details').value = "";
}

submitBugBtn.addEventListener('click', () => {
    const summary = document.getElementById('bug-summary').value.trim();
    const priority = document.getElementById('bug-priority').value;
    const details = document.getElementById('bug-details').value.trim();
    
    if (!summary) {
        alert("Please enter a bug summary");
        return;
    }
    
    bugCounter++;
    const bugId = `BOWIZ-${bugCounter}`;
    
    const card = document.createElement('div');
    card.className = "jira-card";
    card.id = `bug-${bugCounter}`;
    
    let priorityClass = 'p-low';
    if (priority === 'Medium') priorityClass = 'p-medium';
    else if (priority === 'High') priorityClass = 'p-high';
    else if (priority === 'Critical') priorityClass = 'p-critical';
    
    card.innerHTML = `
        <span class="bug-id">${bugId}</span>
        <span class="bug-priority ${priorityClass}">${priority}</span>
        <p class="bug-desc">${summary}</p>
        <div class="bug-actions">
            <button class="btn-verify" onclick="moveBug('${card.id}', 'in-progress')">Start Testing</button>
        </div>
    `;
    
    todoHolder.appendChild(card);
    updateJiraCounts();
    bugModal.classList.add('hidden');
    clearBugForm();
});

// Global scopes for inline onclick events
window.moveBug = function(bugId, column) {
    const card = document.getElementById(bugId);
    if (!card) return;
    
    if (column === 'in-progress') {
        const actionArea = card.querySelector('.bug-actions');
        actionArea.innerHTML = `<button class="btn-verify" onclick="verifyBugFix('${bugId}')">Retest &amp; Verify</button>`;
        progressHolder.appendChild(card);
    }
    updateJiraCounts();
};

window.verifyBugFix = function(bugId) {
    const card = document.getElementById(bugId);
    if (!card) return;
    
    const actionArea = card.querySelector('.bug-actions');
    const verifyBtn = actionArea.querySelector('button');
    
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running automated tests...`;
    
    setTimeout(() => {
        // Remove actions
        actionArea.remove();
        
        // Add check badge
        const badge = document.createElement('span');
        badge.className = "verified-badge";
        badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Retesting Passed`;
        card.appendChild(badge);
        
        // Move to resolved
        resolvedHolder.appendChild(card);
        updateJiraCounts();
    }, 1200);
};
