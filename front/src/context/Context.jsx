import React, { createContext, useState } from "react";

export const Context = createContext(); //contexto

export function ContextProvider(props) {
  const [viewRegistro, setViewRegistro] = useState(false);
  const [viewUsuarios, setViewUsuarios] = useState(true);
  const [viewPedidosUser, setViewPedidosUser] = useState(false);
  const [viewProductosUser, setViewProductosUser] = useState(false);
  const [viewTodosPedidos, setViewTodosPedidos] = useState(false);
  const [viewProductosWeb, setViewProductosWeb] = useState(false);
  const [viewMaderasWeb, setViewMaderasWeb] = useState(false);
  const [viewPerfilAdmin, setViewPerfilAdmin] = useState(false);

  const [enviarCorreoConfirmacion, setEnviarCorreoConfirmacion] = useState(false);
  const [enviarCorreoCancelacion, setEnviarCorreoCancelacion] = useState(false);
  const [volverDeProductos, setVolverDeProductos] = useState("");
  const [reload, setReload] = useState(false);

  const [viewError, setViewError] = useState(false);
  const [codigoError, setCodigoError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const token = localStorage.getItem("token");
  const nivel_auth = localStorage.getItem("nivel_auth");
  
  function changeReload(){
    setReload(!reload);
  }

  function changeViewRegistro(setView){
    setViewRegistro(setView);
    setViewUsuarios(false);
    setViewPedidosUser(false);
    setViewProductosUser(false);
    setViewTodosPedidos(false);
    setViewProductosWeb(false);
    setViewMaderasWeb(false);
    setViewPerfilAdmin(false);
    changeErrorFalse();
  }

  function changeViewUsuarios(setView){
    setViewUsuarios(setView);
    setViewRegistro(false);
    setViewPedidosUser(false);
    setViewProductosUser(false);
    setViewTodosPedidos(false);
    setViewProductosWeb(false);
    setViewMaderasWeb(false);
    setViewPerfilAdmin(false);
    changeErrorFalse();
  }

  function changeViewPedidosUser(setView){
    setViewPedidosUser(setView);
    setViewUsuarios(false);
    setViewRegistro(false);
    setViewProductosUser(false);
    setViewTodosPedidos(false);
    setViewProductosWeb(false);
    setViewMaderasWeb(false);
    setViewPerfilAdmin(false);
    changeErrorFalse();
  }

  function changeViewProductosUser(setView){
    setViewProductosUser(setView);
    setViewRegistro(false);
    setViewUsuarios(false);
    setViewPedidosUser(false);
    setViewTodosPedidos(false);
    setViewProductosWeb(false);
    setViewMaderasWeb(false);
    setViewPerfilAdmin(false);
    changeErrorFalse();
  }

  function changeViewTodosPedidos(setView){
    setViewTodosPedidos(setView);
    setViewRegistro(false);
    setViewUsuarios(false);
    setViewPedidosUser(false);
    setViewProductosUser(false);
    setViewProductosWeb(false);
    setViewMaderasWeb(false);
    setViewPerfilAdmin(false);
    changeErrorFalse();
  }

  function changeViewProductosWeb(setView){
    setViewProductosWeb(setView);
    setViewRegistro(false);
    setViewUsuarios(false);
    setViewPedidosUser(false);
    setViewProductosUser(false);
    setViewTodosPedidos(false);
    setViewMaderasWeb(false);
    setViewPerfilAdmin(false);
    changeErrorFalse();
  }

  function changeViewMaderasWeb(setView){
    setViewMaderasWeb(setView);
    setViewRegistro(false);
    setViewUsuarios(false);
    setViewPedidosUser(false);
    setViewProductosUser(false);
    setViewTodosPedidos(false);
    setViewProductosWeb(false);
    setViewPerfilAdmin(false);
    changeErrorFalse();
  }

  function changeViewPerfilAdmin(setView){
    setViewPerfilAdmin(setView);
    setViewRegistro(false);
    setViewUsuarios(false);
    setViewPedidosUser(false);
    setViewProductosUser(false);
    setViewTodosPedidos(false);
    setViewProductosWeb(false);
    setViewMaderasWeb(false);
    changeErrorFalse();
  }

  function changeEnviarCorreoConfirmacion(setView){
    setEnviarCorreoConfirmacion(setView);
  }

  function changeEnviarCorreoCancelacion(setView){
    setEnviarCorreoCancelacion(setView);
  }

  function changeVolverDeProductos(setVolver){
    setVolverDeProductos(setVolver);
  }

  function changeErrorTrue(){
    setViewError(true);
    setViewRegistro(false);
    setViewUsuarios(false);
    setViewPedidosUser(false);
    setViewProductosUser(false);
    setViewTodosPedidos(false);
    setViewProductosWeb(false);
    setViewMaderasWeb(false);
    setViewPerfilAdmin(false);
  }

  function changeErrorFalse(){
    setViewError(false);
  }

  function changeCodigoError(codigo){
    setCodigoError(codigo);
  }

  function changeMensajeError(mensaje){
    setMensajeError(mensaje);
  }


  return (
    <Context.Provider
      value={{
        viewRegistro,
        viewUsuarios,
        viewPedidosUser,
        viewProductosUser,
        viewTodosPedidos,
        viewProductosWeb,
        viewMaderasWeb,
        viewPerfilAdmin,
        
        enviarCorreoConfirmacion,
        enviarCorreoCancelacion,
        volverDeProductos,
        reload,
        token,
        nivel_auth,

        viewError,
        codigoError,
        mensajeError,
        
        changeViewRegistro,
        changeViewUsuarios,
        changeViewPedidosUser,
        changeViewProductosUser,
        changeViewTodosPedidos,
        changeViewProductosWeb,
        changeViewMaderasWeb,
        changeViewPerfilAdmin,
        
        changeEnviarCorreoConfirmacion,
        changeEnviarCorreoCancelacion,
        changeVolverDeProductos,
        changeReload,

        changeErrorTrue,
        changeErrorFalse,
        changeCodigoError,
        changeMensajeError,
        
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
