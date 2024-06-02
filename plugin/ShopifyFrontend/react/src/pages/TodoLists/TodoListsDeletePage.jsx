import React, { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { useParams, useNavigate } from 'react-router-dom';

const TodoListsDeletePage = () => {
    const { id } = useParams();
    const { data, error, deleteData } = useFetchData('/api/todo_lists');

    const navigate = useNavigate();
    useEffect(() => {
        deleteData(id);
    }, []);

     useEffect(() => {
        console.log(error);
        console.log(data);
        if (!error && data?.id) {
            navigate('/', { state: { message: '削除に成功しました', description: data?.message } });
        } else if (error?.messages) {
            navigate('/', { state: { message: 'エラー', description: error.messages.error, tone: "critical" } });
        }
    }, [data, error]);

    return (
       <>
       </>
    );
};

export default TodoListsDeletePage;