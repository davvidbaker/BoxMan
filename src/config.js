const config = {
  SOCKET_SERVER_ADDRESS:
    typeof SOCKET_SERVER_ADDRESS === 'undefined'
      ? 'SOCKET_SERVER_ADDRESS'
      // eslint-disable-next-line no-undef
      : SOCKET_SERVER_ADDRESS,
};

export default config;
