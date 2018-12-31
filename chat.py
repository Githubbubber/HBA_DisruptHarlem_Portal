from flask import Flask, render_template #, redirect
# from flask_restful import Api
from flask_socketio import SocketIO#, send
# socketio = SocketIO(app, async_mode='eventlet')

app = Flask(__name__)
# api = Api(app)
app.config['SECRET_KEY'] = 'mysecret'



# Socket.io stuff
socketio = SocketIO(app)

@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	send(msg, broadcast = True)

@socketio.on_error()
def error_handler(e):
    print("Socket error: " + e)
# Socket.io stuff



@app.route('/')
def home():
	return render_template('index.html')

@app.route('/chat')
def chat():
	return render_template('chat.html')

@app.route('/payment')
def payment():
	return render_template('payment.html')

@app.route('/pricing')
def pricing():
	return render_template('pricing.html')

@app.route('/thankyou')
def thankyou():
	return render_template('thankyou.html')



if __name__ == "__main__":
    app.run(ssl_context=('cert.pem', 'key.pem'))
	# socketio.run(app, host='127.0.0.1', port=5000, certfile='cert.pem', keyfile='key.pem')