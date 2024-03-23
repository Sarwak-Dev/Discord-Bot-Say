const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayEmbedCommand extends BaseCommand {
  constructor() {
    super('sayembed', 'general', []);
  }

  run(client, message, args) {
    // Verificar si el usuario tiene un rol permitido
    const allowedRoleIDs = ["1153516614797492320", "1153516614784929808", "1156442283114246144"];
    const memberRoles = message.member.roles.cache.map(role => role.id);
    const hasAllowedRole = memberRoles.some(roleId => allowedRoleIDs.includes(roleId));

    // Verificar si el primer argumento comienza con '[' y termina con ']'
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

      // Crear el mensaje Embed
      const embed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle('NAMETOCHANGE')
        .setDescription(args.join(' '));

      // Enviar el mensaje en el canal especificado como Embed
      channel.send(embed)
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
      // No se proporcionó una ID de canal, enviar el argumento como mensaje en el canal actual como Embed
      // Ejecutar el comando solo si el usuario tiene un rol permitido

      const embed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle('NAMETOCHANGE')
        .setDescription(args.join(' '));

      // Enviar el mensaje en el canal actual como Embed
      message.channel.send(embed)
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
};