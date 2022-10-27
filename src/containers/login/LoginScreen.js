import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Modal from '../../components/modal/Modal';
import { userData } from "../../data/User";
import useUser from "../../context/hook/useUser";
import useIsLogin from "../../context/hook/useIsLogin";

export default function LoginScreen() {
    const { setUser } = useUser();
    const { setIsLogin } = useIsLogin();

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

    const navigateToChat = () => {
        userData.map((item) => {
            if (item.id === id && item.pw === pw && item.store === store) {
                setUser({
                    id: item.id,
                    pw: item.pw,
                    store: item.store,
                    name: item.name
                })
                setIsLogin(true);
                navigate("/chat");
            }
        })
        openModal();
    };

    const checkId = () => {
        userData.map((item) => {
            if (item.id === id) {
                setStore(item.store);
            }
        })
    };

    return (
        <div className="loginBox">
            <p className="title">판매하마와</p>
            <p className="title">대화해볼까요?</p>
            <div className="inputBoxParent">
                <input
                    className="inputBox"
                    type="text"
                    name="id"
                    placeholder="사번을 입력하세요"
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                />
            </div>

            <div>
                <input
                    className="inputBox"
                    type="password"
                    name="pw"
                    placeholder="비밀번호를 입력하세요"
                    onChange={(e) => setPw(e.target.value)}
                    value={pw}
                />
            </div>

            <div>
                <input
                    className="inputBox"
                    type="text"
                    name="store"
                    placeholder="지점명을 입력하세요"
                    onChange={(e) => setStore(e.target.value)}
                    value={store}
                    onFocus={checkId}
                />
            </div>

            <div>
                <p className="changePw">비밀번호 변경</p>
                <p className="initPw">비밀번호 초기화</p>
            </div>


            <React.Fragment>
                <button className="loginBtn" onClick={navigateToChat}>로그인</button>
                <Modal open={modalOpen} close={closeModal} header="로그인정보 오류">
                    로그인 정보가 맞지 않습니다. 다시 입력해주세요.
                </Modal>
            </React.Fragment>
        </div>
    );
}