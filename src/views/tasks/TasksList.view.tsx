import {Table, Button, Flex, TableProps, Popconfirm, Space, Row, Col} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';

import AddTask from "./Task.form";
import {deleteTask, fetchAllTasks} from './tasks.api';

import {
    FETCHING_SINGLE,
    FETCHING_LIST,
    FieldType,
    TaskProps,
} from './constants';

const TasksList: FC<TaskProps> = ({
    projectId,
}) => {
    const dispatch = useDispatch();

    const [isFormOpen, setFormOpen] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState<FieldType>();

    const fetchStatus = useSelector((state: any) => state.tasks.fetchStatus);
    const tasksList = useSelector((state: any) => state.tasks.tasksList);

    useEffect(() => {
        if (!tasksList.length) fetchAllTasks(dispatch, projectId);
    }, []);

    const columns: TableProps<FieldType>['columns'] = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date) => {
                const newDate = new Date(date);
                return (
                    <>{newDate.toDateString()}</>
                );
            },
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date) => {
                const newDate = new Date(date);
                return (
                    <>{newDate.toDateString()}</>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        setTaskToUpdate(record);
                        setFormOpen(true);
                    }}>Update</a>
                    <Popconfirm
                        onConfirm={() => deleteTask(dispatch, record.id)}
                        description="Are you sure to delete this task?"
                        title="Delete Task"
                        cancelText="No"
                        okText="Yes"
                    >
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row>
                <Col span={12}>
                    <Flex justify='flex-start' align='flex-start'>
                        <h3>Tasks</h3>
                    </Flex>
                </Col>
                <Col span={12}>
                    <Flex justify='flex-end' align='flex-center'>
                        <Button type="primary" onClick={() => setFormOpen(true)}>
                            Add Task
                        </Button>
                    </Flex>
                </Col>
            </Row>

            {isFormOpen ? (
                <AddTask
                    projectId={projectId}
                    isFormOpen={isFormOpen}
                    setFormOpen={setFormOpen}
                    taskToUpdate={taskToUpdate}
                    // @ts-ignore
                    setTaskToUpdate={setTaskToUpdate}
                />
            ) : null}

            <Table
                loading={fetchStatus === FETCHING_LIST || fetchStatus === FETCHING_SINGLE}
                style={{ paddingTop: 20 }}
                dataSource={tasksList}
                columns={columns}
            />
        </>
    );
}
export default TasksList;
