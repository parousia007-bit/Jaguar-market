import os
from flask import Flask, render_template, abort
from jinja2 import TemplateNotFound

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pizzerias')
def pizzerias():
    return render_template('pizzerias.html')

# Dynamic Route for Bazaar Vendors
@app.route('/bazar/<vendor_slug>')
def bazar_vendor(vendor_slug):
    try:
        return render_template(f'mini-sites/{vendor_slug}.html')
    except TemplateNotFound:
        abort(404)

# Admin & Other Routes (Preserved but checked for validity)
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
