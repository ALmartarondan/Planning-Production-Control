const body = document.getElementsByTagName('body')[0];
const navbar = document.createElement('nav');

navbar.className = "nav initial"
navbar.id = navbar;
navbar.innerHTML += `
        <section>
            <img id="alten_logo" class="nav__logo--initial" src="/assets/img/webp_img/logos/ALTEN_logo.webp" alt="Alten">
            <div class="nav__divider"></div>
            <p class="nav__title">Planning & Production Control</p>
        </section>

        <section>
            <i id="sun-icon" class="fa-solid fa-sun"></i>
            <a href="#" style="display: flex; align-items: center;"><img id="airbus_logo" class="nav__airbus_logo"
                src="/assets/img/webp_img/logos/airbus/Airbus-Logo_2.webp" alt="airbus"></a>
        </section>`;

body.appendChild(navbar);

if(location.href.includes("indicator.html")) {
    navbar.className = "nav__indicator initial";
} else {
    navbar.className = "nav initial";
}