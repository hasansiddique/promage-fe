import {Table, Button, Flex, TableProps, Popconfirm, Space, Col, Row} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import AddProject from "./Project.form";
import {deleteProject, fetchAllProjects} from './projects.api';

import {
    FETCHING_LIST,
    FieldType,
} from './constants';

const ProjectList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isFormOpen, setFormOpen] = useState(false);
    const [projectToUpdate, setProjectToUpdate] = useState<FieldType>();

    const fetchStatus = useSelector((state: any) => state.projects.fetchStatus);
    const projectsList = useSelector((state: any) => state.projects.projectsList);

    useEffect(() => {
        if (!projectsList.length) fetchAllProjects(dispatch);
    }, []);

    const handleProjectClick = (projectId: string) => {
        navigate(`/details/${projectId}`, { state: { projectId } });
    };

    const columns: TableProps<FieldType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Manager',
            dataIndex: 'manager',
            key: 'manager',
            render: (manager) => <>{manager.name}</>,
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
            title: 'Is Running',
            dataIndex: 'isRunning',
            key: 'isRunning',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleProjectClick(record.id)}>Details</a>
                    <a onClick={() => {
                        setProjectToUpdate(record);
                        setFormOpen(true);
                    }}>Update</a>
                    <Popconfirm
                        onConfirm={() => deleteProject(dispatch, record.id)}
                        description="Are you sure to delete this project?"
                        title="Delete Project"
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
                        <h3>Projects</h3>
                    </Flex>
                </Col>
                <Col span={12}>
                    <Flex justify='flex-end' align='flex-start'>
                        <Button type="primary" onClick={() => setFormOpen(true)}>
                            Add Project
                        </Button>
                    </Flex>
                </Col>
            </Row>


            {isFormOpen ? (
                <AddProject
                    isFormOpen={isFormOpen}
                    setFormOpen={setFormOpen}
                    projectToUpdate={projectToUpdate}
                    // @ts-ignore
                    setProjectToUpdate={setProjectToUpdate}
                />
            ) : null}

            <Table
                loading={fetchStatus === FETCHING_LIST}
                style={{ paddingTop: 20 }}
                dataSource={projectsList}
                columns={columns}
            />
        </>
    );
}
export default ProjectList;
