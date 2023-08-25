const listElements = document.getElementsByClassName('list__button--click');

Array.from(listElements).forEach((element) => {
    element.addEventListener('click', () => {
        // Cada vez que haga click se quitara y pondra la clase arrow
        element.classList.toggle('arrow');

        let height = 0;
        let menu = element.nextElementSibling
        // este metodo sirve para coger el hermano adyacente de dicho elemento
        // en este caso seria list__show

        // menu.clientHeight sirve para saber el alto del elemento en cuestion
        // menu.scrollHeight sirve para saber el alto necesario para que dicho elemento 
        // exista sin desbordarse
        if (menu.clientHeight == '0') height = menu.scrollHeight;

        menu.style.height = `${height}px`;
    });
});


const links = document.getElementsByClassName('sidebar__link');
const reportingContent = document.getElementsByClassName('reporting__item');

Array.from(links).forEach((link, i) => {
    link.addEventListener('click', (e) => {
        Array.from(links).forEach((link, j) => {
            link.classList.remove('active');
            reportingContent[j].classList.remove('active');
        });
        e.preventDefault();
        link.classList.add('active');
        reportingContent[i].classList.add('active');
    })
});