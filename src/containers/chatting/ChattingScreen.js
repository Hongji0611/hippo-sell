import { useEffect, useState, useRef } from "react";
import moment from 'moment';
import "./Chatting.css";
import { manual } from "../../data/Manual";
import useUser from "../../context/hook/useUser";
import { product } from "../../data/Product";
import { sales } from "../../data/SalesHistory";
import { todayDelivery, tomorrowDelivery } from "../../data/DeliveryHistory";
import { promise } from "../../data/CustomerPromise";
import { menu } from "../../data/Menu";
import Scroll from "../../components/scroll/Scroll";
import useIsLogin from "../../context/hook/useIsLogin";
import { useNavigate } from "react-router-dom";
import Sheet from 'react-modal-sheet';
import Calendar from '../../components/calendar/Calendar';
import useDate from "../../context/hook/useDate";

export default function ChattingScreen() {
    const { user } = useUser();
    const { setIsLogin } = useIsLogin();
    const { startDate, endDate } = useDate();

    const navigate = useNavigate();

    const nowTime = moment().format('HH:mm');

    const [hamburger, setHamburder] = useState(false);
    const [search, setSearch] = useState([]);
    const [chatText, setChatText] = useState("");
    const [chatList, setChatList] = useState([]);
    const [bottomIsOpen, setBottomIsOpen] = useState(false);

    // 판매내역조회
    const [salesPeriod, setSalesPeriod] = useState("");
    const [salesCustomer, setSalesCustomer] = useState("");
    const [salesPhone, setSalesPhone] = useState("");

    const chatInit = [
        {
            no: 1,
            chat: "반갑습니다. " + user.name + "님",
            date: nowTime,
            isBot: true,
            isBtn: false,
            list: []
        },
        {
            no: 2,
            chat: manual['기능'],
            date: nowTime,
            isBot: true,
            isBtn: true,
            list: []
        }];

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatList]);

    useEffect(() => {
        setChatList(chatInit);
    }, [])

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddChat();
            setChatText("");
            setSearch([]);
        }
    }

    function checkKorean(str) {
        const regx = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        return regx.test(str);
    }

    const setMessage = (_chat, _isBot, _isBtn, _list) => {
        setChatList(prev => [...prev,
        {
            no: chatList.length + 1,
            chat: _chat,
            date: nowTime,
            isBot: _isBot,
            isBtn: _isBtn,
            list: _list
        }]);
    }

    const setOnClickMenu = (index) => {
        setMessage(menu[index], false, false, []);

        switch (index) {
            case 0:
                setMessage(manual['상품정보조회'], true, false, []);
                break;
            case 1: //판매내역조회
                // searchSalesHistory();
                setBottomIsOpen(true);
                break;

            case 2: //고객약속내역조회
                searchCustomerPromise();
                break;

            case 3: //당일배송내역조회
                searchTodayDeliveryHistory();
                break;

            case 4: //익일배송내역조회
                searchTomorrowDeliveryHistory();
                break;
            default:
                break;
        }
    }

    const searchProduct = (chatText) => {
        const isFound = false;
        product.map((item) => {
            if (item.code === chatText) {
                const str = "가격: " + item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원\n물류: " + item.realUse + " / " + item.logistics + " (지점실가용/관할물류)";
                setMessage(str, true, false, []);
                setMessage(manual["기능"], true, true, []);
                setChatText("");
                isFound = true;
            }
        })
        if (!isFound) {
            setMessage(manual['상품정보없음'], true, false, []);
            setMessage(manual["기능"], true, true, []);
        }
    }

    const searchSalesHistory = () => {
        setBottomIsOpen(false);

        if (sales.length !== 0) {
            var list = []

            sales.map((item) => {
                if (item.customerName === salesCustomer && item.phone === salesPhone && startDate.getTime() <= item.dateOfSale.getTime() && endDate.getTime() >= item.dateOfSale.getTime()) {
                    const str = "고객명: " + item.customerName
                        + "\n상품코드: " + item.code
                        + "\n수량: " + item.count
                        + "\n접수 금액: " + item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        + "\n판매 일자: " + getYYYMMDD(item.dateOfSale)
                        + "\n배달 일자: " + getYYYMMDD(item.dateOfDelivery)
                        + "\n취소 일자: " + getYYYMMDD(item.dateOfCancellation);
                    list.push(str);
                }
            })
            console.log(list);
            setMessage("", true, false, list);
        } else {
            setMessage(manual['판매내역없음'], true, false, []);
        }
        setMessage(manual["기능"], true, true, []);

        setSalesCustomer("");
        setSalesPhone("");
    }

    const searchCustomerPromise = () => {
        if (promise.length !== 0) {
            setMessage(manual['고객약속내역조회'], true, false, []);
            var list = [];
            promise.map((item) => {
                const str = "고객명: " + item.customerName
                    + "\n휴대폰번호: " + item.phone
                    + "\n약속예정일자: " + item.date
                    + "\n상담 유형: " + item.type
                    + "\n약속 내용: " + item.contents;
                list.push(str);
            })
            setMessage("", true, false, list);
        } else {
            setMessage(manual['약속내역없음'], true, false, []);
        }
        setMessage(manual["기능"], true, true, []);
    }

    const searchTodayDeliveryHistory = () => {
        if (todayDelivery.length !== 0) {
            setMessage(manual['당일배송내역조회'], true, false, []);
            var list = [];
            todayDelivery.map((item) => {
                const str = "고객명: " + item.customerName
                    + "\n휴대폰번호: " + item.phone
                    + "\n상품명: " + item.productName
                    + "\n상품 코드: " + item.code
                    + "\n배송 유형: " + item.type
                    + "\n배송 상태: " + item.state;
                list.push(str);
            })
            setMessage("", true, false, list);
        } else {
            setMessage(manual['당일배송없음'], true, false, []);
        }
        setMessage(manual["기능"], true, true, []);
    }

    const searchTomorrowDeliveryHistory = () => {
        if (tomorrowDelivery.length !== 0) {
            setMessage(manual['익일배송내역조회'], true, false, []);
            var list = [];
            tomorrowDelivery.map((item) => {
                const str = "고객명: " + item.customerName
                    + "\n휴대폰번호: " + item.phone
                    + "\n상품명: " + item.productName
                    + "\n상품 코드: " + item.code
                    + "\n배송 유형: " + item.type
                    + "\n배송 상태: " + item.state;
                list.push(str);
            })
            setMessage("", true, false, list);
        } else {
            setMessage(manual['익일배송없음'], true, false, []);
        }
        setMessage(manual["기능"], true, true, []);
    }

    const handleAddChat = () => {
        if (chatText.length !== 0) {
            setMessage(chatText, false, false, []);
            if (!checkKorean(chatText)) { //상품정보조회
                setSearch([]);
                searchProduct(chatText);
            } else if (chatText === "판매내역조회") {
                searchSalesHistory();
            } else if (chatText === "고객약속내역조회") {
                searchCustomerPromise();
            } else if (chatText === "당일배송내역조회") {
                searchTodayDeliveryHistory();
            } else if (chatText === "익일배송내역조회") {
                searchTomorrowDeliveryHistory();
            } else {
                setMessage(manual["오류"], true, false, []);
                setMessage(manual["기능"], true, true, []);
            }
        }
    }

    const updateChange = (e) => {
        let data = e.target.value;
        setChatText(data);
        let filterData = [];
        if (!checkKorean(chatText) && data.length > 4) {
            filterData = product.filter((i) =>
                i.code.includes(data)
            );
        }
        if (data.length === 0) {
            filterData = [];
        }
        setSearch(filterData);
    }

    const setSearchToChatText = (code) => {
        setMessage(code, false, false, []);
        setChatText("");
        setSearch([]);
        searchProduct(code);
    }

    const setOnClickHambergerBar = () => {
        setHamburder(!hamburger);
    }

    const setOnClickLogout = () => {
        setIsLogin(false);
        setHamburder(!hamburger)
        navigate("/");
    }

    const setOnClickInit = () => {
        setChatList([]);
        setHamburder(!hamburger);
        setChatList(chatInit);
    }

    const setOnClickSheetCancel = () => {
        setBottomIsOpen(false);
    }

    function getYYYMMDD(date){
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
    
        return year + "-" + month + "-" + day;
    }

    return (
        <div className="chatBox">
            <div className="header">
                <p className="left"></p>
                <p className="headerTitle">판매하마</p>
                <p className="right">
                    <img className="menu" alt="menu" src="img/menu.png" onClick={setOnClickHambergerBar} />
                </p>
            </div>
            {
                hamburger
                    ? <div className="menuBox">
                        <p className="logout" onClick={setOnClickLogout}>로그아웃</p>
                        <p className="init" onClick={setOnClickInit}>대화이력 삭제</p>
                    </div>
                    : null
            }

            <div className="body">
                {
                    chatList.map((item) => {
                        const isBot = item.isBot;
                        return (
                            <>
                                {isBot ?
                                    <div className="botChatBox">
                                        {item.list.length === 0
                                            ? <div className="botChat">
                                                <span>{item.chat}</span>
                                                {item.isBtn ?
                                                    <div>
                                                        <button className="menuBtn" onClick={() => setOnClickMenu(0)} >{menu[0]}</button>
                                                        <button className="menuBtn" onClick={() => setOnClickMenu(1)} >{menu[1]}</button>
                                                        <button className="menuBtn" onClick={() => setOnClickMenu(2)} >{menu[2]}</button>
                                                        <button className="menuBtn" onClick={() => setOnClickMenu(3)} >{menu[3]}</button>
                                                        <button className="menuBtn" onClick={() => setOnClickMenu(4)} >{menu[4]}</button>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                            :
                                            <div className="botChatList">
                                                <Scroll list={item.list} />
                                            </div>

                                        }
                                        <span className="botDate">{item.date}</span>
                                    </div>
                                    :
                                    <div className="userChatBox">
                                        <span className="userDate">{item.date}</span>
                                        <div className="userChat">
                                            <span>{item.chat}</span>
                                        </div>
                                    </div>
                                }
                            </>
                        )
                    })
                }
                <div ref={messagesEndRef} />
            </div>
            <div className="autoCompleteBox">
                {
                    search.map((item) => {
                        return (<p className="autoComplete" onClick={() => setSearchToChatText(item.code)}>{item.code}</p>)
                    })
                }
            </div>
            <div className="footer">
                <input
                    className="chatTextBox"
                    type="text"
                    name="chatText"
                    placeholder="판매하마와 대화해보세요"
                    onChange={(e) => updateChange(e)}
                    value={chatText}
                    onKeyPress={onKeyPress}
                />
            </div>

            <Sheet snapPoints={[700, 400, 100, 0]} isOpen={bottomIsOpen} onClose={() => setBottomIsOpen(false)}>
                <Sheet.Container>
                    <p className="sheetTitle">판매내역조회</p>
                    <div className="sheetContainer">
                        <div className="sheetBody">
                            <p className="sheetContent">{manual['판매내역조회']}</p>
                            <p className="sheetNotion">{manual["조회기간"]}</p>
                        </div>
                        <div className="sheetInputBox">
                            <Calendar />
                            <input
                                className="inputBox"
                                type="text"
                                name="salesCustomer"
                                placeholder="고객명을 입력해주세요"
                                onChange={(e) => setSalesCustomer(e.target.value)}
                                value={salesCustomer}
                            />
                            <input
                                className="inputBox"
                                type="text"
                                name="salesPhone"
                                placeholder="전화번호를 입력해주세요 ex) 010-1234-1234"
                                onChange={(e) => setSalesPhone(e.target.value)}
                                value={salesPhone}
                            />
                        </div>
                        <div className="sheetBtnBox">
                            <p className="sheetCancel" onClick={setOnClickSheetCancel}>취소</p>
                            <p className="sheetSearch" onClick={searchSalesHistory}>조회</p>
                        </div>
                    </div>
                </Sheet.Container>

                <Sheet.Backdrop />
            </Sheet>
        </div>
    );
}
