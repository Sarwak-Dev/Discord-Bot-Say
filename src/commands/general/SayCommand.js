const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'general', []);
  }

  run(client, message, args) {

    // id rank discord to use this command
    const allowedRoleIDs = ["1153516614797492320", "1153516614784929808", "1156442283114246144"];
    const memberRoles = message.member.roles.cache.map(role => role.id);
    const hasAllowedRole = memberRoles.some(roleId => allowedRoleIDs.includes(roleId));

    if (args[0] && args[0].startsWith('[') && args[0].endsWith(']')) {
      const channelID = args[0].slice(1, -1);
      args.shift();
      const channel = message.guild.channels.cache.get(channelID);
      if (!channel || !channel.permissionsFor(message.member).has('SEND_MESSAGES')) {
        return;
      }

      if (!channel) {
        return;
      }

      // Procesar el mensaje para agregar saltos de línea después de cada punto
      const messageText = args.join(' ').replace(/\./g, '.\n\n');

      // Separar el mensaje de los archivos adjuntos
      const attachments = message.attachments.array(); // Obtener archivos adjuntos

      // Enviar el mensaje en el canal especificado junto con los archivos adjuntos
      channel.send(`${messageText}\n`, {
        files: attachments.map(attachment => attachment.url) // Agregar URLs de archivos adjuntos
      })
        .then(() => {
          // Borrar el mensaje del comando
          message.delete()
            .catch((error) => {
              console.error('Error al borrar el mensaje del comando:', error);
            });
        })
        .catch((error) => {
          console.error('Error al enviar el mensaje en el canal especificado:', error);
        });
    } else {
      // Procesar el mensaje para agregar saltos de línea después de cada punto
      const messageText = args.join(' ').replace(/\./g, '.\n\n');

      // Separar el mensaje de los archivos adjuntos
      const attachments = message.attachments.array(); // Obtener archivos adjuntos

      // Enviar el mensaje en el canal actual junto con los archivos adjuntos
      message.channel.send(`${messageText}\n`, {
        files: attachments.map(attachment => attachment.url) // Agregar URLs de archivos adjuntos
      })
        .then(() => {
          // Borrar el mensaje del comando
          message.delete()
            .catch((error) => {
              console.error('Error al borrar el mensaje del comando:', error);
            });
        })
        .catch((error) => {
          console.error('Error al enviar el mensaje en el canal actual:', error);
        });
    }
  }
}