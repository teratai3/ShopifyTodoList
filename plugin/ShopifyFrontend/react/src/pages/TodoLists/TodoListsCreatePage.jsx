import React, { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Page, Card, Button, FormLayout, TextField, InlineError } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

const TodoListsCreatePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const { data, error, addData } = useFetchData('/api/todo_lists');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setFieldErrors({});
        await addData({ title, description, status: "pending" });
    };


    // 非同期処理後にerrorの更新を待機するためにuseEffectを使用
    useEffect(() => {
        if (!error && data?.id) {
            navigate('/', { state: { message: '新規追加に成功しました', description: data?.message } });
        } else if (error?.messages) {
            setFieldErrors(error.messages);
        }
    }, [data, error]);


    return (
        <Page
            backAction={{ content: 'Settings', onAction: () => navigate('/') }}
            title="やることリスト新規作成"
        >
            <Card>
                <FormLayout>
                    {fieldErrors?.error && (
                        <InlineError message={fieldErrors.error} />
                    )}

                    <TextField label="タイトル" value={title} onChange={(value) => setTitle(value)} />
                    {fieldErrors?.title && (
                        <InlineError message={fieldErrors.title} />
                    )}

                    <TextField
                        label="説明文"
                        value={description}
                        onChange={(value) => setDescription(value)}
                        multiline={4}
                    />

                    {fieldErrors?.description && (
                        <InlineError message={fieldErrors.description} />
                    )}

                    {fieldErrors?.status && (
                        <InlineError message={fieldErrors.status} />
                    )}
                    <Button onClick={handleSubmit}>登録</Button>
                </FormLayout>
            </Card>
        </Page>
    );
};

export default TodoListsCreatePage;