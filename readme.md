## db
dbms = postgresql

## run
just type nodemon to start and type rs to restart

## users
user with roleno 1 is superuser
user with roleno 2 is admin who add products and approve the transaction
user with roleno 3 is regular user who do the order

## urls
register user
method = post
to => {url}/api/user/register
payload {
    customername : '',
    username : '',
    password : ''
}

# login 
method = post
to => {url}/api/auth/login
payload {
    username : '',
    password : ''
}


# add products
method = post
to => {url}/api/product/products
payload {
                productcode : '',
                productname : '',
                productcategory : '',
                batch : '',
                desc : '',
                username : '',
                created_on : '',
                current_stock : '',
                modal : '',
                sell_price : '',
                image : the-image-file
            }
on products, please input product code like initials or just code


# get products
method = get
to => {url}/api/product/products (get all data)
to => {url}/api/product/products?productid=1 (get product with id = 1)

# edit stock
method = post
to => {url}/api/product/edit-qty/:prodid
payload {
    qty : '',
    refference : '',
    desc : ''
}

# get product image
to => {url}/"product image url"
the url will and should be like "/api/product/product-image/filename.jpg as taken from db


# create products category
method = post 
to => {url}/api/product/product_categories
payload {
    category_name : ''
}


# get products category
method = get
to => {url}/api/product/product_categories (get all data)
to => {url}/api/product/product_categories/catid=1 (get category with id = 1) 

# get stash
method = get
to {url}/api/order/stash (get all data)

# post stash
method = post
to {url}/api/order/stash
payload [
    {
        "productid" : "1",
        "product_code" : "abv",
        "price" : "2000",
        "qty" : "3"
    },
    {
        "productid" : "3",
        "product_code" : "sda",
        "price" : "1500",
        "qty" : "1"
    },
    {
        "productid" : "2",
        "product_code" : "bga",
        "price" : "5000",
        "qty" : "2"
    }
]

# edit stash
-

# delete stash
method = delete
to {url}/api/order/stash/:id
this one have the id parameter

# post order
method = post
to {url}/api/order/order
payload example {
    "sending_address" : "",
    "ordered_at" : "",
    "total_price" : "",
    "detail" : [
        {
            "productid" : "1",
            "product_code" : "abv",
            "price" : "2000",
            "qty" : "3"
        },
        {
            "productid" : "3",
            "product_code" : "sda",
            "price" : "1500",
            "qty" : "1"
        },
        {
            "productid" : "2",
            "product_code" : "bga",
            "price" : "5000",
            "qty" : "2"
        }
    ]
}

# get order
method = get 
to {url}/api/order/order

# get order detail 
method = get 
to {url}/api/order/order-detail/:orderid
this one have the orderid parameter

# user confirming payment
method = post
to {url}/api/order/user-confirm-payment
payload example = {
    orderid : '12',
    image : imageupload
}

# get image receipt
method = get
to {url}/api/order/receipt-image/:imagename

# admin confirming order's payment
method = post
to {url}/api/order/admin-confirm-payment
payload example = {
    orderid : '12'
    confirmation : true/false
}
the confirmation object have to be boolean

# delete order
-

# update the delivery receipt
method = post
to {url}/api/order/insert-awb
payload {
    courier : '',
    awbno : '',
    orderid : ''
}

# edit the delivery receipt
method = post
to {url}/api/order/edit-awb
payload {
    courier : '',
    awbno : '',
    orderid : ''
}
