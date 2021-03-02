import React from "react";

const UserList = ({ userData }) => {
    return (
        <>
            <h1>Información del usuario</h1>
            <ul>
                <li>
                    <strong>Nombre: </strong>
                    {userData.name}
                </li>
                <li>
                    <strong>Usuario: </strong>
                    {userData.username}
                </li>
                <li>
                    <strong>Email: </strong>
                    {userData.email}
                </li>
                <li>
                    <strong>Web: </strong>
                    {userData.website}
                </li>
                <li>
                    <strong>Teléfono: </strong>
                    {userData.phone}
                </li>
            </ul>
        </>
    );
};

export default UserList;