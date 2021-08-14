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

let index, size, value, amount, price = 0;
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
            <div class="close-container">
                        <svg id="close" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </div>
            <div class="modal-content">
                <div class="flavor">                    
                    <img src="${flavor.img}" >
                </div>
                <div class="aside"> 
                    
                    <h1>${flavor.name}</h1>
                    <p>${flavor.description}</p>
                    <div class="size">
                        <a id="00" class="size01" >Pequeno<span id="00" class="slice"> 4</span></a>
                        <a id="01" class="size02" >Normal<span id="01" class="slice"> 6</span></a>
                        <a id="02" class="size03" >Grande<span class="slice"> 8</span></a>
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

        Modal.size()
        Modal.price(amount = 1)
        document.getElementById('close').addEventListener('click', Modal.close);
        document.querySelector('.minus').addEventListener('click', Modal.decrease);
        document.querySelector('.plus').addEventListener('click', Modal.increase);
        document.querySelector('.addTo').addEventListener('click', Cart.addTo);
        document.querySelector('.size01').addEventListener('click', Modal.size);
        document.querySelector('.size02').addEventListener('click', Modal.size);
        document.querySelector('.size03').addEventListener('click', Modal.size);



    },

    size(event) {
        let x;
        if (event == undefined) {
            x = "01"
        } else {
            x = event.target.id;
        }
        switch (x) {
            case "00":
                document.getElementById('01').classList.remove('active');
                document.getElementById('02').classList.remove('active');
                document.getElementById(x).classList.add('active');

            case "01":
                document.getElementById('00').classList.remove('active');
                document.getElementById('02').classList.remove('active');
                document.getElementById(x).classList.add('active');



            case "02":
                document.getElementById('00').classList.remove('active');
                document.getElementById('01').classList.remove('active');
                document.getElementById(x).classList.add('active');



        }

        return size = x, Modal.price(amount);

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
        if (amount == undefined) amount = "01";
        value = pizzaJson[index].price.toFixed(2);
        let price = (value * amount).toFixed(2);
        value = price.toString();
        document.querySelector('#price').innerHTML = value;
        return dataCart(amount, index, size), amount;
    },

    close() {
        document.querySelector('.modal').style.display = "none";
    }
}

let cart;
let queue = [];
function dataCart(amount, index, size) {
    cart = [index, amount, size];

    return cart;
}


const Cart = {

    open() {
        let hidden = document.querySelector('.cart-container');

        hidden.style.display = "flex";
        document.querySelector('.cart-container').innerHTML = `
            <div class="cart-content">
                <h2>Meu Carrinho</h2>
                <div class="cart-products">
                </div>
                <div >
                    <h3>Total: R$<span class="cart-total"></span></h3> </h3>
                </div>
                <div class="finish">
                    <button type="button" class="buy">Finalizar pedido</button>
                </div>

            </div>
        `
        queue.forEach(products => {
            let product = document.createElement('DIV');
            product.classList.add('products')
            product.setAttribute('id', products.id);
            product.innerHTML = `
                <h3>${pizzaJson[products.id].name} </h3>
                <h4 name="amount">${products.amount}</h4>
                <h4 name="size">${pizzaJson[products.id].sizes[parseInt(products.size)]}</h4>
                <div class="remove-cart" >
                    <svg id="${products.identifier}"class="remove" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path id="${products.identifier}" d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                </div>
            `
            price = parseFloat(products.value);
            document.querySelector('.cart-products').appendChild(product);

            total();

        });

        document.querySelector('.cart').removeEventListener('click', Cart.open)
        document.querySelector('.cart').addEventListener('click', Cart.close)
        document.querySelector('.finish').addEventListener('click', () => {
            alert("Obrigado pela compra, Bom apetite");
            window.location.reload();
        })

        let remove = document.querySelectorAll('.remove');
        for (const key of remove) {
            key.addEventListener('click', Cart.removeFrom);
        }

    },
    close() {
        document.querySelector('.cart-container').style.display = "none";
        document.querySelector('.cart').removeEventListener('click', Cart.close);
        document.querySelector('.cart').addEventListener('click', Cart.open);
    },

    addTo() {
        let identifier = cart[0] + '@' + cart[2];
        amount = cart[1];
        let key = queue.findIndex((item) => item.identifier == identifier);
        let cartItem = {
            identifier: identifier,
            id: cart[0],
            value: pizzaJson[cart[0]].price,
            amount: parseInt(cart[1]),
            size: cart[2]
        };
        if (key > -1) {
            queue[key].amount += parseInt(amount);
        } else {
            queue.push(cartItem);
        }

        document.querySelector('.hidden').style.opacity = "1"
        return queue, Modal.close();
    },

    removeFrom(event) {
        let itemId = (event.target.id);
        let item = queue.findIndex((item) => item.identifier == itemId);

        if (queue[item].amount > 1) {
            queue[item].amount -= 1;
        } else {
            queue.splice(item, 1);
            if (!queue.length) {
                document.querySelector('.hidden').style.opacity = "0";
                alert("Carrinho vazio, continue comprando !!");                
            }
        }
        Cart.open();
        total();
    }
}

function total() {
    let total = 0;
    for (const key in queue) {
        if (queue.length > 0) {
            let item = queue.find((item) => item.id == queue[key].id);
            total += parseFloat(item.value) * item.amount;

        }
    }
    total = total.toFixed(2);
    document.querySelector(".cart-total").innerHTML = total;

}

document.querySelector('.content').addEventListener('click', Cart.close)
document.querySelector('.cart').addEventListener('click', Cart.open)



//var index = Array.prototype.slice.call(el.parentElement.children).indexOf(el)
