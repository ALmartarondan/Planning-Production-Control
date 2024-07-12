// Trae los datos de plane_station_data.json y los adapta a tactical
document.addEventListener("DOMContentLoaded", () => {
 
    fetch("plane_station_data.json")
        .then(response => response.json())
        .then(cardsData => {
 
            const dataAux = [...cardsData];
            const aircraftDelivered = cardsData.filter((card) => card?.completed);
            cardsData = dataAux.filter((card) => !card?.completed);
 
            createAircraftPlanned(cardsData.length, aircraftDelivered.length);
            createDateTable(dataAux);
            createTacticalCards(cardsData, aircraftDelivered);
 
        })
        .catch(error => console.error("Error fetching data:", error));
});
 
 
const createTacticalCards = (cardsData) => {
    const msnModal = document.getElementById('form_msn__modal');
    const modalContainer = document.getElementById('modal_msn__container');
 
    const cardSection = document.getElementById("tactical__list");
 
    cardsData.forEach((data, i) => {
 
        const card = document.createElement("div");
        card.className = "tactical_msn__card";
 
        const cardContent = document.createElement("div");
        cardContent.className = "tactical_msn__card_content";
        card.addEventListener('click', () => {
 
            modalContainer.innerHTML = `
                                <header>
                                    <div class="modal__msn">
                                        <img src="${data.flag}" class="modal__flag" alt="flag">
                                        <span class="modal__n_msn">MSN ${data.msn}</span>
                                    </div>
                                    <i id="tactical_modal__close" style="color:black;" class="fas fa-times"></i>
                                </header>`
 
            const modalClose = document.getElementById('tactical_modal__close');
            modalClose.addEventListener('click', () => msnModal.classList.remove('modal--show'));
 
            const main = document.createElement('main');
            
 
            main.innerHTML = `
                    <div >
                       <img class="form_img" src="../assets/img/msn-form.png">
                    </div>
                    `;
 

            modalContainer.appendChild(main)
 
            msnModal.classList.add('modal--show');
        })
 
        cardContent.innerHTML +=
            `<article class="tactical_msn__card_description">
            <p class="tactical_msn__msn">MSN ${data.msn}</p>
            <img class="tactical_msn__flag" src="${data.flag}" alt="flag">
            <button>Edit</button>
        </article>`
 
        card.appendChild(cardContent);
 
        cardSection.appendChild(card);
    });
}
 