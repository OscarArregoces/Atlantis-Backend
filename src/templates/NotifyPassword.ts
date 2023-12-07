export const notifyPasswordTemplate = (name: string, date: string) => {
    return `
    <table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="background-color: #1fc0d5; text-align: center; height: 100px;">
            <h1 style="color: white;">Confirmación de Actualización de Contraseña</h1>
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
                    Es un placer informarte que tu contraseña ha sido actualizada con éxito. Este cambio garantiza la
                    seguridad continua de tu cuenta.
                </p>
                <p>
                    Por favor, ten en cuenta los siguientes detalles:
                </p>
                <ul>
                    <li>
                        <b>Fecha y Hora de Actualización:</b> ${date} 
                    </li>
                    <li>
                        <b>Actividad de Sesión:</b> Si no reconoces esta actividad o no has realizado este cambio, por
                        favor, ponte en contacto con nuestro equipo de soporte de inmediato.

                    </li>
                </ul>
            </div>
        </td>
    </tr>
    <tr>
        <td style="background-color: #daedf1; padding: 1rem; text-align: start;">
            <div class="body">
                <p>
                    Recuerda que tu seguridad es nuestra prioridad. Asegúrate de mantener tu nueva contraseña de forma
                    segura y no la compartas con nadie. Si tienes alguna pregunta o inquietud, no dudes en responder a este
                    correo electrónico.
                </p>
                <p>
                    Agradecemos tu confianza en <b>Atlantis</b>.
                </p>
                <p>
                    Saludos cordiales,
                </p>
                <p>
                    <b>Atlantis</b>
                    Equipo de Soporte Técnico.
                </p>
            </div>
        </td>
    </tr>
</table>
    `
};