import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Learn from "./pages/Learn";
import { AuthenticationContextProvider } from "./services/authentication/authentication.context";
import { DanceCategoryContextProvider } from "./services/danceCategory/danceCategory.context";
import { VideoContextProvider } from "./services/video/video.context";

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            newState = [action.data, ...state];
            break;
        }
        case "REMOVE": {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        case "EDIT": {
            console.log(action.data);
            newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
            break;
        }
        default:
            return state;
    }

    localStorage.setItem("data", JSON.stringify(newState));
    //로컬스토리지에 저장하는 코드

    return newState;
};

export const DiaryDispatchContext = React.createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, []);

    const dataId = useRef(6);

    useEffect(() => {
        const localData = localStorage.getItem("data");
        if (localData) {
            const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));

            if (diaryList.length >= 1) {
                dataId.current = parseInt(diaryList[0].id) + 1;

                dispatch({ type: "INIT", data: diaryList });
            }
        }
    }, []);
    //CREATE
    const onCreate = (date, content, file, title) => {
        dispatch({
            type: "CREATE",
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                file,
                title,
            },
        });
        dataId.current += 1;
    };
    //REMOVE
    const onRemove = (targetId) => {
        dispatch({ type: "REMOVE", targetId });
    };
    //EDIT
    const onEdit = (targetID, date, content, file, title) => {
        dispatch({
            type: "EDIT",
            data: {
                id: targetID,
                date: new Date(date).getTime(),
                content,
                file: file,
                title: title,
            },
        });
    };
    return (
        <AuthenticationContextProvider>
            <DanceCategoryContextProvider>
                <VideoContextProvider>
                    <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
                        <BrowserRouter>
                            <div className="App">
                                <Routes>
                                    <Route path="/" element={<Login />} />
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/new" element={<New />} />
                                    <Route path="/edit/:id" element={<Edit />} />
                                    <Route path="/post/:id" element={<Post />} />
                                    <Route path="/learn/:id" element={<Learn />} />
                                    // colon을 통해 id값을 전달 할 수있다. 대신 id를 무조건 받는 형식이다
                                </Routes>
                            </div>
                        </BrowserRouter>
                    </DiaryDispatchContext.Provider>
                </VideoContextProvider>
            </DanceCategoryContextProvider>
        </AuthenticationContextProvider>
    );
}

export default App;
