import React, { Component, forwardRef } from 'react';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router-dom'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton';
import ForwardIcon from '@material-ui/icons/Forward';

import projectApi from '../api/project';
import './css/ProjectList.css';

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            isLoading: true,
            redirect: false,
            projectId: '',
            projectName: '',
            invite_code: '',
            groupList: [],
            userId: this.props.match.params.userId,
        }
    }

    componentDidMount() {
        // const userId = this.props.match.params.userId;
        projectApi.listAllProject(this.state.userId, (response) => {
            this.setState(
                {
                    projects: response.data,
                    isLoading: false
                });
        });
    }

    createProject(listname) {
        const project = {
            projectName: listname.name
        }
        projectApi.createproject(this.props.match.params.userId, project, (response) => {
            projectApi.listAllProject(this.state.userId, (response) => {
                this.setState(
                    {
                        projects: response.data,
                        isLoading: false
                    });
            });
            window.location.reload(true);
        })
    }

    deleteProject(projectId) {
        projectApi.deleteProject(this.props.match.params.userId, projectId, (response) => {
            window.location.reload(true);
        })

    }

    handleInvite() {
        projectApi.addUsertoProject(this.props.match.params.userId, this.state.invite_code, (response) => {
            this.setState({
                redirect: true,
                projectId: response.data.projectId,
                projectName: response.data.projectName,
                groupList: response.data.groupList
            });
        })
    }

    render() {
        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };

        const columns = [
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Creator',
                field: 'creator',
                editable: 'never'
            },
        ];

        let { isLoading, projects } = this.state;
        const projectList = [];

        if (projects) {
            projects.forEach(project => {
                projectList.push(
                    {
                        "name": project.projectName,
                        "creator": this.props.location.state.username,
                        "projectId": project.projectId,
                        "groupList": project.groupList
                    }
                )
            });
        }

        if (this.state.redirect) {
            return <Redirect to={{
                pathname: `/ProjectBoard/${this.state.projectId}`,
                state: {
                    groupList: this.state.groupList,
                    projectName: this.state.projectName,
                    userId: this.state.userId,
                }
            }} />;
        }

        return (
            <Container maxWidth="sm" style={{ marginTop: '72px' }}>
                {
                    isLoading ?
                        <div className="row">Loading...</div>
                        :
                        <div>
                            <MaterialTable
                                icons={tableIcons}
                                title="Projects"
                                columns={columns}
                                data={projectList}
                                options={{
                                    actionsColumnIndex: -1
                                }}
                                onRowClick={(
                                    (event, selectedRow) => {
                                        //fetchAPI
                                        this.setState({
                                            redirect: true,
                                            projectId: selectedRow.projectId,
                                            groupList: selectedRow.groupList,
                                            projectName: selectedRow.name

                                        })
                                    })}
                                editable={{
                                    onRowAdd: (newData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                this.setState((prevState) => {
                                                    const project = [...prevState.projects];
                                                    this.createProject(newData);
                                                    //projects.push(newData);
                                                    //Creator should always be the login user.
                                                    projects[project.length - 1].creator = this.props.location.state.username;
                                                    return { ...prevState, projects };
                                                });
                                            }, 600);
                                        }),
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                if (oldData) {
                                                    this.setState((prevState) => {
                                                        const data = [...prevState.data];
                                                        data[data.indexOf(oldData)] = newData;
                                                        return { ...prevState, data };
                                                    });
                                                }
                                            }, 600);
                                        }),
                                    onRowDelete: (oldData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                this.setState((prevState) => {
                                                    this.deleteProject(oldData.projectId);
                                                    const data = [...prevState.data];
                                                    data.splice(data.indexOf(oldData), 1);
                                                    return { ...prevState, data };
                                                });
                                            }, 600);
                                        }),
                                }}
                            />
                            <Paper
                                component="form"
                                style={{
                                    padding: '2px 4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 550,
                                }}>

                                <InputBase
                                    className="input"
                                    placeholder="Enter invitation code"
                                    inputProps={{ 'aria-label': 'Enter invitation code' }}
                                    style={{ paddingLeft: 20 }}
                                    onChange={event => {
                                        this.setState({ invite_code: event.target.value })
                                    }}
                                />
                                <IconButton type="submit" className="iconB" aria-label="search" onClick={() => this.handleInvite()}>
                                    <ForwardIcon />
                                </IconButton>
                            </Paper>
                        </div>
                }
            </Container>
        );
    }
};

export default withRouter(ProjectList);

