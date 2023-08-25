const cardContainerN3 = document.getElementById("workorder-list");

fetch("work_order_status_n3.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(station => {
            const card = document.createElement("div");
            card.classList.add("workorder__card");

            const stationName = document.createElement("h2");
            stationName.id = "stationId"
            stationName.textContent = station.station;
            card.appendChild(stationName);

            
            const cardTitle = document.createElement("h2");
            cardTitle.classList.add('workorder__title');
            card.appendChild(cardTitle);


            const flagImg = document.createElement("img");
            flagImg.src = station.flag;
            flagImg.alt = station.station;
            cardTitle.appendChild(flagImg);

            const msn = document.createElement("p");
            msn.textContent = "MSN " + station.msn;
            cardTitle.appendChild(msn);

            const grafico = document.createElement("img");
            grafico.id = "imgGrafico";
            grafico.src = station.grafico;
            grafico.alt = station.station;
            card.appendChild(grafico);


            const cardContent = document.createElement("div");
            cardContent.classList.add("workorder__content");
            card.appendChild(cardContent);

            const nCannibalizations = document.createElement("p");
            nCannibalizations.textContent = "Nº Cannibalizations: " + station.nCannibalizations;
            cardContent.appendChild(nCannibalizations);

            const openCannibalization = document.createElement("p");
            openCannibalization.textContent = "Open Cannibalizations: " + station.openCannibalization;
            cardContent.appendChild(openCannibalization);

            cardContainerN3.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });