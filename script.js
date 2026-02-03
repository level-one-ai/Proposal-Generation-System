// ===================================================
// FORM NAVIGATION & STATE MANAGEMENT
// ===================================================

let currentPage = 1;
const totalPages = 4;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    updateNavigationButtons();
    
    // Navigation button handlers
    document.getElementById('prevBtn').addEventListener('click', previousPage);
    document.getElementById('nextBtn').addEventListener('click', nextPage);
    
    // Form submission
    document.getElementById('proposalForm').addEventListener('submit', handleSubmit);
});

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const percentage = (currentPage / totalPages) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = `Step ${currentPage} of ${totalPages}`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Disable/enable previous button
    prevBtn.disabled = currentPage === 1;
    
    // Change next button text on last page
    if (currentPage === totalPages) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'flex';
    }
}

function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.form-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show current page
    const currentPageElement = document.querySelector(`[data-page="${pageNumber}"]`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }
    
    updateProgress();
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextPage() {
    if (validateCurrentPage()) {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

function validateCurrentPage() {
    const currentPageElement = document.querySelector(`[data-page="${currentPage}"]`);
    const requiredFields = currentPageElement.querySelectorAll('[required]');
    
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
            
            // Reset border color after user interacts
            field.addEventListener('input', function() {
                this.style.borderColor = '#e0e0e0';
            }, { once: true });
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields before continuing.');
    }
    
    return isValid;
}

// ===================================================
// FORM SUBMISSION & WEBHOOK
// ===================================================

async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateCurrentPage()) {
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    
    try {
        const formData = collectFormData();
        const webhookUrl = document.getElementById('webhookUrl').value;
        
        // Send to Make.com webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            // Show success modal
            showSuccessModal();
        } else {
            throw new Error('Webhook request failed');
        }
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your proposal. Please check your webhook URL and try again.');
        
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

function collectFormData() {
    const formData = {};
    
    // Collect all form fields
    const form = document.getElementById('proposalForm');
    const formElements = form.elements;
    
    // Basic fields
    formData.companyName = formElements.companyName.value;
    formData.clientName = formElements.clientName.value;
    formData.proposalTitlePrefix = formElements.proposalTitlePrefix.value;
    formData.proposalSubtitle = formElements.proposalSubtitle.value || '';
    
    // Problems and Solutions (single text blocks)
    formData.problemsText = formElements.problemsText.value;
    formData.solutionsText = formElements.solutionsText.value;
    
    // Investment details
    formData.depositPercentage = formElements.depositPercentage.value;
    formData.depositAmount = formElements.depositAmount.value;
    formData.depositContext = formElements.depositContext.value;
    
    formData.remainingPercentage = formElements.remainingPercentage.value;
    formData.remainingAmount = formElements.remainingAmount.value;
    formData.remainingContext = formElements.remainingContext.value;
    
    formData.projectTotal = formElements.projectTotal.value;
    formData.paymentStructureContext = formElements.paymentStructureContext.value || '';
    
    // Optional fields
    formData.platform1Name = formElements.platform1Name.value || '';
    formData.platform1Price = formElements.platform1Price.value || '';
    formData.platform2Name = formElements.platform2Name.value || '';
    formData.platform2Price = formElements.platform2Price.value || '';
    
    return formData;
}

// ===================================================
// SUCCESS MODAL
// ===================================================

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    
    // Reset form
    document.getElementById('proposalForm').reset();
    currentPage = 1;
    showPage(currentPage);
    
    // Reset submit button
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
}

// ===================================================
// KEYBOARD NAVIGATION
// ===================================================

document.addEventListener('keydown', function(e) {
    // Don't navigate if user is typing in a field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    // Arrow key navigation
    if (e.key === 'ArrowRight' && currentPage < totalPages) {
        nextPage();
    } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        previousPage();
    }
});
