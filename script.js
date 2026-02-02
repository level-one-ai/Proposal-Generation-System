// ===================================================
// FORM NAVIGATION & STATE MANAGEMENT
// ===================================================

let currentPage = 1;
const totalPages = 7;

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
    
    // Problems (brief)
    formData.problem1 = formElements.problem1.value;
    formData.problem2 = formElements.problem2.value;
    formData.problem3 = formElements.problem3.value;
    formData.problem4 = formElements.problem4.value;
    
    // Detailed problems (context for AI)
    formData.detailProblem1Title = formElements.detailProblem1Title.value;
    formData.detailProblem1Context = formElements.detailProblem1Context.value;
    formData.detailProblem2Title = formElements.detailProblem2Title.value;
    formData.detailProblem2Context = formElements.detailProblem2Context.value;
    formData.detailProblem3Title = formElements.detailProblem3Title.value;
    formData.detailProblem3Context = formElements.detailProblem3Context.value;
    formData.detailProblem4Title = formElements.detailProblem4Title.value;
    formData.detailProblem4Context = formElements.detailProblem4Context.value;
    
    // Solutions (context for AI)
    formData.solution0Title = formElements.solution0Title.value;
    formData.solution0Context = formElements.solution0Context.value;
    formData.solution1Title = formElements.solution1Title.value;
    formData.solution1Context = formElements.solution1Context.value;
    formData.solution2Title = formElements.solution2Title.value;
    formData.solution2Context = formElements.solution2Context.value;
    formData.solution3Title = formElements.solution3Title.value;
    formData.solution3Context = formElements.solution3Context.value;
    formData.solution4Title = formElements.solution4Title.value || '';
    formData.solution4Context = formElements.solution4Context.value || '';
    formData.solution5Title = formElements.solution5Title.value || '';
    formData.solution5Context = formElements.solution5Context.value || '';
    
    // Milestones (context for AI)
    formData.milestone1Title = formElements.milestone1Title.value;
    formData.milestone1Date = formElements.milestone1Date.value;
    formData.milestone1Context = formElements.milestone1Context.value;
    
    formData.milestone2Title = formElements.milestone2Title.value;
    formData.milestone2Date = formElements.milestone2Date.value;
    formData.milestone2Context = formElements.milestone2Context.value;
    
    formData.milestone3Title = formElements.milestone3Title.value;
    formData.milestone3Date = formElements.milestone3Date.value;
    formData.milestone3Context = formElements.milestone3Context.value;
    
    formData.milestone4Title = formElements.milestone4Title.value;
    formData.milestone4Date = formElements.milestone4Date.value;
    formData.milestone4Context = formElements.milestone4Context.value;
    
    formData.milestone5Title = formElements.milestone5Title.value;
    formData.milestone5Date = formElements.milestone5Date.value;
    formData.milestone5Context = formElements.milestone5Context.value;
    
    formData.milestone6Title = formElements.milestone6Title.value;
    formData.milestone6Date = formElements.milestone6Date.value;
    formData.milestone6Context = formElements.milestone6Context.value;
    
    // Investment details
    formData.depositPercentage = formElements.depositPercentage.value;
    formData.depositAmount = formElements.depositAmount.value;
    formData.depositCoversTitle = formElements.depositCoversTitle.value;
    formData.depositIncludes = formElements.depositIncludes.value; // Will be split by AI into 5 items
    
    formData.remainingPercentage = formElements.remainingPercentage.value;
    formData.remainingAmount = formElements.remainingAmount.value;
    formData.remainingCoversTitle = formElements.remainingCoversTitle.value;
    formData.remainingIncludes = formElements.remainingIncludes.value; // Will be split by AI into 4 items
    
    formData.milestone3Payment = formElements.milestone3Payment.value;
    formData.milestone3Amount = formElements.milestone3Amount.value;
    formData.milestone4Payment = formElements.milestone4Payment.value;
    formData.milestone4Amount = formElements.milestone4Amount.value;
    formData.milestone56Payment = formElements.milestone56Payment.value;
    formData.milestone56Amount = formElements.milestone56Amount.value;
    
    formData.projectTotal = formElements.projectTotal.value;
    
    // Optional fields
    formData.platform1Name = formElements.platform1Name.value || '';
    formData.platform1Price = formElements.platform1Price.value || '';
    formData.platform2Name = formElements.platform2Name.value || '';
    formData.platform2Price = formElements.platform2Price.value || '';
    formData.paymentStructure = formElements.paymentStructure.value || '';
    formData.milestoneSignoff = formElements.milestoneSignoff.value || '';
    
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
