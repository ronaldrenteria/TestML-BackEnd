const { response, request } = require('express');

const axios = require('axios');

const searchByText = async (req = request, res = response) => {
    
    const { q } = req.query;
    
    const _myResponse = {
        author: { 
            name: 'Ronald', 
            lastname: 'Renteria' 
        },
        categories: [],
        items: []
    };

    await axios.get(`${process.env.API_ML}/sites/MLA/search?q=${q}`).then(resp => {
        
        resp.data.results.forEach(element => {
            let item = {};

            item.id = element.id;
            item.title = element.title;
            
            item.price = {};
            
            item.price.currency = element.prices.prices[0].currency_id;
            item.price.amount   = element.prices.prices[0].amount;
            item.price.decimals = 0;

            item.picture        = element.thumbnail; 
            item.condition      = element.condition; 
            item.free_shipping  = element.shipping.free_shipping; 
            
            _myResponse.items.push(item);    
        }); 
    });

    res.json(_myResponse);
}

const searchById = async (req, res = response) => {

    const id = req.params.id;
    
    const _myResponse = {
        author: { 
            name: 'Ronald', 
            lastname: 'Renteria' 
        },
        categories: [],
        item: {}
    };

    console.log(`${process.env.API_ML}/items/${id}`);

    await axios.get(`${process.env.API_ML}/items/${id}`).then(resp => {

        console.log(resp);

        let item = {};

        item.id = resp.data.id;
        item.title = resp.data.title;
        
        item.price = {};
        
        item.price.currency = resp.data.currency_id;
        item.price.amount   = resp.data.price;
        item.price.decimals = 0;

        item.picture        = resp.data.pictures[0].url; 
        item.condition      = resp.data.condition; 
        item.free_shipping  = resp.data.shipping.free_shipping; 
        
        _myResponse.item = item;
    });

    res.json(_myResponse);
}


module.exports = {
    searchByText,
    searchById
}