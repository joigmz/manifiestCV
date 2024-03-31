function getProfile(profile) {
    const ProfileIMG = document.getElementById("ProfileIMG");
    const profileName = document.getElementById("profileName");
    const profileTitle = document.getElementById("profileTitle");
    const profileDescription = document.getElementById("profileDescription");
    const profileLocation = document.getElementById("profileLocation");
    const profileEmail = document.getElementById("profileEmail");

    ProfileIMG.src = profile.ProfileIMG;
    profileName.textContent = profile.Name;
    profileTitle.textContent = profile.Title;
    profileDescription.textContent = profile.Description;
    profileLocation.textContent = profile.Location;
    profileEmail.textContent = profile.Email;

}

function getSocial(social) {
    const socialLinkedin= document.getElementById("socialLinkedin");

    socialLinkedin.href = social.Linkedin.URL;
    socialLinkedin.textContent = social.Linkedin.Title;

    const socialGitHub= document.getElementById("socialGitHub");
    socialGitHub.href = social.GitHub.URL;
    socialGitHub.textContent = social.GitHub.Title;

}

function educationBlock(block) {
    const div = document.createElement("div");
    const title = document.createElement("h1");
    const Institution = document.createElement("p");

    Institution.classList.add("text-neutral-600", "text-sm");

    title.textContent = block.Title;
    Institution.textContent = block.Institution;

    div.appendChild(title);
    div.appendChild(Institution);

    return div
}

function getEducation(education) {
    const educationDiv = document.getElementById("Education");

    education.forEach(block => {
        educationDiv.appendChild(educationBlock(block))
    });

}

function createSection(section) {
    const sectionsContainer = document.getElementById("sections");
    const sectionDiv = document.createElement("section");

    const h1Title = document.createElement("h1");
    h1Title.classList.add("text-2xl", "tracking-[0.3rem]");
    h1Title.textContent = section.Title;

    sectionDiv.appendChild(h1Title);
    sectionsContainer.appendChild(sectionDiv);

    return sectionDiv
}

function createBlock(block) {
    const divOuter = document.createElement("div");
    const divInner = document.createElement("div");
    const pJobTitle = document.createElement("p");
    const spanDate = document.createElement("span");
    const pDescription = document.createElement("p");
    const url = document.createElement("a");

    // Agregar clases
    divOuter.classList.add("rounded-xl", "p-3", "shadow", "border", "border-gray-50", "my-2");
    divInner.classList.add("grid");
    pJobTitle.classList.add("text-neutral-700", "font-medium");
    spanDate.classList.add("text-neutral-600", "text-xs");
    pDescription.classList.add("text-sm");
    
    if (block.URL) {
        url.classList.add("hover:text-indigo-500","w-fit")
        url.textContent = "Link del proyecto";
        url.href = block.URL;   
        url.target = "_blank";
    }

    // Agregar contenido
    pJobTitle.textContent = block.Title;
    spanDate.textContent = block.Duration;
    pDescription.textContent = block.Description;

    // Construir la estructura
    divOuter.appendChild(divInner);
    divInner.appendChild(pJobTitle);
    divInner.appendChild(spanDate);
    divInner.appendChild(pDescription);
    divInner.appendChild(url);

    return divOuter
}

function getSections(sections) {
    if (sections) {
        sections.forEach(section => {
            const sectionObject = createSection(section);
            const blocks = section.block;
            if (blocks) {
                blocks.forEach(block => {
                    sectionObject.appendChild(createBlock(block));
                });   
            }
        });
    }
}

async function getManifiest() {
    try {
        const response = await fetch('manifiest.json');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
        // Rechazar la promesa con un valor predeterminado o lanzar el error nuevamente para que se maneje externamente
        throw error;
    }   
}


function populateResume(manifiest) {    
    getProfile(manifiest.Profile);
    getSocial(manifiest.Social);
    getEducation(manifiest.Education);
    getSections(manifiest.Section);

}

async function fetchDataAndRender() {
    try {
        const manifiest = await getManifiest();
        populateResume(manifiest);

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

fetchDataAndRender();