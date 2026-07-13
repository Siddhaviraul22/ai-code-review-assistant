function ProjectCard({

    project,

    onEdit,

    onDelete,

}) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-semibold">

                {project.project_name}

            </h2>

            <p className="text-gray-500 mt-2">

                Created:

                {" "}

                {new Date(

                    project.created_at

                ).toLocaleDateString()}

            </p>

            <div className="flex gap-3 mt-5">

                <button

                    onClick={() => onEdit(project)}

                    className="bg-blue-600 text-white px-4 py-2 rounded"

                >

                    Edit

                </button>

                <button

                    onClick={() => onDelete(project.id)}

                    className="bg-red-600 text-white px-4 py-2 rounded"

                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default ProjectCard;