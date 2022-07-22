from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import db

app = Flask(__name__)
api = Api(app)

app.url_map.strict_slashes = False # Disable redirecting on POST method from /star to /star/
class Collection(Resource):
  def get(self):
    output = []
    for data in db.trades.find().sort("event_time", -1).limit(50):
      output.append({
        '_id': str(data['_id']),
        'collection_slug': data['collection_slug'], 
        'asset_id': data['asset_id'], 
        'asset_url': data['asset_url'], 
        'asset_img_url': data['asset_img_url'], 
        'event_time':data['event_time'], 
        'event_auction_type':data['event_auction_type'], 
        'event_contract_address': data['event_contract_address'], 
        'event_quantity': data['event_quantity'],
        'event_payment_symbol': data['event_payment_symbol'],
        'event_total_price': data['event_total_price'],
      })
    return jsonify({'result' : output})

api.add_resource(Collection, '/collections')

if __name__ == '__main__':
  app.run()