import React, {FC, useEffect} from 'react';
import {
    DatePicker,
    Button,
    Select,
    Input,
    Modal,
    Form,
    Spin,
    Flex,
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import type { FormProps, DatePickerProps } from 'antd';
import dayjs from 'dayjs';

import { fetchAllManagers } from "../managers/managers.api";
import { updateProject, createNewProject } from "./projects.api";
import { resetFetchStatus } from "./projects.reducer";
import {
    FETCHING_LIST,
    AddType,
    FieldType,
    ManagerType, SUCCESS,
} from "./constants";


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const AddProject: FC<AddType> = ({
    setProjectToUpdate,
    projectToUpdate,
    setFormOpen,
    isFormOpen,
}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const fetchStatus = useSelector((state: any) => state.managers.fetchStatus);
    const managersList = useSelector((state: any) => state.managers.managersList);

    useEffect(() => {
        if (!managersList.length) fetchAllManagers(dispatch);
    }, []);

    useEffect(() => {
        if (fetchStatus === SUCCESS) {
            handleCancel();
            dispatch(resetFetchStatus());
        }
    }, []);

    const handleCancel = () => {
        setFormOpen(false);
        // @ts-ignore
        setProjectToUpdate(undefined);
    };

    const checkFieldsChanged = (
        payload: { manager: ManagerType; endDate: any; name: string; description: string; startDate: any },
        values: FieldType,
    ) => {
      return payload.name === values.name
          && payload.manager === values.manager
          && payload.description === values.description
          && payload.endDate === form.getFieldValue('endDate')
          && payload.startDate === form.getFieldValue('startDate');
    };

    const onStartChange: DatePickerProps['onChange'] = (date, dateString) => {
        form.setFieldValue('startDate', dateString);
    };

    const onEndChange: DatePickerProps['onChange'] = (date, dateString) => {
        form.setFieldValue('endDate', dateString);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const payload = {
            name: values.name,
            manager: values.manager,
            description: values.description,
            startDate: form.getFieldValue('startDate'),
            endDate: form.getFieldValue('endDate'),
        };

        if (projectToUpdate) {
            if (checkFieldsChanged(payload, values)) {
                // @ts-ignore
                updateProject(dispatch, projectToUpdate.id, payload);
            }
        } else {
            createNewProject(dispatch, payload);
        }
    };

    return (
        <>
            <Modal
                footer={null}
                closable={false}
                open={isFormOpen}
                title="Create New Project"
            >
                {fetchStatus === FETCHING_LIST ? <Flex justify='flex-center' align='flex-center'><Spin /></Flex> : (
                    <Form
                        variant="filled"
                        {...formItemLayout}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            initialValue={projectToUpdate && projectToUpdate?.name}
                            rules={[
                                { required: true, message: 'Please provide project name!' },
                                { max: 20, message: "Value should be less than 20 character" },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            name="manager"
                            label="Manager"
                            initialValue={projectToUpdate && projectToUpdate?.manager?.id}
                            rules={[{ required: true, message: 'Please provide project manager name!' }]}
                        >
                            <Select
                                options={managersList.map((m: ManagerType) => { return { label: m?.name, value: m?.id }; })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Start Date"
                            name="startDate"
                            initialValue={projectToUpdate ? dayjs(projectToUpdate?.startDate) : null}
                            rules={[{ required: true, message: 'Please provide project start and end date!' }]}
                        >
                            <DatePicker
                                onChange={onStartChange}
                                defaultValue={projectToUpdate ? dayjs(projectToUpdate?.startDate) : null}
                            />
                        </Form.Item>

                        <Form.Item
                            label="End Date"
                            name="endDate"
                            initialValue={projectToUpdate ? dayjs(projectToUpdate?.endDate) : null}
                            rules={[{ required: true, message: 'Please provide project start and end date!' }]}
                        >
                            <DatePicker
                                onChange={onEndChange}
                                defaultValue={projectToUpdate ? dayjs(projectToUpdate?.endDate) : null}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            initialValue={projectToUpdate && projectToUpdate?.description}
                            rules={[{ required: true, message: 'Please provide project description!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="default" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button
                                style={{ marginLeft: 15 }}
                                htmlType="submit"
                                type="primary"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default AddProject;
