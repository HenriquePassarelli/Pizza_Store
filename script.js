import pizzaJson from "./pizzas.js";


pizzaJson.forEach(pizza => {
    let container = document.createElement('DIV');
    container.setAttribute('id', pizza.id);
    container.setAttribute('class', 'pizza');
    container.addEventListener('click', getPizza);
    let img = document.createElement("IMG");
    img.setAttribute('src', pizza.img);
    img.setAttribute('id', pizza.id);
    img.setAttribute('class', 'pizza-image')
    let description = document.createElement("DIV");
    description.setAttribute('class', 'pizza-description');
    description.innerHTML = ` 

    <svg id="${pizza.id}"xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
    <h3> R$ ${pizza.price.toFixed(2)}</h3>
    <h2>${pizza.name}</h2>
    <p>${pizza.description}
    
    `;

    container.appendChild(img);
    container.appendChild(description);
    document.querySelector(".content").appendChild(container);

});

function getPizza(event) {
    let pizzaId = (event.target.id) - 1;
    return Pizza.modal(pizzaId);
}

const Pizza = {

    modal(index) {
        let flavor = pizzaJson[index];
        let modal = document.querySelector('.modal');
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-container">
            <div class="flavor">
                
                <img src="${flavor.img}" >
            </div>
            <div class="aside"> 
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                </div>
                <h1>${flavor.name}</h1>
                <p>${flavor.description}</p>
                <div class="size">
                    <a>Small</a>
                    <a>Regular</a>
                    <a>Large</a>

                </div>
                <div class="price">
                    <h2>${flavor.price}</h2>
                </div>
            
            </div>
            </div>
        `

        console.log(pizzaJson[index]);

    }
}
