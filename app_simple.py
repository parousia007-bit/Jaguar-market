import os
import json
from flask import Flask, render_template, abort, request, jsonify
from jinja2 import TemplateNotFound

app = Flask(__name__)

# Load Data
def load_data():
    try:
        with open('marketplace_data.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print("Warning: marketplace_data.json not found.")
        return {"marketplace_config": {}, "vendors": []}

MARKETPLACE_DATA = load_data()

@app.route('/')
def index():
    return render_template('index.html', config=MARKETPLACE_DATA.get('marketplace_config'))

@app.route('/pizzerias')
def pizzerias():
    return render_template('pizzerias.html')

# Enterprise Single Template Route
@app.route('/vendor/<vendor_id>')
def vendor_site(vendor_id):
    # Reload data to support hot-reloading JSON during dev (optional but helpful)
    # MARKETPLACE_DATA = load_data()

    vendor = next((v for v in MARKETPLACE_DATA.get('vendors', []) if v['id'] == vendor_id), None)
    if not vendor:
        abort(404)

    return render_template('mini-sites/vendor_base.html',
                         vendor=vendor,
                         marketplace_config=MARKETPLACE_DATA.get('marketplace_config'))

# Legacy Route Support
@app.route('/bazar/<vendor_slug>')
def bazar_vendor(vendor_slug):
    # Check if this slug exists in our new data engine
    vendor = next((v for v in MARKETPLACE_DATA.get('vendors', []) if v['id'] == vendor_slug), None)
    if vendor:
         return render_template('mini-sites/vendor_base.html',
                         vendor=vendor,
                         marketplace_config=MARKETPLACE_DATA.get('marketplace_config'))

    # Fallback to static templates
    try:
        return render_template(f'mini-sites/{vendor_slug}.html')
    except TemplateNotFound:
        abort(404)

@app.route('/api/cart/generate-tickets', methods=['POST'])
def generate_tickets():
    """
    Process cart items and generate WhatsApp URLs per vendor.
    Expected Payload: { "cart": [ { "name": "...", "price": 10, "qty": 1, "vendor_id": "tavolos" }, ... ], "customer": { ... } }
    """
    data = request.json or {}
    cart = data.get('cart', [])
    customer = data.get('customer', {})

    if not cart:
        return jsonify({"status": "error", "message": "Cart is empty"}), 400

    # Group items by vendor
    vendor_tickets = {}

    for item in cart:
        # Default to 'unknown' if not provided (handling legacy frontend)
        vid = item.get('vendor_id', 'unknown')
        if vid not in vendor_tickets:
            vendor_tickets[vid] = []
        vendor_tickets[vid].append(item)

    results = []

    for vid, items in vendor_tickets.items():
        # Find vendor phone
        vendor_data = next((v for v in MARKETPLACE_DATA.get('vendors', []) if v['id'] == vid), None)

        phone = vendor_data['phone'] if vendor_data else "5215555555555" # Default/Fallback

        # Build Message
        message = f"*Nuevo Pedido para {vendor_data['name'] if vendor_data else vid}*\n\n"
        message += f"Cliente: {customer.get('name', 'Anónimo')}\n"
        message += f"Tel: {customer.get('phone', '')}\n\n"

        total = 0
        for i in items:
            subtotal = i.get('price', 0) * i.get('qty', 1)
            total += subtotal
            message += f"- {i.get('qty')}x {i.get('name')} (${subtotal})\n"

        message += f"\n*Total: ${total}*"

        url = f"https://wa.me/{phone}?text={message}"
        results.append({
            "vendor_id": vid,
            "whatsapp_url": url
        })

    return jsonify({
        "status": "success",
        "tickets": results
    })

# Admin & Other Routes
@app.route('/admin/dashboard')
def admin_dashboard():
    return render_template('admin_dashboard.html')

@app.route('/plaza')
def plaza():
    return render_template('plaza/index.html')

@app.route('/mall-3d')
def mall_3d():
    return render_template('mall_3d.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=8080, debug=True)
