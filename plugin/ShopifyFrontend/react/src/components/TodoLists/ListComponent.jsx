import React from 'react';
import { ResourceList, ResourceItem, Text } from '@shopify/polaris';

import { Link } from 'react-router-dom';
import { getStatusLabel } from '../../config/todoListsConfig';
import { useNavigate } from 'react-router-dom';

const ListComponent = ({ items, hasNext, hasPrevious, onNext, onPrevious }) => {
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        if (window.confirm(`${item.title} を本当に削除しますか？`)) {
            navigate(`/todo_lists/delete/${item.id}`);
        }
    };

    return (
        <ResourceList
            resourceName={{ singular: 'item', plural: 'items' }}
            items={items}
            pagination={{
                hasNext: hasNext,
                onNext: onNext,
                hasPrevious: hasPrevious,
                onPrevious: onPrevious,
            }}
            renderItem={(item) => {
                const { id, title, description, status, created_at, updated_at } = item;
                return (
                    <ResourceItem id={id} shortcutActions={[
                        {
                            content: <div onClick={() => handleItemClick(item)}>削除する</div>,
                        }
                    ]} persistActions >
                        <Link to={`/todo_lists/show/${id}`}>
                            <Text variation="strong" as="h3">{title}</Text>
                            <div className='truncate'>{description}</div>
                            <Text as="p">
                                ステータス：{getStatusLabel(status)}
                            </Text>
                            <Text as="p">
                                作成日：{created_at}　更新日：{updated_at}
                            </Text>
                        </Link>
                    </ResourceItem>
                );
            }}
        />
    );
};

export default ListComponent;
