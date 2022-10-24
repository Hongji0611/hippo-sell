import { useEffect, useState, useRef } from "react";
import moment from 'moment';
import "./Chatting.css";
import { manual } from "../../data/Manual";
import useUser from "../../context/hook/useUser";
import { product } from "../../data/Product";
import { sales } from "../../data/SalesHistory";

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

    const setBotMessage = (str) => {
        setChatList(prev => [...prev,
        {
            no: chatList.length + 1,
            chat: manual[str],
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
                if (chatText === "판매내역 전체") {
                    if (sales.length !== 0) {
                        sales.map((item) => {
                            setChatList(prev => [...prev,
                            {
                                no: chatList.length + 1,
                                chat: "고객명: " + item.customerName
                                    + "\n상품코드: " + item.code
                                    + "\n수량: " + item.count
                                    + "\n접수 금액: " + item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    + "\n판매 일자: " + item.dateOfSale
                                    + "\n배달 일자: " + item.dateOfDelivery
                                    + "\n취소 일자: " + item.dateOfCancellation,
                                date: nowTime,
                                isBot: true
                            }])
                        })
                    } else {
                        setBotMessage("판매내역없음");
                    }
                } else if (chatText.includes("판매내역")) {
                    const words = chatText.split(' ');

                    if( words[1] === undefined){
                        setBotMessage('오류');
                        return false;
                    }

                    var isEmpty = true;

                    sales.map((item) => {
                        if (item.customerName === words[1]) {
                            setChatList(prev => [...prev,
                            {
                                no: chatList.length + 1,
                                chat: "고객명: " + item.customerName
                                    + "\n상품코드: " + item.code
                                    + "\n수량: " + item.count
                                    + "\n접수 금액: " + item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    + "\n판매 일자: " + item.dateOfSale
                                    + "\n배달 일자: " + item.dateOfDelivery
                                    + "\n취소 일자: " + item.dateOfCancellation,
                                date: nowTime,
                                isBot: true
                            }])
                            isEmpty = false
                        }
                    })

                    if(isEmpty){
                        setBotMessage("판매내역없음")
                    }

                } else if (!checkKorean(chatText)) { //모델명
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
                    if (!isFound)
                        setBotMessage("오류");
                } else {
                    setBotMessage("오류");
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