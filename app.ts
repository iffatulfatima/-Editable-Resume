const resumeForm: HTMLFormElement = document.getElementById('resumeForm') as HTMLFormElement;
const resumeSection: HTMLElement = document.getElementById('resumeSection') as HTMLElement;
const generatedResume: HTMLElement = document.getElementById('generatedResume') as HTMLElement;
const editResumeButton: HTMLButtonElement = document.getElementById('editResume') as HTMLButtonElement;
const downloadPDFButton: HTMLButtonElement = document.getElementById('downloadPDF') as HTMLButtonElement;

let isEditable: boolean = false;

resumeForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    // Fetch form input values
    const name: string = (document.getElementById('name') as HTMLInputElement).value;
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const phone: string = (document.getElementById('phone') as HTMLInputElement).value;
    const address: string = (document.getElementById('address') as HTMLInputElement).value;
    const education: string = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills: string = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience: string = (document.getElementById('experience') as HTMLTextAreaElement).value;

    // Generate Resume HTML
    const resumeHTML = `
        <div contenteditable="true">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            
            <h3>Education</h3>
            <p>${education.replace(/\n/g, "<br>")}</p>
            
            <h3>Skills</h3>
            <p>${skills.replace(/\n/g, "<br>")}</p>
            
            <h3>Work Experience</h3>
            <p>${experience.replace(/\n/g, "<br>")}</p>
        </div>
    `;

    // Update resume content
    generatedResume.innerHTML = resumeHTML;

    // Show the resume section
    resumeSection.style.display = 'block';

    // Set initial state of edit mode (disabled)
    generatedResume.setAttribute('contenteditable', 'false');
    isEditable = false;
});

editResumeButton.addEventListener('click', () => {
    // Toggle contenteditable state for the resume
    isEditable = !isEditable;
    generatedResume.setAttribute('contenteditable', isEditable.toString());

    // Update button text based on edit state
    editResumeButton.textContent = isEditable ? 'Disable Edit' : 'Enable Edit';
});

downloadPDFButton.addEventListener('click', () => {
    // Convert the generated resume to a PDF using html2pdf.js
    const element = document.getElementById('generatedResume') as HTMLElement;
    const options = {
        margin:       0.5,
        filename:     'resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
});



// Generate Unique URL for the User
function generateUniqueURL(username: string) {
    const uniqueUrl = `${username}.vercel.app/resume`;
    return uniqueUrl;
}

// Share Link Logic
const shareButton = document.getElementById('share-link') as HTMLButtonElement;
shareButton.addEventListener('click', () => {
    const username = 'Iffat ul Fatima'; // Fetch the username dynamically as per your logic
    const uniqueUrl = generateUniqueURL(username);
    alert(`Share this URL: ${uniqueUrl}`);
});
