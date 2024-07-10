const subtabs = document.getElementsByClassName('subtabs__item');
const content = document.getElementsByClassName('content__option');

// Siendo subtabs un htmlcollection no se puede iterar como un array para ello necesitamos Array.from(subtabs)
Array.from(subtabs).forEach((tab, i) => {
    tab.addEventListener('click', () => {
        Array.from(subtabs).forEach((tab, i) => {
            tab.classList.remove('active');
            content[i].classList.remove('active');
        });
        tab.classList.add('active');
        content[i].classList.add('active');
    })
});


// Trae los datos de plane_station_data.json 
document.addEventListener("DOMContentLoaded", () => {

    fetch("plane_station_data.json")
        .then(response => response.json())
        .then(cardsData => {

            const dataAux = [...cardsData];
            const aircraftDelivered = cardsData.filter((card) => card?.completed);
            cardsData = dataAux.filter((card) => !card?.completed);

            createAircraftPlanned(cardsData.length, aircraftDelivered.length);
            createDateTable(dataAux);
            createProductionCards(cardsData, aircraftDelivered);

        })
        .catch(error => console.error("Error fetching data:", error));
});

const createProductionCards = (cardsData, aircraftDelivered) => {
    const planeModal = document.getElementById('plane__modal');
    const modalContainer = document.getElementById('modal__container');

    const cardSection = document.getElementById("production__list");

    cardsData.forEach((data, i) => {

        const card = document.createElement("div");
        card.className = "production__card";
        card.innerHTML = `<h3 class="production__station">${data.station}</h3>`

        const cardContent = document.createElement("div");
        cardContent.className = "production__card_content";

        const plane_graph = document.createElement("img");
        plane_graph.className = "production__plane_graph";
        plane_graph.src = "../assets/img/webp_img/plane_graph-removebg-preview.webp";
        plane_graph.alt = "plane_image";


        card.addEventListener('click', () => {

            modalContainer.innerHTML = `
                                <header>
                                    <span class="modal__date">${data.cardDate}</span>
                                    <span class="modal__title">${data.station}</span>
                                    <div class="modal__msn">
                                        <img src="${data.flag}" class="modal__flag" alt="flag">
                                        <span class="modal__n_msn">MSN ${data.msn}</span>
                                    </div>
                                    <i id="modal__close" class="fas fa-times"></i>
                                </header>`

            const modalClose = document.getElementById('modal__close');
            modalClose.addEventListener('click', () => planeModal.classList.remove('modal--show'));

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

            planeModal.classList.add('modal--show');
        })



        cardContent.appendChild(plane_graph);
        cardContent.innerHTML +=
            `<article class="production__card_description">
           
        </article>`

        card.appendChild(cardContent);

        cardSection.appendChild(card);

        if (data.station == 'Flight Line') {
            const deliveredCard = document.createElement("div");
            deliveredCard.className = "production__card";
            deliveredCard.innerHTML = `<h3 class="production__station">Aircraft Delivered 2023</h3>`;

            const content = document.createElement("div");
            content.className = "production__card_content delivered";
            aircraftDelivered.forEach(aircraft => {
                content.innerHTML += `
                            <div>
                                <img class="production__delivered_plane" src="../assets/img/webp_img/plane_graph-removebg-preview.webp"
                                    alt="plane_graph">
  
                                <article class="production__card_description">
                                   
                                </article>  
                            </div>`;
            });

            deliveredCard.appendChild(content);

            cardSection.appendChild(deliveredCard);
        }

    });
}