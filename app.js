var resumeForm = document.getElementById('resumeForm');
var resumeSection = document.getElementById('resumeSection');
var generatedResume = document.getElementById('generatedResume');
var editResumeButton = document.getElementById('editResume');
var downloadPDFButton = document.getElementById('downloadPDF');
var isEditable = false;
resumeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Fetch form input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    // Generate Resume HTML
    var resumeHTML = "\n        <div contenteditable=\"true\">\n            <h3>Personal Information</h3>\n            <p><strong>Name:</strong> ".concat(name, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <p><strong>Address:</strong> ").concat(address, "</p>\n            \n            <h3>Education</h3>\n            <p>").concat(education.replace(/\n/g, "<br>"), "</p>\n            \n            <h3>Skills</h3>\n            <p>").concat(skills.replace(/\n/g, "<br>"), "</p>\n            \n            <h3>Work Experience</h3>\n            <p>").concat(experience.replace(/\n/g, "<br>"), "</p>\n        </div>\n    ");
    // Update resume content
    generatedResume.innerHTML = resumeHTML;
    // Show the resume section
    resumeSection.style.display = 'block';
    // Set initial state of edit mode (disabled)
    generatedResume.setAttribute('contenteditable', 'false');
    isEditable = false;
});
editResumeButton.addEventListener('click', function () {
    // Toggle contenteditable state for the resume
    isEditable = !isEditable;
    generatedResume.setAttribute('contenteditable', isEditable.toString());
    // Update button text based on edit state
    editResumeButton.textContent = isEditable ? 'Disable Edit' : 'Enable Edit';
});
downloadPDFButton.addEventListener('click', function () {
    // Convert the generated resume to a PDF using html2pdf.js
    var element = document.getElementById('generatedResume');
    var options = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
});
// Generate Unique URL for the User
function generateUniqueURL(username) {
    var uniqueUrl = "".concat(username, ".vercel.app/resume");
    return uniqueUrl;
}
// Share Link Logic
var shareButton = document.getElementById('share-link');
shareButton.addEventListener('click', function () {
    var username = 'Iffat ul Fatima'; // Fetch the username dynamically as per your logic
    var uniqueUrl = generateUniqueURL(username);
    alert("Share this URL: ".concat(uniqueUrl));
});
