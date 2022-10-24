import { useEffect, useState, useRef } from "react";
import moment from 'moment';
import "./Chatting.css";
import { manual } from "../../data/Manual";
import useUser from "../../context/hook/useUser";
import { product } from "../../data/Product";

export default function ChattingScreen() {
    const { user } = useUser();

    const nowTime = moment().format('HH:mm');

    const [chatText, setChatText] = useState("");
    const [chatList, setChatList] = useState([
        {
            no: 1,
            chat: "반갑습니다. " + user.name + "님",
            date: nowTime,
            isBot: true,
        },
        {
            no: 2,
            chat: manual['도움말'],
            date: nowTime,
            isBot: true,
        }
    ]);

    useEffect(() => {
        scrollToBottom();
    }, [chatList]);

    const chatInput = useRef();

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddChat();
            setChatText("");
        }
    }

    function checkKorean(str) {
        const regx = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        return regx.test(str);
    }

    const setError = () => {
        setChatList(prev => [...prev,
        {
            no: chatList.length + 1,
            chat: manual['오류'],
            date: nowTime,
            isBot: true
        }]);
    }

    const handleAddChat = () => {
        if (chatText.length !== 0) {
            setChatList(prev => [...prev,
            {
                no: chatList.length + 1,
                chat: chatText,
                date: nowTime,
                isBot: false
            }])

            if (manual[chatText] === undefined) {
                //모델명인지 확인
                if (!checkKorean(chatText)) {
                    const isFound = false;
                    product.map((item) => {
                        if (item.code === chatText) {
                            setChatList(prev => [...prev,
                            {
                                no: chatList.length + 1,
                                chat: "가격: " + item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원\n물류: " + item.realUse + " / " + item.logistics + " (지점실가용/관할물류)",
                                date: nowTime,
                                isBot: true
                            }])
                            isFound = true;
                        }
                    })
                    if(!isFound)
                        setError();
                } else {
                    setError();
                }

            } else {
                setChatList(prev => [...prev,
                {
                    no: chatList.length + 1,
                    chat: manual[chatText],
                    date: nowTime,
                    isBot: true
                }])
            }
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