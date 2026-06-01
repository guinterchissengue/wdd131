const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {

    navMenu.classList.toggle("hidden");

    const expanded =
        hamburger.getAttribute("aria-expanded") === "true";

    hamburger.setAttribute(
        "aria-expanded",
        !expanded
    );
});

document.getElementById("year").textContent =
new Date().getFullYear();

document.getElementById("lastModified").textContent =
document.lastModified;

const temples = [

{
name:"Salt Lake Temple",
location:"Utah, USA",
dedicated:"1893",
area:253000,
image:"images/salt-lake-temple.jpg"
},

{
name:"Laie Hawaii Temple",
location:"Hawaii, USA",
dedicated:"1919",
area:42100,
image:"images/laie-hawaii-temple.jpg"
},

{
name:"Accra Ghana Temple",
location:"Ghana",
dedicated:"2004",
area:17500,
image:"images/accra-ghana-temple.jpg"
},

{
name:"Rome Italy Temple",
location:"Italy",
dedicated:"2019",
area:41000,
image:"images/rome-italy-temple.jpg"
},

{
name:"Paris France Temple",
location:"France",
dedicated:"2017",
area:44000,
image:"images/paris-france-temple.jpg"
},

{
name:"Columbus Ohio Temple",
location:"Ohio, USA",
dedicated:"1999",
area:11000,
image:"images/columbus-ohio-temple.jpg"
},

{
name:"Fortaleza Brazil Temple",
location:"Brazil",
dedicated:"2019",
area:36000,
image:"images/fortaleza-brazil-temple.jpg"
},

{
name:"Nauvoo Temple",
location:"Illinois, USA",
dedicated:"2002",
area:54000,
image:"images/nauvoo-temple.jpg"
},

{
name:"Manti Temple",
location:"Utah, USA",
dedicated:"1888",
area:74792,
image:"images/manti-temple.jpg"
},

{
name:"Madrid Spain Temple",
location:"Spain",
dedicated:"2022",
area:28000,
image:"images/madrid-spain-temple.jpg"
}

];

const container =
document.getElementById("temple-container");

function displayTemples(filteredTemples){

    container.innerHTML = "";

    filteredTemples.forEach(temple => {

        const card = document.createElement("figure");

        card.innerHTML = `
            <img
                src="${temple.image}"
                alt="${temple.name}"
                loading="lazy">

            <figcaption>
                <h3>${temple.name}</h3>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </figcaption>
        `;

        container.appendChild(card);
    });
}

document.getElementById("home")
.addEventListener("click",(e)=>{
    e.preventDefault();
    displayTemples(temples);
});

document.getElementById("old")
.addEventListener("click",(e)=>{
    e.preventDefault();

    displayTemples(
        temples.filter(
            temple => Number(temple.dedicated) < 1900
        )
    );
});

document.getElementById("new")
.addEventListener("click",(e)=>{
    e.preventDefault();

    displayTemples(
        temples.filter(
            temple => Number(temple.dedicated) > 2000
        )
    );
});

document.getElementById("large")
.addEventListener("click",(e)=>{
    e.preventDefault();

    displayTemples(
        temples.filter(
            temple => temple.area > 90000
        )
    );
});

document.getElementById("small")
.addEventListener("click",(e)=>{
    e.preventDefault();

    displayTemples(
        temples.filter(
            temple => temple.area < 10000
        )
    );
});

displayTemples(temples);