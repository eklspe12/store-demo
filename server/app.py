#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from models import db, Product, Location, Stock

from flask import request
from flask_restful import Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, render_template
from flask_cors import CORS
import os

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Products(Resource):
    def get(self):
        products = [product.to_dict(rules=('-locations', '-stocks'))for product in Product.query.all()]
        return make_response(products, 200)
    

    # Could be the problem
    # def post(self):
    #     fields = request.get_json()
    #     print('Received data:', fields)

    #     try:
    #         product = Product(
    #             name=fields['name'], 
    #             description=fields['description'], 
    #             image=fields['image'],
    #             price=fields['price'],
    #         )
    #         db.session.add(product)
    #         db.session.commit()
    #         return make_response(product.to_dict(), 201)
    #     except ValueError as e:
    #         return make_response({'error':e.__str__()}, 400)


class ProductById(Resource):
    def get(self, id):
        product = Product.query.filter(Product.id == id).one_or_none()
        if product is None:
            return make_response({'error':'Product not found'}, 404)
        return make_response(product.to_dict(), 200)
    
    def patch(self, id):
        product = Product.query.get(id)
        if not product:
            return make_response({'error': 'Product not found'}, 404)

        data = request.get_json()
        for field, value in data.items():
            if hasattr(product, field):
                setattr(product, field, value)

        db.session.commit()
        return make_response(product.to_dict(), 202)
        
    def delete(self, id):
        product = Product.query.filter(Product.id == id).one_or_none()
        if product is None:
            return make_response({'error':'Product not found'}, 404)
        db.session.delete(product)
        db.session.commit()
        return make_response({}, 204)


api.add_resource(ProductById, '/products/<int:id>')

api.add_resource(Products, '/products')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

