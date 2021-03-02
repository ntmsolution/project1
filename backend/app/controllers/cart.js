const Cart = require("../models/cart");
const path = require('path');
const Resize = require('../models/Resize');

exports.addcart = (req, res) => {

    const {user_id, product_id, product_price, product_qty, product_total} = req.body;
    let errors = '';

    if (!user_id) {
        errors = 'User id is required.';
    } else if (!product_id) {
        errors = 'Product id is required.';
    } else if (!product_price) {
        errors = 'Product Price is required.';
    } else if (!product_qty) {
        errors = 'Product QTY is required.';
    }

    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }
    Cart.allcartqty(user_id,product_id,(err, data) => {
        console.log(data);
       var carttotalqty = parseInt(data[0].product_qty) + parseInt(product_qty)
        console.log("cart = "+carttotalqty);
        var total = parseInt(product_price) * parseInt(carttotalqty)
        console.log("total = "+total);

        Cart.cartupdateBycartId(data[0].id,user_id,product_id, carttotalqty, total, (err, cart) => {
            if (cart) {
                res.send(
                    {
                        message: "Cart Updated successfully",
                        cartdata: cart
                    });
            } else {
                const cart = new Cart({
                    user_id: user_id,
                    product_id: product_id,
                    product_price: product_price,
                    product_qty: product_qty,
                    product_total: total
                });

                console.log(cart);

                Cart.addcart(cart, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Cart."
                        });
                    else res.send(
                        {
                            message: "Cart Added successfully",
                            cartdata: data
                        });
                });
            }
        });
    });
};

exports.allcart = (req, res) => {

    var page = req.body.pages

    var pages = parseInt(page);

    var limit = '2';

    if (pages == '') {
        pages = 1;
        sp = 0;
    } else {
        pages = pages;
        sp = (pages - 1) * limit;
    }

    Cart.allcart((err, data) => {
        console.log(data.length);
        var getcount = data.length;
        var totalpage = Math.ceil(getcount / limit);

        Cart.allcartpage(sp, limit, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Cart."
                });
            else {

                var cart_data_detail = [];

                for (let i = 0; i < data.length; i++) {

                    cart_data_detail.push({
                        id: data[i].id,
                        user_id: data[i].user_id,
                        product_id: data[i].product_id,
                        product_price: data[i].product_price,
                        product_qty: data[i].product_qty,
                        product_name: data[i].product_name,
                        product_total: data[i].product_total
                    });

                    console.log(cart_data_detail);
                }
                res.send({
                    message: "All Cart Data Display",
                    cartdata: cart_data_detail,
                    current_page: pages,
                    total_page: totalpage
                });
            }
        });
    });
};

exports.cartupdate = (req, res) => {

    const {cart_id, user_id, product_id, product_price, product_qty, product_total} = req.body;
    let errors = '';

    if (!cart_id) {
        errors = 'Cart id is required.';
    } else if (!user_id) {
        errors = 'User id is required.';
    } else if (!product_id) {
        errors = 'Product id is required.';
    } else if (!product_price) {
        errors = 'Product Price is required.';
    } else if (!product_qty) {
        errors = 'Product QTY is required.';
    }


    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }
    var total = parseInt(product_price) * parseInt(product_qty)

    console.log(total);

    Cart.cartupdateById(cart_id, user_id, product_id, product_qty, total, (err, data) => {

        console.log(data);
        if (data > 0) {
            return res.send({
                success: "No",
                message: 'Cart Not updated successfully.',
                cartdata: data
            })
        } else {
            return res.send({
                success: "yes",
                message: 'Cart is updated successfully.',
                cartdata: data
            })
        }
    });
};

exports.cartdelete = (req, res) => {

    const {cart_id} = req.body;
    let errors = '';

    if (!cart_id) {
        errors = 'Cart Id is required.';
    }
    if (errors.length > 0) {

        return res.send({
            success: "no",
            message: errors,
            data: []
        });
    }

    Cart.cartdelete(cart_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cart with id ` + cart_id
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Cart with id " + cart_id
                });
            }
        } else res.send({
            message: `Cart was deleted successfully!`,
        });
    });
};
