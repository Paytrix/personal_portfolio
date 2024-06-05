const welcomeSection = document.getElementById("welcome-section");
const projectSection = document.getElementById("projects");
const contactSection = document.getElementById("contact");
const $aboutLink = $("#a-about");
const $projectsLink = $("#a-projects");
const $contactLink = $("#a-contact");
const $aboutAvatar = $("#about-avatar");

const $welcomeSection = $('#welcome-section');
const $projectSection = $('#projects');
const $contactSection = $('#contact');

const $sections = [
$welcomeSection,
$projectSection,
$contactSection
]

const isInHeightViewport = element => {
const top = element.getBoundingClientRect().top - 70;
const bottom = element.getBoundingClientRect().bottom - 70;
const vHeight = window.innerHeight - 70;

return (
    (top > 0 || bottom > 50) &&
    top < vHeight
);
}

const addActiveSelection = () => {
let visiblePixels = [];

$sections.forEach((el, index) => {
    var elH = el.outerHeight(),
    h = $(window).height(),
    r = el[0].getBoundingClientRect(), t=r.top, b=r.bottom;

    visiblePixels.push(Math.max(0, t>0? Math.min(elH, h-t) : Math.min(b, h)));
})

switch (visiblePixels.indexOf(Math.max(...visiblePixels))) {
    case 0:
    $aboutLink.addClass("active-selection");
    $projectsLink.removeClass("active-selection");
    $contactLink.removeClass("active-selection");
    break;

    case 1:
    $aboutLink.removeClass("active-selection");
    $projectsLink.addClass("active-selection");
    $contactLink.removeClass("active-selection");
    break;
    
    case 2:
    $aboutLink.removeClass("active-selection");
    $projectsLink.removeClass("active-selection");
    $contactLink.addClass("active-selection");
    break;
}
}

const calcAndUpdateViewport = () => {
    const top = (welcomeSection.getBoundingClientRect().top - 70) + ((window.innerHeight - 70) / 2) + 94/2;

    if (isInHeightViewport(welcomeSection)) {
    document.documentElement.style.setProperty('--alphaChannel', 0);
    document.documentElement.style.setProperty('--positionTop', `${top}px`)
    } else {
        document.documentElement.style.setProperty('--alphaChannel', 100);
    }
    addActiveSelection();

    if (isInHeightViewport(welcomeSection) && (window.scrollY = 0)) {
    $aboutAvatar.removeClass("about-avatar-moveCenter");
    $aboutAvatar.addClass("about-avatar-moveBottom");
    } 
}


["scroll", "resize"].forEach((evt) => {
    window.addEventListener(evt, calcAndUpdateViewport)
})