import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProjectCard from "../components/ProjectCard";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await getProjects();

      setProjects(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      setMessage("Project name is required.");
      return;
    }

    try {
      if (editingId) {
        await updateProject(editingId, projectName);

        setMessage("Project updated successfully.");
      } else {
        await createProject(projectName);

        setMessage("Project created successfully.");
      }

      setProjectName("");
      setEditingId(null);

      loadProjects();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setProjectName(project.project_name);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      setMessage("Project deleted successfully.");

      loadProjects();
    } catch (error) {
      console.error(error);
      setMessage("Unable to delete project.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Projects
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Project" : "Create New Project"}
          </h2>

          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            {editingId ? "Update Project" : "Create Project"}
          </button>

          {message && (
            <p className="mt-4 text-green-600">
              {message}
            </p>
          )}
        </form>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-xl font-semibold">
              No Projects Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first project to get started.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Projects;