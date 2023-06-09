import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Context } from "../context/Context";
import Swal from "sweetalert2";
import Cargando from "./Cargando";

const GET_ADMINS = gql`
  query Query {
    getAdmins {
      _id
      apellido
      email
      nivel_auth
      nombre
      password
      token
    }
  }
`;

const GET_USERS = gql`
  query Query {
    getUsuarios {
      _id
      apellido
      email
      nombre
      password
      token
    }
  }
`;

const CHANGE_LVL_AUTH = gql`
  mutation Mutation($idUser: ID!, $newNivelAuth: String!) {
    ChangeLvlAuth(idUser: $idUser, newNivel_auth: $newNivelAuth) {
      _id
      apellido
      email
      nivel_auth
      nombre
      password
      token
    }
  }
`;

const BORRAR_USER_ADMIN = gql`
  mutation BorraUserAdmin($idUser: ID!) {
    borraUserAdmin(idUser: $idUser) {
      _id
      apellido
      email
      nivel_auth
      nombre
      password
      token
    }
  }
`;

const BORRAR_USER = gql`
  mutation BorraUser($idUser: ID!) {
    borraUser(idUser: $idUser) {
      _id
      apellido
      email
      nombre
      password
      token
    }
  }
`;

const GET_ADMINS_FILTRADOS = gql`
  query Query($filtro: String!) {
    getAdminsFiltrados(filtro: $filtro) {
      _id
      apellido
      email
      nivel_auth
      nombre
      password
      token
    }
  }
`;

const GET_USERS_FILTRADOS = gql`
  query GetUsuariosFiltrados($filtro: String!) {
    getUsuariosFiltrados(filtro: $filtro) {
      _id
      apellido
      email
      nombre
      password
      token
    }
  }
`;

