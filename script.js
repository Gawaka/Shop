window.addEventListener('DOMContentLoaded', ()=> {
    const out = document.querySelector('.out');
    const cartOut = document.querySelector('.cart');
    const selectCategory = document.querySelector('select');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const searchInp = document.querySelector('#search_inp');
    const cartBtn = document.querySelector('.cart__btn');
    const closeCart = document.querySelector('.close-btn');
    const cartModal = document.querySelector('.modal');
    const modalOut = document.querySelector('.modal_out');
    const clearCart = document.querySelector('#clear');
    const orderApply = document.querySelector('#apply');
    const thanksModalWrap = document.querySelector('.thanks_modal_wrap');
    const thanksModal = document.querySelector('.thanks_modal');
    let cartArr = [];

    let products = [];

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            products = data.map(item=> ({
                id: item.id,
                img: item.image,
                name: item.title,
                price: item.price,
                category: item.category,
                inStock: Math.random() > 0.5
            }));
            console.log(products);
            createCategories();
            renderProducts(products);
        });

    
    function createCategories() {
        const categories = ['усі', ...new Set(products.map(item => item.category))];
        selectCategory.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.innerHTML = category;
            selectCategory.append(option);
        });
    };

    function renderProducts(arr) {
        out.innerHTML = '';
        arr.forEach(product => out.append(createCard(product)));
    };

    searchInp.addEventListener('keyup', ()=> {
        out.innerHTML = '';
        products.forEach(item=> {
            const lowerCaseItem = item.name.toLocaleLowerCase();
            if (lowerCaseItem.includes(searchInp.value)) {
                out.append(createCard(item));
            }
        });
    });

    checkboxes.forEach(checkbox=> {
        checkbox.addEventListener('change', ()=> {
            if (checkbox.checked) {
                checkboxes.forEach(checkboxOther=> {
                    if (checkboxOther !== checkbox) {
                        checkboxOther.checked = false;
                    }
                });
                const showInStock = checkbox.id === 'inp1';
                const filtered = products.filter(item=> item.inStock === showInStock);
                out.innerHTML = '';
                filtered.forEach(item=> out.append(createCard(item)));
            } else {
                out.innerHTML = '';
                products.forEach(item => out.append(createCard(item)));
            }
        });
    });


    const categories = [...new Set(products.map(item=> {
        return item.category;
    }))];

    categories.forEach(item=> {
        const option = document.createElement('option');
        option.value = item;
        option.innerHTML = item;
        selectCategory.append(option);
    });

    selectCategory.addEventListener('change', () => {
        const selected = selectCategory.value;
        if (selected === 'усі') {
            renderProducts(products);
        } else {
            const filtered = products.filter(item => item.category === selected);
            renderProducts(filtered);
        }
    });

    function createCard(product) {
        const divItem = document.createElement('div');
        divItem.classList.add('item', product.inStock ? 'item--green' : 'item--red');
    
        const categoryItem = document.createElement('p');
        categoryItem.classList.add('item_category');
        categoryItem.innerHTML = `Категорія: ${product.category}`;
    
        const imgItem = document.createElement('img');
        imgItem.classList.add('item_img');
        imgItem.src = product.img;
        imgItem.alt = product.name;
    
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('item_info');
    
        const titleItem = document.createElement('h3');
        titleItem.classList.add('item_title');
        titleItem.innerHTML = product.name;
    
        const stock = document.createElement('p');
        stock.innerHTML = product.inStock ? 'В наявності' : 'Немає';
        stock.style.color = product.inStock ? 'green' : 'red';
    
        const priceItem = document.createElement('p');
        const price = document.createElement('b');
        const currency = document.createElement('span');
        price.innerHTML = product.price;
        currency.innerHTML = ' UAH';
    
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.classList.add('btns-wrapper');
    
        const addToCart = document.createElement('button');
        const buy = document.createElement('button');
        addToCart.classList.add('add_to_cart');
        buy.classList.add('buy');
        addToCart.innerHTML = 'До кошика';
        buy.innerHTML = 'Придбати';
        if (!product.inStock) {
            addToCart.style.background = 'gray';
        }
        
        addToCart.onclick = ()=> {
            if (!product.inStock) {
                return
            } else {
                cartArr.push(product);
                cartOut.innerHTML = cartArr.length;
                updateCart();
                localStorage.setItem('currentItems', JSON.stringify(cartArr.length))
            }
        }
        
        priceItem.append(price, currency);
        buttonsWrapper.append(addToCart, buy);
        infoContainer.append(titleItem, stock, priceItem, buttonsWrapper);
        divItem.append(categoryItem, imgItem, infoContainer);
    
        return divItem;
    };

    // // кількість товарів в кошику
    const savedCartLength = JSON.parse(localStorage.getItem('currentItems')) || 0;
    cartOut.innerHTML = savedCartLength;

    function createCartItem(product) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('modal_items');

        const cartItemImg = document.createElement('img');
        cartItemImg.classList.add('item_cart_img');
        cartItemImg.src = product.img;
        cartItemImg.alt = product.name;

        const cartItemTitle = document.createElement('h3');
        cartItemTitle.classList.add('item_cart_title');
        cartItemTitle.innerHTML = product.name;

        const cartItemPrice = document.createElement('span');
        cartItemPrice.classList.add('item_cart_price');
        cartItemPrice.innerHTML = `${product.price} UAH`;

        const removeItem = document.createElement('button');
        removeItem.classList.add('remove_item');
        removeItem.innerHTML = '&times;';

        cartItem.append(cartItemImg, cartItemTitle, cartItemPrice, removeItem);

        removeItem.onclick = ()=> {
            cartItem.remove();
        }

        return cartItem
    };

    function updateCart() {
        modalOut.innerHTML = '';
        cartArr.forEach(item=> {
            modalOut.append(createCartItem(item));
        });

        localStorage.setItem('product', JSON.stringify(cartArr));
    };
    
    products.forEach(item=> out.append(createCard(item)));

    console.log(products);

    function toggleCart() {
        cartModal.classList.toggle('open');
    }

    cartBtn.addEventListener('click', ()=> {
        toggleCart();
    });

    closeCart.addEventListener('click', ()=> {
        toggleCart();
    });

    function clearStorage () {
        localStorage.clear();
        modalOut.innerHTML = '';
        cartOut.innerHTML = '0';
        cartArr = [];
    }

    clearCart.addEventListener('click', ()=> {
        clearStorage();
    });

    const savedCart = localStorage.getItem('product');
    const savedCurrent = localStorage.getItem('currentItems');

    if (savedCart) {
        cartArr = JSON.parse(savedCart);
        updateCart();
    }

    if (savedCurrent) {
        cartCurrentArr = JSON.parse(savedCurrent);
    }

    orderApply.addEventListener('click', () => {
        if (cartArr.length > 0) {
            clearStorage();
            toggleCart();
            thanksModalWrap.classList.add('active');
            thanksModal.classList.add('active');
    
            setTimeout(() => {
                thanksModalWrap.classList.remove('active');
                thanksModal.classList.remove('active');
            }, 2000);
        }
    });
    
});