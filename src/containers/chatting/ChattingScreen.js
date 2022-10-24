import { useEffect, useState, useRef } from "react";
import moment from 'moment';

import "./Chatting.css";

export default function ChattingScreen() {
    const [chatText, setChatText] = useState("");
    const [chatList, setChatList] = useState([
        {
            no: 1,
            chat: "원하는 메뉴를 입력해주세요.\n\n1. 상품정보 조회 안내\n2. 판매내역 조회 안내\n3. 고객약속내역 조회 안내\n4. 배송예정건 조회 안내\n\n예시) 상품정보 조회 안내\n\n초기화하고 싶으실 경우 '메뉴'를 입력해주세요.",
            date: '10:09',
            isBot: true,
        }
    ]);

    useEffect(() => {
        scrollToBottom();
    }, [chatList]);

    const chatInput = useRef();

    const nowTime = moment().format('HH:mm');

    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            handleAddChat();
            setChatText("");
        }
    }

    const handleAddChat = () => {
        if (chatText.length != 0) {
            setChatList(prev => [...prev,
            {
                no: chatList.length + 1,
                chat: chatText,
                date: nowTime,
                isBot: false
            }])
        }
    }

    const scrollToBottom = () => {
        const { scrollHeight, clientHeight } = chatInput.current;
        chatInput.current.scrollTop = scrollHeight - clientHeight;
    }

    return (
        <div className="chatBox">
            <div className="header">
                <p className="headerTitle">판매하마</p>
            </div>
            <div className="body" ref={chatInput}>
                {
                    chatList.map((item) => {
                        const isBot = item.isBot;
                        return (
                            <>
                                {isBot ?
                                    <div className="botChatBox">
                                        <div className="botChat">
                                            <span>{item.chat}</span>
                                        </div>
                                        <span className="botDate">{item.date}</span>
                                    </div> 
                                    :
                                    <div className="userChatBox">
                                        <div className="userChat">
                                            <span>{item.chat}</span>
                                        </div>
                                        <span className="userDate">{item.date}</span>
                                    </div>
                                }
                            </>
                        )
                    })
                }
            </div>
            <div className="footer">
                <input
                    className="chatTextBox"
                    type="text"
                    name="chatText"
                    placeholder="판매하마와 대화해보세요"
                    onChange={(e) => setChatText(e.target.value)}
                    value={chatText}
                    onKeyPress={onKeyPress}
                />
            </div>
        </div>
    );
}