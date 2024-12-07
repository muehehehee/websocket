import websocketSetup from "./websocket";

const WS_PORT = 3030;
const expressServer = "https://api.fmews.wefgis.com/water-levels";

websocketSetup(WS_PORT, expressServer);