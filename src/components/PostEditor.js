import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

//Components
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import VideoUploader from "./VideoUploader";
import { DanceCategoryContext } from "../services/danceCategory/danceCategory.context";

const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
};

const PostEditor = ({ isEdit, originData }) => {
    const navigate = useNavigate();
    const contentRef = useRef();
    const titleRef = useRef();
    const categoryRef = useRef();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(getStringDate(new Date()));

    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
    const { postDanceCategory } = useContext(DanceCategoryContext);
    const [file, setFile] = useState({});

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        if (window.confirm(isEdit ? "Confirm edit?" : "Confirm your post?")) {
            if (!isEdit) {
                onCreate(date, content, file, title);
            } else {
                onEdit(originData.id, date, content, file, title);
            }
        }

        navigate("/home", { replace: true });
    };

    const handleRemove = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onRemove(originData.id);
            navigate("/home", { replace: true });
        }
    };

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setContent(originData.content);
            setTitle(originData.title);
            setFile(originData.file);
        }
    }, [isEdit, originData]);
    return (
        <div className="PostEditor">
            <MyHeader
                leftChild={<MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />}
                headText={isEdit ? "Edit" : "NEW"}
                rightChild={isEdit && <MyButton text={"delete"} type={"NEGATIVE"} onClick={() => handleRemove()} />}
            />
            <div>
                <section>
                    <h4>제목</h4>
                    <textarea placeholder="제목" ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} height={"20px"} />
                </section>
                <section>
                    <h4>파일 업로드</h4>
                    <VideoUploader file={file} setFile={setFile} />
                </section>
                <section>
                    <h4>Description</h4>
                    <div className="input_box text_wrapper">
                        <textarea placeholder="Describe your content" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                </section>
                <section>
                    <h4>Category</h4>
                    <div className="input_box text_wrapper">
                        <textarea placeholder="카테고리를 작성해주세요" ref={categoryRef} value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"cancel"} onClick={() => navigate(-1)} />
                        <MyButton text={"confirm"} type={"POSITIVE"} onClick={() => handleSubmit()} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PostEditor;
