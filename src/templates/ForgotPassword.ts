export const forgotPasswordTemplate = (name: string, urlFull: string) => {
    return `
    <table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="background-color: #1fc0d5; text-align: center; height: 100px;">
            <h1 style="color: white;">Solicitud de cambio de contraseña</h1>
        </td>
    </tr>
    <tr>
        <td style="background-color: #daedf1; padding: 1rem; text-align: start;">
            <!-- Contenido del cuerpo -->
            <div class="body">
                <p>
                    Estimado <b>${name}</b>,
                </p>
                <p>
                    Esperamos que te encuentres bien. Hemos recibido una solicitud para restablecer la
                    contraseña de tu cuenta, y estamos aquí para ayudarte a completar este proceso de manera segura.
                </p>
                <p>
                    Por favor, sigue los siguientes pasos para cambiar tu contraseña:
                </p>
                <ul>
                    <li>
                        <b>Accede al enlace de restablecimiento:</b> Haz clic en el boton enlace "Actualizar contraseña"
                        para acceder a la
                        página de
                        restablecimiento de contraseña. Recuerda que este enlace tiene un tiempo limitado de validez y
                        expirará
                        en 5 minutos.
                    </li>
                    <li>
                        <b>Ingresa tu nueva contraseña:</b> Una vez que hayas accedido al enlace, se te solicitará que
                        ingreses una
                        nueva
                        contraseña. Asegúrate de elegir una contraseña segura que contenga letras mayúsculas, minúsculas,
                        números y
                        caracteres especiales.
                    </li>
                    <li>
                        <b>Confirma tu nueva contraseña:</b> Después de ingresar tu nueva contraseña, confírmala nuevamente
                        para
                        garantizar que
                        sea la correcta.
                    </li>
                </ul>
            </div>
        </td>
    </tr>
    <tr>
        <td style="background-color: #daedf1; width: 100%; height: 70px; text-align: center;">
            <a href="${urlFull}" target="_blank" style="text-decoration: none;">
                <button type="button" style="width: 300px; height: 50px; background-color: #1fc0d5; color: white; border: none; cursor: pointer;">
                    Actualizar contraseña
                </button>
            </a>
        </td>
    </tr>
    <tr>
        <td style="background-color: #daedf1; padding: 1rem; text-align: start;">
            <div class="body">
                <p>
                    Recuerda que este enlace y las instrucciones adjuntas son válidos solo por un tiempo limitado. Si no
                    completas
                    este proceso dentro de los próximos 5 minutos, deberás generar una nueva solicitud de
                    restablecimiento.
                </p>
                <p>
                    Agradecemos tu cooperación para mantener tu cuenta segura.
                </p>
                <p>
                    Atentamente,
                </p>
                <p>
                    <b>Atlantis</b>
                    Soporte Técnico.
                </p>
            </div>
        </td>
    </tr>
</table>
    `
};