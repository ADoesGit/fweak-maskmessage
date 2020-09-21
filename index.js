const { messages, channels } = require('powercord/webpack');
const { Plugin } = require('powercord/entities');

module.exports = class MaskMessage extends Plugin {
    async startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'mask',
            aliases: ['mask-message'],
            description: 'Masks a message with another message!',
            usage: '{c} <overview> | <masked item>',
            category: 'fun',
            executor: await this.commandExec.bind(this)
        });
    }

    async commandExec(args) {
        const string = args.join(' ');
        const split = string.split(' | ');

        try {
            await messages.sendMessage(channels.getChannelId(), { content: `${split[0]} ${'​'.repeat(399)} ${split[1]}` });
        } catch (err) {
            console.error(`[MaskMessage] -> ${err}`);
            return;
        }
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('mask');
    }
}
