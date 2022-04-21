
const itemsDisplay = document.querySelector('.items')
const itemDisplay = document.querySelector('.item')
const cartItemsDOM = document.querySelector('#cart-items')

const cardsContainer = document.querySelector('.cards')

let cartItems = [];

const getItems = async () => {
    const response = await fetch('data.json')
    const data = await response.json()
    return data
}

const showItem = (data) => {

    //     <div class="card">
    //     <img src="img/img1.jpg    " alt="" id="image" />
    //     <h1 id="title">Nike</h1>
    //     <p class="price">Rs. 2500</p>
    //     <button>Add to cart</button>
    //   </div>

    data.forEach((element, index) => {
        const { title, image, price } = element
        const card = document.createElement("div")
        const titleSpace = document.createElement("h1")
        const priceSpace = document.createElement("p")
        const imageSpace = document.createElement("img")
        const button = document.createElement("button")

        card.classList.add('card')
        titleSpace.classList.add('title')
        priceSpace.classList.add('price')
        imageSpace.classList.add('image')
        imageSpace.setAttribute('src', image)
        button.innerText = 'Add to cart'
        button.setAttribute('onClick', `addToCart({id:'${index}',title: '${title}',price: '${price}',image: '${image}' })`)

        titleSpace.innerText = title
        priceSpace.innerText = `Rs. ${price}`

        card.appendChild(imageSpace)
        card.appendChild(titleSpace)
        card.appendChild(priceSpace)
        card.appendChild(button)

        cardsContainer.appendChild(card)
    });
}

const addToCart = (item) => {

    cartItems.push(item)
    cartItemsDOM.innerHTML = ''

    cartItems.forEach(item => {
        showCartItem(item)
    })

}

const showCartItem = ({ title, price, image }) => {
    const tableRow = document.createElement('tr')

    const imageTd = document.createElement('td')
    const imageDisplay = document.createElement('img')
    imageDisplay.setAttribute("src", image)
    imageDisplay.classList.add('imageCart')

    const titleTd = document.createElement('td')
    const priceTd = document.createElement('td')
    const quantityTd = document.createElement('td')
    const inputQuantity = document.createElement('input')
    inputQuantity.setAttribute('type', 'number')

    imageTd.appendChild(imageDisplay)
    titleTd.innerText = title
    priceTd.innerText = price
    quantityTd.appendChild(inputQuantity)

    tableRow.appendChild(imageTd)
    tableRow.appendChild(titleTd)
    tableRow.appendChild(priceTd)
    tableRow.appendChild(quantityTd)
    cartItemsDOM.appendChild(tableRow)

}
getItems()
    .then(data => {

        showItem(data)
    })
    .catch(error => console.log('Something went wrong', error))