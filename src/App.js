import React, { useState, useEffect } from 'react';
import './App.css';
import wordDict from './words_dictionary'
import { ChatFeed, Message } from 'react-chat-ui'


function App() {
  const [userInput, setUserInput] = useState("");
  const [health, setHealth] = useState("30");
  const [messageArray, setMessageArray] = useState([
    new Message({ id: 1, message: "So you wish to fight?! How Foolish of you!" }),
  ]);

  const handleKeyPress = ({key, keyCode}) => {
    console.log(key, keyCode)
    if ((keyCode >= 65 && keyCode <= 90) || keyCode === 32) {  // alphabet or space
      setUserInput(`${userInput}${key}`)
    } else if (keyCode === 13) {  // enter
      const userWords = userInput.split(" ");
      let totalLetters = 0;
      userWords.forEach((word) => {
        if (wordDict[word]) {
          totalLetters += word.length;
        }
      })
      setHealth(health - totalLetters);
      setMessageArray([...messageArray, new Message({ id: 0, message: userInput })]);
      setUserInput("");
    } else if (keyCode === 8 && userInput.length > 0) {  // backspace
      setUserInput(userInput.substring(0, userInput.length-1))
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  })

  return (
    <div className="App">
      <header className="App-header">
        <div>{health <= 0? "You Win!": ""}</div>
        <div>
        <ChatFeed
          messages={messageArray} // Boolean: list of message objects
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={{
            text: {
              fontSize: 15,
            },
            chatbubble: {
              borderRadius: 30,
              padding: 15
            }
          }}
        />
        </div>
        <progress value={health} max="30" />
        <input type="text" id="user-input" value={userInput} style={{"width": "20rem", "marginTop": "3rem", "borderRadius": "1rem"}} />
      </header>
    </div>
  );
}

export default App;
