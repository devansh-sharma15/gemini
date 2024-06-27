import React, { useContext } from 'react';
import './sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
  const [extended, setExtended] = React.useState(false);
  const { prevChats, startNewChat, setRecentPrompt, setSelectedChat } = useContext(Context);

  const handlePreviousChatClick = (chat) => {
    setRecentPrompt(chat.prompt);
    setSelectedChat(chat); // Set the selected chat
    setExtended(false); // Close the sidebar after selecting a chat
  };

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="Menu Icon" />
        <div className="newchat" onClick={startNewChat}>
          <img src={assets.plus_icon} alt="New Chat Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended &&
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevChats.map((chat, index) => (
              <div className="recent-entry" key={index} onClick={() => handlePreviousChatClick(chat)}>
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{chat.prompt}</p>
              </div>
            ))}
          </div>
        }
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
