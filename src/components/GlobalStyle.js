import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --yellow: #fcbe1f;
  --red: #de4536;
}

html,
body,
#root,
.application {
  height: 100%;
}

body {
  background: #646464;
  font-family: 'Ropa Sans', sans-serif;
  margin: 0;
}

a, a:visited {
  color: white;
}

#left,
#right {
  width: 50vw;
  overflow: hidden;
  text-align: center;
}

.chatbox {
  position: fixed;
  line-height: 100vh;
  width: 50vw;
  text-align: center;
  top: 0;
  transition: 0.5s;
  z-index: 4;
  color: var(--yellow);
  font-family: 'Ropa Sans';
  font-size: 28px;
  text-shadow: 1px 1px 1px #000;
}
.currentVideo {
  width: 50vw;
}

.filter-loop {
  filter: grayscale(0%);
  animation: filterInOut 10s infinite alternate;
}

@keyframes filterInOut {
  to {
    filter: grayscale(100%);
  }
}

#viewfinder {
  // this changes once a camera has been selected
  display: flex;
  // align-items: center;
  justify-content: space-around;
}
#viewfinder-video {
  width: 100%;
}

#role-select {
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

h1,
h2 {
  font-weight: 400;
  color: var(--yellow);
  font-size: 1.8em;
}

h2 {
  font-size: 1.4em;
}

.bangers {
  font-family: Bangers;
}

#background-title {
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 96vw;
  font-family: Bangers;
  color: #606060;
  z-index: -10;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.3s;
}

#title {
  font-size: 27vw;
  margin: 0;
}

#subtitle {
  margin: 20px;
  font-size: 21vw;
}

#center-flex {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.role {
  padding: 20px;
  max-width: 200px;
  min-width: 50px;
  cursor: pointer;
}

#messenger {
  position: fixed;
  bottom: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100vw;
}
.message-form {
  font-size: 28px;
  text-align: center;
}
.message-form::-webkit-input-placeholder {
  font-size: 20px;
}

#vertical-flexbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: black;
  height: 100vh;
  width: 100vw;
}

#viewports-container {
  display: flex;
  width: 100vw;
}

input,
button {
  font-family: 'Ropa Sans';
}

#gamename {
  // margin-top: 2px;
  font-size: 2em;
}

#camera-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 66vh;
}

.button-container {
  flex-grow: 1;
  padding: 5px;
}
.camera-button {
  font-size: 3em;
  width: 100%;
  height: 100%;
  // flex-grow: 2;
  transition: 0.4s;

  background: #ddd;
}

.camera-button:hover {
  background: white;
}

#cameraSelect {
  text-align: center;
}

#hide-me {
  display: none;
}

canvas {
  width: 50vw;
}
`;

export default GlobalStyle;
