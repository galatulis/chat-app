import * as actions from "../actions";

const { addUser, addMessage, listUsers, receiveMessages } = actions;

export const socket = new WebSocket(
  // eslint-disable-next-line no-undef
  `wss://${process.env.REACT_APP_DOMAIN || "localhost"}:${process.env
    .REACT_APP_PORT || 4000}`
);

export function setupSocket(dispatch, name) {
  socket.addEventListener("open", () => {
    socket.send(
      JSON.stringify({
        payload: {
          name,
        },
        type: "ADD_USER",
      })
    );
  });
  socket.addEventListener("message", event => {
    const action = JSON.parse(String(event.data));
    switch (action.type) {
      case "ADD_MESSAGE":
        dispatch(
          addMessage({
            author: action.payload.author,
            id: action.payload.id,
            text: action.payload.text,
          })
        );
        break;
      case "RECEIVE_MESSAGES":
        dispatch(
          receiveMessages({
            author: action.payload.author,
            id: action.payload.id,
            text: action.payload.text,
          })
        );
        break;
      case "ADD_USER":
        dispatch(addUser({ id: action.payload.id, name: action.payload.name }));
        break;
      case "LIST_USERS":
        dispatch(listUsers(action.payload));
        break;
      default:
        break;
    }
  });
  return socket;
}
