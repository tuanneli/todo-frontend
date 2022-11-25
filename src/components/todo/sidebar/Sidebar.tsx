import React, {useContext, useState} from 'react';
import './Sidebar.less';
import {Link} from "react-router-dom";
import {AddOutlined, Explore, Logout, Person, ReceiptLong, SaveAlt, SmartToy} from "@mui/icons-material";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const Sidebar = observer(() => {

    const [isActive, setIsActive] = useState('explore');
    const [showAddAServer, setShowAddAServer] = useState(false);
    const [showDownloads, setShowDownloads] = useState(false);

    const {userStore, todoStore} = useContext(Context);

    // const handleClick = (info: string) => {
    // setIsActive(info);
    // if (info === 'download') {
    //     setShowDownloads(true)
    // } else if (info === 'add') {
    //     setShowAddAServer(true)
    // }
    // }

    return (
        <nav className={"container"}>
            <div className={"box"}>
                <div className={"for__tooltip"}>
                    <div className={`container__element main__element ${isActive === 'main' ? "active__main" : ''}`}>
                    <span
                        className={`side__line ${isActive === 'main' ? "side__line__active" : ''}`}></span>
                        {<Person/>}
                    </div>
                    <span className={"tooltip"}>{userStore.user?.email}</span>
                </div>
                <div className={"division__line"}/>
                <div className={"for__tooltip"}>
                    <Link to={'/'} onClick={() => setIsActive('explore')}
                          className={`container__element ${isActive === 'explore' ? "active" : ''}`}>
                <span
                    className={`side__line ${isActive === 'explore' ? "side__line__active" : ''}`}>
                </span>
                        {<ReceiptLong/>}
                    </Link>
                    <span className={"tooltip"}>Список задач</span>
                </div>
                <div className={"for__tooltip"}>
                    <div onClick={() => todoStore.setShowAddTodoWindow(true)}
                         className={`container__element ${isActive === 'add' ? "active" : ''}`}>
                        <span
                            className={`side__line ${isActive === 'add' ? "side__line__active" : ''}`}></span>
                        {<AddOutlined/>}
                    </div>
                    <span className={"tooltip"}>Добавить новую задачу</span>
                </div>
                <div className={"division__line"}/>
                <div className={"for__tooltip"}>
                    <div onClick={() => userStore.logout()}
                         className={`container__element ${isActive === 'download' ? "active" : ''}`}>
                        <span
                            className={`side__line ${isActive === 'download' ? "side__line__active" : ''}`}></span>
                        {<Logout/>}
                    </div>
                    <span className={"tooltip"}>Выйти</span>
                </div>
                {/*<AddAServer show={showAddAServer} setShow={setShowAddAServer}/>*/}
                {/*<Download show={showDownloads} setShow={setShowDownloads}/>*/}
            </div>
        </nav>
    );
});

export default Sidebar;