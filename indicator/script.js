const tabs = document.getElementsByClassName('tabs__item');
const content = document.getElementsByClassName('content__option');

// Siendo tabs un htmlcollection no se puede iterar como un array para ello necesitamos Array.from(tabs)
Array.from(tabs).forEach((tab, i) => {
  tab.addEventListener('click', () => {
    // debugger
    Array.from(tabs).forEach((tab, i) => {
      tab.classList.remove('active');
      content[i].classList.remove('active');
    });
    tab.classList.add('active');
    content[i].classList.add('active');
  })
});


// Tactical

const slider = document.getElementById('gantt');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});



// Trae los datos de plane_station_data.json y los adapta a production y a masterplanning
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
      // createProgramsCards(cardsData, aircraftDelivered);

    })
    .catch(error => console.error("Error fetching data:", error));
});

// Trae los datos de programs_data.json y los adapta a programs
document.addEventListener("DOMContentLoaded", () => {

  fetch("programs_data.json")
    .then(response => response.json())
    .then(cardsData => {

      const dataAux = [...cardsData];
      const aircraftDelivered = cardsData.filter((card) => card?.completed);
      cardsData = dataAux.filter((card) => !card?.completed);

      // createAircraftPlanned(cardsData.length, aircraftDelivered.length);
      // createDateTable(dataAux);
      // createProductionCards(cardsData, aircraftDelivered);
      createProgramsCards(cardsData, aircraftDelivered);

    })
    .catch(error => console.error("Error fetching data:", error));
});

const createAircraftPlanned = (noCompleted, completed) => {
  const aircraftPlanned = document.getElementById("aircraft_planned");

  aircraftPlanned.innerHTML = `
      <div class="master__planned">
          <p>Aircraft planned to start 2023</p>
          <p>${noCompleted}</p>
      </div>
      <div class="master__planned">
          <p>Aircraft planned to Deliver 2023</p>
          <p>${completed}</p>
      </div>
  `;
}

const createDateTable = (data) => {
  const dateTable = document.getElementById("datetable");

  const table = document.createElement('table');

  table.innerHTML = `
  <tr>
    <td>
      <table>
        <tr class="master__theader">
          <th></th>
          <th>Start Date</th>
          <th>Delivery Date</th>
        </tr>
      </table>
    </td>
  </tr>`;

  const fil = document.createElement('tr');
  const col = document.createElement('td');

  data.sort((a, b) => a.msn - b.msn);

  const tableContainer = document.createElement('div');
  tableContainer.className = "master_datatable";

  const tableWihtData = document.createElement('table');

  data.forEach((item) => {
    tableWihtData.innerHTML += `
      <tr>
        <td>
          <div class="master__msn">
            <img src="${item.flag}" alt="table-flag"> 
            <p>MSN ${item.msn}</p> 
          </div>
        </td>
        <td> ${item.startDate}</td>
        <td>${item.endDate}</td>
      </tr>`
  });

  tableContainer.appendChild(tableWihtData);
  col.appendChild(tableContainer);
  fil.appendChild(col);
  table.appendChild(fil);
  dateTable.appendChild(table);
}

// Metodo que crea las tarjetas de Production
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
//descargar excel
const openExcel = document.getElementById('open-excel');
openExcel.addEventListener('click', () => {
  // const workbook = new Excel.Workbook();

  let path = "/assets/excel/";
  let arch = "MP-informe.xlsx";

  // let Libro = workbook.Open(`${path}${arch}`);
  // let Hoja = Libro.Worksheets(1);
  // Hoja.Application.Visible = true;
});

// metodo para crear las tarjetas de los programas (a400m, f8x,f10x...)
const createProgramsCards = (cardsData, aircraftDelivered) => {
  const planeModal = document.getElementById('program__modal');
  const modalContainer = document.getElementById('program_modal__container');

  const cardSection = document.getElementById("program__list");

  cardsData.forEach((data, i) => {

    const card = document.createElement("div");
    card.className = "a400m__card";
    card.innerHTML = `<h3 class="a400m__station">${data.subprogram}</h3>`

    const cardContent = document.createElement("div");
    cardContent.className = "a400m__card_content";

    const plane_graph = document.createElement("img");
    plane_graph.className = "production__plane_graph";
    plane_graph.src = "../assets/img/webp_img/plane_graph-removebg-preview.webp";
    plane_graph.alt = "plane_image";


    card.addEventListener('click', () => {

      modalContainer.innerHTML = `
                              <header>
                                  <span class="modal__date">${data.cardDate}</span>
                                  <span class="modal__title">${data.subprogram}</span>
                                  <div class="modal__msn">
                                      <img src="${data.flag}" class="modal__flag" alt="flag">
                                      <span class="modal__n_msn">MSN ${data.msn}</span>
                                  </div>
                                  <i id="program_modal__close" class="fas fa-times"></i>
                              </header>`

      const modalClose = document.getElementById('program_modal__close');
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

  });
}