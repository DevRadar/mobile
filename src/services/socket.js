import socketio from "socket.io-client";

const socket = socketio("http://192.168.43.118:3333", {
  autoConnect: false,
});

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };
  socket.connect();

  socket.on("message", data => {
    console.log(data);
  });
}

function disconnect() {
  if(socket.connected) {
    socket.disconnect();
  }
}

function subscribeToNewDevs(subscribeFunction) {
  socket.on("new-dev", subscribeFunction);
}

export {
  connect,
  disconnect,
  subscribeToNewDevs,
};
