const user={
    name: 'honey',
    active: true,
    cart: [],
    purchases: []
}

//st like DB for logs
let shopHistory = []

// // //first scenario:
// //this one includes all 4 other tasks (like compose)
// console.log(purchaseItem(user, {name: 'laptop', price:344}))
// function purchaseItem(user, item){
//    return Object.assign({},user,{purchases: item})
// } 

// // //second scenario:
// //using compose(right to left)
// //because we have more than 2 funcs to pass as arguments,
// //it is better to use libraryslike lamda?!
const compose= (f,g) => (...args) =>f(g(...args));
const pipe = (f, g) => (...args) => g(f(...args));
// // it is a factory!
console.log(purchaseItem(
    emptyCart,
    buyItem,
    applyTaxToItems,
    addItemToCart
)(user, { name: 'laptop', price: 200 }))

function purchaseItem(...fns){
   return fns.reduce(compose)// or pipe
}



function addItemToCart(user,item){
    shopHistory.push(user)
    const updateCart = user.cart.concat(item)
    return Object.assign({}, user, { cart: updateCart })
}

function applyTaxToItems(user){
    shopHistory.push(user)
    //using {cart} instead of user.cart
    const {cart}= user;
    const taxRate = 1.3;
    const updatedCart = cart.map(item =>{
        return{
            name: item.name, 
            price: item.price*taxRate
        }
    })
    return Object.assign({}, user, {cart: updatedCart})
}

function buyItem(user){
    shopHistory.push(user)
    return Object.assign({}, user, {purchases: user.cart})
}

function emptyCart(user){
    shopHistory.push(user)
    return Object.assign({}, user, {cart: []} )
}

// console.log(amazonHistory)
// function refundItem()
// function getUserState()
// function goForward()
// function changeStatus()