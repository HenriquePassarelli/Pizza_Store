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
let index;
function getPizza(event) {
    let pizzaId = (event.target.id) - 1;
    index = pizzaId;
    return Modal.open(pizzaId), index;
}

const Modal = {

    open(index) {
        let flavor = pizzaJson[index];
        let modal = document.querySelector('.modal');
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-container">
                <div class="flavor">                    
                    <img src="${flavor.img}" >
                </div>
                <div class="aside"> 
                    <div class="close-container">
                        <svg id="close" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    </div>
                    <h1>${flavor.name}</h1>
                    <p>${flavor.description}</p>
                    <div class="size">
                        <a id="size01" >Small</a>
                        <a id="size02">Regular</a>
                        <a id="size03">Large</a>

                    </div>
                    <div class="price">
                        <h2 >R$ <span id="price">${flavor.price.toFixed(2)}</span></h2>
                        <div class="amount-container">
                            <svg class="minus" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>
                            <span class="amount" value="01">01</span>
                            <svg class="plus" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                        </div>
                    </div>
                    <div class="addTo">
                        <a id="addTo">Adicionar ao carrinho</a>
                    </div>
                
                </div>
            </div>
        `

        document.getElementById('close').addEventListener('click', Modal.close);
        document.querySelector('.minus').addEventListener('click', Modal.decrease);
        document.querySelector('.plus').addEventListener('click', Modal.increase);

    },

    increase() {
        let element = document.querySelector('.amount');
        let value = parseInt(element.innerHTML);
        value += 1;
        if (value < 10) {
            value = "0" + value;
        }
        element.innerHTML = value.toString();
        Modal.price(value);
    },

    decrease() {
        let element = document.querySelector('.amount');
        let value = parseInt(element.innerHTML);
        if (value <= 1) {
            value = 1;
        } else {
            value -= 1;
        }

        if (value < 10) {
            value = "0" + value;
        }
        element.innerHTML = value.toString();
        Modal.price(value);
    },

    price(amount) {
        let value = pizzaJson[index].price.toFixed(2);
        let price = (value * amount).toFixed(2);
        value = price.toString();
        document.querySelector('#price').innerHTML = value;
        console.log(value);
    },

    close() {
        document.querySelector('.modal').style.display = "none";
    }
}

const Cart = {

    addTo() {

    },

    removeFrom() {

    }
}