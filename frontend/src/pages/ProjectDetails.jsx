import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { saveCode, getCode } from "../services/projectService";

function ProjectDetails() {

    const { id } = useParams();

    const [code, setCode] = useState("");

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadCode();

    }, []);

    const loadCode = async () => {

        try {

            const data = await getCode(id);

            if (data.code) {

                setCode(data.code);

            }

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleSave = async () => {

        try {

            await saveCode(id, code);

            setMessage("Code saved successfully.");

        }

        catch (error) {

            console.error(error);

            setMessage("Unable to save code.");

        }

    };

    const handleFile = (event) => {

        const file = event.target.files[0];

        if (!file) return;

        if (!file.name.endsWith(".js")) {

            alert("Please upload only a JavaScript (.js) file.");

            return;

        }

        const reader = new FileReader();

        reader.onload = (e) => {

            setCode(e.target.result);

        };

        reader.readAsText(file);

    };

    return (

        <DashboardLayout>

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">

                    JavaScript Code

                </h1>

                <textarea

                    rows="18"

                    value={code}

                    onChange={(e) => setCode(e.target.value)}

                    placeholder="Paste your JavaScript code here..."

                    className="w-full border rounded-lg p-4 font-mono"

                />

                <div className="mt-6">

                    <p className="font-medium mb-2">

                        OR Upload JavaScript File

                    </p>

                    <input

                        type="file"

                        accept=".js"

                        onChange={handleFile}

                    />

                </div>

                <button

                    onClick={handleSave}

                    className="mt-6 bg-black text-white px-6 py-3 rounded-lg"

                >

                    Save Code

                </button>

                {

                    message &&

                    <p className="mt-4 text-green-600">

                        {message}

                    </p>

                }

            </div>

        </DashboardLayout>

    );

}

export default ProjectDetails;