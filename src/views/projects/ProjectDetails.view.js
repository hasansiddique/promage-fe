import React, { useEffect } from 'react';
import {Row, Col, Flex, Spin} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {FETCHING_SINGLE} from "./constants";
import { fetchProjectById } from './projects.api';
import TasksListView from "../tasks/TasksList.view";
import { resetTasksList } from '../tasks/tasks.reducer';

const ProjectDetails = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const { projectId } = state;
    const dispatch = useDispatch();

    const fetchStatus = useSelector((state) => state.projects.fetchStatus);
    const projectDetails = useSelector((state) => state.projects.projectDetails);

    useEffect(() => {
        dispatch(resetTasksList());
        fetchProjectById(dispatch, projectId);
    }, []);

    const getDateValue = (date) => {
        if (date) {
            const newDate = new Date(date);
            return newDate.toDateString();
        }
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <Flex justify='flex-start' align='flex-start'>
                        <a onClick={() => {navigate('/')}}>&#8592; Back to Projects</a>
                    </Flex>
                </Col>
            </Row>
            {fetchStatus === FETCHING_SINGLE ? <Flex justify='flex-center' align='flex-center'><Spin /></Flex> : (
                <>
                    {projectDetails ? (
                      <>
                          <Row>
                              <Col span={12}>
                                  <h1>{projectDetails?.name}</h1>
                                  <div>
                                      <h4>Project Details</h4>
                                      <p>
                                          {projectDetails?.description}
                                      </p>
                                  </div>
                              </Col>
                              <Col span={12}>
                                  <Row>
                                      <Col span={12}>
                                          <h4>Manager</h4>
                                          {projectDetails?.manager?.name}
                                      </Col>
                                      <Col span={12}>
                                          <div>
                                              <h4>Start Date</h4>
                                              {getDateValue(projectDetails?.startDate)}
                                          </div>

                                          <div>
                                              <h4>End Date</h4>
                                              {getDateValue(projectDetails?.endDate)}
                                          </div>
                                      </Col>
                                  </Row>
                              </Col>
                          </Row>

                          <Row>
                              <Col span={24} style={{ paddingTop: 50 }}>
                                  <TasksListView projectId={projectId} />
                              </Col>
                          </Row>
                      </>
                    ) : (
                        <Row>
                            <Col span={24}>
                                <div style={{ textAlign: 'center', padding: 25 }}>No Details found.</div>
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </>
    );
}
export default ProjectDetails;
