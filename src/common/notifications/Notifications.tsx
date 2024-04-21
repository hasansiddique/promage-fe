import React, { useEffect } from 'react';
import { message } from 'antd';
import {useSelector} from "react-redux";

const Notification: React.FC = () => {
    const type = useSelector((state: any) => state.notifications.type);
    const content = useSelector((state: any) => state.notifications.content);

    useEffect(() => {
        if (type && content) {
            messageApi.open({
                type,
                content,
            });
        }
    }, [type, content]);
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
        </>
    );
};

export default Notification;
