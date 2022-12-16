export interface ProjectTask {
    "id": string,
    "name": string,
    "start": Date,
    "end": Date,
    "progress": number,
    "type": string,
    "hideChildren": boolean,
    "displayOrder": number,
    "project": string,
    "dependencies": [],
    "isDisabled": boolean,
    "projectId": string,
}

export interface ProjectUser {
    "User": {
        "id": string,
        "name": string
    }
}

interface ProjectProps {
    "id": string,
    "name": string,
    "UserProject": ProjectUser[],
    "Task": ProjectTask[]
}

export default ProjectProps
