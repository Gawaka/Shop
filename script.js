
    const products = [
        {
            id: 1,
            img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/s/m/sm-a366_galaxy_a36_5g_awesome_black_front.jpg/f_auto",
            name: "Смартфон Samsung Galaxy A54",
            price: 12999,
            category: "Електроніка",
            inStock: true
        },
        {
            id: 2,
            img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/l/e/lenovo_ideapad_3_15iau7_82rk012lra_arctic_grey_1__1_1.jpg/f_auto",
            name: "Ноутбук Lenovo IdeaPad 3",
            price: 20999,
            category: "Електроніка",
            inStock: false
        },
        {
            id: 3,
            img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/i/m/img_2742.jpg/f_auto",
            name: "Навушники JBL Tune 510BT",
            price: 1499,
            category: "Аудіо",
            inStock: true
        },
        {
            id: 4,
            img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/2/2/22467564_wgb24400ua_stp_def.jpg/f_auto",
            name: "Пральна машина Bosch",
            price: 48999,
            category: "Побутова техніка",
            inStock: false
        },
        {
            id: 5,
            img: "https://book-ye.com.ua/upload/resize_cache/iblock/08e/520_860_1/a39bd911_8189_11e6_80c0_000c29ae1566_95abe429_2b66_11e7_80c5_000c29ae1566.jpg",
            name: "Книга 'Відьмак: Хрещення вогнем'",
            price: 399,
            category: "Книги",
            inStock: true
        },
        {
            id: 6,
            img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/l/e/lenovo_ideapad_3_15iau7_82rk012lra_arctic_grey_1__1_1.jpg/f_auto",
            name: "Ноутбук Lenovo IdeaPad 3",
            price: 20999,
            category: "Електроніка",
            inStock: false
        },
        {
            id: 7,
            img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/s/m/sm-a366_galaxy_a36_5g_awesome_black_front.jpg/f_auto",
            name: "Смартфон Samsung Galaxy A54",
            price: 12999,
            category: "Електроніка",
            inStock: true
        },
        {
            id: 8,
            img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/2/2/22467564_wgb24400ua_stp_def.jpg/f_auto",
            name: "Пральна машина Bosch",
            price: 48999,
            category: "Побутова техніка",
            inStock: true
        },
        {
            id: 9,
            img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/i/m/img_2742.jpg/f_auto",
            name: "Навушники JBL Tune 510BT",
            price: 1499,
            category: "Аудіо",
            inStock: true
        },
        {
            id: 10,
            img: "https://book-ye.com.ua/upload/resize_cache/iblock/08e/520_860_1/a39bd911_8189_11e6_80c0_000c29ae1566_95abe429_2b66_11e7_80c5_000c29ae1566.jpg",
            name: "Книга 'Відьмак: Хрещення вогнем'",
            price: 399,
            category: "Книги",
            inStock: false
        },
        {
            id: 11,
            img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/t/i/titanium_chef_baker_kvc85_594si_main.jpg/f_auto",
            name: "Кухонна машина Kenwood",
            price: 30999,
            category: "Техніка для кухні",
            inStock: false
        },
];

    const out = document.querySelector('.out');
    const cartOut = document.querySelector('.cart');
    const selectCategory = document.querySelector('select');
    const inpInStock = document.querySelector('#inp1');
    const sortButton = document.querySelector('.sort');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const searchInp = document.querySelector('#search_inp');
    const searchBtn = document.querySelector('#search_btn');
    const cartArr = [];

    searchInp.addEventListener('keyup', ()=> {
        out.innerHTML = '';
        products.forEach(item=> {
            const lowerCaseItem = item.name.toLocaleLowerCase();
            if (lowerCaseItem.includes(searchInp.value)) {
                out.append(createCard(item));
            }
        });
    });

                                        // // як це працює
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

    // checkboxes.forEach(item=> {
    //     // item.addEventListener('change', ()=> {
    //     //     if (inpInStock.checked) {
    //     //         inpOutOfStock.checked = false;
    //     //         const filteredProducts = products.filter(item=> item.inStock === true);
    //     //         out.innerHTML = '';
    //     //         filteredProducts.forEach(item=> out.append(createCard(item)));
    //     //     } else if (inpOutOfStock.checked) {
    //     //         inpInStock.checked = false;
    //     //         const filteredOutOfStock = products.filter(item=> item.inStock === false);
    //     //         out.innerHTML = '';
    //     //         filteredOutOfStock.forEach(item=> out.append(createCard(item)));
    //     //     }
    //     // });
    // });

    const categories = [...new Set(products.map(item=> {
        return item.category;
    }))];

    categories.forEach(item=> {
        const option = document.createElement('option');
        option.value = item;
        option.innerHTML = item;
        selectCategory.append(option);
    });

    selectCategory.addEventListener('change', ()=> {
        const selected = selectCategory.value;
        const filtered = products.filter(item=> item.category === selected);
        out.innerHTML = '';
        filtered.forEach(item=> out.append(createCard(item)));

        if (selected === 'усі') {
            products.forEach(item=> out.append(createCard(item)));
        };
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

        addToCart.onclick = ()=> {
            cartArr.push(product);
            cartOut.innerHTML = cartArr.length;
        }
        
        priceItem.append(price, currency);
        buttonsWrapper.append(addToCart, buy);
        infoContainer.append(titleItem, stock, priceItem, buttonsWrapper);
        divItem.append(categoryItem, imgItem, infoContainer);
    
        return divItem;
    }
    
    products.forEach(item=> out.append(createCard(item)));

    console.log(products);
