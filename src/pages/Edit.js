import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import PostEditor from "../components/PostEditor";

const Edit = () => {
    // const [originData, setOriginData] = useState();
    // const navigate = useNavigate();
    // const diaryList = useContext(DiaryStateContext);
    // const { id } = useParams();

    // useEffect(() => {
    //     if (diaryList.length >= 1) {
    //         const targetDiary = diaryList.find(
    //             (it) => parseInt(it.id) === parseInt(id)
    //         );
    //         if (targetDiary) {
    //             setOriginData(targetDiary);
    //         } else {
    //             navigate("/", { replace: true });
    //         }
    //     }
    // }, []);
    return <div className="Edit">{/* {originData && <PostEditor isEdit={true} originData={originData} />} */}</div>;
};

export default Edit;
