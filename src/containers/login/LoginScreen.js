import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Modal from '../../components/modal/Modal';

export default function LoginScreen() {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [store, setStore] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const navigate = useNavigate();

    const userData = [
        {
            id: "4220011",
            pw: "q123123123",
            store: "주안"
        }
    ]

    const navigateToChat = () => {
        if (userData[0].id === id && userData[0].pw === pw && userData[0].store === store) {
            navigate("/chat");
        } else {
            openModal();
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

            <React.Fragment>
                <button className="loginBtn" onClick={navigateToChat}>로그인</button>
                <Modal open={modalOpen} close={closeModal} header="로그인정보 오류">
                    올바르지 않는 정보입니다. 다시 입력해주세요.
                </Modal>
            </React.Fragment>
        </div>
    );
}