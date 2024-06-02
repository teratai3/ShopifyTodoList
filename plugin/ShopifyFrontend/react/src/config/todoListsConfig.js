export const STATUS_OPTIONS = [
    { label: '選択してください', value: '' },
    { label: '未対応', value: 'pending' },
    { label: '対応済み', value: 'completed' },
];

export const STATUS_LABELS = {
    pending: '未対応',
    completed: '対応済み',
};

export const getStatusLabel = (status) => {
    return STATUS_LABELS[status] || '不明なステータス';
};