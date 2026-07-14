import axios from "axios";

const API = "http://localhost:5000/api/projects";

const getToken = () => {

    return localStorage.getItem("token");

};

const config = () => {

    return {

        headers: {

            Authorization: `Bearer ${getToken()}`,

        },

    };

};

export const getProjects = async () => {

    const response = await axios.get(

        API,

        config()

    );

    return response.data;

};

export const createProject = async (

    project_name

) => {

    const response = await axios.post(

        API,

        {

            project_name,

        },

        config()

    );

    return response.data;

};

export const updateProject = async (

    id,

    project_name

) => {

    const response = await axios.put(

        `${API}/${id}`,

        {

            project_name,

        },

        config()

    );

    return response.data;

};

export const deleteProject = async (

    id

) => {

    const response = await axios.delete(

        `${API}/${id}`,

        config()

    );

    return response.data;

};
export const saveCode = async (id, code) => {

    const response = await axios.put(

        `http://localhost:5000/api/code/${id}`,

        { code },

        config()

    );

    return response.data;

};

export const getCode = async (id) => {

    const response = await axios.get(

        `http://localhost:5000/api/code/${id}`,

        config()

    );

    return response.data;

};