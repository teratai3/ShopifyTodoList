import React, { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Page, Card, Button, FormLayout, TextField, InlineError, Select, Text } from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { STATUS_OPTIONS } from '../../config/todoListsConfig';


const TodoListsShowPage = () => {
    const { id } = useParams();
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [status, setStatus] = useState('');


    const [formState, setFormState] = useState({
        title: '',
        description: '',
        status: '',
        created_at: '',
        updated_at: '',
    });
    const [fieldErrors, setFieldErrors] = useState({});

    const { data, error, updateData, fetchShow } = useFetchData('/api/todo_lists');


    const navigate = useNavigate();

    const handleSubmit = async () => {
        setFieldErrors({});
        await updateData(id, { title: formState.title, description: formState.description, status: formState.status });
    };

    useEffect(() => {
        fetchShow(id);
    }, []);


    // データ取得後にフォームの状態を更新
    useEffect(() => {
        if (data?.data) {
            // setTitle(data.data.title);
            // setDescription(data.data.description);
            // setStatus(data.data.status);
            setFormState({
                title: data.data.title,
                description: data.data.description,
                status: data.data.status,
                created_at: data.data.created_at,
                updated_at: data.data.updated_at,
            });
        }
    }, [data, error]);

    // const handleStatusChange = (value) => {
    //     setStatus(value);
    // };

    const handleChange = (field) => (value) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

    // 非同期処理後にerrorの更新を待機するためにuseEffectを使用
    useEffect(() => {
        console.log(error);
        console.log(data);
        if (!error && data?.id) {
            navigate('/', { state: { message: '更新に成功しました', description: data?.message } });
        } else if (error?.messages) {
            if (error?.status == 404) {
                navigate('/', { state: { message: '見つかりませんでした', description: error.messages.error, tone: "critical" } });
            }
            setFieldErrors(error.messages);
        }
    }, [data, error]);


    return (
        <Page
            backAction={{ content: 'Settings', onAction: () => navigate('/') }}
            title="やることリスト編集"
        >
            <Card>
                <FormLayout>
                    {fieldErrors?.error && (
                        <InlineError message={fieldErrors.error} />
                    )}

                    <TextField label="タイトル" value={formState.title} onChange={handleChange('title')} />
                    {fieldErrors?.title && (
                        <InlineError message={fieldErrors.title} />
                    )}

                    <TextField
                        label="説明文"
                        value={formState.description}
                        onChange={handleChange('description')}
                        multiline={4}
                    />

                    {fieldErrors?.description && (
                        <InlineError message={fieldErrors.description} />
                    )}


                    <Select
                        label="ステータス"
                        options={STATUS_OPTIONS}
                        onChange={handleChange('status')}
                        value={formState.status}
                    />

                    {fieldErrors?.status && (
                        <InlineError message={fieldErrors.status} />
                    )}

                    <Text as="p">
                        作成日：{formState.created_at}<br />
                        更新日：{formState.updated_at}
                    </Text>

                    <Button onClick={handleSubmit}>更新</Button>
                </FormLayout>
            </Card>
        </Page>
    );
};

export default TodoListsShowPage;