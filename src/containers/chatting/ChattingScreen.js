import { useEffect, useState, useNavigate } from "react";

import "./Chatting.css";

export default function ChattingScreen() {
    const [chatText, setChatText] = useState("");

    return (
        <div className="chatBox">
            <div className="header">
                <p className="headerTitle">판매하마</p>
            </div>
            <div className="body">
                csdv
            </div>
            <div className="footer">
                <input
                    className="chatTextBox"
                    type="text"
                    name="chatText"
                    placeholder="판매하마와 대화해보세요"
                    onChange={(e) => setChatText(e.target.value)}
                    value={chatText}
                />
            </div>
        </div>
    );
}