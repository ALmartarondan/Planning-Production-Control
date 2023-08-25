const body = document.getElementsByTagName('body')[0];
const navbar = document.getElementById('navbar');
const categories = document.getElementById('categories');
const footer = document.getElementById('footer');

const sunIcon = document.getElementById('sun-icon');

let components = {
    body: body,
    categories: categories,
    footer: footer
}

let initialPosition = window.scrollY;
window.addEventListener('scroll', () => {

    let displacement =  window.scrollY;

    initialPosition >= displacement
        ? navbar.style.top = '0'
        : navbar.style.top = '-100px'

    initialPosition = displacement;

    let airbus_logo = document.getElementById('airbus_logo');
    let alten_logo = document.getElementById('alten_logo');

    const logos = [
        {
            component: alten_logo,
            img1: './assets/img/webp_img/logos/ALTEN_logo.webp',
            img2: './assets/img/logos/alten-SPAIN-120x35px.svg'
        },
        {
            component: airbus_logo,
            img1: 'https://airbus.service-now.com/5433112cdb2fab4079e0125239961945.iix',
            img2: './assets/img/webp_img/logos/airbus/Logo-Airbus.webp'
        }
    ]

    let themeClass = sunIcon.className == 'fa-solid fa-sun'
        ? 'light-mode'
        : 'dark-mode';

    if ( document.documentElement.scrollTop > 20 ) {
        changeThemeMode({ navbar }, themeClass, 'initial');
        alten_logo.className = "nav__logo";
        changeLogoWithScroll(logos, false);
    } else {
        changeThemeMode({ navbar }, 'initial', themeClass);
        alten_logo.className = "nav__logo--initial";
        changeLogoWithScroll(logos, true);
    }  
})

sunIcon.addEventListener('click', () => {

    let lightTheme = sunIcon.className == 'fa-solid fa-sun'
        ? true
        : false;

    if ( lightTheme ) {
        sunIcon.className = 'fa-regular fa-sun'
        changeThemeMode(components, 'dark-mode', 'light-mode');
    } else {
        sunIcon.className = 'fa-solid fa-sun'
        changeThemeMode(components, 'light-mode', 'dark-mode');
    }
});


const changeThemeMode = (components, addClass, removeClass) => {
    for (let component of Object.values(components)) {
        component.classList.remove(removeClass);
        component.classList.add(addClass);
    }
}

const changeLogoWithScroll = (logos, dir) => {
    if ( dir ) {
        for (let logo of logos) {
            logo.component.setAttribute('src', logo.img1);
        }
    } else {
        for (let logo of logos) {
            logo.component.setAttribute('src', logo.img2);
        }
    }
     
}



