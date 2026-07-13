function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="bg-white shadow px-8 py-5 flex justify-between items-center">

            <h2 className="text-xl font-semibold">

                Dashboard

            </h2>

            <div className="font-medium">

                Welcome,

                {" "}

                {user?.name || "User"}

            </div>

        </div>

    );

}

export default Navbar;