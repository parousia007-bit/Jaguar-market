import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # Tu index_profesional.html ahora

@app.route('/pizzerias')
def pizzerias():
    return render_template('pizzerias.html')  # Tu pizzerias.html original

@app.route('/pizzerias/tavolos')
def tavolos():
    return render_template('pizzeria_tavolos.html')

@app.route('/pizzerias/tavolos/menu-pdf')
def tavolos_menu_pdf():
    return render_template('pizzeria_tavolos_menu_completo.html')

# Otras rutas que puedas tener
@app.route('/gelatinas/gelee-dely')
def gelee_dely():
    return render_template('gelee_dely.html')

@app.route('/postres/gelee-dely')
def gelee_dely_alt():
    return render_template('gelee_dely.html')

@app.route('/admin/dashboard')
def admin_dashboard():
    return render_template('admin_dashboard.html')

@app.route('/plaza')
def plaza():
    return render_template('plaza/index.html')

@app.route('/mall-3d')

# ==== SERVICIOS PROFESIONALES ====
@app.route('/servicios/dental')
def consultorio_dental():
    return render_template('consultorio_dental.html')

@app.route('/servicios/dental/agendar-cita')
def dental_agendar_cita():
    return render_template('dental_agendar_cita.html')

@app.route('/servicios/laboratorio')
def laboratorio_analisis():
    return render_template('laboratorio_analisis.html')

@app.route('/servicios/laboratorio/solicitar-estudio')
def laboratorio_solicitud():
    return render_template('laboratorio_solicitud.html')
def mall_3d():
    return render_template('mall_3d.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=8080, debug=True)
