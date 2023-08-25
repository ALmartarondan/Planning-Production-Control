const cardContainer = document.getElementById("aircraft-list");

fetch("aircraft_status_n4.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(station => {
            const card = document.createElement("div");
            card.classList.add("aircraft__card");


            const stationName = document.createElement("h2");
            stationName.textContent = station.station;
            card.appendChild(stationName);

            const subtitle = document.createElement("div");
            subtitle.classList.add("aircraft__subtitle");
            card.appendChild(subtitle);

            const flagImg = document.createElement("img");
            flagImg.src = station.flag;
            flagImg.alt = station.station;
            subtitle.appendChild(flagImg);

            const msn = document.createElement("p");
            msn.textContent = "MSN: " + station.msn;
            subtitle.appendChild(msn);


            const cardContent = document.createElement("div");
            cardContent.classList.add("aircraft__content");

            cardContent.innerHTML = `
                <div class="aircraft__fal">
                    <div>
                        <p>FAL Real:</p>
                        <p style="color:${station.falColor}">${station.fal_real}</p>
                    </div>
                    <div>
                        <p>FAL Theoretical:</p>
                        <p>${station.fal_theorical}</p>
                    </div>
                </div>
                <div class="aircraft__st">
                    <div>
                        <p>ST Real:</p>
                        <p style="color:${station.stColor}">${station.st_real}</p>
                    </div>
                    <div>
                        <p>ST Theoretical:</p>
                        <p>${station.st_theorical}</p>
                    </div>
                </div>`;

            card.appendChild(cardContent);
            // const falReal = document.createElement("p");
            // falReal.textContent = "FAL Real: " + station.fal_real;
            // cardContent.appendChild(falReal);

            // const stReal = document.createElement("p");
            // stReal.textContent = "ST Real: " + station.st_real;
            // cardContent.appendChild(stReal);

            // const falTheorical = document.createElement("p");
            // falTheorical.textContent = "FAL Theoretical: " + station.fal_theorical;
            // cardContent.appendChild(falTheorical);

            // const stTheorical = document.createElement("p");
            // stTheorical.textContent = "ST Theoretical: " + station.st_theorical;
            // cardContent.appendChild(stTheorical);

            cardContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });