import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginScreen() {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [store, setStore] = useState("");

    const navigate = useNavigate();

    const userData = [
        {
            id: "4220011",
            pw: "q123123123",
            store: "주안"
        }
    ]

    const navigateToChat = () => {
        if (userData[0].id === id && userData[0].pw === pw && userData[0].store === store){
            navigate("/chat");
        }else{
            // 모달 추가
        }

    };

    return (
        <div className="loginBox">
            <p className="title">판매하마와</p>
            <p className="title">대화해볼까요?</p>
            <div>
                <input
                    className="id"
                    type="text"
                    name="id"
                    placeholder="아이디를 입력하세요"
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                />
            </div>

            <div>
                <input
                    className="pw"
                    type="password"
                    name="pw"
                    placeholder="비밀번호를 입력하세요"
                    onChange={(e) => setPw(e.target.value)}
                    value={pw}
                />
            </div>

            <div>
                <input
                    className="store"
                    type="text"
                    name="store"
                    placeholder="지점명을 입력하세요"
                    onChange={(e) => setStore(e.target.value)}
                    value={store}
                />
            </div>

            <button className="loginBtn" onClick={navigateToChat}>로그인</button>

        </div>
    );
}