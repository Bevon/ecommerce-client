export function addItem(item=[], next){
    let cart = []
    if (typeof window !== "undefined"){
        if (localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));

        }
        cart.push({
            ...item, 
            count:1
        })
        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        next()
    }
}

export function itemTotal(){
    if (typeof window !== 'undefined'){
        if ( localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0;
}

export function getCart(){
    if (typeof window !== 'undefined'){
        if ( localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

export function updateItem(productId, count){
    let cart = [];
    if (typeof window !== "undefined"){
        if (localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map(function(product, index){
            if (product._id === productId){
                cart[index].count = count
            }
            return cart;
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export function removeItem(productId){
    let cart = [];
    if (typeof window !== "undefined"){
        if (localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map(function(product, index){
            if (product._id === productId){
                cart.splice(index, 1);
            }
            return cart;
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
}