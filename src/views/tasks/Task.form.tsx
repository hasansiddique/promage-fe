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
// @ts-ignore
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

import { updateTask, createNewTask } from "./tasks.api";
import {
    TASK_STATUSES_OPTIONS,
    FETCHING_SINGLE,
    AddType,
    FieldType,
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

const AddTask: FC<AddType> = ({
    setTaskToUpdate,
    taskToUpdate,
    setFormOpen,
    isFormOpen,
    projectId,
}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const fetchStatus = useSelector((state: any) => state.projects.fetchStatus);

    const handleCancel = () => {
        setFormOpen(false);
        // @ts-ignore
        setTaskToUpdate(undefined);
    };

    const checkFieldsChanged = (
        payload: { endDate: any; description: string; status: string; startDate: any },
        values: FieldType,
    ) => {
      return payload.description === values.description
          && payload.status === values.status
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
            status: values.status,
            description: values.description,
            startDate: form.getFieldValue('startDate'),
            endDate: form.getFieldValue('endDate'),
            project: projectId,
        };

        if (taskToUpdate) {
            if (checkFieldsChanged(payload, values)) {
                // @ts-ignore
                updateTask(dispatch, taskToUpdate.id, payload);
            }
        } else {
            createNewTask(dispatch, payload);
        }
        handleCancel();
    };

    return (
        <>
            <Modal
                footer={null}
                closable={false}
                open={isFormOpen}
                title="Create New Task"
            >
                {fetchStatus === FETCHING_SINGLE ? <Flex justify='flex-center' align='flex-center'><Spin /></Flex> : (
                    <Form
                        variant="filled"
                        {...formItemLayout}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            name="status"
                            label="Status"
                            initialValue={taskToUpdate && taskToUpdate?.status}
                            rules={[{ required: true, message: 'Please provide task status!' }]}
                        >
                            <Select options={TASK_STATUSES_OPTIONS} />
                        </Form.Item>

                        <Form.Item
                            label="Start Date"
                            name="startDate"
                            initialValue={taskToUpdate ? dayjs(taskToUpdate?.startDate) : null}
                            rules={[{ required: true, message: 'Please provide task start and end date!' }]}
                        >
                            <DatePicker
                                onChange={onStartChange}
                                defaultValue={taskToUpdate ? dayjs(taskToUpdate?.startDate) : null}
                            />
                        </Form.Item>

                        <Form.Item
                            label="End Date"
                            name="endDate"
                            initialValue={taskToUpdate ? dayjs(taskToUpdate?.endDate) : null}
                            rules={[{ required: true, message: 'Please provide task start and end date!' }]}
                        >
                            <DatePicker
                                onChange={onEndChange}
                                defaultValue={taskToUpdate ? dayjs(taskToUpdate?.endDate) : null}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            initialValue={taskToUpdate && taskToUpdate?.description}
                            rules={[{ required: true, message: 'Please provide task description!' }]}
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

export default AddTask;
