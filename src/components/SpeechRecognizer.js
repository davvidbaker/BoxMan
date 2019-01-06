import * as React from 'react';
/* eslint-disable func-names */

const SpeechRecognizer = () => {
  const [transcript, setTranscript] = React.useState();

  const initialized = React.useRef(false);

  React.useEffect(() => {
    console.log('💬 initialized.current', initialized.current);
    if (!initialized.current) {
      initialized.current = true;
      console.log('💬 useeffect called');

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
      
      /* ⚠️ todo */
      const colors = [
        'aqua',
        'azure',
        'beige',
        'bisque',
        'black',
        'blue',
        'brown',
        'chocolate',
        'coral',
      ];
      const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(
        ' | ',
      )} ;`;

      const recognition = new SpeechRecognition();
      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);

      recognition.grammars = speechRecognitionList;
      /* 💁 continuous = true wasn't really working */
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onaudiostart = function (event) {
        console.log('💬 onaudiostart', event);
      };

      recognition.onend = function (event) {
        event.preventDefault();
        console.log('💬 onend', event);
        recognition.start();
      };

      recognition.onspeechstart = function (event) {
        console.log('💬 onspeechstart', event);
      };

      recognition.onresult = function (event) {
        event.preventDefault();
        let trans = '';
        for (const result of event.results) {
          trans += ` ${result[0].transcript}`;

          console.log('💬 trans', trans);
        }
        setTranscript(trans);
      };

      recognition.onnomatch = function (event) {
        console.log('I didnt recognise that color.', event);
      };

      recognition.onerror = function (event) {
        console.log('Error occurred in recognition', event);
      };

      return () => {
        console.log('🛑 recognition stopping');
        recognition.stop();
      };
    }
  });
  return (
    <div
      css="
        position: absolute;
        top: 0;
        z-index: 10000000;
        color: white;
      "
    >
      Speech last recognized:
      {' '}
      <span>{transcript}</span>
    </div>
  );
};

export default SpeechRecognizer;
