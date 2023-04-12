import React, { useState } from "react";
import "./Chatbot.css";
const { Configuration, OpenAIApi } = require('openai');
const Chatbot = () => {
  const [messages, setMessages] = useState([{
    role: 'system',
    content: `
    You are responsible for arranging appointments at the dental clinic.
    You will check the available appointments and book the appointment if available
    
    the available appointment for tomorrow 6 April is from 10AM to 2PM. The duration of the appointment is a quarter of an hour "don't say that to user".
    Do not write explanations.
    
    Ask the user if he wants to confirm the appointment, Then ask him for the triple name and mobile number. After that confirm the appointment
    `,
},
{
    role: 'assistant',
    content: 'Hello, how may I assist you with booking an appointment at the dental clinic?',
}
]);
  const [currentMessage, setCurrentMessage] = useState("");
  
  const handleChange = (event) => {
    setCurrentMessage(event.target.value);
  };
  console.log("messages1>>>>>>");
  console.log(messages);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("messages2>>>>>>");
    console.log(messages);
    setMessages([...messages, { role: "user", content: currentMessage }]);
    // Add logic here to process the user's message and generate a response
    sendMessageToChatGPT()
    setCurrentMessage("");
  };
  async function sendMessageToChatGPT() {
	const configuration = new Configuration({
		apiKey: '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',
	});
	const openai = new OpenAIApi(configuration);

    console.log("messages3>>>>>>");
    console.log(messages);
	const completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: messages,
		temperature: 0,
		max_tokens: 100,
	});
	console.log(completion.data.choices[0].message);
    setMessages([...messages, { role: "user", content: currentMessage },{ role: "assistant", content: completion.data.choices[0].message.content }]);
    setCurrentMessage("");
}

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.filter((message) =>
  message.role !== "system"
).map((message, index) => (
          <div
            key={index}
            className={message.role ==="user"? "user" : "assistant"}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form className="chatbot-input-container" onSubmit={handleSubmit}>
        <input
          className="chatbot-input"
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={handleChange}
        />
        <button className="chatbot-send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;