//
// * Componente Mostrar usuarios.
// * Se encarga de mostrar las tablas de los usuarios
// * administradores y usaurios clientes.
//
// * props: setDatosUser
//
function MostrarUsuarios(props) {
  // Variables del contexto usadas.
  const {
    changeReload,
    reload,
    changeViewPedidosUser,
    token,
    nivel_auth,
    changeErrorTrue,
    changeCodigoError,
    changeMensajeError,
  } = useContext(Context);

  const [buscarUserAdmin, setBuscarUserAdmin] = useState("");
  const [buscarUserAdminAux, setBuscarUserAdminAux] = useState("");
  const [buscarUser, setBuscarUser] = useState("");
  const [buscarUserAux, setBuscarUserAux] = useState("");
  const [nivelAuth, setNivelAuth] = useState("");

  useEffect(() => {}, [reload]);

  // Mutation para editar el nivel de autorización del usuario administrador.
  const [changeLvlAuthUserAdmin] = useMutation(CHANGE_LVL_AUTH, {
    onCompleted: () => {
      console.log("Se ha cambiado el nivel de autorización del usuario admin");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Operación realizada con éxito",
        text: `Nuevo nivel de autorización: ${nivelAuth}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha ocurrido un error",
        text: "Por favor, intentelo de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // Mutation para borrar el usuario administrador.
  const [borrarUserAdmin] = useMutation(BORRAR_USER_ADMIN, {
    onCompleted: () => {
      console.log("Se ha borrado el usuario admin");
      changeReload();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario eliminado",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha ocurrido un error",
        text: "Por favor, intentelo de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // Mutation para borrar el usuario cliente.
  const [borrarUser] = useMutation(BORRAR_USER, {
    onCompleted: () => {
      console.log("Se ha borrado el usuario");
      changeReload();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario eliminado",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha ocurrido un error",
        text: "Por favor, intentelo de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // Query para traer los usaurios administradores.
  const {
    data: dataGetAdmins,
    loading: loadingGetAdmins,
    error: errorGetAdmins,
  } = useQuery(GET_ADMINS, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  // Query para traer los usuario clientes.
  const {
    data: dataGetUsuarios,
    loading: loadingGetUsuarios,
    error: errorGetUsuarios,
  } = useQuery(GET_USERS, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  // Query para traer los usuarios administradores con un filtro aplicado.
  const {
    data: dataGetAdminsFiltrados,
    loading: loadingAdminsFiltrados,
    error: errorAdminsFiltrados,
  } = useQuery(GET_ADMINS_FILTRADOS, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    variables: {
      filtro: buscarUserAdmin,
    },
  });

  // Query para traer los usuarios clientes con un filtro aplicado.
  const {
    data: dataGetUsersFiltrados,
    loading: loadingUsersFiltrados,
    error: errorUsersFiltrados,
  } = useQuery(GET_USERS_FILTRADOS, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    variables: {
      filtro: buscarUser,
    },
  });

  if (
    loadingGetAdmins ||
    loadingGetUsuarios ||
    loadingAdminsFiltrados ||
    loadingUsersFiltrados
  )
    return (
      <div>
        <Cargando />
      </div>
    );
  if (errorGetAdmins)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError(errorGetAdmins.message)}
      </div>
    );

  if (errorGetUsuarios)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError(errorGetUsuarios.message)}
      </div>
    );

  if (errorAdminsFiltrados)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError(errorAdminsFiltrados.message)}
      </div>
    );

  if (errorUsersFiltrados)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError(errorUsersFiltrados.message)}
      </div>
    );

  //
  // * Función para cambiar el nivel de autorización del usuario administrador.
  //
  // * AdminId: ID del usuario administrador al que se le edita el nivel de autorización.
  //
  async function modalCambiarNivelAuthAdmin(AdminId) {
    const { value: nivelAuth } = await Swal.fire({
      title: "Editar Administrador",
      input: "number",
      inputLabel: "Introduce el nuevo nivel de autorización del administrador",
      inputPlaceholder: "Disponibles: 1, 2",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#3BD630",
      cancelButtonColor: "#DF0000",
    });

    if (nivelAuth) {
      if (nivelAuth > 2) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Nivel de autorización no valido",
          text: "valores válidos: 1 y 2",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          modalCambiarNivelAuthAdmin(AdminId);
        });
      } else {
        setNivelAuth(nivelAuth);
        changeLvlAuthUserAdmin({
          context: {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          },
          variables: {
            idUser: AdminId,
            newNivelAuth: nivelAuth,
          },
        })
      }
    }
  }

  //
  // * Función para borrar el usuario administrador.
  //
  // * AdminId: ID del usuario administrador al que se le edita el nivel de autorización.
  //
  function modalBorrarUserAdmin(AdminId) {
    Swal.fire({
      icon: "warning",
      title: "¿Confirmar cambios?",
      showCancelButton: true,
      confirmButtonText: "Si, borrar",
      confirmButtonColor: "#DF0000",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarUserAdmin({
          context: {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          },
          variables: {
            idUser: AdminId,
          },
        });
      }
    });
  }

  //
  // * Función para borrar el usuario cliente.
  //
  // * AdminId: ID del usuario administrador al que se le edita el nivel de autorización.
  //
  function modalBorrarUser(UserId) {
    console.log(UserId);
    Swal.fire({
      icon: "warning",
      title: "¿Confirmar cambios?",
      showCancelButton: true,
      confirmButtonText: "Si, borrar",
      confirmButtonColor: "#DF0000",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarUser({
          context: {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          },
          variables: {
            idUser: UserId,
          },
        });
      }
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-mono text-orange-900 underline mb-10">
        Bases de datos Usuarios
      </h1>

      <div>
        <h1 className="flex justify-center text-2xl underline font-bold mb-5">
          USUARIOS ADMINISTRADORES
        </h1>

        {/* Buscar en la tabla */}
        <div className="flex flex-row py-3 pl-2">
          <div className="relative max-w-xs">
            <input
              type="text"
              className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              placeholder="Buscar por nombre..."
              value={buscarUserAdminAux}
              onChange={(e) => {
                setBuscarUserAdminAux(e.target.value);
              }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
          <div>
            <button
              className="rounded border-2 border-black ml-3 bg-white p-2 hover:bg-transparent"
              onClick={() => setBuscarUserAdmin(buscarUserAdminAux)}
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Si el nivel de autorización es 2 o más */}
        {/* Tabla usuarios adminsitradores con opción a editar y eliminar */}
        {nivel_auth >= 2 && (
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 border-2">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Nombre
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Apellido
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          N. Autorización
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Editar
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Borrar
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Sesión iniciada
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Si no hay filtro para buscar */}
                      {!buscarUserAdmin &&
                        dataGetAdmins.getAdmins.map((userAdmin) => (
                          <tr key={userAdmin._id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {userAdmin._id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.nombre}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.apellido}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.nivel_auth}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                className="text-green-500 hover:text-green-700 cursor-pointer"
                                onClick={() => {
                                  modalCambiarNivelAuthAdmin(userAdmin._id);
                                }}
                              >
                                Editar
                              </a>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              {userAdmin.token != token && (
                                <a
                                  className="text-red-500 hover:text-red-600 cursor-pointer"
                                  onClick={() => {
                                    modalBorrarUserAdmin(userAdmin._id);
                                  }}
                                >
                                  Borrar
                                </a>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              {userAdmin.token == token && (
                                <input
                                  type="checkbox"
                                  className="text-blue-600 border-black rounded"
                                  checked
                                  readOnly
                                />
                              )}
                            </td>
                          </tr>
                        ))}

                      {/* Si hay filtro para buscar */}
                      {buscarUserAdmin &&
                        dataGetAdminsFiltrados.getAdminsFiltrados.map((userAdmin) => (
                          <tr key={userAdmin._id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {userAdmin._id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.nombre}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.apellido}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.nivel_auth}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                className="text-green-500 hover:text-green-700 cursor-pointer"
                                onClick={() => {
                                  modalCambiarNivelAuthAdmin(userAdmin._id);
                                }}
                              >
                                Editar
                              </a>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                className="text-red-500 hover:text-red-600 cursor-pointer"
                                onClick={() => {
                                  modalBorrarUserAdmin(userAdmin._id);
                                }}
                              >
                                Borrar
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Si el nivel de autorización menor que 2 */}
        {/* Tabla usuarios adminsitradores sin opción a editar y eliminar */}
        {nivel_auth < 2 && (
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 border-2">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Nombre
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Apellido
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          N. Autorización
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Sesión iniciada
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Si no hay filtro para buscar */}
                      {!buscarUserAdmin &&
                        dataGetAdmins.getAdmins.map((userAdmin) => (
                          <tr key={userAdmin._id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {userAdmin._id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.nombre}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.apellido}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.nivel_auth}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              {userAdmin.token == token && (
                                <input
                                  type="checkbox"
                                  className="text-blue-600 border-black rounded"
                                  checked
                                  readOnly
                                />
                              )}
                            </td>
                          </tr>
                        ))}

                      {/* Si hay filtro para buscar */}
                      {buscarUserAdmin &&
                        dataGetAdminsFiltrados.getAdminsFiltrados.map((userAdmin) => (
                          <tr key={userAdmin._id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {userAdmin._id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.nombre}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.apellido}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {userAdmin.nivel_auth}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                className="text-green-500 hover:text-green-700 cursor-pointer"
                                onClick={() => {
                                  modalCambiarNivelAuthAdmin(userAdmin._id);
                                }}
                              >
                                Editar
                              </a>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                className="text-red-500 hover:text-red-600 cursor-pointer"
                                onClick={() => {
                                  modalBorrarUserAdmin(userAdmin._id);
                                }}
                              >
                                Borrar
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        <h1 className="flex justify-center text-2xl underline font-bold mb-5 mt-10">
          USUARIOS CLIENTES
        </h1>

        {/* Buscar en la tabla */}
        <div className="flex flex-row py-3 pl-2">
          <div className="relative max-w-xs">
            <input
              type="text"
              className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              placeholder="Buscar por nombre..."
              value={buscarUserAux}
              onChange={(e) => {
                setBuscarUserAux(e.target.value);
              }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
          <div>
            <button
              className="rounded border-2 border-black ml-3 bg-white p-2 hover:bg-transparent"
              onClick={() => setBuscarUser(buscarUserAux)}
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Tablas usuarios clientes */}
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 border-2">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Apellido
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Pedidos
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Borrar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Si no hay filtro para buscar */}
                    {!buscarUser &&
                      dataGetUsuarios.getUsuarios.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {user._id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.nombre}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.apellido}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <a
                              className="text-blue-500 hover:text-blue-700 cursor-pointer"
                              onClick={() => {
                                changeViewPedidosUser(true);
                                props.setDatosUser(
                                  user._id,
                                  user.nombre,
                                  user.apellido,
                                  user.email
                                );
                              }}
                            >
                              Pedidios
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap ">
                            <a
                              className="text-red-500 hover:text-red-600 cursor-pointer"
                              onClick={() => {
                                modalBorrarUser(user._id);
                              }}
                            >
                              Borrar
                            </a>
                          </td>
                        </tr>
                      ))}

                    {/* Si hay filtro para buscar */}
                    {buscarUser &&
                      dataGetUsersFiltrados.getUsuariosFiltrados.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {user._id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.nombre}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.apellido}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <a
                              className="text-blue-500 hover:text-blue-700 cursor-pointer"
                              onClick={() => {
                                changeViewPedidosUser(true);
                                props.setDatosUser(
                                  user._id,
                                  user.nombre,
                                  user.apellido,
                                  user.email
                                );
                              }}
                            >
                              Pedidios
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap ">
                            <a
                              className="text-red-500 hover:text-red-600 cursor-pointer"
                              onClick={() => {
                                modalBorrarUser(user._id);
                              }}
                            >
                              Borrar
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostrarUsuarios;
