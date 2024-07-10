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
 
 
const createTacticalCards = (cardsData, aircraftDelivered) => {
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
                                    <span class="modal__date">${data.cardDate}</span>
                                    <span class="modal__title">${data.station}</span>
                                    <div class="modal__msn">
                                        <img src="${data.flag}" class="modal__flag" alt="flag">
                                        <span class="modal__n_msn">MSN ${data.msn}</span>
                                    </div>
                                    <i id="tactical_modal__close" class="fas fa-times"></i>
                                </header>`
 
            const modalClose = document.getElementById('tactical_modal__close');
            modalClose.addEventListener('click', () => msnModal.classList.remove('modal--show'));
 
            const main = document.createElement('main');
            data?.delivery == false
                ? main.className = 'modal__content'
                : main.className = 'modal__content delivery';
 
            main.innerHTML = `
                    <div class="modal__start_end_date">
                        <p>ST Start date</p>
                        <span>${data.startDate}</span>
                        <p>ST Finish Date</p>
                        <span>${data.endDate}</span>
                        <p>WD next station change</p>
                        <span>${data.nextStation}</span>
                    </div>
                    `;
 
            const modal1 = `
                        <div>
                            <div>
                                <span>AC Progress - Station</span>
                                <img src="${data.acProgress}">
                            </div>
 
                            <div>
                                <span>Missing parts</span>
                                <img src="${data.missingParts}">
                            </div>
                        </div>
 
                        <div>
                             <div>
                                <span>Work Order Status</span>
                                <img src="${data.workOrder}">
                            </div>
 
                            <div>
                                <span>Efficiency</span>
                                <img src="${data.efficiency}">
                            </div>
                         </div>
 
                        <div>
                            <div>
                                <span>Open No Conformities & warnings</span>
                                <img src="${data.noConforAndWarning}">
                            </div>
 
                            <div>
                                <span>ERC & Remarks</span>
                                <img src="${data.ercRemarks}">
                            </div>
                        </div>`
 
            const modal2 = `
                        <div>
                            <div>
                                <span>AC Progress - Station</span>
                                <img src="${data.acProgress}">
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Flight line - test</span>
                                <img src="${data.fl_test}">
                            </div>
                        </div>
 
                        <div>
                            <div>
                                <span>flights</span>
                                <img src="${data.flights}">
                            </div>
 
                            <div>
                                <span>hand over</span>
                                <img src="${data.handOver}">
                            </div>
                        </div>
 
                        <div>
                            <div>
                                <span>Open No Conformities & Remarks</span>
                                <img src="${data.noConforAndRemarks}">
                            </div>
 
                            <div>
                                <span>TBL</span>
                                <img src="${data.tbl}">
                            </div>
                        </div>`
 
            data?.delivery == false
                ? main.innerHTML += modal1
                : main.innerHTML += modal2;
 
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
 