const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class DeleteCommand extends BaseCommand {
  constructor() {
    super('delete', 'general', []);
    
    // Roles permitidos para usar este comando
    this.allowedRoleIDs = ["1153516614797492320", "1153516614784929808", "1156442283114246144"];
  }

  run(client, message, args) {
    // Verificar si se proporciona una ID de mensaje entre corchetes
    if (args[0] && args[0].startsWith('[') && args[0].endsWith(']')) {
      // Extraer la ID del mensaje sin los corchetes
      const messageID = args[0].slice(1, -1);

      // Verificar si el autor del mensaje tiene alguno de los roles permitidos
      const hasAllowedRole = this.allowedRoleIDs.some(roleId =>
        message.member.roles.cache.has(roleId)
      );

      // Obtener el canal actual
      const channel = message.channel;

      // Intentar borrar el mensaje con la ID especificada
      channel.messages
        .fetch(messageID)
        .then((messageToDelete) => {

          // Borrar el mensaje deseado
          messageToDelete.delete()
            
            .catch((error) => {
              console.error('Error al borrar el mensaje deseado:', error);
            });
        })
    } 

    // Borra el mensaje que ejecutó el comando y el mensaje para borrar
    message.delete()
      .then(() => {
        // También puedes eliminar el mensaje que invocó el comando aquí
        console.log('Mensaje del comando eliminado correctamente.');
      })
      .catch((error) => {
        console.error('Error al borrar el mensaje del comando:', error);
      });
  }
};