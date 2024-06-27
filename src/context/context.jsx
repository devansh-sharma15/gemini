import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevChats, setPrevChats] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [selectedChat, setSelectedChat] = useState(null); // New state for selected chat

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    const response = await run(input);
    // Replace **text** with <br><b>text</b> and * with <br>
    let formattedResponse = response
      .replace(/\*\*(.*?)\*\*/g, '<br><b>$1</b>')
      .replace(/\*/g, '<br>');

    // Save both prompt and response in previous chats
    const newChat = { prompt: input, response: formattedResponse };
    setPrevChats([...prevChats, newChat]);

    // Split the response into parts for the typing effect
    let responseArray = formattedResponse.split(/(<br>|<b>|<\/b>)/);
    responseArray = responseArray.filter(part => part !== ""); // Remove empty strings

    responseArray.forEach((part, index) => {
      delayPara(index, part);
    });

    setLoading(false);
    setInput("");
  };

  const startNewChat = () => {
    setInput("");
    setRecentPrompt("");
    setShowResult(false);
    setResultData("");
    setSelectedChat(null); // Reset selected chat when starting a new chat
  };

  const contextValue = {
    prevChats,
    setPrevChats,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    startNewChat,
    selectedChat, // Include selectedChat in the context
    setSelectedChat // Provide a way to update selectedChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
