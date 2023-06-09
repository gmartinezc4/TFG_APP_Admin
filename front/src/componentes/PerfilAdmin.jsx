import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { gql, useQuery, useMutation } from "@apollo/client";
import { CgProfile } from "react-icons/cg";
import { TfiEmail } from "react-icons/tfi";
import { BsPencil } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import ModalesPerfilAdmin from "./ModalesPerfilAdmin";
import Swal from "sweetalert2";
import Cargando from "./Cargando";

const GET_ADMIN = gql`
  query GetAdmin {
    getAdmin {
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

//
// * Componente PerfilAdmin.
// * Se encarga de mostrar el perfil de usuario del administrador.
//
function PerfilAdmin() {
  const [modalIsOpenNombreApellido, setIsOpenNombreApellido] = useState(false);
  const [modalIsOpenCorreo, setIsOpenCorreo] = useState(false);
  const [modalIsOpenPassword, setIsOpenPassword] = useState(false);

  // Variables del contexto usadas por el usuario.
  const { changeReload, changeErrorTrue, changeCodigoError, changeMensajeError } =
    useContext(Context);

  //
  // * Funciones encargadas de abrir y cerrar los modales para
  // * modificar los datos del usuario administrador.
  //
  function openModalNombreApellido() {
    setIsOpenNombreApellido(true);
  }

  function closeModalNombreApellido() {
    setIsOpenNombreApellido(false);
  }

  function openModalCorreo() {
    setIsOpenCorreo(true);
  }

  function closeModalCorreo() {
    setIsOpenCorreo(false);
  }

  function openModalPassword() {
    setIsOpenPassword(true);
  }

  function closeModalPassword() {
    setIsOpenPassword(false);
  }

  // Mutation para borrar el usuario administrador
  const [borrarUserAdmin] = useMutation(BORRAR_USER_ADMIN, {
    onCompleted: () => {
      console.log("Se ha borrado su usuario admininstrador");
      localStorage.removeItem("token");
      localStorage.removeItem("nivel_auth");
      changeReload();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se ha borrado su usuario admininstrador",
        showConfirmButton: false,
        timer: 2000,
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

  // Query para traer el usuario administrador.
  const { data, loading, error } = useQuery(GET_ADMIN, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loading)
    return (
      <div>
        <Cargando />
      </div>
    );

  if (error)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError(error.message)}
      </div>
    );

  //
  // * Función para dar de baja el usuario administrador.
  // * Realiza la mutation borrarUserAdmin.
  //
  // * AdminId: ID del administrador a borrar, el administrador con la sesión iniciada.
  //
  function modalDarBajaUserAdmin(AdminId) {
    Swal.fire({
      icon: "warning",
      title: "¿Quieres borrar tu perfil?",
      text: "Los cambios serán irreversibles",
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

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col mt-10">
          <h1 className="font-bold text-4xl mb-3">Tus datos</h1>
          <span className="mb-5">
            Aquí puedes revisar y actualizar tus datos de usuario y gestionar tu email y
            contraseña
          </span>

          <div className="grid grid-flow-col">
            {/* Columna izquierda, datos */}
            <div>
              <div className="mt-10 flex flex-row">
                <CgProfile className="w-10 h-10 mr-16 " />
                <div className="grid grid-cols-3 gap-32">
                  <p className="flex flex-col">
                    <span className="font-bold mb-1">Nombre</span>
                    <span className="font-light">{data.getAdmin.nombre}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="font-bold mb-1">Apellido</span>
                    <span className="font-light">{data.getAdmin.apellido}</span>
                  </p>
                </div>
              </div>

              <div className="border border-gray-200  mt-10"></div>

              <div className="flex flex-row mt-10">
                <TfiEmail className="w-10 h-10 mr-16" />
                <div className="grid grid-cols-2 gap-96">
                  <p className="flex flex-col">
                    <span className="font-bold mb-1">Email</span>
                    <span className="font-light">{data.getAdmin.email}</span>
                  </p>
                </div>
              </div>

              <div className="border border-gray-200  mt-10"></div>

              <div className="flex flex-row mt-10">
                <RiLockPasswordLine className="w-10 h-10 mr-16" />
                <div className="grid grid-cols-2 gap-96">
                  <p className="flex flex-col">
                    <span className="font-bold mb-1">Contraseña</span>
                    <span className="font-light">*************</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Columna derecha, botones */}
            <div>
              <button
                className="border border-black h-14 w-40 hover:bg-slate-500 hover:text-white -ml-20 mt-9"
                onClick={() => openModalNombreApellido()}
              >
                <div className="flex flex-row justify-center font-semibold">
                  <BsPencil className="mr-3 h-6 w-6" />
                  Modificar
                </div>
              </button>

              <div className="border border-gray-200  mt-10 -ml-96"></div>

              <button
                className="border border-black h-14 w-40 hover:bg-slate-500 hover:text-white -ml-20 mt-9"
                onClick={() => openModalCorreo()}
              >
                <div className="flex flex-row justify-center font-semibold">
                  <BsPencil className="mr-3 h-6 w-6" /> Modificar
                </div>
              </button>

              <div className="border border-gray-200  mt-10 -ml-96"></div>

              <button
                className="border border-black h-14 w-40 hover:bg-slate-500 hover:text-white -ml-20 mt-9"
                onClick={() => openModalPassword()}
              >
                <div className="flex flex-row justify-center font-semibold">
                  <BsPencil className="mr-3 h-6 w-6" /> Modificar
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Boton para darse de baja */}
      <div className="flex justify-center mt-32">
        <button
          className="rounded border-2 border-red-800 bg-red-600 p-5 font-bold hover:bg-red-800 hover:border-red-400"
          onClick={() => {
            modalDarBajaUserAdmin(data.getAdmin._id);
          }}
        >
          Darse de baja
        </button>
      </div>

      {/* Si se cumple la condición renderiza el componente <ModalesPerfilAdmin /> */}
      {modalIsOpenNombreApellido && (
        <ModalesPerfilAdmin
          closeModalNombreApellido={closeModalNombreApellido}
          modalIsOpenNombreApellido={modalIsOpenNombreApellido}
        />
      )}

      {/* Si se cumple la condición renderiza el componente <ModalesPerfilAdmin /> */}
      {modalIsOpenCorreo && (
        <ModalesPerfilAdmin
          closeModalCorreo={closeModalCorreo}
          modalIsOpenCorreo={modalIsOpenCorreo}
        />
      )}

      {/* Si se cumple la condición renderiza el componente <ModalesPerfilAdmin /> */}
      {modalIsOpenPassword && (
        <ModalesPerfilAdmin
          closeModalPassword={closeModalPassword}
          modalIsOpenPassword={modalIsOpenPassword}
        />
      )}
    </div>
  );
}

export default PerfilAdmin;
